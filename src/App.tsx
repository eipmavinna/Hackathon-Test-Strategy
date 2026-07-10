import { useState } from "react";
import { escapeRoomExamples, generalDigitalEscapeRoomRules, genreRuleSets } from "./data/escapeRoomCorpus";
import type { EscapeRoomExample } from "./data/escapeRoomCorpus";
//message from the user
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
//response from the AI
type AssistantResponse = {
  message: ChatMessage;
  suggestedDocument: string;
};
//to send to the AI
type AiRequest = {
  instructions: string;
  generalRules: string;
  genreRules: string;
  examples: EscapeRoomExample[];
  conversationHistory: ChatMessage[];
  currentDocument: string;
  newestUserMessage: string;
};



function getFakeAssistantResponse(
  request: AiRequest,
  selectedGenre: string
): AssistantResponse {
  const genreQuestion =   //In the hackathon, this will ask something like department
    selectedGenre === "mystery"
      ? "What kind of mystery should the players investigate?"
      : selectedGenre === "science-fiction"
        ? "What science-fiction setting would you like?"
        : "What subject or learning objective should the escape room teach?";
  const userMessageCount =
    request.conversationHistory.filter(
      (message) => message.role === "user"
    ).length;

  if (userMessageCount === 0) {
    return {
      message: {
        role: "assistant",
        content: genreQuestion,
      },
      suggestedDocument: "",
    };
  }

  if (userMessageCount === 1) {
    return {
      message: {
        role: "assistant",
        content:
          "About how long should the escape room take to complete?",
      },
      suggestedDocument: "",
    };
  }

  return {
    message: {
      role: "assistant",
      content:
        "I have enough information to suggest an initial design.",
    },
    suggestedDocument: `Premise

A digital escape room based on the selected genre.

Player Objective

Solve a sequence of connected puzzles and complete the final challenge.

Designer Notes

This is a temporary fake design used to test the interface.`,
  };
}

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedExampleIds, setSelectedExampleIds] = useState<string[]>([]); //The selected examples will be sent as context.
  const [editableGenreInstructions, setEditableGenreInstructions] = useState("");
  const [editableGeneralRules, setEditableGeneralRules] = useState(
    generalDigitalEscapeRoomRules.join("\n\n")
  );
  const [instructions, setInstructions] = useState(
    `You are helping a user design a digital escape room.

Ask useful follow-up questions before creating a full design.

Use the selected genre rules and approved examples as guidance.

Do not assume important details that the user has not provided.`
  ); //these rules tell the AI how to behave. The user can edit these rules to change the AI's behavior.
  const [userMessage, setUserMessage] = useState(""); //holds current user message
  const [conversation, setConversation] = useState<ChatMessage[]>([]); //array of all messages sent
  const [currentDocument, setCurrentDocument] = useState(""); //current accepted document
  const [suggestedDocument, setSuggestedDocument] = useState(""); //ai suggested changes to the doc

  const selectedRuleSet = genreRuleSets.find(   //for the hackathon, this would be the specific AI generated ruleset for the document type. These will be tested.
    (ruleSet) => ruleSet.genre === selectedGenre
  );
  const selectedExamples = escapeRoomExamples.filter( //These will be the specific documents that will be sent in
    (example) => example.genre === selectedGenre
  );

  //deletes the last assistant message and resends the last user message to the AI for a new response
  function retryLastAssistantStep() {
    const lastMessage = conversation[conversation.length - 1];

    if (lastMessage?.role !== "assistant") {
      return;
    }

    const conversationWithoutLastAssistant =
      conversation.slice(0, -1);

    const lastUserMessage =
      conversationWithoutLastAssistant[
      conversationWithoutLastAssistant.length - 1
      ];

    if (lastUserMessage?.role !== "user") {
      return;
    }

    const earlierConversation =
      conversationWithoutLastAssistant.slice(0, -1);

    const retryRequest: AiRequest = {
      ...aiRequest,
      conversationHistory: earlierConversation,
      newestUserMessage: lastUserMessage.content,
    };

    const fakeAssistantResponse =
      getFakeAssistantResponse(
        retryRequest,
        selectedGenre
      );

    setConversation([
      ...conversationWithoutLastAssistant,
      fakeAssistantResponse.message,
    ]);

    setSuggestedDocument(
      fakeAssistantResponse.suggestedDocument
    );
  }

  //for context preview
  const examplesToSend = selectedExamples.filter((example) =>
    selectedExampleIds.includes(example.id)
  );

  //contains full request
  const aiRequest: AiRequest = {
    instructions,                                 //setup instructions for the assistant
    generalRules: editableGeneralRules,           //organization-wide rules 
    genreRules: editableGenreInstructions,        //document-specific rules
    examples: examplesToSend,                     //example documents to send as context
    conversationHistory: conversation,            //conversation history
    currentDocument,                              //current accepted document
    newestUserMessage: "",
  };

  //when send button is clicked, sends user message to AI and saves the response to the conversation array
  function handleSendMessage() {
    const trimmedMessage = userMessage.trim();

    if (trimmedMessage === "" || selectedGenre === "") {
      return;
    }

    const requestToSend: AiRequest = {
      ...aiRequest,
      newestUserMessage: trimmedMessage,
    };


    const fakeAssistantResponse =
      getFakeAssistantResponse(
        requestToSend,
        selectedGenre
      );

    if (fakeAssistantResponse.suggestedDocument !== "") {
      setSuggestedDocument(
        fakeAssistantResponse.suggestedDocument
      );
    }

    setConversation([
      ...conversation,
      {
        role: "user",
        content: trimmedMessage,
      },
      fakeAssistantResponse.message,
    ]);

    setUserMessage("");
  }

  return (
    <main>
      <h1>Digital Escape Room Designer</h1>

      <label htmlFor="genre">Escape-room genre</label>

      {/*dropdown*/}
      <select
        id="genre"
        value={selectedGenre}
        onChange={(event) => {
          const newGenre = event.target.value;

          setSelectedGenre(newGenre);
          setSelectedExampleIds([]);

          setConversation([]);
          setUserMessage("");
          setCurrentDocument("");
          setSuggestedDocument("");

          const matchingRuleSet = genreRuleSets.find(
            (ruleSet) => ruleSet.genre === newGenre
          );

          setEditableGenreInstructions(
            matchingRuleSet?.content ?? ""
          );
        }}
      >
        <option value="">Select a genre</option>

        {genreRuleSets.map((ruleSet) => (
          <option key={ruleSet.genre} value={ruleSet.genre}>
            {ruleSet.displayName}
          </option>
        ))}
      </select>

      {/*displays the ruleset for the selected genre*/}
      {selectedRuleSet && (
        <section>
          <h2>{selectedRuleSet.displayName} Rules</h2>
          <p>{selectedRuleSet.content}</p>
        </section>
      )}

      {/*displays the example escape rooms for the selected genre--!> */}
      {selectedRuleSet && (
        <section>
          <h2>Example Designs</h2>

          <ul>
            {selectedExamples.map((example) => (
              <li key={example.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedExampleIds.includes(example.id)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelectedExampleIds([
                          ...selectedExampleIds,
                          example.id,
                        ]);
                      } else {
                        setSelectedExampleIds(
                          selectedExampleIds.filter(
                            (id) => id !== example.id
                          )
                        );
                      }
                    }}
                  />

                  {example.title}
                </label>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/*AI instructions textarea for changing the instructions*/}
      <section>
        <h2>AI Instructions</h2>

        <textarea
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
          rows={10}
          style={{ width: "100%", maxWidth: "900px" }}
        />
      </section>


      <section>
        <h2>General Escape-Room Rules</h2>

        <textarea
          value={editableGeneralRules}
          onChange={(event) =>
            setEditableGeneralRules(event.target.value)
          }
          rows={16}
          style={{ width: "100%", maxWidth: "900px" }}
        />
      </section>

      {/*textarea for changing the genre instructions*/}
      <section>
        <h2>Genre-Specific Instructions</h2>

        <textarea
          value={editableGenreInstructions}
          onChange={(event) =>
            setEditableGenreInstructions(event.target.value)
          }
          rows={10}
          style={{ width: "100%", maxWidth: "900px" }}
        />
      </section>


      <section>
        <h2>Conversation</h2>

        {/*past conversation*/}
        <div>
          {conversation.map((message, index) => (
            <p key={index}>
              <strong>
                {message.role === "user" ? "User" : "Assistant"}:
              </strong>{" "}
              {message.content}
            </p>
          ))}
        </div>

        <textarea
          value={userMessage}
          onChange={(event) => setUserMessage(event.target.value)}
          rows={4}
          style={{ width: "100%", maxWidth: "900px" }}
          placeholder="Describe the digital escape room you want to create."
        />

        <br />

        {/*sends the message and saves it to the conversation array*/}
        <button
          onClick={handleSendMessage}
          disabled={
            selectedGenre === "" ||
            userMessage.trim() === ""
          }
        >
          Send
        </button>
      </section>

      {/*displays the current approved design and the AI suggested design*/}
      <section>
        <h2>Current Approved Design</h2>

        <textarea
          value={currentDocument}
          onChange={(event) => setCurrentDocument(event.target.value)}
          rows={12}
          style={{ width: "100%", maxWidth: "900px" }}
          placeholder="No approved design yet."
        />
      </section>

      <section>
        <h2>AI Suggested Design</h2>

        <textarea
          value={suggestedDocument}
          onChange={(event) => setSuggestedDocument(event.target.value)}
          rows={12}
          style={{ width: "100%", maxWidth: "900px" }}
          placeholder="The AI has not suggested a design yet."
        />
      </section>

      <button
        onClick={() => {
          setCurrentDocument(suggestedDocument);
          setSuggestedDocument("");
        }}
        disabled={suggestedDocument === ""}
      >
        Accept Suggestion
      </button>

      <button
        onClick={() => {
          setSuggestedDocument("");
        }}
        disabled={suggestedDocument === ""}
      >
        Reject Suggestion
      </button>

      {/*retries the last assistant step. used to send newly edited prompt*/}
      <button
        onClick={retryLastAssistantStep}
        disabled={
          conversation.length === 0 ||
          conversation[conversation.length - 1].role !==
          "assistant"
        }
      >
        Retry Last AI Step
      </button>

      {/*restarts the workflow, keeps prompt changes*/}
      <button
        onClick={() => {
          setConversation([]);
          setUserMessage("");
          setCurrentDocument("");
          setSuggestedDocument("");
        }}
      >
        Restart Workflow
      </button>



      <section>
        <h2>AI Context Preview</h2>

        <pre
          style={{
            whiteSpace: "pre-wrap",
            maxWidth: "900px",
            padding: "1rem",
            border: "1px solid #ccc",
          }}
        >
          {JSON.stringify(aiRequest, null, 2)}
        </pre>
      </section>

    </main>
  );
}

export default App;
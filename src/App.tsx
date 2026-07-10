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
  action:
    | "ask-question"
    | "suggest-document"
    | "explain-concern";

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
  suggestedDocument: string;
  newestUserMessage: string;
};



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

Do not assume important details that the user has not provided.

Do not ask all your questions at once. Ask one question at a time and wait for the user's response.
`
  ); //these rules tell the AI how to behave. The user can edit these rules to change the AI's behavior.
  const [userMessage, setUserMessage] = useState(""); //holds current user message
  const [conversation, setConversation] = useState<ChatMessage[]>([]); //array of all messages sent
  const [currentDocument, setCurrentDocument] = useState(""); //current accepted document
  const [suggestedDocument, setSuggestedDocument] = useState(""); //ai suggested changes to the doc
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [comparisonExampleId, setComparisonExampleId] =
    useState("");
  const [evaluationNotes, setEvaluationNotes] =
    useState("");

  const selectedRuleSet = genreRuleSets.find(   //for the hackathon, this would be the specific AI generated ruleset for the document type. These will be tested.
    (ruleSet) => ruleSet.genre === selectedGenre
  );
  const selectedExamples = escapeRoomExamples.filter( //These will be the specific documents that will be sent in
    (example) => example.genre === selectedGenre
  );

  //deletes the last assistant message and resends the last user message to the AI for a new response
  async function retryLastAssistantStep() {
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

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(retryRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.error ?? "The retry request failed."
        );
      }

      const assistantResponse: AssistantResponse =
        await response.json();

      setConversation([
        ...conversationWithoutLastAssistant,
        assistantResponse.message,
      ]);

      setSuggestedDocument(
        assistantResponse.suggestedDocument
      );
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "An unexpected error occurred."
        );
      }
    } finally {
      setIsLoading(false);
    }
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
    suggestedDocument,                            //AI suggested changes to the document
    newestUserMessage: "",
  };

  //when send button is clicked, sends user message to AI and saves the response to the conversation array
  async function handleSendMessage() {
    const trimmedMessage = userMessage.trim();

    if (trimmedMessage === "" || selectedGenre === "") {
      return;
    }

    const requestToSend: AiRequest = {
      ...aiRequest,
      newestUserMessage: trimmedMessage,
    };

    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestToSend),
      });

      //error handling
      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.error ?? "The AI request failed."
        );
      }

      const assistantResponse: AssistantResponse =
        await response.json();

      setSuggestedDocument(
        assistantResponse.suggestedDocument
      );

      setConversation([
        ...conversation,
        {
          role: "user",
          content: trimmedMessage,
        },
        assistantResponse.message,
      ]);

      setUserMessage("");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }

  }

  const comparisonExample = selectedExamples.find(
    (example) => example.id === comparisonExampleId
  );

  const documentForEvaluation =
    suggestedDocument !== ""
      ? suggestedDocument
      : currentDocument;

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
          const matchingExamples = escapeRoomExamples.filter(
            (example) => example.genre === newGenre
          );

          setSelectedExampleIds(
            matchingExamples.map((example) => example.id)
          );

          setConversation([]);
          setUserMessage("");
          setCurrentDocument("");
          setSuggestedDocument("");
          setComparisonExampleId("");

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

                        if (comparisonExampleId === example.id) {
                          setComparisonExampleId("");
                        }
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


      {/*shows the document meant for comparison - used when excluded and trying to reach that document. Select a document that is not checked.*/}
      <label htmlFor="comparison-example">
        Comparison document
      </label>

      <select
        id="comparison-example"
        value={comparisonExampleId}
        onChange={(event) =>
          setComparisonExampleId(event.target.value)
        }
      >
        <option value="">
          Select a document for comparison
        </option>

        {selectedExamples
          .filter(
            (example) =>
              !selectedExampleIds.includes(example.id)
          )
          .map((example) => (
            <option
              key={example.id}
              value={example.id}
            >
              {example.title}
            </option>
          ))}
      </select>




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
        <h2>Evaluation</h2>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 400px" }}>
            <h3>Generated Design</h3>

            <textarea
              value={documentForEvaluation}
              readOnly
              rows={25}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ flex: "1 1 400px" }}>
            <h3>Comparison Document</h3>

            <textarea
              value={comparisonExample?.content ?? ""}
              readOnly
              rows={25}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </section>
      {comparisonExample && (
        <section>
          <h2>Comparison Document</h2>

          <textarea
            value={comparisonExample.content}
            readOnly
            rows={20}
            style={{ width: "100%", maxWidth: "900px" }}
          />
        </section>
      )}


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
          disabled={isLoading || selectedGenre === ""}
          placeholder="Describe the digital escape room you want to create."
        />

        <br />

        {/*sends the message and saves it to the conversation array*/}
        <button
          onClick={handleSendMessage}
          disabled={
            selectedGenre === "" ||
            userMessage.trim() === "" ||
            isLoading
          }
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>


        {errorMessage !== "" && (
          <p>{errorMessage}</p>
        )}

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
        <h2>Evaluation Notes</h2>

        <textarea
          value={evaluationNotes}
          onChange={(event) =>
            setEvaluationNotes(event.target.value)
          }
          rows={10}
          style={{
            width: "100%",
            maxWidth: "900px",
          }}
          placeholder="What did the assistant miss? What questions should it have asked? What should change in the prompt?"
        />

        <br />

        <button
          onClick={() => {
            navigator.clipboard.writeText(
              evaluationNotes
            );
          }}
          disabled={
            evaluationNotes.trim() === ""
          }
        >
          Copy Notes
        </button>
      </section>



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
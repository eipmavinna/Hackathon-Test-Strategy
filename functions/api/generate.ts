/// <reference types="@cloudflare/workers-types" />

// OPENAI_API_KEY comes from .dev.vars locally and from a
// Cloudflare secret after deployment.
type Env = {
  OPENAI_API_KEY: string;
};

// Describes the request object sent from the React application.
type AiRequest = {
  instructions: string;
  generalRules: string;
  genreRules: string;
  examples: {
    id: string;
    title: string;
    genre: string;
    content: string;
  }[];
  conversationHistory: {
    role: "user" | "assistant";
    content: string;
  }[];
  currentDocument: string;
  newestUserMessage: string;
};

// Cloudflare runs this function whenever it receives:
// POST /api/generate
export const onRequestPost: PagesFunction<Env> = async (context) => {

  const apiKey = context.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error: "OPENAI_API_KEY is not configured.",
      },
      {
        status: 500,
      }
    );
  }

  // Read the JSON request body sent by React.
  // TypeScript will treat requestData as an AiRequest.
  const requestData =
    await context.request.json<AiRequest>();

  // Send an HTTP request from the Cloudflare Function to the OpenAI Responses API.
  const openAiResponse = await fetch(
    "https://api.openai.com/v1/responses",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "gpt-5-mini",

          text: {
              format: {
                  type: "json_schema",
                  name: "escape_room_response",
                  strict: true,
                  schema: {
                      type: "object",
                      properties: {
                          message: {
                              type: "string",
                          },
                          suggestedDocument: {
                              type: "string",
                          },
                      },
                      required: [
                          "message",
                          "suggestedDocument",
                      ],
                      additionalProperties: false,
                  },
              },
          },

        // These are the highest-level behavioral instructions.
        instructions: requestData.instructions,

        // For this first version, combine the remaining
        // context into one large text input.
        input: `
GENERAL DIGITAL ESCAPE-ROOM RULES

${requestData.generalRules}


GENRE-SPECIFIC RULES

${requestData.genreRules}


SELECTED EXAMPLE DOCUMENTS

${JSON.stringify(requestData.examples, null, 2)}


PREVIOUS CONVERSATION

${JSON.stringify(
  requestData.conversationHistory,
  null,
  2
)}


CURRENT APPROVED DOCUMENT

${requestData.currentDocument}


NEWEST USER MESSAGE

${requestData.newestUserMessage}

RESPONSE BEHAVIOR

If you still need information, put your next question in "message" and return an empty string for "suggestedDocument".

If you have enough information to create or revise the design, put a brief explanation in "message" and put the complete proposed design in "suggestedDocument".
        `,
      }),
    }
  );

  // If OpenAI returns an error response, preserve the
  // response body and HTTP status code and send them
  // back to React.
  if (!openAiResponse.ok) {
    const errorText = await openAiResponse.text();

    return Response.json(
      {
        error: errorText,
      },
      {
        status: openAiResponse.status,
      }
    );
  }

  // Parse OpenAI's JSON response.
  //
  // This type describes only the part of the response
  // structure that this code currently needs.
  const responseData =
    await openAiResponse.json<{
      output: {
        content: {
          type: string;
          text?: string;
        }[];
      }[];
    }>();

  // OpenAI may return several output items and several
  // content items.
  //
  // flatMap combines all content arrays into one array.
  //
  // find locates the first content item whose type is
  // "output_text".
  //
  // ?.text safely reads its text value.
  //
  // ?? supplies fallback text if no output text exists.
  const assistantText =
    responseData.output
      .flatMap((outputItem) => outputItem.content)
      .find(
        (contentItem) =>
          contentItem.type === "output_text"
      )
      ?.text ?? "The AI returned no text.";

  // Return JSON to the React frontend.
  //
  // This matches the AssistantResponse shape already
  // used by the application.
  return Response.json({
    message: {
      role: "assistant",
      content: assistantText,
    },

    // We are not yet asking OpenAI to return a separate
    // suggested document.
    //
    // That will come later when we add structured output.
    suggestedDocument: "",
  });
};
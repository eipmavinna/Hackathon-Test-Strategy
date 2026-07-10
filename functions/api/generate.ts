/// <reference types="@cloudflare/workers-types" />

export const onRequestPost: PagesFunction = async () => {
  return Response.json({
    message: {
      role: "assistant",
      content: "This response came from the Cloudflare server function.",
    },
    suggestedDocument: "",
  });
};
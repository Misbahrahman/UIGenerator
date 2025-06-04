import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json();

    const result = streamText({
      model: google("gemini-1.5-flash"),
      system: `You are a highly skilled HTML and CSS code generator. Your sole purpose is to provide clean, efficient, and well-structured HTML and CSS code snippets based on user descriptions.

IMPORTANT RULES:
- Provide ONLY the raw HTML and CSS code, no introductory text, explanations, or comments
- Always wrap your code in \`\`\`html code blocks for easy extraction
- If the request is ambiguous, make reasonable assumptions to generate the most likely intended code
- If the request is not related to HTML or CSS, respond with: "I can only generate HTML and CSS code."
- Prioritize modern CSS techniques (Flexbox, Grid) for layout
- Use semantic HTML5 elements where appropriate
- Ensure the code is well-formatted and easy to read
- Include CSS within <style> tags in the HTML for complete, working code
- Make designs responsive by default using media queries when appropriate
- Use modern CSS features like CSS Grid, Flexbox, and CSS custom properties
- Ensure cross-browser compatibility
- If user asks for HTML only, provide HTML without CSS
- If user asks for CSS only, provide CSS without HTML
- Otherwise, provide complete HTML with embedded CSS

Example response format:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <style>
        /* CSS styles here */
    </style>
</head>
<body>
    <!-- HTML content here -->
</body>
</html>
\`\`\``,
      messages,
      temperature: 0.3,
      maxTokens: 4000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to generate code. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

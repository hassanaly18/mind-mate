export async function POST(req) {
  const { entry } = await req.json();

  const prompt =
    "You are a thoughtful and empathetic mental health assistant. Your task is to provide a reflective response to the user's journal entry. The user has shared the following entry: " +
    entry +
    ". Please respond with a thoughtful reflection that acknowledges the user's feelings and experiences, and offers support or encouragement.";

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are a reflective journalling assistant. Your task is to provide a thoughtful and empathetic response to the user's journal entry. You should acknowledge the user's feelings and experiences, and offer support or encouragement.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();
    const reflection = data.choices?.[0]?.message?.content?.trim();

    return new Response(JSON.stringify({ reflection }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error.message);
    return new Response(
      JSON.stringify({ error: "Failed to generate reflection" }),
      {
        status: 500,
      }
    );
  }
}

export default async function handler(req, res) {
  try {
    // Parse body safely
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const question = body?.question || "Explain AI in healthcare";

    // Check API key exists
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        answer: "API key missing in Vercel"
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an AI healthcare assistant. Give short, clear answers."
            },
            {
              role: "user",
              content: question
            }
          ]
        })
      }
    );

    const data = await response.json();

    // Debug logging (IMPORTANT)
    console.log("OpenAI response:", data);

    if (!data.choices) {
      return res.status(500).json({
        answer: "OpenAI API error"
      });
    }

    return res.status(200).json({
      answer: data.choices[0].message.content
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      answer: "Server crashed"
    });
  }
}
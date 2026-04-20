export default async function handler(req, res) {
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const question = body?.question || "Explain AI in healthcare";

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        answer: "API key missing"
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      return res.status(500).json({
        answer: "OpenAI error: " + JSON.stringify(data)
      });
    }

    return res.status(200).json({
      answer: data.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      answer: "Server error"
    });
  }
}
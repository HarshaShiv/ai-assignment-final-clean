export default async function handler(req, res) {
  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const question = body?.question || "Explain AI in healthcare";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();

    console.log("API RESPONSE:", data); // 👈 IMPORTANT

    if (!data.choices) {
      return res.status(500).json({
        answer: "API failed: " + JSON.stringify(data)
      });
    }

    return res.status(200).json({
      answer: data.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      answer: "Server error"
    });
  }
}
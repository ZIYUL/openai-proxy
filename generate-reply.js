const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // OpenAI API Key 来自环境变量
});

module.exports = async (req, res) => {
  try {
    const { review } = req.body;

    // 调用 OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // 或者其他您有权限的模型，例如 gpt-3.5-turbo
      messages: [
        { role: "system", content: "你是一位客服，负责礼貌地回复客户差评。" },
        { role: "user", content: `差评内容：${review}，请生成合适的回复。` },
      ],
      max_tokens: 150,
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to generate reply" });
  }
};

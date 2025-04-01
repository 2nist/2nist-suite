import { useEffect, useState } from "react";
import "../styles.css";

const THEME = {
  turquoise: "#2fb7b3",
  orange: "#e89f4f",
  tan: "#f4e7d4",
  brown: "#2d2d2d",
  text: "#f4e7d4",
  dark: {
    background: "#2d2d2d",
    text: "#f4e7d4",
    accent: "#2fb7b3",
    border: "#e89f4f"
  }
};

const HF_API_TOKEN = "hf_your_token_here"; // Replace with your token
const HF_MODEL_ENDPOINT = "https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-common_gen";

export default function ConstructionZone() {
  const [lyrics, setLyrics] = useState("✍️ your lyrics will live here...");
  const [promptResponses, setPromptResponses] = useState({});
  const [wordBank, setWordBank] = useState([]);
  const [theme] = useState("dark");

  const promptSet = [
    "what shape is your fear?",
    "how does silence sound?",
    "where do lost things live?",
    "what is the color of regret?",
    "when does stillness move?"
  ];
  const currentTheme = THEME[theme];

  useEffect(() => {
    const query = Object.values(promptResponses).join(" ") + " " + lyrics;
    if (!query || HF_API_TOKEN === "hf_your_token_here") return;

    const fetchWords = async () => {
      try {
        const response = await fetch(HF_MODEL_ENDPOINT, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_API_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ inputs: query })
        });
        const result = await response.json();
        if (Array.isArray(result)) {
          setWordBank(result);
        } else if (result[0]?.generated_text) {
          setWordBank(result[0].generated_text.split(/\W+/).slice(0, 15));
        }
      } catch (err) {
        console.error("Hugging Face API error:", err);
      }
    };
    fetchWords();
  }, [promptResponses, lyrics]);

  return (
    <div style={{
      background: currentTheme.background,
      color: currentTheme.text,
      padding: 20,
      minHeight: "100vh",
      fontFamily: "sans-serif"
    }}>
      <h2>🧠 sparkboard</h2>
      {promptSet.map((prompt, i) => (
        <div key={i}>
          <label>{prompt}</label>
          <input
            style={{ width: "100%", margin: "4px 0 12px", padding: 6, background: "#333", color: "white" }}
            onChange={(e) => setPromptResponses({ ...promptResponses, [prompt]: e.target.value })}
          />
        </div>
      ))}

      <h2>🎶 Lyrics</h2>
      <textarea
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
        rows={6}
        style={{ width: "100%", padding: 8, background: currentTheme.tan, color: "black" }}
      />

      <h2>💬 Word Bank</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {wordBank.map((word, i) => (
          <span key={i} style={{
            background: currentTheme.accent,
            color: "black",
            padding: "4px 6px",
            borderRadius: 6,
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            fontWeight: 500,
            fontSize: "0.95rem"
          }}>{word}</span>
        ))}
      </div>
    </div>
  );
}
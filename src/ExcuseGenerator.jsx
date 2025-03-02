import React, { useState } from "react";
import "./ExcuseGenerator.css";

const API_URL = "https://yeyw2a1c5c.execute-api.eu-north-1.amazonaws.com/excuse";

function ExcuseGenerator() {
  const [excuseFor, setExcuseFor] = useState("");
  const [excuseTo, setExcuseTo] = useState("");
  const [scenario, setScenario] = useState("");
  const [tone, setTone] = useState("creative");
  const [customTone, setCustomTone] = useState("");
  const [language, setLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [excuse, setExcuse] = useState("");

  const handleGenerateExcuse = async () => {
    if (!excuseFor) return alert("Please specify what you are making an excuse for");
    if (!excuseTo) return alert("Please specify who you are making the excuse to");
    if (tone === "other" && !customTone) return alert("Please specify your custom tone");

    setLoading(true);
    setErrorMessage("");
    setExcuse("");

    const specificTone = tone === "other" ? customTone : tone;
    const fullScenario = scenario
      ? `Excuse for ${excuseFor} to ${excuseTo} (Additional context: ${scenario})`
      : `Excuse for ${excuseFor} to ${excuseTo}`;

    const payload = {
      inputs: `Create a ${specificTone} excuse in ${language} for: ${fullScenario}\n\nIMPORTANT INSTRUCTIONS:\n- Generate a single, coherent, and believable excuse\n- Match the tone specified: ${specificTone}\n- Be creative but not unrealistic\n- Provide ONLY the excuse text\n- Limit the excuse to 2-3 sentences\n- Ensure the excuse sounds plausible and appropriate for the recipient\n- Do NOT use the excuse \"dog ate my homework\" or any similar clichés.`
    };

    console.log("Request Payload:", payload);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setExcuse(data[0]?.generated_text.trim() || "Failed to generate an excuse.");
    } catch (error) {
      setErrorMessage("Error generating excuse: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyExcuse = () => {
    navigator.clipboard.writeText(excuse).then(() => {
      alert("Excuse copied to clipboard!");
    });
  };

  return (
    <div className="container">
      <h2>JustiFi AI</h2>
      <div className="input-group">
        <label>Excuse For:</label> 
        <input type="text" value={excuseFor} onChange={(e) => setExcuseFor(e.target.value)} placeholder="What are you making an excuse for?" />
      </div>
      <div className="input-group">
        <label>Excuse To:</label>
        <input type="text" value={excuseTo} onChange={(e) => setExcuseTo(e.target.value)} placeholder="Who are you making the excuse to?" />
      </div>
      <div className="input-group">
        <label>Additional Context:</label>
        <input type="text" value={scenario} onChange={(e) => setScenario(e.target.value)} placeholder="Provide more details (optional)" />
      </div>
      <div className="input-group">
        <label>Excuse Tone:</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="creative">Creative</option>
          <option value="professional">Professional</option>
          <option value="humorous">Humorous</option>
          <option value="sympathetic">Sympathetic</option>
          <option value="funny">Funny</option>
          <option value="dramatic">Dramatic</option>
          <option value="sadness">Sadness</option>
          <option value="other">Other</option>
        </select>
      </div>
      {tone === "other" && (
        <div className="input-group">
          <label>Specify Tone:</label>
          <input type="text" value={customTone} onChange={(e) => setCustomTone(e.target.value)} placeholder="Enter your custom tone" />
        </div>
      )}
      <div className="input-group">
        <label>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="english">English</option>
          <option value="hinglish">Hinglish</option>
          <option value="hindi">Hindi</option>
        </select>
      </div>
      <button id="generateExcuse" onClick={handleGenerateExcuse} disabled={loading}>
        {loading ? "Generating..." : "Generate Excuse"}
      </button>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {excuse && (
        <div id="excuseContainer">
          <p>
            <strong>Excuse:</strong>
            <br />
            {excuse}
          </p>
          <div>
            <button id="copyExcuse" onClick={handleCopyExcuse}>Copy Excuse</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExcuseGenerator;

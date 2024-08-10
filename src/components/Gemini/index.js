"use client"

import React, { useState } from "react"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;



const Gemini = () => {
  const [input, setInput] = useState("");
  const [responseData, setResponseData] = useState("");

  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });

    const result = await chatSession.sendMessage(input);
    console.log(result.response.text());
    setResponseData(result.response.text());
    setInput("");
  }


  return (
    <div>
      <h1>Gemini</h1>
      <textarea className="text-black" readOnly rows={20} value={responseData} />

      <div class="absolute justify-center inset-x-0 bottom-0 h-16 flex flex-row ">
        <textarea className="text-black w-1/4 h-10 p-2" value={input} rows={1} onChange={(e) => setInput(e.target.value)} />
        <button onClick={run}>Send Message</button>
      </div>
    </div>
  )
};

export default Gemini;

"use client"

import React, { useState } from "react"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import {  faArrowUp } from "@fortawesome/free-solid-svg-icons";



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
    console.log(responseData)
    setInput("");
  }

  const messages = [
    {content: "Hello"},
    {content: "Hi!"}
  ]

  return (
    <div>
      <div className="w-screen flex justify-center">
        <div className="left-0 right-0 w-2/4 ">
          <ul>
            {messages.map((msg, id) => (
              <li key={id} className="pb-2 px-5 text-lg">
                <p>
                  {msg.content}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <textarea className="text-black" readOnly rows={20} value={responseData} /> */}

      <div className="bottom-5 left-0 right-0 absolute flex justify-center ">
        <div className=" bg-[#2f2f2f] rounded-full text-white  items-center w-1/2  h-fit flex flex-row p-4">
          <textarea className=" w-full bg-[#2f2f2f] border-none outline-none resize-none text-white h-10 p-2 overflow-y-hidden" value={input} placeholder="Message Gemini" rows={1} onChange={(e) => setInput(e.target.value)} />
          <button className="w-10 rounded-full text-black bg-white h-10" onClick={run}><FontAwesomeIcon icon={faArrowUp} className="fas fa-arrow-up"></FontAwesomeIcon></button>
        </div>
      </div>

    </div>
  )
};

export default Gemini;

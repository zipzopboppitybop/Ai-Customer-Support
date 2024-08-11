"use client"

import React, { useState, useEffect } from "react"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import {  faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Gemini = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  let nextId = 0;

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
    setChatHistory([
      ...chatHistory,
      { content: input, tag: "user", id: nextId++ },
      { content: result.response.text(), tag: "bot", id: nextId++ }
    ]);
    setInput("");
  } 

  return (
    <div>
      <div className="w-screen flex justify-center h-screen ">
        <div className="left-0 right-0 w-2/4 h-3/4 overflow-x-hidden overflow-y-scroll">
          <ul>
            {chatHistory.map((msg) => (
              <li key={msg.id} className="pb-2 px-5 flex mb-3  text-lg">
                {msg.tag === "user" ? (
                  <>
                    <p className="text-right self-end bg-[#2f2f2f] justify-end ml-auto w-fit px-5 py-2 rounded-full">
                      {msg.content}
                    </p>
                  </>
                ) : (
                  <p className="text-left">
                    {msg.content}
                  </p>
                )}
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

"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Upload, Mic, MicOff } from "lucide-react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are a language model AI whose function is to give direct and accurate translations to a given prompt. Give extra context and information only if needed.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US"; // Adjust language as needed

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, voice input failed: " + event.error },
        ]);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(`${data.error}: ${data.details || "No additional details"}`);
      }

      const assistantMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error.message);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong: " + error.message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", "eng");

    try {
      const ocrResponse = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: { apikey: "K84595434988957" },
        body: formData,
      });

      const ocrData = await ocrResponse.json();
      if (ocrData.IsErroredOnProcessing) {
        throw new Error(ocrData.ErrorMessage);
      }

      const extractedText = ocrData.ParsedResults.map((r) => r.ParsedText).join("\n");
      const userMessage = { role: "user", content: extractedText };
      setMessages((prev) => [...prev, userMessage]);

      const groqResponse = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!groqResponse.ok) {
        throw new Error(`HTTP error! Status: ${groqResponse.status}`);
      }

      const groqData = await groqResponse.json();
      if (groqData.error) {
        throw new Error(`${groqData.error}: ${groqData.details || "No additional details"}`);
      }

      const assistantMessage = { role: "assistant", content: groqData.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error.message);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Failed to process the image or get a response: " + error.message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Voice input is not supported in this browser." },
      ]);
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  return (
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-[80vh]">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center">
            <MessageSquare size={24} className="mr-2" />
            <h3 className="text-lg font-semibold">Chat with FluentAI</h3>
          </div>
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages
              .filter((msg) => msg.role !== "system")
              .map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-lg shadow ${
                      msg.role === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {msg.role === "user" ? "You" : "AI"} •{" "}
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg shadow border border-gray-200 text-gray-500">
                  AI is thinking...
                </div>
              </div>
            )}
          </div>
          <div className="border-t bg-white p-4 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message or speak for a translation..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
            disabled={isLoading}
            />
            <button
              onClick={toggleRecording}
              className={`p-2 rounded-lg ${
                isRecording ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-600 text-white hover:bg-gray-700"
              } disabled:bg-gray-400`}
              disabled={isLoading}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={isLoading}
            >
              <MessageSquare size={20} />
            </button>
            <label className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer">
              <Upload size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isLoading}
              />
            </label>
          </div>
        </div>
  );
}
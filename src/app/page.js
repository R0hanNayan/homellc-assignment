"use client";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-[3rem] mt-[3rem]">' Mìí ', a Chatbot about Me!</h1>
      <Chatbot />
      <p className="text-2xl font-semibold mt-[3rem]">Ask me anything about Rohan!</p>
    </div>
  );
}

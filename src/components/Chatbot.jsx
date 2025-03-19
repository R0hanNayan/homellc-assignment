import { useState } from "react";
import { MicRounded, StopCircleRounded } from "@mui/icons-material";
import { motion } from "framer-motion";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    let recognition;

    const startListening = () => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        recognition = new window.webkitSpeechRecognition();
        recognition.continuous = isListening ? true : false;
        recognition.lang = "en-US";
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onerror = (event) => console.error("Speech Recognition Error:", event);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            handleSend(transcript);
        };

        recognition.start();
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
        }
        setIsListening(false);
    };

    const speakResponse = (text) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US";
            utterance.rate = 0.9;
            utterance.pitch = 1.5;
            utterance.volume = 1;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = (err) => console.error("Speech Synthesis Error:", err);

            window.speechSynthesis.speak(utterance);
        } else {
            alert("Speech Synthesis not supported in this browser.");
        }
    };

    const stopSpeaking = () => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const handleSend = async (message) => {
        if (!message.trim()) return;

        const newMessages = [...messages, { role: "user", content: message }];
        setMessages(newMessages);
        setIsTyping(true);

        try {
            const res = await fetch("/api/gpt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });

            const data = await res.json();
            const aiResponse = { role: "assistant", content: data.reply };

            setMessages([...newMessages, aiResponse]);

            speakResponse(data.reply);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {isTyping && (
                <motion.p
                    className="text-white font-semibold text-xl"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    Thinking<span>.</span><span>.</span><span>.</span>
                </motion.p>
            )}

            {/* Microphone Button & Stop Speaking Button with Enlarged Pulsating Effect */}
            {isSpeaking ? (
                <div className="mt-4 relative w-32 h-32 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 rounded-full bg-red-500 opacity-50"
                        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.button
                        onClick={stopSpeaking}
                        className="relative p-6 rounded-full bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-xl w-20 h-20 flex items-center justify-center"
                        animate={{ scale: 1.2 }}
                        transition={{ duration: 0.3, repeat: Infinity, repeatType: "mirror" }}
                    >
                        <StopCircleRounded fontSize="large" className="text-5xl" />
                    </motion.button>
                </div>
            ) : (
                <div className="mt-4 relative w-32 h-32 flex items-center justify-center">

                    {
                        isListening && (
                            <motion.div
                                className="absolute inset-0 rounded-full bg-blue-500 opacity-50"
                                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                            />
                        )
                    }
                    <motion.button
                        onClick={isListening ? stopListening : startListening}
                        className="relative p-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl w-20 h-20 flex items-center justify-center"
                        animate={isListening ? { scale: 1.2 } : {}}
                        transition={{ duration: 0.3, repeat: isListening ? Infinity : 0, repeatType: "mirror" }}
                    >
                        <MicRounded fontSize="large" className="text-5xl" />
                    </motion.button>
                </div>
            )}
        </motion.div>
    );
};

export default Chatbot;

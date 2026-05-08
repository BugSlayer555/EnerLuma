import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Sparkles, Send, X, MessageCircle, ChevronUp } from "lucide-react";
import { assistantSuggestions, getSmartLocalReply } from "../../utils/chatKnowledge";

const QUICK_PROMPTS = assistantSuggestions;

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  text: "Hi, I’m EnerLuma AI. Ask me anything about the website, pages, dashboard, or how the platform works.",
};

function makeMessage(role, text) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    text,
  };
}

function getApiCandidates(configuredBase) {
  const primary = "/api/ai/chat";
  const base = String(configuredBase || "").trim().replace(/\/$/, "");

  if (!base) {
    return [primary];
  }

  const normalized = base.toLowerCase();
  const fallback = normalized.endsWith("/api")
    ? `${base}/ai/chat`
    : `${base}/api/ai/chat`;

  return fallback === primary ? [primary] : [primary, fallback];
}

function TypingDots() {
  return (
    <div className="el-chat-typing" aria-label="Assistant is typing">
      <span />
      <span />
      <span />
    </div>
  );
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const apiUrls = useMemo(() => {
    return getApiCandidates(import.meta.env.VITE_API_URL);
  }, []);

  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open, loading]);

  const sendMessage = async (messageText) => {
    const message = String(messageText || "").trim();
    if (!message || loading) return;

    const userMessage = makeMessage("user", message);
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      let data = null;

      for (const url of apiUrls) {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
          });

          if (!response.ok) {
            continue;
          }

          data = await response.json();
          break;
        } catch {
          // Keep trying the next candidate URL.
        }
      }

      if (!data) {
        throw new Error("Unable to reach the assistant");
      }

      setMessages((current) => [
        ...current,
        makeMessage("assistant", data.reply || "I can help with EnerLuma questions."),
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        makeMessage("assistant", getSmartLocalReply(message)),
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="el-chat-shell" aria-live="polite">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="el-chat-panel"
          >
            <header className="el-chat-header">
              <div className="el-chat-title-wrap">
                <div className="el-chat-avatar">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="el-chat-title">EnerLuma AI</div>
                  <div className="el-chat-subtitle">
                    <span className="el-chat-online" />
                    Online now
                  </div>
                </div>
              </div>

              <button className="el-chat-icon-btn" onClick={() => setOpen(false)} aria-label="Close chat">
                <X size={16} />
              </button>
            </header>

            <div className="el-chat-body">
              <div className="el-chat-badge">
                <Sparkles size={13} />
                Ask about the website, dashboard, or features
              </div>

              <div className="el-chat-messages">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`el-chat-msg ${message.role === "user" ? "is-user" : "is-assistant"}`}
                  >
                    <div className="el-chat-msg-label">
                      {message.role === "user" ? "You" : "EnerLuma AI"}
                    </div>
                    <div className="el-chat-msg-text">{message.text}</div>
                  </motion.div>
                ))}

                {loading && (
                  <div className="el-chat-msg is-assistant">
                    <div className="el-chat-msg-label">EnerLuma AI</div>
                    <TypingDots />
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <div className="el-chat-quick">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="el-chat-chip"
                    onClick={() => sendMessage(prompt)}
                    disabled={loading}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="el-chat-composer"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about EnerLuma..."
                aria-label="Ask EnerLuma AI"
                className="el-chat-input"
              />
              <button type="submit" className="el-chat-send" disabled={loading || !input.trim()}>
                <Send size={16} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="el-chat-launcher"
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        aria-label={open ? "Close EnerLuma AI" : "Open EnerLuma AI"}
      >
        <span className="el-chat-launcher-glow" />
        <span className="el-chat-launcher-icon">
          {open ? <ChevronUp size={18} /> : <MessageCircle size={18} />}
        </span>
        <span className="el-chat-launcher-copy">
          <strong>EnerLuma AI</strong>
          <span>Ask the website</span>
        </span>
      </motion.button>
    </div>
  );
}
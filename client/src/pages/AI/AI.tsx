import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { chatWithAI } from "../../api/aiApi";
import ReactMarkdown from "react-markdown";
import "./AI.css";

/* =========================================================
   TYPES
   ========================================================= */

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

/* =========================================================
   COMPONENT
   ========================================================= */

const AI = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Halo, saya ABN AI. Saya siap membantu menganalisis data dan informasi bisnis ABN.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  /* =======================================================
     AUTO SCROLL
     ======================================================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* =======================================================
     SEND MESSAGE
     ======================================================= */

  const handleSend = async () => {
    const message = input.trim();

    if (!message || loading) {
      return;
    }

    setError("");

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await chatWithAI(message);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.data?.message || "ABN AI tidak memberikan jawaban.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("ABN AI ERROR:", err);

      setError(
        err instanceof Error ? err.message : "ABN AI sedang tidak tersedia.",
      );
    } finally {
      setLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  };

  /* =======================================================
     KEYBOARD
     ======================================================= */

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  };

  /* =======================================================
     CLEAR CHAT
     ======================================================= */

  const handleClear = () => {
    if (loading) {
      return;
    }

    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content:
          "Chat telah dibersihkan. Silakan tanyakan sesuatu tentang ABN.",
      },
    ]);

    setInput("");
    setError("");
  };

  /* =======================================================
     GO HOME
     ======================================================= */

  const handleHome = () => {
    if (loading) {
      return;
    }

    navigate("/home");
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className="abn-ai-page">
      <section className="abn-ai-container">
        {/* =================================================
            HEADER
            ================================================= */}

        <header className="abn-ai-header">
          <div className="abn-ai-header-content">
            <div className="abn-ai-icon">AI</div>

            <div>
              <h1>ABN AI</h1>
              <p>Business Intelligence Assistant</p>
            </div>
          </div>

          <div className="abn-ai-header-actions">
            <button
              type="button"
              className="abn-ai-home"
              onClick={handleHome}
              disabled={loading}
            >
              Home
            </button>

            <button
              type="button"
              className="abn-ai-clear"
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </header>

        {/* =================================================
            CHAT
            ================================================= */}

        <div className="abn-ai-chat">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`abn-ai-message-row ${
                message.role === "user" ? "user" : "assistant"
              }`}
            >
              <div
                className={`abn-ai-message ${
                  message.role === "user" ? "user" : "assistant"
                }`}
              >
                <div className="abn-ai-message-label">
                  {message.role === "user" ? "You" : "ABN AI"}
                </div>

                <div className="abn-ai-message-content">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="abn-ai-message-row assistant">
              <div className="abn-ai-message assistant">
                <div className="abn-ai-message-label">ABN AI</div>

                <div className="abn-ai-thinking">
                  <span />
                  <span />
                  <span />
                  <em>Thinking...</em>
                </div>
              </div>
            </div>
          )}

          {error && <div className="abn-ai-error">{error}</div>}

          <div ref={messagesEndRef} />
        </div>

        {/* =================================================
            INPUT
            ================================================= */}

        <div className="abn-ai-input-area">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanyakan sesuatu tentang ABN..."
            rows={1}
            disabled={loading}
          />

          <button
            type="button"
            className="abn-ai-send"
            onClick={() => void handleSend()}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            {loading ? "..." : "➤"}
          </button>
        </div>

        <div className="abn-ai-hint">
          Enter untuk mengirim · Shift + Enter untuk baris baru
        </div>
      </section>
    </main>
  );
};

export default AI;

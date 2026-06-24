"use client";

import { useChat } from "@ai-sdk/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat();

  return (
    <main
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "48px 20px 120px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minHeight: "100vh",
      }}
    >
      <header>
        <h1 style={{ margin: 0, fontSize: 22 }}>acm-asteria</h1>
        <p style={{ opacity: 0.6, fontSize: 13 }}>
          Unified AI chat — Gemini / Ollama. Set AI_PROVIDER in .env.local.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              padding: "10px 14px",
              borderRadius: 12,
              background: m.role === "user" ? "var(--accent)" : "var(--panel)",
              border: "1px solid var(--border)",
              whiteSpace: "pre-wrap",
            }}
          >
            {m.content}
          </div>
        ))}
        {status === "submitted" && <div style={{ opacity: 0.5 }}>…</div>}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          background: "linear-gradient(transparent, var(--background) 40%)",
        }}
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something…"
          style={{
            display: "block",
            width: "100%",
            maxWidth: 640,
            margin: "0 auto",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--panel)",
            color: "var(--foreground)",
            fontSize: 14,
          }}
        />
      </form>
    </main>
  );
}

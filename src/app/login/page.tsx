import { signIn, signUp } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <main
      style={{
        maxWidth: 360,
        margin: "0 auto",
        padding: "80px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <h1 style={{ fontSize: 20, margin: 0 }}>Sign in</h1>

      {error && <p style={{ color: "#f87171", fontSize: 13 }}>{error}</p>}
      {message && <p style={{ color: "#4ade80", fontSize: 13 }}>{message}</p>}

      <form style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input name="email" type="email" placeholder="Email" required style={inputStyle} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          style={inputStyle}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button formAction={signIn} style={primaryBtn}>
            Sign in
          </button>
          <button formAction={signUp} style={ghostBtn}>
            Sign up
          </button>
        </div>
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--panel)",
  color: "var(--foreground)",
  fontSize: 14,
};

const primaryBtn: React.CSSProperties = {
  flex: 1,
  padding: "10px",
  borderRadius: 8,
  border: "none",
  background: "var(--accent)",
  color: "#fff",
  cursor: "pointer",
};

const ghostBtn: React.CSSProperties = {
  flex: 1,
  padding: "10px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--foreground)",
  cursor: "pointer",
};

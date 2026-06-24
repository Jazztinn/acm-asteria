import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "64px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        minHeight: "100vh",
      }}
    >
      <header>
        <h1 style={{ margin: 0, fontSize: 28 }}>acm-asteria</h1>
        <p style={{ opacity: 0.6, fontSize: 14 }}>
          Team Hague — FEU Tech, Journey to Asteria Techsprint.
        </p>
      </header>

      <nav style={{ display: "flex", gap: 12 }}>
        <Link
          href="/login"
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--panel)",
            color: "var(--foreground)",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          Sign In
        </Link>
        <Link
          href="/profile"
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--panel)",
            color: "var(--foreground)",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          Profile
        </Link>
      </nav>
    </main>
  );
}

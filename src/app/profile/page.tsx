import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "../login/actions";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 20 }}>Profile</h1>
      <pre
        style={{
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: 16,
          fontSize: 12,
          overflowX: "auto",
        }}
      >
        {JSON.stringify({ email: user.email, profile }, null, 2)}
      </pre>
      <form action={signOut}>
        <button
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--foreground)",
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </form>
    </main>
  );
}

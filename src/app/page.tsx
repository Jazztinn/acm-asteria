import { redirect } from "next/navigation";

// No landing for now — send the root straight to sign-in.
export default function Home() {
  redirect("/login");
}

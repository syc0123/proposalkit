import { redirect } from "next/navigation";

// Dashboard merged into home page — redirect legacy URL
export default function DashboardPage() {
  redirect("/");
}

// Admin bypass: comma-separated emails in ADMIN_EMAILS env var
// e.g. ADMIN_EMAILS=yechul.shin@gmail.com,other@example.com

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const raw = process.env.ADMIN_EMAILS ?? "";
  if (!raw) return false;
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .includes(email.toLowerCase());
}

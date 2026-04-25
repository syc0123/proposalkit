import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-base font-bold text-gray-900 hover:text-blue-600">
          ProposalKit
        </Link>
        <nav className="flex items-center gap-5 text-sm text-gray-600">
          <Link href="/#how-it-works" className="hover:text-gray-900">How it works</Link>
          <Link href="/about" className="hover:text-gray-900">About</Link>
          <Link href="/" className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
            Try free
          </Link>
        </nav>
      </div>
    </header>
  );
}

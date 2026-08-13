import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-screen flex-col items-center justify-center text-center">
      <p className="font-display text-6xl font-semibold text-gradient">404</p>
      <h1 className="mt-4 text-xl font-medium text-white">
        This page could not be found.
      </h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white"
      >
        Back to home
      </Link>
    </main>
  );
}

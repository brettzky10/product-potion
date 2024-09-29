import Link from "next/link";

export default async function Footer() {
  return (
    <footer className="hidden md:flex fixed bottom-0 right-0 items-center w-full md:px-12 p-4 justify-end gap-4 text-xs">
      <Link
        href={"/legal"}
        target="_blank"
        className="opacity-50 hover:opacity-100"
      >
        Terms
      </Link>
      <Link
        href={"/legal"}
        target="_blank"
        className="opacity-50 hover:opacity-100"
      >
        Privacy
      </Link>
    </footer>
  );
}
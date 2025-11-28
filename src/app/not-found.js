import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center   px-4">
      <div className="backdrop-blur-xl  rounded-2xl px-10 py-8 flex flex-col items-center shadow-xl">
        <h1 className="text-7xl font-extrabold drop-shadow-md">404</h1>
        <p className="text-lg mt-2 opacity-90">Oops! The page you’re looking for doesn't exist.</p>

        <Link
          href="/"
          className="mt-6 px-6 py-3  rounded-lg transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

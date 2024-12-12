
import Link from "next/link"

export default function CreativeSection() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-gradient-to-br from-[#9333ea] to-[#e879f9] p-4 rounded-xl">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Unleash Your Creativity</h1>
        <p className="max-w-md text-gray-200 md:text-lg text-start">
          Discover a world of endless possibilities with our powerful creative tools. Bring your ideas to life and share
          them with the world.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-[#9333ea] shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#9333ea]"
            href="#"
          >
            Get Started
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-[#9333ea] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#9333ea]"
            href="#"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
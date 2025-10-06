import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4">Ridemio</h1>
      <p className="text-xl text-gray-700 mb-8 text-center max-w-xl">
        Seamless, smart, and sustainable ride sharing for everyone. Connect with drivers and riders in your city and make every journey easier, greener, and more affordable.
      </p>
        <div className="space-x-4">
            <Link href="/">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">Get Started</button>
            </Link>
            <Link href="/about">
                <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition">Learn More</button>
            </Link>
        </div>
      <Link href="/dashboard" className="mt-10 text-sm text-blue-600 hover:underline">
        Go to Dashboard
            </Link>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Welcome to Ridemio Dashboard</h2>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-lg">
                Manage your rides, view your history, and connect with other users all in one place. Your journey starts here!
            </p>
            <div className="space-x-4">
                <Link href="/dashboard/rides">
                    <button className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">My Rides</button>
                </Link>
                <Link href="/dashboard/profile">
                    <button className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition">Profile</button>
                </Link>
            </div>
        </div>
    </main>
  );
}
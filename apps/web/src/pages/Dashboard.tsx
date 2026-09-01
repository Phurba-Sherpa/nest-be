interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  expiresAt: Date;
}

interface DashboardProps {
  session: Session;
}

export default function Dashboard({ session }: DashboardProps) {
  const handleSignOut = async () => {
    await fetch("http://localhost:3001/api/auth/sign-out", {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  Turbo App
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Welcome to your dashboard! You are successfully authenticated.
          </p>
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Signed in as: <strong>{session.user.email}</strong>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

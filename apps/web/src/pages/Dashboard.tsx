import { useEffect, useState } from "react";
import auth from "../lib/auth";
import { Users, type User } from "../components/Users";

interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
  };
}

interface DashboardProps {
  session: any;
}

export default function Dashboard({ session: data }: DashboardProps) {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const _fetchUsers = async () => {
      const { data: responseData, error } = await auth.admin.listUsers({
        query: {
          limit: 10,
        },
      });
      console.log("error", error);
      console.log("data", responseData);

      if (responseData?.users) {
        setUsers(responseData.users);
      }
    };
    _fetchUsers();
  }, []);

  const signOut = async () => {
    await auth.signOut();
  };
  return (
    <div className="max-w-6xl mx-auto py-20">
      <div className="flex justify-between items-center border-b border-b-gray-300 py-4">
        <div>
          <h2>{data?.user?.name}</h2>
          <p>{data?.user?.role}</p>
        </div>
        <button
          onClick={signOut}
          className="bg-indigo-600 text-white py-2 px-6 rounded-md"
        >
          Log out
        </button>
      </div>

      <div className="mt-8">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold leading-6 text-gray-900">
            Users
          </h3>
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-md">
            + user
          </button>
        </div>
        <Users users={users} />
      </div>
    </div>
  );
}

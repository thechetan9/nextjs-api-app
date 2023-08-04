import Link from "next/link";
import "tailwindcss/tailwind.css";

const LandingPage = () => {
  const apiEndpoints = [
    { name: "Core", path: "/core" },
    { name: "Applications", path: "/applications" },
    { name: "Resources", path: "/resources" },
  ];

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-semibold mb-10 text-gray-800">
        Welcome to Cost Data Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {apiEndpoints.map((endpoint) => (
          <Link key={endpoint.path} href={endpoint.path}>
            <div className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              {endpoint.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

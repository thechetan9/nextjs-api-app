// pages/index.tsx
import Link from "next/link";

const LandingPage = () => {
  const apiEndpoints = [
    { name: "Core", path: "/core" },
    { name: "Cloud Costing API", path: "/cloud-costing" },
    { name: "Applications", path: "/applications" },
    { name: "Resources", path: "/resources" },
  ];

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-semibold mb-4">Cost Data Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {apiEndpoints.map((endpoint) => (
          <Link key={endpoint.path} href={endpoint.path}>
            <div className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-md cursor-pointer">
              {endpoint.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

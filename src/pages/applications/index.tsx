import React, { useEffect, useState } from "react";

import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { API_ENDPOINTS } from "../../apiConfig"; // Make sure the path is correct

const ApplicationsListPage = () => {
  const [applicationNames, setApplicationNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(10); // Number of applications per page

  useEffect(() => {
    // Fetch data from the API
    fetch(API_ENDPOINTS.applications)
      .then((response) => response.json())
      .then((data) => {
        setApplicationNames(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when searching
  }, [searchTerm]);

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applicationNames.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mt-8 mb-10">
      <h1 className="text-xl font-bold mb-4 text-center">All Applications</h1>

      <div className="flex mb-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search applications..."
          className="border border-gray-300 rounded-md py-1 px-2 w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          href="/"
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          Home
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <FaSpinner className="animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        <>
          <table className="border-collapse border w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Applications</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {currentApplications.map((appName, index) => (
                <tr
                  key={appName}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="px-4 py-2">{appName}</td>
                  <td className="px-4 py-2">
                    <Link href={`/applications/${appName}`}>
                      <button className="text-blue-500 hover:underline">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <ul className="flex list-reset border border-grey-light rounded">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className="block hover:text-white hover:bg-blue-500 border-r border-grey-light px-3 py-2"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({
                length: Math.ceil(
                  applicationNames.length / applicationsPerPage
                ),
              }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`block hover:text-white hover:bg-blue-500 border-r border-grey-light px-3 py-2 ${
                      currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className="block hover:text-white hover:bg-blue-500 border-r border-grey-light px-3 py-2"
                  disabled={
                    currentPage ===
                    Math.ceil(applicationNames.length / applicationsPerPage)
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationsListPage;

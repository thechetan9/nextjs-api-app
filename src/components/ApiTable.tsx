import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";

const ApiTable = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(""); // Step 2: Search term state

  useEffect(() => {
    setIsLoading(true);
    // Fetch data from the API based on the provided endpoint
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [endpoint]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter data based on search term

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mt-8 mb-10">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md py-1 px-2 w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Step 2: Handle search input
        />
      </div>

      {/* Your table rendering code here */}
      {/* Use 'currentItems' to render table rows */}

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <ul className="flex list-reset border border-grey-light rounded">
          {/* Pagination buttons */}
        </ul>
      </div>
    </div>
  );
};

export default ApiTable;

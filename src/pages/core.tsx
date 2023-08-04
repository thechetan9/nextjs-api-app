import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy, // Add useSortBy here
  usePagination,
} from "react-table";

import { API_ENDPOINTS } from "@src/apiConfig"; // Using the path mapping

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Search:{" "}
      <input
        className="px-2 py-1 border rounded"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

const CorePage = () => {
  const [coreData, setCoreData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(API_ENDPOINTS.core)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setCoreData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "Date",
        sortType: "basic",
      },
      {
        Header: "Consumed Quantity",
        accessor: "ConsumedQuantity",
        sortType: "basic",
      },
      {
        Header: "Cost",
        accessor: "Cost",
        sortType: "basic",
      },
      {
        Header: "Instance ID",
        accessor: "InstanceId",
        sortType: "basic",
      },
      {
        Header: "Meter Category",
        accessor: "MeterCategory",
        sortType: "basic",
      },
      {
        Header: "Resource Group",
        accessor: "ResourceGroup",
        sortType: "basic",
      },
      {
        Header: "Resource Location",
        accessor: "ResourceLocation",
        sortType: "basic",
      },
      {
        Header: "Tags",
        accessor: "Tags",
        sortType: "basic",
        Cell: ({ cell }) => {
          const tags = cell.value;
          return (
            <div>
              {Object.keys(tags).map((key) => (
                <div key={key}>
                  <strong>{key}:</strong> {tags[key]}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        Header: "Unit of Measure",
        accessor: "UnitOfMeasure",
        sortType: "basic",
      },
      {
        Header: "Location",
        accessor: "Location",
        sortType: "basic",
      },
      {
        Header: "Service Name",
        accessor: "ServiceName",
        sortType: "basic",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // paginated data to render
    nextPage, // function to navigate to next page
    previousPage, // function to navigate to previous page
    canNextPage, // check if next page is available
    canPreviousPage, // check if previous page is available
    state, // state of the table
    setGlobalFilter,
    pageCount,
  } = useTable(
    {
      columns,
      data: coreData,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy, // Add useSortBy here
    usePagination
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-4">Core Endpoint Data</h1>

      <div className="mb-4">
        <Link
          href="/"
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          Back to Landing Page
        </Link>
      </div>

      {/* Global filter input */}
      <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />

      {/* Table */}
      <table {...getTableProps()} className="border-collapse border w-full">
        <thead className="bg-gray-200">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 cursor-pointer"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="bg-white">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="px-4 py-2">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`px-4 py-2 rounded ${
            !canPreviousPage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          }`}
        >
          Previous
        </button>
        <span className="text-lg">
          Page{" "}
          <strong>
            {state.pageIndex + 1} of {pageCount}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`px-4 py-2 rounded ${
            !canNextPage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CorePage;

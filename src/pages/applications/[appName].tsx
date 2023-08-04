import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import { API_ENDPOINTS } from "../../apiConfig"; // Adjust the path if needed
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  TableInstance,
  Cell,
  usePagination,
} from "react-table";
import Link from "next/link";

const GlobalFilter = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: Function;
}) => {
  return (
    <div className="flex justify-end mb-4">
      <span className="mr-2">Search:</span>
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded-md px-2 py-1"
      />
    </div>
  );
};

const ApplicationSinglePage = () => {
  const router = useRouter();
  const { appName } = router.query;

  const [applicationData, setApplicationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Fetch data from the API
    fetch(`${API_ENDPOINTS.applications}/${appName}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setApplicationData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
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
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    setGlobalFilter,
    pageCount,
  }: TableInstance<object> = useTable(
    {
      columns,
      data: applicationData,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="container mx-auto mt-8 mb-10">
      <h1 className="text-xl font-bold mb-0 flex items-center justify-center">
        {appName}
      </h1>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center">
          <FaSpinner className="animate-spin mr-2" />
          Loading...
        </div>
      )}

      <div className="flex mb-px">
        <Link
          href="/"
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          Home
        </Link>
      </div>

      {/* Global filter input */}
      <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />

      {/* Table */}
      <table {...getTableProps()} className="border-collapse border w-full">
        <thead className="bg-blue-200">
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
              <tr {...row.getRowProps()} className="hover:bg-gray-200">
                {row.cells.map((cell: Cell) => {
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

export default ApplicationSinglePage;

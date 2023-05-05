import React, {
  useState,
  useMemo,
  useContext,
  useEffect,
  Suspense,
} from "react";
import { AppContext } from "../contexts/app";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

function DataTable() {
  const [state, dispatch] = useContext(AppContext);

  const year = state.year;
  const columns = useMemo(
    () => [
      {
        Header: "Asset Name",
        accessor: "Asset Name",
      },
      {
        Header: "Lat",
        accessor: "Lat",
      },
      {
        Header: "Long",
        accessor: "Long",
      },
      {
        Header: "Business Category",
        accessor: "Business Category",
      },
      {
        Header: "Risk Rating",
        accessor: "Risk Rating",
      },
      {
        Header: "Risk Factors",
        accessor: "Risk Factors",
      },
      {
        Header: "Year",
        accessor: "Year",
      },
    ],
    []
  );

  const data = useMemo(
    () => state.locations.filter((data) => data.Year === year),
    []
  );

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    setPageSize,
  } = tableInstance;

  return (
    <section className="section">
      <h2 className="title">Table</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={` bg-sky-200 rounded-sm hover:underline
                    ${
                      column.isSorted
                        ? column.isSortedDesc
                          ? "desc"
                          : "asc"
                        : ""
                    }
                   `}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              const even = (number) => (number % 2 == 0 ? "bg-slate-200" : "");
              return (
                <tr {...row.getRowProps()} className={`${even(i)}`}>
                  {row.cells.map((cell, index) => {
                    // if(index !== 5)
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                    //   else return <div></div>
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Suspense>
      <div className="flex justify-center items-center my-8 flex-row gap-4">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </strong>
        </span>
        <button
          className="btn btn-sm"
          onClick={() => tableInstance.previousPage()}
          disabled={pageIndex === 0}
        >
          <ArrowLongLeftIcon className="h-4 w-4" />
        </button>
        <button
          className="btn btn-sm"
          onClick={() => tableInstance.nextPage()}
          disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
        >
          <ArrowLongRightIcon className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

export default DataTable;

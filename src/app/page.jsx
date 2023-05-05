"use client";

import React from "react";
import DisplayMap from "./components/DisplayMap";
import DataTable from "./components/DataTable";
import LineChart from "./components/LineChart";

const Home = () => {
  return (
    <main className="flex flex-col gap-4">
      <DisplayMap />

      <DataTable />

      <LineChart />
    </main>
  );
};

export default Home;

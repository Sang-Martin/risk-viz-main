// 'use client'

import React from "react";
import DisplayMap from "./components/DisplayMap";
import DataTable from "./components/DataTable";
import LineChart from "./components/LineChart";

// import { AppContext } from "./contexts/app";
// import { useContext } from "react";

const Home = () => {
  // const [state, dispatch] = useContext(AppContext)
  return (
    <main className="flex flex-col gap-4">
      <DisplayMap />

      <DataTable  />

      <LineChart />
    </main>
  );
};

export default Home;

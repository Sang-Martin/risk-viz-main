'use client'
// import { useContext } from "react";
// import { AppContext } from "../contexts/app";

const ControlPanel = ({year, onChange}) => {
  // const [state, dispatch] = useContext(AppContext);
  return (
    <div>
      {/* <h3>Interactive GeoJson</h3> */}
      <div className="flex flex-col">
        <label htmlFor="year">Year: {year}</label>
        <input
          type="range"
          value={year}
          min={2030}
          max={2070}
          step={10}
          // onChange={(e) => dispatch({type: "CHANGE_YEAR", payload: e.target.value})}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ControlPanel;

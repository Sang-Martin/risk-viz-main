import { useContext } from "react";
import { AppContext } from "../contexts/app";

const ControlPanel = () => {
  const [state, dispatch] = useContext(AppContext);
  return (
    <div>
      {/* <h3>Interactive GeoJson</h3> */}
      <div key={state.year} className="flex flex-col">
        <label htmlFor="year">Year: {state.year}</label>
        <input
          type="range"
          value={state.year}
          min={2030}
          max={2070}
          step={10}
          onChange={(e) => dispatch({type: "CHANGE_YEAR", payload: e.target.value})}
        />
      </div>
    </div>
  );
};

export default ControlPanel;

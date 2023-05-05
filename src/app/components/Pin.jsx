
import { MapPinIcon } from "@heroicons/react/24/solid";

import { Marker } from "react-map-gl";

// import {useContext} from 'react'
// import { AppContext } from "../contexts/app";

const Pin = ({ pin, index, handleOnMouseOver, handleOnMouseLeave }) => {
  // const [state, dispatch] = useContext(AppContext)
  const lat = pin['Lat']
  const long = pin["Long"];
  const risk = pin["Risk Rating"];

  const riskRating = (rating) => {
    if (rating <= 0.2) return "fill-lime-500";
    if (rating <= 0.4) return "fill-lime-300";
    if (rating <= 0.6) return "fill-orange-300";
    if (rating <= 0.8) return "fill-orange-500";
    if (rating >= 1) return "fill-orange-700";
  };

  return (
    <Marker
      key={`marker-${index}`}
      longitude={long}
      latitude={lat}
      anchor="bottom"
    >
      <button
        // onMouseOver={(pin) => handleOnMouseOver(pin)}
        // onMouseLeave={() => handleOnMouseLeave()}
        onMouseOver={() => handleOnMouseOver(pin)}
        onMouseLeave={() => handleOnMouseLeave()}
      >
        <MapPinIcon
          className={`h-6 w-6 ${riskRating(risk)} hover:cursor-pointer`}
        />
      </button>
    </Marker>
  );
};

export default Pin;


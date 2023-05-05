'use client'
import { useState, useMemo, useEffect, useContext } from "react";
import { AppContext } from "../contexts/app";

import Map, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import ControlPanel from "./ControlPanel";

import Pin from "./Pin";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const DisplayMap = () => {
  const [state, dispatch] = useContext(AppContext);
  const [popupInfo, setPopupInfo] = useState(null);

  // const [year, setYear] = useState(state.year);
  const data = state.locations
  const filterData = data.filter(d => d.Year == 2070)
  // const [allData, setAllData] = useState(state.locations);
  const [allData, setAllData] = useState(filterData);

  const viewport = {
    longitude: -60.1831,
    latitude: 46.1351,
    zoom: 8,
  };


  // const onChange = (year) => {
  //   setYear(year);
  //   const filterData = allData.filter((data) => data.Year === year);
  //   setAllData(filterData);
  // };

  const pins = useMemo(
    () => (
      <>
        {allData.map((pin, index) => {
          return (
            <Pin
              pin={pin}
              index={index}
              handleOnMouseOver={() => setPopupInfo(pin)}
              handleOnMouseLeave={() => setPopupInfo(null)}
            />
          );
        })}
      </>
    ),
    []
  );

  const showMap = useMemo(() => (
    <>
    <Map
          mapboxAccessToken={TOKEN}
          initialViewState={viewport}
          style={{ width: "80vw", height: "50vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-right" />
          <NavigationControl position="top-right" />
          <ScaleControl />

          {pins}

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo["Long"])}
              latitude={Number(popupInfo["Lat"])}
              onClose={() => setPopupInfo(null)}
            >
              <p className="text-md font-bold">
                {popupInfo["Asset Name"]} || {popupInfo["Business Category"]} || {popupInfo["Risk Rating"]} || {popupInfo["Year"]}
              </p>
            </Popup>
          )}
        </Map>
    </>
  ))


  useEffect(() => {
    const filteredData = allData.filter((data) => data.Year === state.year);
    setAllData(filteredData);

    

  }, [state.year]);

  return (
    <section className="section">
      <h2 className=" title">Map </h2>
      <div>
        {showMap}
        <ControlPanel   />
      </div>
      <p>{state.year}</p>
    </section>
  );
};

export default DisplayMap;

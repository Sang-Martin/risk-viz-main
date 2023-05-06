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

  const [year, setYear] = useState(state.year);
  const [allData, setAllData] = useState([]);

  const viewport = {
    longitude: -60.1831,
    latitude: 46.1351,
    zoom: 8,
  };


  const pins = useMemo(
    () => (
      <>
        {allData.map((pin, index) => {
          return (
            <Pin key={index}
              pin={pin}
              index={index}
              handleOnMouseOver={() => setPopupInfo(pin)}
              handleOnMouseLeave={() => setPopupInfo(null)}
            />
          );
        })}
      </>
    ),
    [allData]
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
  ), [allData])


  useEffect(() => {
    const getData = async(y) => {
      const res = await fetch(`/api/echo?year=${y}`)
      const data = await res.json()
      return data
    }

  getData(year).then((data) => {
    setAllData(data)
  })
  dispatch({type: "CHANGE_YEAR", payload: year})
  }, [year]);

  const onChange = (year) => {
    setYear(year);
    const filterData = allData.filter((data) => data.Year === year);
    setAllData(filterData);
  
  };

  return (
    <section className="section">
      <h2 className=" title">Map </h2>
      <div>
        {showMap}
        <ControlPanel year={year} onChange={(e) => onChange(e) }  />
      </div>
      <p>{year}</p>
    </section>
  );
};

export default DisplayMap;

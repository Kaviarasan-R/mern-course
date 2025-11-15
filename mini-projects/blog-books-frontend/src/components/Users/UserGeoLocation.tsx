import React from "react";
import Map, {Marker} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Props } from "../../types/types";

const UserGeoLocation: React.FC<Props> = ({ userLongitude, userLatitude }) => {
  const longitude = 76.93275456824303 //userLongitude || 76.93275456824303;
  const latitude = 11.02878910296039 //userLatitude || 11.02878910296039;
  console.log("UserGeoLocation props:", { userLongitude, userLatitude });

  return (
    <div>
      <Map
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 14,
        }}
        style={{ width: 600, height: 450 }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=5EOLB4Fbz0492dmM4UPS"
      >
        <Marker longitude={longitude} latitude={latitude} anchor="bottom" />
      </Map>
    </div>
  );
}

export default UserGeoLocation;
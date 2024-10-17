// MyLocation.jsx
import React from "react";
import { Marker, Circle } from "react-leaflet";
import L from "leaflet";
import homeIcon from "../assets/home.png"; // Ensure this path is correct

const MyLocation = ({ myLocation }) => {
  const customHomeIcon = new L.Icon({
    iconUrl: homeIcon,
    iconSize: [32, 32], // Size of the icon
  });

  return (
    <>
      {myLocation.lat && myLocation.lng && (
        <>
          <Marker
            position={[myLocation.lat, myLocation.lng]}
            icon={customHomeIcon}
          >
            <Popup>My Current Position</Popup>
          </Marker>
          <Circle
            center={[myLocation.lat, myLocation.lng]}
            radius={500} // Example radius in meters
            pathOptions={{
              color: "#87CEEB", // Light blue color for the outline
              fillColor: "#87CEEB", // Light blue fill color
              fillOpacity: 0.3, // Semi-transparent light blue
            }}
          />
        </>
      )}
    </>
  );
};

export default MyLocation;

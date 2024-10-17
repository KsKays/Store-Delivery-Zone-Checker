// Stores.jsx
import React from "react";
import { Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import storeIcon from "../assets/grocery-store.png"; // Ensure this path is correct

const Stores = ({ stores, selectedStore, setSelectedStore }) => {
  // Custom icon for the Store marker
  const customStoreIcon = new L.Icon({
    iconUrl: storeIcon,
    iconSize: [32, 32], // Size of the icon
  });

  return (
    <>
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.lat, store.lng]}
          icon={customStoreIcon} // Use custom store icon here
          eventHandlers={{
            click: () => {
              setSelectedStore(store); // Set selected store on click
            },
          }}
        >
          <Popup>
            <b>{store.name}</b>
            <p>{store.address}</p>
            <a href={store.direction} target="_blank" rel="noopener noreferrer">
              Get Direction
            </a>
          </Popup>

          {/** Draw delivery area circle when store is selected */}
          {selectedStore && selectedStore.id === store.id && (
            <Circle
              center={[store.lat, store.lng]}
              radius={selectedStore.radius}
              pathOptions={{
                color: "green",
                fillColor: "green",
                fillOpacity: 0.3, // Semi-transparent green
              }}
            />
          )}
        </Marker>
      ))}
    </>
  );
};

export default Stores;

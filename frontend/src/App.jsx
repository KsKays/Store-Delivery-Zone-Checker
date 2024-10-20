import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import "./App.css";
import homeIcon from "./assets/home.png"; // Ensure this path is correct
import storeIcon from "./assets/grocery-store.png"; // Ensure this path and the file extension are correct
import Swal from "sweetalert2";

// Define base URL for API
const base_url = import.meta.env.VITE_API_BASE_URL;

function App() {
  const center = [13.83860399048006, 100.02528022088828]; // SE NPRU
  const [stores, setStores] = useState([]);
  const [myLocation, setMylocation] = useState({ lat: "", lng: "" });
  const [selectedStore, setSelectedStore] = useState(null); // State to track selected store

  // Custom icons for default and selected markers
  const defaultIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41], // Default size
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const selectedIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png",
    iconSize: [25, 41], // Same size, different color (red)
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  // Function to calculate distance between 2 points using Haversine Formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // Earth radius in meters
    const phi_1 = (lat1 * Math.PI) / 180;
    const phi_2 = (lat2 * Math.PI) / 180;

    const delta_phi = ((lat1 - lat2) * Math.PI) / 180;
    const delta_lambda = ((lng1 - lng2) * Math.PI) / 180;

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi_1) *
        Math.cos(phi_2) *
        Math.sin(delta_lambda / 2) *
        Math.sin(delta_lambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${base_url}/api/stores`);
        if (response.status === 200) {
          setStores(response.data);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  const LocationMap = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMylocation({ lat, lng });
      },
    });
  };

  // Custom icon for the home marker
  const customHomeIcon = new L.Icon({
    iconUrl: homeIcon,
    iconSize: [32, 32], // Size of the icon
  });

  // Custom icon for the Store marker
  const customStoreIcon = new L.Icon({
    iconUrl: storeIcon, // Use the correct icon path here
    iconSize: [32, 32], // Size of the icon
  });

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMylocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const handleLocationCheck = () => {
    if (!myLocation.lat || !myLocation.lng) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid Location",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!selectedStore) {
      Swal.fire({
        title: "Error!",
        text: "Please select a store to check delivery zone",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const distance = calculateDistance(
      myLocation.lat,
      myLocation.lng,
      selectedStore.lat,
      selectedStore.lng
    );

    if (distance <= selectedStore.raduis) {
      Swal.fire({
        title: "Success!",
        text: `You are within the delivery zone for ${selectedStore.name}.`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: `You are outside the delivery zone for ${selectedStore.name}.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <h1>Store Delivery Zone Checker</h1>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={handleGetLocation}
      >
        Get My Location
      </button>
      <button
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
        onClick={handleLocationCheck}
      >
        Check Delivery Availability
      </button>

      <div className="mapContainer">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "75vh", width: "100vw" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/** Display My Location */}
          {myLocation.lat && myLocation.lng && (
            <>
              <Marker
                position={[myLocation.lat, myLocation.lng]}
                icon={customHomeIcon}
              >
                <Popup>My Current Position</Popup>
              </Marker>
              {/** Add Circle around My Location */}
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

          {/** Display all stores on Map */}
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
                <a
                  href={store.direction}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Direction
                </a>
              </Popup>

              {/** Draw delivery area circle when store is selected */}
              {selectedStore && selectedStore.id === store.id && (
                <Circle
                  center={[store.lat, store.lng]}
                  radius={selectedStore.raduis}
                  pathOptions={{
                    color: "green",
                    fillColor: "green",
                    fillOpacity: 0.3, // Semi-transparent green
                  }}
                />
              )}
            </Marker>
          ))}

          {/**Choose Location on Map */}
          <LocationMap />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;

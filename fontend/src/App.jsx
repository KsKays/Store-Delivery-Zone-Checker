import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet"; // Import Leaflet
import "./App.css";
import homeIcon from "./assets/home.png";

// Define base URL for API
const base_url = import.meta.env.VITE_API_BASE_URL;



function App() {
  const center = [13.83860399048006, 100.02528022088828]; // SE NPRU
  const [stores, setStores] = useState([]);
  const [myLocation, setMylocation] = useState({ lat: "", lng: "" });
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`${base_url}/api/stores`);
        if (response.status === 200) {
          setStores(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStore();
  }, []);

 
  const LocationMap = () =>{
     useMapEvents({
       click(e) {
         const { lat, lng } = e.latlng;
         setMylocation({ lat, lng });
         console.log("Clicked at latitue");
       },
     });

  }

  // Create a custom icon for the home marker
  const customHomeIcon = new L.Icon({
    iconUrl: homeIcon,
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

  return (
    <>
      <div>
        <h1>Store Delivery Zone Checker</h1>
        <button onClick={handleGetLocation}>Get My Location</button>
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
              <Marker
                position={[myLocation.lat, myLocation.lng]}
                icon={customHomeIcon}
              >
                <Popup>My Current Position</Popup>
              </Marker>
            )}

            {/** Display all stores on Map */}
            {stores.map((store, index) => (
              <Marker key={store.id} position={[store.lat, store.lng]}>
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
              </Marker>
            ))}

            {/**Choose Location on Map */}
            <LocationMap />
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default App;

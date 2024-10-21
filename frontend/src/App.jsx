import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet"; // เพิ่ม Circle
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Swal from "sweetalert2";
import MyLocation from "./components/MyLocation";
import Stores from "./components/Stores";
const base_url = import.meta.env.VITE_API_BASE_URL;

function App() {
  const center = [13.83860399048006, 100.02528022088828]; // SE NPRU
  const [stores, setStores] = useState([]);
  const [myLocation, setMylocation] = useState({ lat: "", lng: "" });
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeRadius, setStoreRadius] = useState(null); // State สำหรับเก็บรัศมีของร้านค้าที่ถูกเลือก

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${base_url}/api/v1/store`);
        if (response.status === 200) {
          const fetchedStores = response.data.map((store) => ({
            id: store.id, // เพิ่ม ID เพื่อการใช้งานใน Marker
            name: store.storeName,
            address: store.address,
            lat: store.latitude,
            lng: store.longitude,
            radius: store.deliveryRadius,
            getDirection: store.getDirection,
          }));
          setStores(fetchedStores);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลร้านค้า:", error);
      }
    };
    fetchStores();
  }, []);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // รัศมีของโลก (เมตร)
    const phi_1 = (lat1 * Math.PI) / 180; // แปลงพิกัดจากองศาเป็นเรเดียน
    const phi_2 = (lat2 * Math.PI) / 180;

    const delta_phi = ((lat2 - lat1) * Math.PI) / 180;
    const delta_lambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi_1) *
        Math.cos(phi_2) *
        Math.sin(delta_lambda / 2) *
        Math.sin(delta_lambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const LocationMap = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMylocation({ lat, lng });
      },
    });
  };

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
        title: "ข้อผิดพลาด!",
        text: "กรุณาใส่ตำแหน่งที่ถูกต้อง",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (!selectedStore) {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "กรุณาเลือกร้านค้าที่จะตรวจสอบพื้นที่จัดส่ง",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const distance = calculateDistance(
      myLocation.lat,
      myLocation.lng,
      selectedStore.lat,
      selectedStore.lng
    );

    if (distance <= selectedStore.radius) {
      Swal.fire({
        title: "สำเร็จ!",
        text: `คุณอยู่ในพื้นที่จัดส่งสำหรับ ${selectedStore.name}.`,
        icon: "success",
        confirmButtonText: "ตกลง",
      });
    } else {
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: `คุณอยู่นอกพื้นที่จัดส่งสำหรับ ${selectedStore.name}.`,
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }

    setStoreRadius(selectedStore.radius); // ตั้งค่ารัศมีร้านค้าที่ถูกเลือก
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-8 text-3xl font-bold ">Store Delivery Zone Checker</h1>
      <div className="space-x-4">
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
      </div>

      <div className="mapContainer mt-8">
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
          {/** แสดงตำแหน่งของฉัน */}
          <MyLocation myLocation={myLocation} />

          {/** แสดงรัศมีของร้านค้าที่ถูกเลือก */}
          {selectedStore && storeRadius && (
            <Circle
              center={[selectedStore.lat, selectedStore.lng]}
              radius={storeRadius}
              color="lightblue" // เปลี่ยนสีให้เป็นฟ้า
              fillColor="lightblue" // เปลี่ยนสีให้เป็นฟ้า
              fillOpacity={0.3} // ปรับความโปร่งใส
            />
          )}

          {/** แสดงร้านค้าทั้งหมดบนแผนที่ */}
          <Stores
            stores={stores}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            setStoreRadius={setStoreRadius} // เพิ่มเพื่อให้สามารถตั้งค่า radius จากร้านค้าได้
          />

          {/** เลือกตำแหน่งบนแผนที่ */}
          <LocationMap />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;

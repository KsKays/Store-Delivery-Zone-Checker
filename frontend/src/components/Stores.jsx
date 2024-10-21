import { Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import storeIcon from "../assets/grocery-store.png"; // ตรวจสอบให้แน่ใจว่าพาธนี้ถูกต้อง

const Stores = ({ stores, selectedStore, setSelectedStore }) => {
  // Custom icon for the Store marker
  const customStoreIcon = new L.Icon({
    iconUrl: storeIcon,
    iconSize: [32, 32], // ขนาดของไอคอน
  });

  return (
    <>
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.lat, store.lng]}
          icon={customStoreIcon} // ใช้ไอคอนร้านค้า
          eventHandlers={{
            click: () => {
              setSelectedStore(store); // ตั้งค่า selectedStore เมื่อคลิก
            },
          }}
        >
          <Popup>
            <b>{store.name}</b>
            <p>{store.address}</p>
            <p>Delivery Radius: {store.radius} meters</p>
            {/* แสดงปุ่ม Get Direction */}
            <button
              onClick={() => window.open(store.getDirection, "_blank")}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Get Direction
            </button>
          </Popup>

          {/** วาดวงกลมเมื่อเลือก store */}
          {selectedStore &&
            selectedStore.id === store.id &&
            selectedStore.radius > 0 && ( // ตรวจสอบว่ารัศมีมากกว่าศูนย์
              <Circle
                center={[store.lat, store.lng]}
                radius={selectedStore.radius} // ใช้รัศมีจาก store
                pathOptions={{
                  color: "lightblue", // เปลี่ยนสีของเส้นรอบวงกลม
                  fillColor: "lightblue", // เปลี่ยนสีของวงกลม
                  fillOpacity: 0.1, // ความโปร่งใสของสีฟ้า
                }}
              >
                <Popup>
                  <b>Delivery Zone for {store.name}</b>
                  <p>
                    This is the delivery area with a radius of{" "}
                    {selectedStore.radius} meters.
                  </p>
                </Popup>
              </Circle>
            )}
        </Marker>
      ))}
    </>
  );
};

export default Stores;

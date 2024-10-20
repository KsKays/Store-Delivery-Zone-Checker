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
            <p>Delivery Radius: {store.radius} meters</p>{" "}
            {/* แสดงรัศมีใน popup */}
            <a href={store.direction} target="_blank" rel="noopener noreferrer">
              Get Direction
            </a>
          </Popup>

          {/** วาดวงกลมเมื่อเลือก store */}
          {
            selectedStore &&
              selectedStore.id === store.id &&
              (selectedStore.radius > 0 ? ( // ตรวจสอบว่ารัศมีมากกว่าศูนย์
                <Circle
                  center={[store.lat, store.lng]}
                  radius={selectedStore.radius} // ใช้รัศมีจาก store
                  pathOptions={{
                    color: "green",
                    fillColor: "green",
                    fillOpacity: 0.3, // สีเขียวโปร่งใส
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
              ) : null) // ไม่วาด Circle ถ้ารัศมีไม่ถูกต้อง
          }
        </Marker>
      ))}
    </>
  );
};

export default Stores;

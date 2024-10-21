import { Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import storeIcon from "../assets/grocery-store.png"; // ตรวจสอบให้แน่ใจว่าพาธนี้ถูกต้อง
import { useAuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import StoreService from "../services/store.service";

const Stores = ({ stores, selectedStore, setSelectedStore }) => {
  const { user } = useAuthContext();

  // Custom icon for the Store marker
  const customStoreIcon = new L.Icon({
    iconUrl: storeIcon,
    iconSize: [32, 32], // ขนาดของไอคอน
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "ลบรายการนี้ใช่หรือไม่?",
      text: "Good Luck for Example in the future!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // เรียกใช้งานฟังก์ชัน deleteStore จาก StoreService
          const response = await StoreService.deleteStore(id);

          // ตรวจสอบสถานะการตอบกลับ
          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your store has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Failed to Delete",
              text: "The store could not be deleted.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error?.response?.data?.message || error.message,
            icon: "error",
          });
        }
      }
    });
  };

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
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 text-center">
                {store.name}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {store.address}
              </p>
              <p className="text-xs text-gray-500 text-center">
                Delivery Radius: {store.radius}m
              </p>

              {/* Button for directions, centered */}
              <div className="flex justify-center">
                <button
                  onClick={() => window.open(store.getDirection, "_blank")}
                  className="mt-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-5 rounded-full shadow-md transition-all"
                >
                  Get Direction
                </button>
              </div>

              {/* Conditional actions for admins and moderators */}
              {user &&
                (user.roles.includes("ROLES_MODERATOR") ||
                  user.roles.includes("ROLES_ADMIN")) && (
                  <div className="mt-4 flex justify-center space-x-2">
                    {user.roles.includes("ROLES_ADMIN") && (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-full shadow-md"
                        onClick={() => handleDelete(store.id)}
                      >
                        Delete
                      </button>
                    )}
                    <a
                      href={`/editstore/store/${store.id}`}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-2 px-4 rounded-full shadow-md"
                    >
                      Edit
                    </a>
                  </div>
                )}
            </div>
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

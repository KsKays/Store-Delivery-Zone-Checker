import { useEffect, useState } from "react";
import StoreService from "../services/store.service"; // Make sure to create this service
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const EditStore = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [store, setStore] = useState({
    storeName: "",
    address: "",
    latitude: "",
    longitude: "",
    deliveryRadius: "",
    getDirection: "",
  });

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await StoreService.getStoreById(id); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลร้านค้า
        if (response.status === 200) {
          setStore(response.data); // กำหนดค่าให้ state
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to fetch store details.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.message || "An error occurred while fetching the store",
          icon: "error",
        });
      }
    };

    fetchStore(); // เรียกใช้ฟังก์ชันเมื่อโหลด
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call StoreService to update the store, passing id and store data
      const response = await StoreService.editStore(id, store); // ส่ง id และข้อมูลร้านค้า

      // Check the response status
      if (response.status === 200) {
        Swal.fire({
          title: "Store Updated",
          text: "Your store has been successfully updated.",
          icon: "success",
        });
        navigate("/"); // Redirect to store table or any other route
      } else {
        Swal.fire({
          title: "Store Update Failed",
          text: "The store could not be updated.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Store Update Failed",
        text: error?.message || "An error occurred while updating the store",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md mx-auto rounded-lg space-y-6 text-start ">
        <form
          className="bg-slate-50 drop-shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-96"
          onSubmit={handleSubmit}
        >
          {/* Store Name */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Store Name
            </span>
            <input
              type="text"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Store Name"
              name="storeName"
              value={store.storeName}
              onChange={handleChange}
              required // Make this field required
            />
          </div>

          {/* Address */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Address
            </span>
            <input
              type="text"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Address"
              name="address"
              value={store.address}
              onChange={handleChange}
              required // Make this field required
            />
          </div>

          {/* Latitude */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Latitude
            </span>
            <input
              type="number"
              step="any" // Allow decimal values
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Latitude"
              name="latitude"
              value={store.latitude}
              onChange={handleChange}
              required // Make this field required
            />
          </div>

          {/* Longitude */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Longitude
            </span>
            <input
              type="number"
              step="any" // Allow decimal values
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Longitude"
              name="longitude"
              value={store.longitude}
              onChange={handleChange}
              required // Make this field required
            />
          </div>

          {/* Delivery Radius */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Delivery Radius (km)
            </span>
            <input
              type="number"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Delivery Radius"
              name="deliveryRadius"
              value={store.deliveryRadius}
              onChange={handleChange}
              required // Make this field required
            />
          </div>

          {/* Get Direction */}
          <div className="relative">
            <span className="block text-lg font-medium text-gray-700 mt-3">
              Get Direction
            </span>
            <input
              type="text"
              className="w-full pl-4 pr-4 py-3 text-ms border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Get Direction"
              name="getDirection"
              value={store.getDirection}
              onChange={handleChange}
              required // Make this field required
            />
          </div>

          <div className="mb-6 text-center pt-5">
            <button
              className="btn btn-active btn-neutral text-white font-normal text-base"
              type="submit"
            >
              UPDATE STORE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStore;

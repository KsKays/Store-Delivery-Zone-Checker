import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const EditStore = () => {
  const { id: storeId } = useParams();
  const navigate = useNavigate();
  const { updateStore } = useAuthContext(); // Ensure you have a context function for updating the store
  const location = useLocation();

  // Extract store properties from location state
  const { storeName, address, latitude, longitude, deliveryRadius } =
    location.state || {};

  // Updated state to reflect store fields
  const [store, setStore] = useState({
    storeName: storeName || "",
    address: address || "",
    latitude: latitude || "",
    longitude: longitude || "",
    deliveryRadius: deliveryRadius || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore({ ...store, [name]: value }); // Update to setStore
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStore(storeId, store); // Call the context method to update the store
      Swal.fire({
        title: "Store Updated",
        text: "The store has been updated successfully.",
        icon: "success",
      });
      navigate("/"); // Redirect after successful update
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error?.message || "An error occurred while updating the store.",
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
              Delivery Radius (in km)
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

          <div className="mb-6 text-center pt-5">
            <button
              className="btn btn-active btn-neutral text-white font-normal text-base"
              type="submit"
            >
              Save Store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStore;

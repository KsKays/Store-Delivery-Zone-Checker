import api from "./api"; // Import the Axios instance with base URL
const API_URL = import.meta.env.VITE_API_BASE_URL;
const STORE_API = import.meta.env.VITE_STORE_API; // Define the store API path

// get all stores
const getAllStore = async () => {
  return await api.get(`${STORE_API}/all`); // This will use the base URL + /api/v1/store/all
};

// get store by Id
const getStoreById = async (id) => {
  return await api.get(`${API_URL}${STORE_API}/${id}`); // This will use the base URL + /api/v1/store/{id}
};

// update a store
const editStore = async (id, store) => {
  return await api.put(`${API_URL}${STORE_API}/${id}`, store);
};

// delete store
const deleteStore = async (id) => {
  return await api.delete(`${API_URL}${STORE_API}/${id}`);
};

// add new store
const insertStore = async (store) => {
  return await api.post(`${API_URL}${STORE_API}`, store);
};

// export the services
const StoreService = {
  getAllStore,
  getStoreById,
  editStore,
  deleteStore,
  insertStore,
};

export default StoreService;

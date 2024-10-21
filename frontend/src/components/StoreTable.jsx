// React component will use the context to manage stores.
import { TrashIcon } from "./FontAwesome";
const StoreTable = () => {
  const { stores, fetchStores, deleteStore } = useAuthContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    fetchStores(); // fetch stores without axios, use context
  }, []);

  const handleDelete = (id, storeName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete the store "${storeName}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStore(id); // directly delete store using context
        Swal.fire(
          "Deleted!",
          `The store "${storeName}" has been deleted.`,
          "success"
        );
      }
    });
  };

  const handleEdit = (
    id,
    storeName,
    address,
    lat,
    lng,
    radius,
    deliveryStatus
  ) => {
    navigate(`/editstore/${id}`, {
      state: {
        id,
        storeName,
        address,
        lat,
        lng,
        radius,
        deliveryStatus,
      },
    });
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="overflow-x-auto rounded-lg shadow-lg w-full max-w-7xl">
        <table className="table-auto w-full text-left bg-white border-collapse">
          <thead>
            <tr className="bg-cyan-100 text-gray-700 text-sm uppercase tracking-wider">
              <th className="py-3 px-4 border-b">Store Name</th>
              <th className="py-3 px-4 border-b">Address</th>
              <th className="py-3 px-4 border-b">Latitude</th>
              <th className="py-3 px-4 border-b">Longitude</th>
              <th className="py-3 px-4 border-b">Radius (m)</th>
              <th className="py-3 px-4 border-b">Delivery Status</th>
              <th className="py-3 px-4 border-b">Edit</th>
              <th className="py-3 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {stores &&
              stores.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{store.storeName}</td>
                  <td className="py-3 px-4 border-b">{store.address}</td>
                  <td className="py-3 px-4 border-b">{store.lat}</td>
                  <td className="py-3 px-4 border-b">{store.lng}</td>
                  <td className="py-3 px-4 border-b">{store.radius}</td>
                  <td className="py-3 px-4 border-b">{store.deliveryStatus}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      className="btn btn-warning btn-sm mx-1 btn-outline hover:bg-lime-500"
                      onClick={() =>
                        handleEdit(
                          store.id,
                          store.storeName,
                          store.address,
                          store.lat,
                          store.lng,
                          store.radius,
                          store.deliveryStatus
                        )
                      }
                    >
                      <PenIcon />
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b">
                    {user.roles[0].includes("ROLES_ADMIN") ? (
                      <button
                        className="btn btn-error btn-sm mx-1 btn-outline hover:bg-red-600"
                        onClick={() => handleDelete(store.id, store.storeName)}
                      >
                        <TrashIcon />
                      </button>
                    ) : (
                      <button
                        className="btn btn-error btn-sm mx-1 btn-outline hover:bg-red-600"
                        disabled
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreTable;

import { CDN_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { toast, Toaster } from "react-hot-toast";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
    toast.success(`${item.card.info.name} added to cart!`, {
      position: "top-center", // Position of the toast notification
      duration: 3000, // Duration for which the toast is visible
    });
  };

  return (
    <div>
      <Toaster position="top-center" />
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="flex items-start p-4 mb-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 border-b border-gray-200"
        >
          <div className="w-9/12 pr-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {item.card.info.name}
            </h3>
            <p className="text-sm font-medium text-gray-600 mb-2">
              ₹
              {item.card.info.price
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100}
            </p>
            <p className="text-gray-500 text-sm">
              {item.card.info.description}
            </p>
          </div>
          <div className="w-3/12 relative">
            <img
              className="w-full h-24 object-cover rounded-md shadow-sm"
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
            />
            <button
              className="absolute bottom-2 right-2 bg-lime-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-lime-600 transition-all duration-200"
              onClick={() => handleAddItem(item)}
            >
              ADD
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;

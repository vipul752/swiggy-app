import React from "react";
import { CDN_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeItems } from "../utils/cartSlice";

const ItemListCart = ({ items }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItems(id));
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center p-4 bg-white shadow-md rounded-lg border border-gray-200"
        >
          <div className="flex-shrink-0 w-32 h-32 relative">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
            />
          </div>
          <div className="flex flex-col flex-grow pl-4">
            <span className="font-semibold text-gray-800 text-lg">
              {item.card.info.name}
            </span>
            <span className="block text-gray-600 mt-1">
              ₹
              {item.card.info.price
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100}
            </span>
            <p className="text-xs text-gray-500 mt-2">
              {item.card.info.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemListCart;

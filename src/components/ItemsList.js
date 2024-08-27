import { CDN_URL } from "../utils/constant";

const ItemList = ({ items }) => {
  console.log(items);

  return (
    <div>
      {items.map((item) => (
        <div className="p-2 m-2 border-gray-200 border-b-2 text-left flex items-start relative">
          <div className="w-9/12 pr-4">
            <span className="block font-semibold">{item.card.info.name}</span>
            <span className="block mb-2">
              ₹
              {item.card.info.price
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100}
            </span>
            <p className="text-xs text-gray-400">
              {item.card.info.description}
            </p>
          </div>
          <div className="w-3/12 relative">
            <div>
              <button className="bg-white text-lime-600 rounded-md px-2 py-1 absolute flex  ">
                ADD
              </button>
            </div>
            <img
              className="w-full h-24 object-cover rounded-md"
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;

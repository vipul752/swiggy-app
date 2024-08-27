import ItemList from "./ItemsList";
import { useState } from "react";

const RestaurantCategory = ({ data }) => {
  const [showItems, setShowItems] = useState(false);

  const handlClicked = () => {
    setShowItems(!showItems);
  };
  return (
    <div>
      <div className="bg-gray-50 mx-auto my-4 w-6/12 shadow-lg p-4">
        <div
          className="title flex justify-between cursor-pointer"
          onClick={handlClicked}
        >
          <span>
            {data.title} ({data.itemCards.length})
          </span>
          <span>{showItems ? "⬆️" : "⬇️"}</span>
        </div>

        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;

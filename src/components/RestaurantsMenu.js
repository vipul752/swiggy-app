import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { MENU_URL } from "../utils/constant";
import { useParams } from "react-router-dom";
const RestaurantsMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  useEffect(() => {
    fetchedMenu();
  }, []);

  const fetchedMenu = async () => {
    const data = await fetch(MENU_URL + resId);
    const json = await data.json();

    setResInfo(json.data);
  };

  if (resInfo === null) return <Shimmer />;

  // Extracting the restaurant info
  const restaurantName = resInfo?.cards[2]?.card?.card?.info?.name;
  const { avgRatingString, totalRatingsString, costForTwoMessage, areaName } =
    resInfo?.cards[2]?.card?.card?.info;

  // Extract menu items
  const menuItems =
    resInfo?.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card
      .itemCards || [];

  return (
    <div className="container">
      <div className="restaurant-card">
        <div className="restaurant-name">{restaurantName}</div>
        <div className="restaurant-info">
          <div className="restaurant-rating">
            <div className="rating-icon">⭐</div>
            <div className="rating-text">
              {avgRatingString} ({totalRatingsString})
            </div>
          </div>
          <div className="price-for-two">{costForTwoMessage}</div>
        </div>
        <div className="cuisine-links">
          {resInfo?.cards[2]?.card?.card?.info?.cuisines.map(
            (cuisine, index) => (
              <a key={index} href="#">
                {cuisine}
              </a>
            )
          )}
        </div>
        <div className="restaurant-details">
          <span className="outlet">Outlet</span> {areaName}
          <div className="restaurant-timing">
            {resInfo?.cards[2]?.card?.card?.info?.sla?.deliveryTime} mins
          </div>
        </div>
        <div className="delivery-info">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/v1648635511/Delivery_fee_new_cjxumu"
            alt="bike icon"
          />
          <span>Order above ₹149 for discounted delivery fee</span>
        </div>
      </div>

      <div className="menu-items">
        {menuItems.map((item, index) => {
          const { name, price, description } = item.card.info;
          const { rating, ratingCountV2 } =
            item.card.info.ratings.aggregatedRating || {};

          return (
            <div key={index} className="restaurant-menu">
              <div className="item-name">{name}</div>
              <div className="item-price">₹{price / 100}</div>
              <div className="item-rating">
                {rating && ratingCountV2 ? (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      fillColor="#E6A408"
                    >
                      <rect width="14" height="14" fill="white"></rect>
                      <path
                        d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z"
                        fill="#E6A408"
                      ></path>
                    </svg>
                    {rating}({ratingCountV2})
                  </>
                ) : null}
              </div>
              <div className="item-description">{description}</div>
              <div className="add-btn">
                <button>Add</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsMenu;

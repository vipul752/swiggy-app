import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantsCategory";

const RestaurantsMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  const restaurantName = resInfo?.cards[2]?.card?.card?.info?.name;
  const {
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
    areaName,
    sla,
  } = resInfo?.cards[2]?.card?.card?.info;

  console.log(resInfo?.cards[2]?.card?.card?.info);

  const category =
    resInfo?.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(
      (c) =>
        c.card.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  console.log(category);

  return (
    <div className="container">
      <div className="restaurant-card ">
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
          <div className="restaurant-timing">{sla?.deliveryTime} mins</div>
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
        {category.map((category) => {
          return (
            <RestaurantCategory
              key={category.card.card.title}
              data={category.card.card}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsMenu;

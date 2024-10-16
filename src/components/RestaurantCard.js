import { CDN_URL } from "../utils/constant";

// RestaurantCard component
const RestaurantCard = (props) => {
  const { resData } = props;

  const { name, avgRating, cuisines, cloudinaryImageId, costForTwo, sla } =
    resData?.info || {};

  const getStarColor = (rating) => {
    if (rating >= 4) return "text-green-500";
    if (rating >= 2.5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="res-card">
      <img className="res-logo" src={CDN_URL + cloudinaryImageId} alt="logo" />
      <h3>{name || "Restaurant Name"}</h3>
      <h4 className="cuisine-tags">
        {cuisines?.join(", ") || "Cuisine not available"}
      </h4>
      <h4>⭐️{avgRating || "Rating not available"} star</h4>
      <h4 className="delivery-price-info">
        {sla?.deliveryTime || "Delivery time not available"} minutes
      </h4>
      <h4>{costForTwo || "Cost information not available"}</h4>
    </div>
  );
};

export default RestaurantCard;

import { CDN_URL } from "../utils/constant";

// RestaurantCard component
const RestaurantCard = (props) => {
  const { resData } = props;

  const { name, avgRating, cuisines, cloudinaryImageId, costForTwo, sla } =
    resData?.info || {};

  return (
    <div className="res-card">
      <img className="res-logo" src={CDN_URL + cloudinaryImageId} alt="logo" />
      <h3>{name || "Restaurant Name"}</h3>
      <h4>{cuisines?.join(", ") || "Cuisine not available"}</h4>
      <h4>{avgRating || "Rating not available"} star</h4>
      <h4>{sla?.deliveryTime || "Delivery time not available"} minutes</h4>
      <h4>{costForTwo || "Cost information not available"}</h4>
    </div>
  );
};

export default RestaurantCard;

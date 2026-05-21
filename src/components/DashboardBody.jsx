import React from "react";
import FoodItem from "../components/FoodItem";

function DashboardBody({ menuItems, onAddToCart }) {
  return (
    <div id="DashboardBody">
      {menuItems.map((item) => (
        <FoodItem
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          category={item.category}
          foodimg={`http://localhost:5000/uploads/${item.image}`}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default DashboardBody;
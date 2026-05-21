import React, { useState, useEffect } from "react";
import "../styles/userdashboard.css";
import Header from "../components/Header";
import DashboardBody from "../components/DashboardBody";
import Drawer from "@mui/material/Drawer";
import Cart from "../components/Cart";
import Profile from "../components/Profile";

function UserDashboard() {
  const [category, setCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [openCart, setCartToOpen] = useState(false);
  const [openProfile, setProfileToOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Get logged-in user name
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name);
      } catch (e) {}
    }

    // Fetch menu items based on category
    const fetchMenu = async () => {
      try {
        const url =
          category === "All"
            ? "http://localhost:5000/api/menu"
            : `http://localhost:5000/api/menu?category=${category}`;
        const res = await fetch(url);
        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
    };
    fetchMenu();
  }, [category]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Update quantity from CartItem
  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Checkout: send order to backend
  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }
    const orderItems = cartItems.map(({ id, name, price, quantity }) => ({
      id,
      name,
      price,
      quantity,
    }));
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ items: orderItems, totalPrice }),
      });
      if (res.ok) {
        alert("Order placed successfully!");
        setCartItems([]);
        setCartToOpen(false);
      } else {
        const data = await res.json();
        alert(data.msg || "Checkout failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    }
  };

  return (
    <div>
      <Header
        onOpenCart={() => setCartToOpen(true)}
        onOpenProfile={() => setProfileToOpen(true)}
        onSelectFilter={setCategory}
        category={category}
      />
      <DashboardBody menuItems={menuItems} onAddToCart={addToCart} />

      <Drawer anchor="right" open={openCart} onClose={() => setCartToOpen(false)}>
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
          onClose={() => setCartToOpen(false)}
        />
      </Drawer>

      <Drawer anchor="right" open={openProfile} onClose={() => setProfileToOpen(false)}>
        <Profile onClose={() => setProfileToOpen(false)} name={userName} />
      </Drawer>
    </div>
  );
}

export default UserDashboard;
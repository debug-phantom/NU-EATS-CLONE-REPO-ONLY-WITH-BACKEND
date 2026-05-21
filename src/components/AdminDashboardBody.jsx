import { useState } from "react";
import "../styles/components/admindashboardbody.css";

function AdminDashboardBody({
  currentTab,
  users,
  menuItems,
  onDeleteUser,
  onDeleteMenuItem,
  onAddMenuItem,
  onUpdateMenuItem,
  // Add user props
  newUserName,
  setNewUserName,
  newUserEmail,
  setNewUserEmail,
  newUserPassword,
  setNewUserPassword,
  newUserRole,
  setNewUserRole,
  onAddUser,
}) {
  // Menu item form states
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "Meal",
    image: null,
  });
  const [editItem, setEditItem] = useState(null);

  const handleNewSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("price", newItem.price);
    formData.append("category", newItem.category);
    if (newItem.image) formData.append("image", newItem.image);

    const success = await onAddMenuItem(formData);
    if (success) {
      alert("Item added");
      setNewItem({ name: "", description: "", price: "", category: "Meal", image: null });
    } else {
      alert("Failed to add item");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editItem.name);
    formData.append("description", editItem.description);
    formData.append("price", editItem.price);
    formData.append("category", editItem.category);
    if (editItem.imageFile) formData.append("image", editItem.imageFile);

    const success = await onUpdateMenuItem(editItem.id, formData);
    if (success) {
      alert("Item updated");
      setEditItem(null);
    } else {
      alert("Failed to update item");
    }
  };

  if (currentTab === "Users") {
    return (
      <div id="AdminDashboardBody">
        <div className="AdminContent">
          <h1>Manage Users</h1>

          {/* ADD USER FORM */}
          <h3>Add New User</h3>
          <form onSubmit={onAddUser} style={{ marginBottom: "30px" }}>
            <input
              type="text"
              placeholder="Full Name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              required
            />
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Add User</button>
          </form>

          {/* USERS TABLE */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => onDeleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ===================== MENU TAB =====================
  return (
    <div id="AdminDashboardBody">
      <div className="AdminContent">
        <h1>Manage Menu</h1>

        {/* ADD NEW ITEM FORM with IMAGE UPLOAD */}
        <h3>Add New Item</h3>
        <form onSubmit={handleNewSubmit} style={{ marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            required
          />
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          >
            <option value="Meal">Meal</option>
            <option value="Snack">Snack</option>
            <option value="Drink">Drink</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })}
          />
          <button type="submit">Add Item</button>
        </form>

        {/* EDIT ITEM MODAL (inline) */}
        {editItem && (
          <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
            <h3>Edit Item: {editItem.name}</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editItem.name}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                required
              />
              <textarea
                value={editItem.description}
                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                required
              />
              <input
                type="number"
                value={editItem.price}
                onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                required
              />
              <select
                value={editItem.category}
                onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
              >
                <option value="Meal">Meal</option>
                <option value="Snack">Snack</option>
                <option value="Drink">Drink</option>
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEditItem({ ...editItem, imageFile: e.target.files[0] })}
              />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditItem(null)}>Cancel</button>
            </form>
          </div>
        )}

        {/* LIST MENU ITEMS with IMAGE PREVIEW */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr><th>ID</th><th>Image</th><th>Name</th><th>Price</th><th>Category</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {item.image && (
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      alt={item.name}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  )}
                </td>
                <td>{item.name}</td>
                <td>₱{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => setEditItem(item)}>Edit</button>
                  <button onClick={() => onDeleteMenuItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboardBody;
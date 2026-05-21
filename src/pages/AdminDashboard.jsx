import { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminDashboardBody from "../components/AdminDashboardBody";
import Drawer from "@mui/material/Drawer";
import Profile from "../components/Profile";

function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState("Users");
  const [users, setUsers] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [openProfile, setProfileToOpen] = useState(false);
  const [adminName, setAdminName] = useState("");

  // State for adding a new user
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAdminName(user.name);
      } catch (e) {}
    }
    fetchUsers();
    fetchMenu();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { "x-auth-token": token },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/menu");
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
        headers: { "x-auth-token": token },
      });
      if (res.ok) {
        fetchUsers();
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add new user (admin only)
  const handleAddUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
        }),
      });
      if (res.ok) {
        alert("User added successfully");
        fetchUsers(); // refresh user list
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("");
        setNewUserRole("user");
      } else {
        const err = await res.json();
        alert(err.msg || "Failed to add user");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding user");
    }
  };

  const deleteMenuItem = async (itemId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${itemId}`, {
        method: "DELETE",
        headers: { "x-auth-token": token },
      });
      if (res.ok) {
        fetchMenu();
      } else {
        alert("Failed to delete menu item");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addMenuItem = async (formData) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/menu", {
        method: "POST",
        headers: { "x-auth-token": token },
        body: formData,
      });
      if (res.ok) {
        fetchMenu();
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateMenuItem = async (id, formData) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${id}`, {
        method: "PUT",
        headers: { "x-auth-token": token },
        body: formData,
      });
      if (res.ok) {
        fetchMenu();
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <div>
      <AdminHeader
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenProfile={() => setProfileToOpen(true)}
      />
      <AdminDashboardBody
        currentTab={currentTab}
        users={users}
        menuItems={menuItems}
        onDeleteUser={deleteUser}
        onDeleteMenuItem={deleteMenuItem}
        onAddMenuItem={addMenuItem}
        onUpdateMenuItem={updateMenuItem}
        // Props for adding user
        newUserName={newUserName}
        setNewUserName={setNewUserName}
        newUserEmail={newUserEmail}
        setNewUserEmail={setNewUserEmail}
        newUserPassword={newUserPassword}
        setNewUserPassword={setNewUserPassword}
        newUserRole={newUserRole}
        setNewUserRole={setNewUserRole}
        onAddUser={handleAddUser}
      />
      <Drawer anchor="right" open={openProfile} onClose={() => setProfileToOpen(false)}>
        <Profile onClose={() => setProfileToOpen(false)} name={adminName} />
      </Drawer>
    </div>
  );
}

export default AdminDashboard;
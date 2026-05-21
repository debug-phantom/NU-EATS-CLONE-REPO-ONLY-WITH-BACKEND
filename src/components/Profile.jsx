import { useNavigate } from "react-router-dom";
import "../styles/components/profile.css";

function Profile({ onClose, name }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="ProfileContainer">
      <div className="ProfileHeader">
        <button className="CloseButton" onClick={() => onClose(false)}>✕</button>
        <div className="ProfileTitle">
          <h1 id="profile-title">Profile</h1>
        </div>
      </div>
      <hr />
      <div className="NameContainer">
        <p id="name-label">{name || "User"}</p>
      </div>
      <hr />
      <div className="LogoutContainer">
        <button className="LogoutButton" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Profile;
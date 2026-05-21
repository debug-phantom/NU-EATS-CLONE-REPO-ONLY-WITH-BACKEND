import '../styles/components/adminheader.css';
import userIcon from '../assets/icons/User.png';
import logoText from '../assets/icons/Logo Text.png';

function AdminHeader(props) {
  return (
    <header className="AdminHeader">
      <div id="AdminCenterDiv">
        <div id="AdminTopRow">
          <img src={logoText} alt="Logo" id="LogoText" />
          
          <button className="NavButton" onClick={props.onOpenProfile}>
            <img src={userIcon} className="NavIcon" alt="User" />
          </button>
        </div>
        
        <div id="AdminTabRow">
          <button
            className={
              props.currentTab === "Users"
                ? "TabButton ActiveTab"
                : "TabButton"
            }
            onClick={() => props.onSelectTab("Users")}
          >
            Users
          </button>
          
          <button
            className={
              props.currentTab === "Menu"
                ? "TabButton ActiveTab"
                : "TabButton"
            }
            onClick={() => props.onSelectTab("Menu")}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;

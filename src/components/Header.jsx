import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import '../styles/components/header.css'
import logoText from '../assets/icons/Logo Text.png'
import home from '../assets/icons/Home.png'
import archive from '../assets/icons/Archive.png'
import cart from '../assets/icons/Cart.png'
import search from '../assets/icons/Search.png'
import user from '../assets/icons/User.png'

function Header(props) {
  return (
    <header>
        <div id="CenterDiv">
            <div id="SearchDiv">
              <img src= {logoText} alt="Logo" id="LogoText"/>
              <div className="SearchWrapper">
                <input
                    type="text"
                    placeholder="Burgers, Drinks, etc..."
                    id="SearchInput"
                />
                <button className="SearchIconButton">
                    <img src={search} className="SearchIcon" alt="Search" />
                </button>
              </div>

              <button className="NavButton" onClick={props.onOpenProfile}>
                <img src={user} className="NavIcon" alt="User"/>
              </button>
              <button className="NavButton" onClick={props.onOpenCart}>
                <img src={cart} className="NavIcon" alt="Cart"/>
              </button>

            </div>
            <div id="FilterDiv">
              <button
                className={
                  props.category === "Meal"
                    ? "FilterButton ActiveFilter"
                    : "FilterButton"
                }
                onClick={() => props.onSelectFilter("Meal")}
              >
                Meals
              </button>
              <button
                className={
                  props.category === "Snack"
                    ? "FilterButton ActiveFilter"
                    : "FilterButton"
                }
                onClick={() => props.onSelectFilter("Snack")}
              >
                Snacks
              </button>
              <button
                className={
                  props.category === "Drink"
                    ? "FilterButton ActiveFilter"
                    : "FilterButton"
                }
                onClick={() => props.onSelectFilter("Drink")}
              >
                Drinks
              </button>
              <button
                className={
                  props.category === "All"
                    ? "FilterButton ActiveFilter"
                    : "FilterButton"
                }
                onClick={() => props.onSelectFilter("All")}
              >
                All
              </button>
            </div>
        </div>
    </header>
  )
}

export default Header;
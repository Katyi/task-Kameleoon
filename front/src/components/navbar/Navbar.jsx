import React from "react";
import './Navbar.css';

const Navbar = ({title, ...props}) => {
  return (
    <div {...props} className={"header"}>
      <div 
        className={"headerTitle"}>{title}</div>
    </div>
  )
}

export default Navbar;
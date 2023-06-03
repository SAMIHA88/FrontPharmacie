import React, { useState } from 'react';
import {
    FaBars,
    FaUserAlt,
    FaRoute,
    FaHospital,
    FaCity,
    FaPlusCircle,
    FaHome,
    FaMap
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Accueil",
            icon:<FaHome/>
        },
        
        {
            path:"/villes",
            name:"Villes",
            icon:<FaCity/>
        },
        {
            path:"/zones",
            name:"Zones",
            icon:<FaRoute/>
        },
        {
            path:"/pharmacies",
            name:"Pharmacies",
            icon:<FaPlusCircle/>
        },
        {
            path:"/gardes",
            name:"Gardes",
            icon:<FaHospital/>

        },
        {
            path:"/map",
            name:"Map",
            icon:<FaMap/>
        },
        {
            path:"/about",
            name:"About",
            icon:<FaUserAlt/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">PharmaMap</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;
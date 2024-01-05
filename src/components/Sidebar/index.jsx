import React, { useEffect, useState } from 'react';
import '../../style.css'
import {Link, useLocation} from "react-router-dom"



const Sidebar = () => {
    const location = useLocation();

    

    const menus =[
        {
            label:'Dashboard', to: '/'
        },
        {
            label:'Users', to: '/users'
        }
    ];


    

   
    return (
       
        <ul className='sidebar-menus' style ={{width:'150px', listStyleType:'none', backgroundColor:'black', margin:'0px'}} > 

            {
                menus.map((menu, index)=>{
                    return <li key={index}>
                        <Link style = {{color:  location.pathname === menu.to ? 'cyan' :'whitesmoke', textDecoration:'none'}} to= {menu.to}>
                            {menu.label}
                        </Link>
                    </li>
                })
            }
        </ul>
    )
}

export default Sidebar;
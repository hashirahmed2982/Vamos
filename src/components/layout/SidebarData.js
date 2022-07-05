import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const SidebarData = [
    {
        "title": "Home",
        "path": "/home",
        "icon": <AiIcons.AiFillHome/>,
        "cName": "nav-text"
    },
    {
        "title": "Account",
        "path": "/profile",
        "icon": <IoIcons.IoMdContact/>,
        "cName": "nav-text"
    },
    {
        "title": "Offered",
        "path": "/offered",
        "icon": <IoIcons.IoMdCar/>,
        "cName": "nav-text"
    },
    {
        "title": "Joined",
        "path": "/joined",
        "icon": <AiIcons.AiOutlineCar/>,
        "cName": "nav-text"
    },
    {
        "title": "Guidelines",
        "path": "/rules",
        "icon": <AiIcons.AiTwotoneQuestionCircle/>,
        "cName": "nav-text"
    }
]
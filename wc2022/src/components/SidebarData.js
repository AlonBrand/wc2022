import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'Games',
        path: '/games',
        icon: <IoIcons.IoIosPaper />,
        className: 'nav-text'
    },
    {
        title: 'Table',
        path: '/table',
        icon: <FaIcons.FaCartPlus />,
        className: 'nav-text'
    },   
    {
        title: 'Support',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle />,
        className: 'nav-text'
    }   
]
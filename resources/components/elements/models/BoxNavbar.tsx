import React from "react";
import { Link, useLocation } from "react-router-dom";
interface LinkData {
    link: string,
    title: string;
    icon?:string
}
interface BoxNavBarProps {
    links: LinkData[];
    className?: string;
}

const BoxNavbar: React.FC<BoxNavBarProps> = ({
    links,
    className
}) => {
    const location = useLocation();
    return (
        <div className={className}>
            <div className={`rounded-md p-2 max-w-min overflow-x-auto`}>
                <div className='bg-light-primary dark:bg-dark-primary duration-300 shadow-md text-light-primary dark:text-dark-primary flex items-center rounded-md overflow-hidden'>
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            to={link.link}
                            className={`px-4 py-2 text-light-primary duration-300 dark:text-dark-primary border-b-4 hover:bg-gray-700 p-1 ${location.pathname === link.link ? 'border-blue-500 bg-light-secondary dark:bg-dark-secondary' : ''}`}
                        >
                            <div className="flex items-center">
                                {link.icon && < i className={`${link.icon}`} style={{ fontSize:"20px", marginTop:"-3px"}} />}
                                <span  className="ml-1">{link.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BoxNavbar;

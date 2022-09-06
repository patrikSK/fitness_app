import { NavLink } from "react-router-dom";

const CustomLink = ({ to, children, ...props }) => {
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) => (isActive ? "active" : "")}
                {...props}
            >
                {children}
            </NavLink>
        </li>
    );
};

export default CustomLink;

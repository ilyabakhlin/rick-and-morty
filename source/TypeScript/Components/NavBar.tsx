import React from "react";
import { Link, NavLink } from "react-router-dom";

type navLink = {
    name: string,
    path: string
};

export function NavBar(): JSX.Element {
    const navLinks: navLink[] = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Characters",
            path: "/characters",
        },
        {
            name: "Episodes",
            path: "/episodes",
        },
        {
            name: "Locations",
            path: "/locations",
        },
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className={"navbar-brand"} to={"/"}>Rick & Morty</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navLinks.map((navLink: navLink, index: number): JSX.Element => {
                            return (
                                <li className={"nav-item"} key={index}>
                                    <NavLink className={({isActive}) => isActive ? "active nav-link" : "nav-link"} to={navLink.path}>{navLink.name}</NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

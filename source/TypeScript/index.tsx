import React from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Character } from "./Pages/Characters/Character";
import { Characters } from "./Pages/Characters";
import { Home } from "./Pages/Home";
import { Episodes } from "./Pages/Episodes";
import { Locations } from "./Pages/Locations";

window.addEventListener("load", (): void => {
    const main: Element | null = window.document.querySelector("div#app");

    if (main instanceof Element) {
        createRoot(main).render(
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/characters"} element={<Characters/>}/>
                    <Route path={"/characters/:id"} element={<Character/>}/>
                    <Route path={"/locations"} element={<Locations/>}/>
                    <Route path={"/episodes"} element={<Episodes/>}/>
                </Routes>
            </BrowserRouter>,
        );
    } else {
        throw new Error("Something went wrong.");
    }
});

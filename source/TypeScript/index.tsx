import React from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Characters } from "./Pages/Characters";

window.addEventListener("load", (): void => {
    const main: Element | null = window.document.querySelector("div#app");

    if (main instanceof Element) {
        createRoot(main).render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/characters" element={<Characters/>}/>
                </Routes>
            </BrowserRouter>,
        );
    } else {
        throw new Error("Something went wrong.");
    }
});

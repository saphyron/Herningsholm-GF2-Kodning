import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HoovesAndHotties from "../src/GF2/John/pages/Hooves and Hotties/pages/index";
import CentaurList from "../src/GF2/John/pages/Hooves and Hotties/pages/centaurList";
import Index from "../src/GF2/John/index";
import Rutingstier from "../index";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Rutingstier />} />
                <Route path="/John_Main" element={<Index />} />
                <Route path="/hooves-and-hotties" element={<HoovesAndHotties />} />
                <Route path="/hooves-and-hotties/centaur-list" element={<CentaurList />} />
            </Routes>
        </BrowserRouter>
    );
}
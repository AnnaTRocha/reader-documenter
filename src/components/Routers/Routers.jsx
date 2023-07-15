import React from "react";
import { Routes, Route } from "react-router-dom";
import Reader from "./Reader";
import Documenter from "./Documenter";

export default props => (
    <Routes>
        <Route exact path="/" element={<Reader />} />
        <Route path ="/Documenter" element={<Documenter />} />
        <Route path="*" element={<Reader />} />
    </Routes>
);
import React from "react";
import Hero from "./component/Hero.jsx";
import Contact from "./component/Contact.jsx";
import data from "./props.js";

export default function App() {
  const { title, description, phone, address, heroText } = data;

  return (
<div className="container">
      <h2>{title}</h2>
      <p>{description}</p>

      <div className="hero">
        {heroText}
      </div>

      <div className="contact">
        <span><strong>Phone:</strong> {phone}</span>
        <span><strong>Address:</strong> {address}</span>
      </div>
    </div>
  );
}

import React from "react";

export default function Contact({ phone, address }) {
  return (
    <>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>
    </>
  );
}

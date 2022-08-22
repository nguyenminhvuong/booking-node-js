import React from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

export default function List() {
  return (
    <div>
      <Navbar />
      <Header type="list" />
    </div>
  );
}

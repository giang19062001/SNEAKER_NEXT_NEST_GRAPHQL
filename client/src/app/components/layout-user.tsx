import React from "react";
import Header from "./header";
import Footer from "./footer";

const LayoutUser = ({ children }: any) => {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
};

export default LayoutUser;

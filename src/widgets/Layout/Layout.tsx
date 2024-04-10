"use client";
import React from "react";
import Header from "./Header/ui/Header";
import Footer from "./Footer/ui/Footer";

interface LayoutProps {
  children: React.ReactNode;
  type?: "login" | "profile";
  isHouse?: boolean;
  showFooter?: boolean;
}

export default function Layout({
  children,
  type,
  isHouse,
  showFooter,
}: LayoutProps) {
  let target = "login";
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      target = "profile";
    }
  }

  console.log(target);
  return (
    <>
      {target === "login" && (
        <>
          <Header isProfile={false} isHouse={isHouse} />
          {children}
          <Footer isShow={showFooter} />
        </>
      )}
      {target === "profile" && (
        <>
          <Header isProfile={true} isHouse={isHouse} />
          {children}
          <Footer isShow={showFooter} />
        </>
      )}
    </>
  );
}

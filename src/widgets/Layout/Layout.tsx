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
  return (
    <>
      {type === "login" && (
        <>
          <Header isProfile={true} isHouse={isHouse} />
          {children}
          <Footer isShow={showFooter} />
        </>
      )}
      {type === "profile" && (
        <>
          <Header isProfile={false} isHouse={isHouse} />
          {children}
          <Footer isShow={showFooter} />
        </>
      )}
    </>
  );
}

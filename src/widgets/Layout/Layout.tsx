import React from "react";
import Header from "./Header/ui/Header";
import Footer from "./Footer/ui/Footer";

interface LayoutProps {
  children: React.ReactNode;
  type?: "login" | "profile";
}

export default function Layout({ children, type }: LayoutProps) {
  return (
    <>
      {type === "login" && (
        <>
          <Header isProfile={true} />
          {children}
          <Footer />
        </>
      )}
      {type === "profile" && (
        <>
          <Header isProfile={false} />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}

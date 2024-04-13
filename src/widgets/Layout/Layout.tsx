"use client";
import React from "react";
import Header from "./Header/ui/Header";
import HeaderLandlord from "./Header/ui/HeaderLandord";
import HeaderStudent from "./Header/ui/HeaderStudent";
import HeaderPostLandlord from "./Header/ui/HeaderPostLandlord";
import HeaderPostStudent from "./Header/ui/HeaderPostStudent";
import Footer from "./Footer/ui/Footer";

interface LayoutProps {
  children: React.ReactNode;
  userRole?: 1 | 2;
}

export default function Layout({ children }: LayoutProps) {
  const [target, setTarget] = React.useState("login");
  const [isProfile, setIsProfile] = React.useState(true);
  const [userRole, setUserRole] = React.useState("");

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const jwt = require("jsonwebtoken");

    const decodedToken = jwt.decode(accessToken);
    console.log("decoded token: ", decodedToken);
    const userId = decodedToken?.user_id;

    if (userId) {
      localStorage.setItem("userId", userId);
    }

    const fetchName = async () => {
      try {
        const userResponse = await fetch(
          `http://studhouse.kz/api/v1/auth/user/${userId}/`
        );
        const user = await userResponse.json();
        console.log("user role: ", user.role.id);
        setTarget("profile");
        console.log("target:", target);
      } catch (error) {
        console.error("Ошибка при загрузке данных: ", error);
      }
    };

    fetchName();
  }, []);

  console.log(target);
  return (
    <>
      {target === "login" && (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
      {target === "profile" && userRole == "Student" && (
        <>
          <HeaderStudent />
          {children}
          <Footer />
        </>
      )}
      {target === "profile" && userRole == "Landlord" && (
        <>
          <HeaderLandlord />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}

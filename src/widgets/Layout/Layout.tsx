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
}

export default function Layout({ children }: LayoutProps) {
  const [target, setTarget] = React.useState("login");
  const [isProfile, setIsProfile] = React.useState(true);
  const [userRole, setUserRole] = React.useState(1);

  React.useEffect(() => {
    const fetchUserRole = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const userId = localStorage.getItem("userId");
        if (userId) {
          try {
            console.log(isProfile, " ", userRole);

            const response = await fetch(
              `http://195.49.212.131:8000/api/v1/role/${userId}`
            );
            if (response.ok) {
              const data = await response.json();
              setUserRole(data.role.id);
              setTarget("profile");
              setIsProfile(true);
            } else {
              console.error("Ошибка при запросе роли пользователя");
            }
          } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
          }
        }
      }
    };

    fetchUserRole();
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
      {target === "profile" && userRole == 1 && (
        <>
          <HeaderLandlord />
          {children}
          <Footer />
        </>
      )}
      {target === "profile" && userRole == 2 && (
        <>
          <HeaderStudent />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ListOrdered,
  Boxes,
  UserCog,
  Zap,
  SquareArrowOutUpRight,
  PanelLeftOpen,
  LogOut,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Loader from "./ui/Loader";
import { Button } from "./ui/button";
import { useMediaQuery } from "react-responsive";

const Navigation = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 724px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 724px)",
  });

  const { userName, role } = useAuth();
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  const { pathname } = useLocation();

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    // Determine active tab based on pathname
    if (pathname.startsWith("/dash/users")) {
      setActiveTab("users");
    } else if (pathname.startsWith("/dash/codes")) {
      setActiveTab("codes");
    } else if (pathname.startsWith("/dash/vaults")) {
      setActiveTab("vaults");
    } else if (pathname.startsWith("/dash/users")) {
      setActiveTab("users");
    } else if (pathname.startsWith("/dash/logs")) {
      setActiveTab("logs");
    } else {
      setActiveTab("");
    }
  }, [pathname]);

  const handleCodesClicked = () => navigate("/dash/codes");
  const handleVaultsClicked = () => navigate("/dash/vaults");
  const handleUsersClicked = () => navigate("/dash/users");
  const handleLogoutClicked = () => sendLogout();

  const logoutButton = (
    <Button variant="outline" size="icon" onClick={handleLogoutClicked}>
      <LogOut size={17} />
    </Button>
  );

  const desktopContent = (
    <>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Button
            size="md"
            variant="ghost"
            className={`flex gap-1.5 ${
              activeTab === "codes" ? "text-blue-700 hover:text-blue-800" : ""
            }`}
            onClick={handleCodesClicked}
          >
            <ListOrdered strokeWidth={1.5} />
            Маркировки
          </Button>
          {activeTab === "codes" ? (
            <div className="h-0.5 w-full bg-blue-600 rounded-t-full absolute bottom-[-8px]"></div>
          ) : (
            ""
          )}
        </div>
        <div className="relative">
          <Button
            onClick={handleVaultsClicked}
            size="md"
            variant="ghost"
            className={`flex gap-1.5 ${
              activeTab === "vaults" ? "text-blue-700 hover:text-blue-800" : ""
            }`}
          >
            <Boxes strokeWidth={1.5} />
            Хранение
          </Button>
          {activeTab === "vaults" ? (
            <div className="h-0.5 w-full bg-blue-600 rounded-t-full absolute bottom-[-8px]"></div>
          ) : (
            ""
          )}
        </div>

        {role === "admin" ? (
          <div className="relative">
            <Button
              size="md"
              variant="ghost"
              className={`flex gap-1.5 ${
                activeTab === "users" ? "text-blue-700 hover:text-blue-800" : ""
              }`}
              onClick={handleUsersClicked}
            >
              <UserCog strokeWidth={1.5} />
              Пользователи
            </Button>
            {activeTab === "users" ? (
              <div className="h-0.5 w-full bg-blue-600 rounded-t-full absolute bottom-[-8px]"></div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex gap-3 items-center">
        <p className="text-sm">{userName}</p>
        {logoutButton}
      </div>
    </>
  );

  const mobileContent = (
    <>
      <Sheet>
        <SheetTrigger>
          <PanelLeftOpen size={25} />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetClose asChild>
            <Button
              size="md"
              variant="ghost"
              className={`flex gap-1.5 ${
                activeTab === "codes" ? "text-blue-700 hover:text-blue-800" : ""
              }`}
              onClick={handleCodesClicked}
            >
              <ListOrdered strokeWidth={1.5} />
              Маркировки
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Button
              onClick={handleVaultsClicked}
              size="md"
              variant="ghost"
              className={`flex gap-1.5 ${
                activeTab === "vaults"
                  ? "text-blue-700 hover:text-blue-800"
                  : ""
              }`}
            >
              <Boxes strokeWidth={1.5} />
              Хранение
            </Button>
          </SheetClose>

          <SheetClose asChild>
            {role == "editor" || role == "admin" ? (
              <Button
                size="md"
                variant="ghost"
                className={`flex gap-1.5 ${
                  activeTab === "users"
                    ? "text-blue-700 hover:text-blue-800"
                    : ""
                }`}
                onClick={handleUsersClicked}
              >
                <UserCog strokeWidth={1.5} />
                Пользователи
              </Button>
            ) : (
              ""
            )}
          </SheetClose>
        </SheetContent>
      </Sheet>
      <p className="text-sm">{userName}</p>
      <div className="flex gap-3 items-center">{logoutButton}</div>
    </>
  );

  const content = (
    <header className="px-3 py-2 bg-white dark:bg-slate-800 dark:text-white border-b border-slate-300">
      <div className="flex items-center justify-between">
        {isDesktop ? desktopContent : ""}

        {isMobile ? mobileContent : ""}
      </div>
    </header>
  );

  return content;
};

export default Navigation;

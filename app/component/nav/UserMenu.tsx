"use client";
import React, { useCallback } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser?: SafeUser | null | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  console.log("currentUser", currentUser);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const onLogout = useCallback(() => {
    // signOut()
  }, []);
  return (
    <>
      <div className="relative z-30">
        <div
          className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 cursor-pointer hover:shadow-md transition text-slate-500 rounded-full"
          onClick={toggleOpen}
        >
          <Avatar />

          <AiFillCaretDown />
        </div>

        {isOpen && (
          <div className="absolute rounded-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            <div>
              {currentUser ? (
                <div>
                  <Link
                    href="/orders"
                    //   className="px-4 py-3 hover:bg-slate-100 transition font-semibold"
                  >
                    <MenuItem onClick={toggleOpen}>Orders</MenuItem>
                  </Link>
                  <Link
                    href="/admin"
                    //   className="px-4 py-3 hover:bg-slate-100 transition font-semibold"
                  >
                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                  </Link>
                  <hr />
                  <MenuItem
                    onClick={() => {
                      toggleOpen();
                      signOut();
                    }}
                  >
                    Logout
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <Link
                    href="/login"
                    //   className="px-4 py-3 hover:bg-slate-100 transition font-semibold"
                  >
                    <MenuItem onClick={toggleOpen}>Login</MenuItem>
                  </Link>

                  <Link
                    href="/register"
                    //   className="px-4 py-3 hover:bg-slate-100 transition font-semibold"
                  >
                    <MenuItem onClick={toggleOpen}>Register</MenuItem>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;

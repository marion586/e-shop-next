import React from "react";
import Container from "../Container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { SafeUser } from "@/types";
import Categories from "./Categories";
import SearchBar from "../SearchBar";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = async () => {
  const currentUser: SafeUser | null | undefined = await getCurrentUser();
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between md:gap-0">
            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl`}
            >
              E-shop
            </Link>

            <div className="hidden md:block">
              <SearchBar />
            </div>

            <div className=" flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>

      <Categories />
    </div>
  );
};

export default NavBar;

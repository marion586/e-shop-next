"use client";
import React from "react";
import Container from "../Container";
import Link from "next/link";
import AdminNavItem from "./AdminNavItem";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import { AdminItemNav } from "@/utils/adminItemNav";

const AdminNav = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="w-full shadow-sm top-20  border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          {AdminItemNav &&
            AdminItemNav.map((item) => (
              <Link key={item.path} href={item.path}>
                <AdminNavItem
                  label={item.label}
                  icon={item.icon}
                  selected={pathname == item.path}
                />
              </Link>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;

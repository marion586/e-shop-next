import React from "react";
import AdminNav from "../component/admin/AdminNav";
export const metadata = {
  title: "E-Shop Admin",
  description: "E-Shop  Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <AdminNav />
      </div>

      {children}
    </div>
  );
};

export default AdminLayout;

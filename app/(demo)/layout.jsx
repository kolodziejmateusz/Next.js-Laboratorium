"use client";
import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";

function DemoLayout({ children }) {
  const { user } = useAuth();

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-end">
          <p className="btn">{user ? <>{user.email}</> : <>not logged</>}</p>
        </div>
      </div>
      <div className="container m-auto content-center">{children}</div>
    </>
  );
}

export default DemoLayout;

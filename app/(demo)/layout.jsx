"use client";
import { FcWorkflow } from "react-icons/fc";

import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";

function DemoLayout({ children }) {
  const { user } = useAuth();

  return (
    <>
      <div className="drawer drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content mx-auto m-4 w-4/6">
          <div className="navbar bg-base-100">
            <div className="navbar-end">
              <p className="btn">
                {user ? <>{user.email}</> : <>not logged</>}
              </p>
            </div>
          </div>
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {!user && (
              <li>
                <Link href="/user/login">
                  <FcWorkflow />
                  Login
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link href="/user/register">
                  <FcWorkflow />
                  Register
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link href="/user/profile">
                  <FcWorkflow />
                  Profile
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link href="/user/logout">
                  <FcWorkflow />
                  Logout
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link href="/user/movies">
                  <FcWorkflow />
                  Movies
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DemoLayout;

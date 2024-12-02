import Link from "next/link";
import { FcWorkflow } from "react-icons/fc";

function SideBar({ children }) {
  return (
    <div className="drawer drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mx-auto m-4 w-4/6">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <Link href="/user/login">
              <FcWorkflow />
              Login
            </Link>
          </li>
          <li>
            <Link href="/user/register">
              <FcWorkflow />
              Register
            </Link>
            <Link href="/user/profile">
              <FcWorkflow />
              Profile
            </Link>
            <Link href="/user/logout">
              <FcWorkflow />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;

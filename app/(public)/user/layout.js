"use client";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

function Protected({ children }) {
  // const { user } = useAuth();
  // const returnUrl = usePathname();

  // useLayoutEffect(() => {
  //   if (!user) {
  //     redirect(`/user/logout?returnUrl=${returnUrl}`);
  //   }
  // }, []);
  return <>{children}</>;
}

export default Protected;

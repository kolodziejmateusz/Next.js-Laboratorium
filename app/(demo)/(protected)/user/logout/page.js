"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const onSubmit = () => {
    signOut(auth);
    router.push("/user/login");
  };
  return (
    <>
      <div className="h-4/5">
        <form onSubmit={onSubmit}>
          <button type="submit" className="btn btn-accent w-full mt-3">
            Log Out
          </button>
        </form>
      </div>
    </>
  );
}

export default Logout;

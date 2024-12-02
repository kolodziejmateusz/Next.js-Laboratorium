import Link from "next/link";

function NotFound() {
  return (
    <>
      <h1>No such page found - 404</h1>
      <Link href="/">
        <button className="btn btn-warning mt-4 w-full">Warning</button>
      </Link>
    </>
  );
}

export default NotFound;

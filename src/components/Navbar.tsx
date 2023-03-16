import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {} from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export const Navbar: React.FC = () => {
  const { route } = useRouter();
  const { data: session } = useSession();
  return (
    <nav className="flex w-screen flex-row items-center justify-between p-4 shadow-lg sm:flex-row">
      <h2 className="text-xl">Freshii - Kanata North</h2>
      <div className="flex flex-row items-center gap-2">
        {route === "/admin" ? (
          <>
            <Link href="/" className="btn-primary btn-sm btn">
              Home
            </Link>
            {session ? (
              <button
                className="btn-secondary btn-sm btn"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => signOut()}
              >
                Log out
              </button>
            ) : (
              <button
                className="btn-secondary btn-sm btn"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => signIn()}
              >
                Log in
              </button>
            )}
          </>
        ) : (
          <Link href="/admin" className="btn-primary btn-sm btn">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

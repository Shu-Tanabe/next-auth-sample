"use client";

import { gql } from "@urql/core";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const USER_QUERY = gql`
  query {
    getUser {
      id
      email
    }
  }
`;

export default function Private() {
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: USER_QUERY,
        }),
      });
      const data = await response.json();
      console.log(data);
    };
    fetchUser();
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };
  return (
    <div>
      <h2>Settings</h2>
      <button onClick={() => handleSignOut()}>Sign out</button>
    </div>
  );
}

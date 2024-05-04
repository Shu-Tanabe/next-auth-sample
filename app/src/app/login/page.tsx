"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { status } = useSession();
  const { push } = useRouter();

  const handleClick = () => {
    if (status === "authenticated") {
      push("/private");
    } else {
      signIn("cognito", { callbackUrl: "/private" });
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <button onClick={() => handleClick()}>Login</button>
    </section>
  );
}

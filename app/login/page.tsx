import { AuthForm } from "@/components/authForm/AuthForm";
import { getSession } from "@/utils/getSession";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return <AuthForm />;
}

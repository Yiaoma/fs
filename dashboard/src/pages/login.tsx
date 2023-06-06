import Input from "../components/Input";
import { BiCircle } from "react-icons/bi";
import { Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { CgSpinner, CgClose, CgCheck } from "react-icons/cg";
import NotificationContext from "../contexts/NotificationContext";

type FormStatusType = "idle" | "loading" | "success" | "error";

const Login = () => {
  const { accessToken, login } = useContext(AuthContext);
  const { addNotification } = useContext(NotificationContext);
  const [status, setStatus] = useState<FormStatusType>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        addNotification(responseData.error);
        setStatus("error");
        setTimeout(() => {
          setStatus("idle");
        }, 2000);

        return;
      }

      login(responseData.accessToken);
      setStatus("success");
    } catch (error) {
      // Internal server error
      addNotification("Something went wrong. Please try again later.");
      console.error(error);
      setStatus("error");
    }
  };

  if (accessToken) return <Navigate to="/" />;

  return (
    <section className="flex h-screen w-full items-center bg-neutral-50">
      <div className="w-full">
        <BiCircle className="mx-auto text-5xl text-green-700" />
        <h1 className="mt-6 text-center text-2xl font-bold">
          Sign in to your account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 grid max-w-sm gap-y-6 rounded-md bg-white px-6 py-12 shadow-md sm:px-12"
        >
          <Input
            name="username"
            label="Username"
            type="text"
            pattern="^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$" // TODO: Move to constants
            required
          />
          <Input
            name="password"
            label="Password"
            type="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" // TODO: Move to constants
            required
          />
          <button
            type="submit"
            className={`${
              status === "error" ? "shake disabled:bg-red-600" : ""
            } rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors disabled:bg-neutral-500`}
            disabled={status !== "idle"}
          >
            {status === "idle" && "Sign in"}
            {status === "loading" && (
              <CgSpinner className="mx-auto animate-spin text-xl" />
            )}
            {status === "error" && <CgClose className="mx-auto text-xl" />}
            {status === "success" && <CgCheck className="mx-auto text-xl" />}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;

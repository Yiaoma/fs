import { useContext } from "react";
import Input from "../components/Input";
import { BiCircle } from "react-icons/bi";
import AuthContext from "../contexts/AuthContext";

const Index = () => {
  const { accessToken, setAccessToken } = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

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

      setAccessToken(responseData.accessToken);
    } catch (error) {
      // Internal server error
      console.error(error);
    }
  };

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
            className="rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-green-600 "
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
};

export default Index;

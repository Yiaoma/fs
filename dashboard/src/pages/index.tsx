import Input from "../components/Input";
import { BiCircle } from "react-icons/bi";

const Index = () => {
  return (
    <section className="flex h-screen w-full items-center bg-neutral-50">
      <div className="w-full">
        <BiCircle className="mx-auto text-5xl text-green-700" />
        <h1 className="mt-6 text-center text-2xl font-bold">
          Sign in to your account
        </h1>
        <form className="mx-auto mt-10 grid max-w-sm gap-y-6 rounded-md bg-white px-6 py-12 shadow-md sm:px-12">
          <Input
            name="username"
            label="Username"
            type="text"
            pattern=""
            required
          />
          <Input
            name="password"
            label="Password"
            type="password"
            pattern=""
            required
          />
          <button
            type="submit"
            className="rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
};

export default Index;

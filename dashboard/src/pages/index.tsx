import { useReducer } from "react";
import Input from "../components/Input";
import { BiCircle } from "react-icons/bi";
import { CgSpinner, CgCheck, CgClose } from "react-icons/cg";
import { formReducer } from "../reducers/formReducer";

// TODO: This is a repetitive code, move to a hook
const initialState = {
  idle: true,
  loading: false,
  success: false,
  error: false,
};

const Index = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    dispatch({ type: "LOADING" });

    setTimeout(() => {
      dispatch({ type: "ERROR" });

      setTimeout(() => {
        dispatch({ type: "RESET" });
      }, 2000);
    }, 5000);

    try {
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
            className={`${state.error ? "shake disabled:bg-red-600" : ""} ${
              state.success ? "disabled:bg-green-600" : ""
            } rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 disabled:bg-neutral-500`}
            disabled={!state.idle}
          >
            {state.idle && "Sign in"}
            {state.error && <CgClose className="mx-auto text-xl" />}
            {state.loading && (
              <CgSpinner className="mx-auto animate-spin text-xl" />
            )}
            {state.success && <CgCheck className="mx-auto text-xl" />}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Index;

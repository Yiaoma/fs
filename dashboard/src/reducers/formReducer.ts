interface FormState {
  idle: boolean;
  loading: boolean;
  success: boolean;
  error: boolean;
}

interface FormAction {
  type: "RESET" | "SUCCESS" | "LOADING" | "ERROR";
}

const initialState: FormState = {
  idle: true,
  loading: false,
  success: false,
  error: false,
};

export const formReducer = (
  state: FormState = initialState,
  action: FormAction
): FormState => {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "SUCCESS":
      return { idle: false, loading: false, error: false, success: true };
    case "LOADING":
      return { idle: false, loading: true, error: false, success: false };
    case "ERROR":
      return { idle: false, loading: false, error: true, success: false };
    default:
      return state;
  }
};

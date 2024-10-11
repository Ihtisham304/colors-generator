import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[A-Za-z]+$/,
      "Username must contain only alphabets (no special characters or numbers)."
    )
    .min(3, "Username must be at least 3 characters long.")
    .required("Please enter your username."),
  password: Yup.string()
    .required("Please enter your password."),
});

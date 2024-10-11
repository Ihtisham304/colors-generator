import * as Yup from "yup";

export const signupValidation = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[A-Za-z]+$/,
      "Username must contain only alphabets (no special characters or numbers)."
    )
    .min(3, "Username must be at least 3 characters long.")
    .required("Please enter your username."),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Please enter your email."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Please enter your password."),
});

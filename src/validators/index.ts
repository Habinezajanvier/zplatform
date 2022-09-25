import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Password is too low"
    )
    .min(4, "Password is too short - should be 4 chars minimum"),
});

export const forgetSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
})

export const resetPassword = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Password is too low"
    )
    .min(4, "Password is too short - should be 4 chars minimum"),
    re_password: Yup.ref('password'),
});

export const signUpSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("First name is required")
    .min(3, "Your first name is too short to be valid"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(3, "Your last name is too short to be valid"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Password is too low"
    )
    .min(4, "Password is too short - should be 4 chars minimum"),
});

export const profileSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("First name is required")
    .min(3, "Your first name is too short to be valid"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(3, "Your last name is too short to be valid"),
  gender: Yup.string(),
  dob: Yup.date(),
  maritalStatus: Yup.string(),
  nationality: Yup.string(),
  profile: Yup.string().nullable(),
});

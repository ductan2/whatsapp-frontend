import * as Yup from 'yup';

export const authSchema = Yup.object({
   name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be between 2 and 16 characters.")
      .max(25, "Name must be between 2 and 16 characters."),
   email: Yup.string()
      .required("Email is required.")
      .email("Invalid email address."),
   status: Yup.string().max(64, "Status must be less than 64 characters."),
   password: Yup.string()
      .required("Password is required.")
      .min(6)
      .max(60)
      .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
         "Password must contain atleast 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
      ),
   confirm_password: Yup.string()
      .required("Password is required.")
      .oneOf([Yup.ref('password')], 'Password does not match.')
});
export type Schema = Yup.InferType<typeof authSchema>
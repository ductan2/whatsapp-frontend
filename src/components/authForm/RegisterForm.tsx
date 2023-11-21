import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Schema, authSchema } from "../../utils/validation";
import CustomInput from "../input/CustomInput";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { PulseLoader } from "react-spinners";
import { registerUser } from "../../feature/user/user.slice";
import { RegisterType } from "../../types/user.type";
import { Link } from "react-router-dom";
type FormData = Pick<Schema, "email" | "password" | "confirm_password" | "name">;
const registerSchema = authSchema.pick(["email", "password", "confirm_password", "name"]);

const RegisterForm = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
   } = useForm<FormData>({
      resolver: yupResolver(registerSchema),
   });
   const dispatch = useAppDispatch();
   const { loading, error } = useSelector((state: RootState) => state.user);
   const onSubmit = async (data: RegisterType) => {
      const response = await dispatch(registerUser(data));
      if (response.meta.requestStatus === "rejected") {
         if (error && error.length > 0) {
            error.forEach((err) => {
               setError(err.path as keyof FormData, {
                  message: err.message,
                  type: "Server",
               });
            });
         }
      } else {
         reset();
      }
   };

   return (
      <div className="h-screen w-full flex items-center justify-center overflow-hidden">
         <div className="max-w-3xl w-[30rem] space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
            <div className="text-center dark:text-dark_text_1">
               <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
               <p className="mt-2 text-sm">Sign up</p>
               <p>
                  Already have an account? {" "}
                  <Link to={"/login"} className="text-green-400">
                     Login
                  </Link>
               </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
               <CustomInput
                  label="Name"
                  name="name"
                  register={register}
                  error={errors.name?.message}
                  type="text"
                  placeholder="Đức Tân"
               />
               <CustomInput
                  label="Email"
                  name="email"
                  register={register}
                  error={errors.email?.message}
                  type="text"
                  placeholder="example@gmail.com"
               />
               <CustomInput
                  label="Password"
                  name="password"
                  register={register}
                  error={errors.password?.message}
                  type="password"
                  placeholder="Password"
               />
               <CustomInput
                  label="Confirm password"
                  name="confirm_password"
                  register={register}
                  error={errors.confirm_password?.message}
                  type="password"
                  placeholder="Confirm password"
               />
               <button
                  className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
                  font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300 "
                  type="submit">
                  {loading ? (
                     <>
                        <PulseLoader loading={loading} />
                     </>
                  ) : (
                     "Sign up"
                  )}
               </button>
            </form>
         </div>
      </div>
   );
};

export default RegisterForm;

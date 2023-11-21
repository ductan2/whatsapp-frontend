import { useSelector } from "react-redux";
import CustomInput from "../input/CustomInput";
import { RootState, useAppDispatch } from "../../store/store";
import { useForm } from "react-hook-form";
import { Schema, authSchema } from "../../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginType } from "../../types/user.type";

import { PulseLoader } from "react-spinners";
import { loginUser } from "../../feature/user/user.slice";
import { Link } from "react-router-dom";
type FormData = Pick<Schema, "email" | "password">;
const loginSchema = authSchema.pick(["email", "password"]);

const LoginForm = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
   } = useForm<FormData>({
      resolver: yupResolver(loginSchema),
   });
   const dispatch = useAppDispatch();
   const { loading, error } = useSelector((state: RootState) => state.user);
   const onSubmit = async (data: LoginType) => {
      const response = await dispatch(loginUser(data));
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
               <p className="mt-2 text-sm">Sign in</p>
               <p>
                  Don't have an account? {" "}
                  <Link to={"/register"} className="text-green-400">Create here</Link>
               </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
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

export default LoginForm;

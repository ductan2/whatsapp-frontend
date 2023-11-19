import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form"

interface CustomInput<TFieldValues extends FieldValues> {
   register: UseFormRegister<TFieldValues>,
   error?: string,
   type: React.HTMLInputTypeAttribute
   name: FieldPath<TFieldValues>,
   label: string
   className?: string
   placeholder?: string
}
const CustomInput = <TFieldValues extends FieldValues = FieldValues>({ type, name, placeholder, register, error, label, className }: CustomInput<TFieldValues>) => {
   return (
      <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
         <label htmlFor={name} className="text-sm font-bold">
            {label}
         </label>
         <input type={type} className={`w-full dark:bg-dark_bg_3 py-2 dark:color-white px-4 rounded-lg outline-none text-base ${className}`}
            placeholder={placeholder} {...register(name)}
         />
         {error && <p className="text-red-600">{error}</p>}
      </div>
   )
}

export default CustomInput
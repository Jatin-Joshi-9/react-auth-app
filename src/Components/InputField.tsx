import { Field } from "formik";
import { ErrorMessage } from "formik";
interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  textarea?: boolean;
  rows?: number;
}
const InputField = ({label,name,type,textarea=false,rows}:InputFieldProps) => {
  const as = textarea ? "textarea" : "input";
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="label font-bold self-start">{label}</label>
      <Field className="input border-2 border-blue-400 rounded-xl py-1 px-4"
        name={name}
        type={type}
        as = {as}
        rows={as === "textarea" ? rows : undefined}
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  )
}

export default InputField;
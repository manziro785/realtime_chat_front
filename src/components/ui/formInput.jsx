import { InputClass } from "../../styles";

export const FormInput = ({
  label,
  LabelColor = "text-gray-600",
  ...props
}) => {
  return (
    <div className="mt-5 first:mt-0">
      {label && <p className={`text-lg mb-2 ${LabelColor}`}>{label}</p>}
      <input className={InputClass} {...props} />
    </div>
  );
};

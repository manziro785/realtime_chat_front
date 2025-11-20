import { InputClass } from "../../styles";

export const InputWithIcon = ({
  icon: Icon,
  iconText,
  value,
  onChange,
  ...inputProps
}) => (
  <div className="flex items-start gap-4">
    <div className="mt-1">
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        {Icon ? (
          <Icon size={20} className="text-gray-600" />
        ) : (
          <span className="text-gray-600 font-semibold text-lg">
            {iconText}
          </span>
        )}
      </div>
    </div>
    <div className="flex-1">
      <input
        value={value}
        onChange={onChange}
        className={InputClass}
        {...inputProps}
      />
    </div>
  </div>
);

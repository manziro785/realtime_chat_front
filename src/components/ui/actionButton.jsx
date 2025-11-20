import { ButtonPrimaryClass, ButtonSecondaryClass } from "../../styles";

export const ActionButtons = ({
  onCancel,
  onSubmit,
  cancelText = "Close",
  submitText = "Submit",
  showCancel = true,
}) => (
  <div className="flex gap-2 mt-10">
    {showCancel && (
      <button onClick={onCancel} className={ButtonSecondaryClass}>
        {cancelText}
      </button>
    )}
    <button onClick={onSubmit} className={ButtonPrimaryClass}>
      {submitText}
    </button>
  </div>
);

import { useState } from "react";
import { BaseModal } from "./BaseModal";
import { ActionButtons } from "../ui/actionButton";
import { useJoinChannel } from "../../hooks/channel/useJoinChannel";

export default function EnterCodeModal({ open, onClose = () => {} }) {
  const { joinChannel, isPending } = useJoinChannel();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setError("");
    let input = e.target.value;
    if (!input.startsWith("#")) {
      input = "#" + input;
    }
    input = "#" + input.slice(1).replace(/[^A-Za-z0-9]/g, "");
    input = input.toUpperCase();
    if (input.length > 7) {
      input = input.slice(0, 7);
    }
    setValue(input);
  };

  const handleSubmit = async () => {
    if (value.length < 7) {
      setError("Code must be 6 characters");
      return;
    }
    try {
      await joinChannel(value);
      setValue("");
      setError("");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to join channel");
    }
  };

  const handleClose = () => {
    setValue("");
    setError("");
    onClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose} showCloseButton={false}>
      <div>
        <p className="text-gray-400 text-lg mb-2">Enter Admin code of group</p>
        <input
          type="text"
          placeholder="#ABC123"
          value={value}
          onChange={handleChange}
          disabled={isPending}
          className="w-full px-3 mt-2 py-2 text-xl border-2 border-[#363946] placeholder-[#6A7282] text-[var(--color-text)] bg-[#1A1D29] rounded-lg focus:ring-2 focus:ring-[#363946] disabled:opacity-50"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <ActionButtons
          onCancel={handleClose}
          onSubmit={handleSubmit}
          cancelText="Close"
          submitText={isPending ? "Joining..." : "Join"}
          disabled={isPending || value.length < 7}
        />
      </div>
    </BaseModal>
  );
}

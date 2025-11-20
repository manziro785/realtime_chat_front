import { useState } from "react";
import { BaseModal } from "./BaseModal";
import { FormInput } from "../ui/formInput";
import { ActionButtons } from "../ui/actionButton";
import { useCreateChannel } from "../../hooks/channel/useCreateChannel";

export const CreateGroupModal = ({ open, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { createChannel, isPending } = useCreateChannel();

  const handleSubmit = () => {
    const data = {
      name: groupName,
      description: description,
      ...(selectedFile && { avatar: selectedFile }),
    };
    createChannel(data);
    onClose();
  };

  const handleClose = () => {
    setGroupName("");
    setDescription("");
    setSelectedFile(null);
    onClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose} showCloseButton={false}>
      <FormInput
        label="Group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
      />
      <FormInput
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
      />
      <ActionButtons
        onCancel={handleClose}
        onSubmit={handleSubmit}
        submitText="Create"
        disabled={!groupName.trim() || isPending}
      />
    </BaseModal>
  );
};

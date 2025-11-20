import { useState, useEffect } from "react";
import { BaseModal } from "./BaseModal";
import { FormInput } from "../ui/formInput";
import { ActionButtons } from "../ui/actionButton";
import { useUpdateChannel } from "../../hooks/channel/useUpdateChannel";
import { useChannelContext } from "../../hooks/channel/useChannelContext";

export const EditGroupModal = ({ open, onClose = () => {} }) => {
  const { activeChannel, refetchChannels } = useChannelContext();
  const { updateChannel, isPending, error } = useUpdateChannel();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (activeChannel) {
      setGroupName(activeChannel.name || "");
      setDescription(activeChannel.description || "");
    }
  }, [activeChannel]);

  const handleSave = async () => {
    if (!activeChannel?.id) {
      console.error("No active channel");
      return;
    }

    if (!groupName.trim()) {
      console.error("Group name is required");
      return;
    }

    try {
      await updateChannel({
        idChannel: activeChannel.id,
        channelData: {
          name: groupName.trim(),
          description: description.trim(),
        },
      });

      console.log("Group updated successfully");

      if (refetchChannels) {
        await refetchChannels();
      }

      onClose();
    } catch (err) {
      console.error("Error updating group:", err);
    }
  };

  if (!activeChannel) {
    return null;
  }

  return (
    <BaseModal open={open} onClose={onClose} title="Edit Group">
      <div className="px-6 py-6">
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error.message || "Failed to update group"}
            </div>
          )}
          <FormInput
            label="Group name"
            labelColor="text-blue-500"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            disabled={isPending}
          />
          <FormInput
            label="Description"
            labelColor="text-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isPending}
          />
          <ActionButtons
            onCancel={onClose}
            onSubmit={handleSave}
            submitText={isPending ? "Saving..." : "Save"}
            showCancel={false}
            disabled={isPending}
          />
        </div>
      </div>
    </BaseModal>
  );
};

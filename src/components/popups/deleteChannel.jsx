import { ActionButtons } from "../ui/actionButton";
import { BaseModal } from "./BaseModal";
import { useDeleteChannel } from "../../hooks/channel/useDeleteChannel";
import { useChannelContext } from "../../hooks/channel/useChannelContext";

export default function DeleteChannel({ open, onClose }) {
  const { deleteChannel, isPending } = useDeleteChannel();
  const { activeChannel } = useChannelContext();

  const handleDelete = async () => {
    try {
      await deleteChannel({ channelId: activeChannel.id });
      onClose();
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose}>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-red-500">
          Delete Channel
        </h2>
        <p className="text-gray-400 text-base mb-2">
          Are you sure you want to delete the channel{" "}
          <span className="font-semibold text-white">
            #{activeChannel?.name}
          </span>
          ?
        </p>
        <p className="text-gray-500 text-sm mb-6">
          This action cannot be undone.
        </p>
        <ActionButtons
          onCancel={onClose}
          onSubmit={handleDelete}
          cancelText="Cancel"
          submitText={isPending ? "Deleting..." : "Yes, Delete"}
          disabled={isPending}
        />
      </div>
    </BaseModal>
  );
}

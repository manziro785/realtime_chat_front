import { ActionButtons } from "../ui/actionButton";
import { BaseModal } from "./BaseModal";
import { useDeleteChannelMember } from "../../hooks/members/useDeleteChannelMember";

export default function DeleteMember({ open, onClose, member }) {
  const { deleteMember, isPending } = useDeleteChannelMember();
  const handleDelete = async () => {
    try {
      await deleteMember({ memberId: member.id });
      onClose();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose}>
      <div>
        <h2 className="text-xl font-semibold mb-4">Delete Member</h2>
        <p className="text-gray-400 text-lg mb-6">
          Are you sure you want to remove{" "}
          <span className="font-semibold text-white">{member?.nickname}</span>{" "}
          from this channel?
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

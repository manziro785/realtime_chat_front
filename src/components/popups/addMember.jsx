import { useState } from "react";
import { ActionButtons } from "../ui/actionButton";
import { BaseModal } from "./BaseModal";
import { useAddMember } from "../../hooks/members/useAddMember";
import { useSearchUsers } from "../../hooks/useSearchUsers";
import { X, Search, UserPlus } from "lucide-react";

export default function AddMember({ open, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { addMember, isPending } = useAddMember();
  const { data, isLoading } = useSearchUsers(searchQuery);
  const users = data?.users || [];

  const handleAdd = async () => {
    if (!selectedUser) return;

    try {
      await addMember({ userId: selectedUser.id });
      setSearchQuery("");
      setSelectedUser(null);
      onClose();
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setSelectedUser(null);
    onClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Member</h2>
          <X
            onClick={handleClose}
            className="cursor-pointer hover:text-gray-400 transition"
          />
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedUser(null);
              }}
              placeholder="Search users by nickname..."
              className="w-full bg-[#1a1d29] border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6 max-h-60 overflow-y-auto">
          {isLoading && searchQuery.trim() && (
            <p className="text-gray-500 text-center py-4">Searching...</p>
          )}

          {!isLoading && searchQuery.trim() && users.length === 0 && (
            <p className="text-gray-500 text-center py-4">No users found</p>
          )}

          {!isLoading && users.length > 0 && (
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                    selectedUser?.id === user.id
                      ? "bg-blue-600"
                      : "bg-[#252936] hover:bg-[#313747]"
                  }`}
                >
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.nickname}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-sm font-semibold">
                        {user.nickname?.charAt(0).toUpperCase() || "?"}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user.nickname}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  {selectedUser?.id === user.id && (
                    <UserPlus className="w-5 h-5 text-white" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <ActionButtons
          onCancel={handleClose}
          onSubmit={handleAdd}
          cancelText="Cancel"
          submitText={isPending ? "Adding..." : "Add Member"}
          disabled={isPending || !selectedUser}
        />
      </div>
    </BaseModal>
  );
}

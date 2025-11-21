import { Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { BaseModal } from "./BaseModal";
import { InputWithIcon } from "../ui/inputWithIcon";
import { ActionButtons } from "../ui/actionButton";
import { useGetProfile } from "../../hooks/profile/useGetProfile";
import { useUpdateProfile } from "../../hooks/profile/useUpdateProfile";

export const EditProfileModal = ({ open, onClose }) => {
  const { data, isPending: isLoadingProfile } = useGetProfile();
  const { updateProfile, isPending: isUpdating } = useUpdateProfile();
  const profile = data?.user || {};
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (profile && open) {
      setEmail(profile.email || "");
      setNickname(profile.nickname || "");
    }
  }, [profile, open]);

  const handleSubmit = async () => {
    try {
      const updateData = {};

      if (email !== profile.email) {
        updateData.email = email;
      }

      if (nickname !== profile.nickname) {
        updateData.nickname = nickname;
      }

      if (Object.keys(updateData).length === 0) {
        onClose();
        return;
      }

      await updateProfile(updateData);
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleClose = () => {
    setEmail(profile.email || "");
    setNickname(profile.nickname || "");
    onClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose} title="Profile">
      <div className="px-6 py-6">
        {isLoadingProfile ? (
          <div className="text-center text-gray-400 py-8">
            Loading profile...
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                <span className="text-3xl font-semibold text-white">
                  {(nickname || profile.nickname)?.charAt(0).toUpperCase() ||
                    "?"}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100">
                  {nickname || profile.nickname}
                </h3>
                <p className="text-sm text-blue-500">online</p>
              </div>
            </div>

            <div className="space-y-4">
              <InputWithIcon
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                disabled
              />
              <InputWithIcon
                iconText="@"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nickname"
              />
              <ActionButtons
                onCancel={handleClose}
                onSubmit={handleSubmit}
                submitText={isUpdating ? "Saving..." : "Save"}
                disabled={isUpdating || !nickname.trim()}
                showCancel={true}
              />
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
};

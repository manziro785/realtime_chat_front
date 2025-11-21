import { Edit, Users, Plus, BadgeMinus } from "lucide-react";
import { useChannelContext } from "../../hooks/channel/useChannelContext";
import { useGetChannelMembers } from "../../hooks/members/useGetChannelMembers";
import { ButtonPrimaryClass } from "../../styles";

export default function InfoBlock({ openModal, handleDeleteClick }) {
  const { activeChannel } = useChannelContext();
  const { data } = useGetChannelMembers();

  return (
    <>
      {activeChannel && (
        <div className="w-60 bg-[#252936] p-4 flex flex-col h-full">
          {activeChannel?.role === "admin" && (
            <Edit
              size={20}
              className="text-gray-600 cursor-pointer hover:text-gray-400"
              onClick={() => openModal("edit")}
            />
          )}
          <div className="flex justify-center flex-col items-center mt-4">
            {activeChannel.avatar_url ? (
              <img
                src={activeChannel.avatar_url}
                alt={activeChannel.name}
                className="w-30 h-30 rounded-full object-cover cursor-pointer"
              />
            ) : (
              <div className="w-30 h-30 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center cursor-pointer">
                <span className="text-4xl font-semibold">
                  {activeChannel.name?.charAt(0).toUpperCase() || "#"}
                </span>
              </div>
            )}
            <span className="font-semibold mt-5 text-xl">
              {activeChannel.name}
            </span>
            <p className="text-gray-400 text-sm px-2 text-center">
              {activeChannel.description}
            </p>
          </div>
          <div className="flex items-center gap-2 mb-4 mt-10 text-xs font-semibold text-gray-400 uppercase">
            <div className="flex-1 flex ">
              <Users className="w-4 h-4 mr-1" />
              Members — {data?.count || 0}
            </div>

            {activeChannel?.role === "admin" && (
              <Plus
                className="w-4 h-4 cursor-pointer hover:text-gray-200 transition"
                onClick={() => openModal("add_member")}
              />
            )}
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {data?.members?.map((user) => {
              const isAdmin = user.id === activeChannel.creator_id;

              return (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 rounded hover:bg-[#313747] transition"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-sm font-semibold">
                        {user.nickname?.charAt(0).toUpperCase() || "?"}
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2b2d31] bg-green-500"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{user.nickname}</p>
                      {isAdmin && (
                        <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-semibold">
                          ADMIN
                        </span>
                      )}
                    </div>
                  </div>
                  {activeChannel?.role === "admin" && !isAdmin && (
                    <BadgeMinus
                      size={20}
                      onClick={() => handleDeleteClick(user)}
                      className="cursor-pointer stroke-white-400 hover:stroke-red-500 transition"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            {activeChannel?.role === "admin" && (
              <button
                onClick={() => openModal("delete_channel")}
                className={`${ButtonPrimaryClass} text-sm bg-red-600 cursor-pointer hover:bg-red-800 transition duration-200`}
              >
                Delete channel
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

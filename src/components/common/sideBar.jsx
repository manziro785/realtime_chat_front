import { Hash, MessageSquare, Plus, Search } from "lucide-react";
import { useGetChannel } from "../../hooks/channel/useGetChannel";
import { useChannelContext } from "../../hooks/channel/useChannelContext";
import { useGetProfile } from "../../hooks/profile/useGetProfile";

export default function SideBar({ openModal }) {
  const { data, isPending, error } = useGetChannel();
  const { activeChannel, setActiveChannel } = useChannelContext();
  const { data: data2, isPending: isPending2, error: error2 } = useGetProfile();
  const profile = data2?.user || [];
  const channels = data?.channels || [];

  const handleChannelClick = (channel) => {
    setActiveChannel(channel);
  };

  return (
    <div className="w-90 h-full bg-[#252936] flex flex-col">
      <div
        onClick={() => openModal("profile")}
        className="hover:bg-[#25293698] cursor-pointer p-4 flex items-center gap-3 border-b border-[#1e1f22]"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
          <span className="text-lg font-semibold">
            {" "}
            {profile?.nickname?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <p className="font-semibold">{profile.nickname}</p>
        </div>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[var(--color-bg)] rounded px-9 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="px-3 pb-3 space-y-2 flex gap-x-2">
        <button
          onClick={() => openModal("group")}
          className="flex justify-center w-full bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2 transition mb-0"
        >
          <Plus className="w-4 h-4" />
          Create group
        </button>
        <button
          onClick={() => openModal("code")}
          className="flex justify-center w-full bg-[var(--color-bg)] hover:bg-[#35373c] rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2 transition"
        >
          <Hash className="w-4 h-4" />
          Enter code
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mt-6">
        <div className="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase">
          Channels / Friends ({channels.length})
        </div>

        {isPending && (
          <div className="text-center text-gray-400 py-4">Loading...</div>
        )}

        {error && (
          <div className="text-center text-red-500 py-4">
            Error loading channels
          </div>
        )}

        {!isPending && !error && channels.length === 0 && (
          <div className="text-center text-gray-400 py-4">No channels yet</div>
        )}

        {channels.map((channel) => (
          <div
            key={channel.id}
            onClick={() => handleChannelClick(channel)}
            className={`mx-2 mb-1 px-3 py-2 rounded flex items-center gap-3 cursor-pointer transition ${
              activeChannel?.id === channel.id
                ? "bg-[#313747] text-white"
                : "text-gray-200 hover:bg-[#313747] hover:text-gray-200"
            }`}
          >
            {channel.avatar_url ? (
              <img
                src={channel.avatar_url}
                alt={channel.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                <span className="text-lg font-semibold">
                  {channel.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{channel.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {channel.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

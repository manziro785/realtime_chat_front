import { Hash, Menu, MessageSquare } from "lucide-react";
import { useChannelContext } from "../../hooks/channel/useChannelContext";
import { useChannelMessages } from "../../hooks/message/useChannelMessages";

export default function Header({ setShowSidebar, setShowInfo }) {
  const { isConnected } = useChannelMessages();
  const { activeChannel } = useChannelContext();

  return (
    <div className="h-14 flex justify-between border-b bg-[var(--color-bg)] border-[#1e1f22] px-3 sm:px-4 items-center gap-2">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
          onClick={() => setShowSidebar(true)}
          className="lg:hidden p-2 hover:bg-[#2b2d31] rounded transition"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
        <span className="font-semibold text-sm sm:text-base truncate">
          {activeChannel.name}
        </span>
        {!isConnected && (
          <span className="text-xs text-red-500 hidden sm:inline">
            (Disconnected)
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-xs text-gray-500 hidden sm:block">
          Admin code • {activeChannel.admin_code}
        </p>
        <button
          onClick={() => setShowInfo(true)}
          className="lg:hidden p-2 hover:bg-[#2b2d31] rounded transition"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

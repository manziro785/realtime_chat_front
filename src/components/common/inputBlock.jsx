import { Send } from "lucide-react";
import { useChannelContext } from "../../hooks/channel/useChannelContext";
import { useChannelMessages } from "../../hooks/message/useChannelMessages";

export default function InputBlock({ message, setMessage, handleSendMessage }) {
  const { activeChannel } = useChannelContext();
  const { isConnected } = useChannelMessages();

  return (
    <>
      <div className="p-3 sm:p-4 border-t border-[#1e1f22] safe-bottom">
        <div className="bg-[#252936] rounded-lg flex items-center px-3 sm:px-4 py-2 sm:py-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message #${activeChannel.name}`}
            className="flex-1 bg-transparent focus:outline-none text-sm sm:text-base text-gray-200 placeholder-gray-500"
            disabled={!isConnected}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 text-blue-500 hover:text-blue-400 transition disabled:text-gray-600 p-1"
            disabled={!isConnected || !message.trim()}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </>
  );
}

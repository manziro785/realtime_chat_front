import { MessageSquare } from "lucide-react";

export default function MessageArea({
  allMessages,
  id_current_user,
  messagesEndRef,
}) {
  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-hide">
      {allMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
          <p className="text-base sm:text-lg">No messages yet</p>
          <p className="text-xs sm:text-sm">Be the first to send a message!</p>
        </div>
      ) : (
        <>
          {allMessages.map((msg, index) => {
            const isMine =
              id_current_user &&
              String(msg.sender_id) === String(id_current_user);
            const nickname =
              msg.sender_nickname || msg.senderNickname || "Unknown";
            const timestamp = msg.created_at || msg.createdAt;
            const messageContent = msg.content || msg.text;

            return (
              <div
                key={msg.id || `msg-${index}`}
                className="flex gap-2 sm:gap-3 items-start"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs sm:text-sm font-semibold">
                    {nickname?.[0]?.toUpperCase() || "?"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-semibold text-xs sm:text-sm">
                      {nickname}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      {new Date(timestamp).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="mt-1 px-3 py-2 sm:px-4 sm:py-2 rounded-lg inline-block bg-[#2b2d31] text-gray-300 max-w-full">
                    <p className="text-sm sm:text-base break-words">
                      {messageContent}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}

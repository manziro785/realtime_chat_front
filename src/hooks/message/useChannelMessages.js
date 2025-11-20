import { useState, useEffect } from "react";
import { useSocket } from "../../contexts/socketContext";
import { useChannelContext } from "../channel/useChannelContext";
import { useQueryClient } from "@tanstack/react-query";

//  Custom hook for managing real-time channel messages and socket communication
//  This hook handles:
//  - Joining/leaving channels via WebSocket
//  - Receiving new messages in real-time
//  - Sending messages to the channel
//  - Tracking user typing indicators
//  - Monitoring user online/offline status
//
//  @returns {Object} Object containing messages array, send functions, and connection status
//
export const useChannelMessages = () => {
  const { socket, isConnected } = useSocket();
  const { activeChannel } = useChannelContext();
  const [messages, setMessages] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket || !activeChannel?.id || !isConnected) return;
    socket.emit("join_channel", { channelId: activeChannel.id });

    const handleNewMessage = (message) => {
      console.log("New message received:", message);
      setMessages((prev) => [...prev, message]);
    };

    const handleTyping = (data) => {
      console.log(" User typing:", data.nickname);
    };

    const handleUserStatus = (data) => {
      console.log("User status:", data);
      queryClient.invalidateQueries(["channel-members", activeChannel.id]);
    };

    socket.on("new_message", handleNewMessage);
    socket.on("typing_indicator", handleTyping);
    socket.on("user_status", handleUserStatus);

    return () => {
      console.log("Leaving channel:", activeChannel.id);
      socket.emit("leave_channel", { channelId: activeChannel.id });
      socket.off("new_message", handleNewMessage);
      socket.off("typing_indicator", handleTyping);
      socket.off("user_status", handleUserStatus);
    };
  }, [socket, activeChannel?.id, isConnected, queryClient]);

  const sendMessage = (content) => {
    if (!socket || !activeChannel?.id || !content.trim()) return;

    socket.emit("send_message", {
      channelId: activeChannel.id,
      content: content.trim(),
    });
  };

  const sendTyping = () => {
    if (!socket || !activeChannel?.id) return;
    socket.emit("typing", { channelId: activeChannel.id });
  };

  const stopTyping = () => {
    if (!socket || !activeChannel?.id) return;
    socket.emit("stop_typing", { channelId: activeChannel.id });
  };

  return {
    messages,
    sendMessage,
    sendTyping,
    stopTyping,
    isConnected,
  };
};

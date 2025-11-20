import { createContext, useState, useMemo } from "react";
import { useGetChannel } from "../hooks/channel/useGetChannel";

export const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const [activeChannelId, setActiveChannelId] = useState(null);
  const { data: channels, isLoading } = useGetChannel();

  const activeChannel = useMemo(() => {
    if (!activeChannelId || !channels) return null;
    return channels.channels.find((ch) => ch.id === activeChannelId) || null;
  }, [channels, activeChannelId]);

  const setActiveChannel = (channel) => {
    setActiveChannelId(channel?.id || null);
  };

  return (
    <ChannelContext.Provider
      value={{
        channels,
        activeChannel,
        setActiveChannel,
        isLoading,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

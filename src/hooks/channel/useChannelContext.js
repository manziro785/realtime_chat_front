import { useContext } from "react";
import { ChannelContext } from "../../contexts/channelContext";

export const useChannelContext = () => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error("context error");
  }
  return context;
};

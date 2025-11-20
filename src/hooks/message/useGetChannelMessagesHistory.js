import { useQuery } from "@tanstack/react-query";
import { getChannelMessages } from "../../api/message";
import { useChannelContext } from "../channel/useChannelContext";

export const useGetChannelMessagesHistory = () => {
  const { activeChannel } = useChannelContext();

  return useQuery({
    queryKey: ["channel-messages", activeChannel?.id],
    queryFn: () => getChannelMessages(activeChannel.id),
    enabled: !!activeChannel?.id,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getChannelMembers } from "../../api/members";
import { useChannelContext } from "../channel/useChannelContext";

export const useGetChannelMembers = () => {
  const { activeChannel } = useChannelContext();
  const id_channel = activeChannel?.id;

  return useQuery({
    queryKey: ["members", id_channel],
    queryFn: () => getChannelMembers(id_channel),
    enabled: !!id_channel,
  });
};

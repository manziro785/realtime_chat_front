import { useQuery } from "@tanstack/react-query";
import { getChannels } from "../../api/channel";

export const useGetChannel = () => {
  return useQuery({
    queryKey: ["channels"],
    queryFn: getChannels,
  });
};

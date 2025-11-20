import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/users";

export const useSearchUsers = (query) => {
  return useQuery({
    queryKey: ["members", query],
    queryFn: () => searchUsers(query),
    enabled: query.trim().length > 0,
    staleTime: 30000,
  });
};

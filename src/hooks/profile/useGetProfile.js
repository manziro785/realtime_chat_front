import { useQuery } from "@tanstack/react-query";
import { getMeInfo } from "../../api/profile";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: getMeInfo,
  });
};

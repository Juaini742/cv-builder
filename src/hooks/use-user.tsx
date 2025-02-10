import { fetchUserData } from "@/lib/api";
import { IUser } from "@/lib/interfaces";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

interface IUserContext {
  user: IUser;
  isSingleCvLoading: boolean;
}

const useUserStore = create<IUserContext>((set) => ({
  user: {} as IUser,
  isSingleCvLoading: false,
  setUser: (user: IUser) => set({ user }),
}));

export const useUser = () => {
  const { setUser, user } = useUserStore() as IUserContext & {
    setUser: (user: IUser) => void;
  };

  const { isLoading: isSingleCvLoading } = useQuery({
    queryFn: async () => {
      const res: IUser = await fetchUserData();
      setUser(res);
      return res;
    },
    queryKey: ["user"],
  });

  return {
    user,
    isSingleCvLoading,
  };
};

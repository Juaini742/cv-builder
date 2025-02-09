import { fetchSingleCvData } from "@/lib/api";
import { ICv } from "@/lib/interfaces";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

interface ICvContext {
  cv: ICv;
  isSingleCvLoading: boolean;
}

const useCvStore = create<ICvContext>((set) => ({
  cv: {} as ICv,
  isSingleCvLoading: false,
  setCv: (cv: ICv) => set({ cv }),
}));

export const useSingleCv = (id: string) => {
  const { setCv, cv } = useCvStore() as ICvContext & {
    setCv: (cv: ICv) => void;
  };

  const { isLoading: isSingleCvLoading } = useQuery({
    queryFn: async () => {
      const res: ICv = await fetchSingleCvData(id);
      setCv(res);
      return res;
    },
    queryKey: ["cv", id],
  });

  return {
    cv,
    isSingleCvLoading,
  };
};

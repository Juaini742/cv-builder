import { Loader } from "lucide-react";
import React from "react";

export default function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="w-full absolute z-[9999999] top-0 right-0 bottom-0 left-0 bg-white/25 backdrop-blur-sm flex flex-col justify-center items-center">
      <Loader className="animate-spin size-10 mb-2" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

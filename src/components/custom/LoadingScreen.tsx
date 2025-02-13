import React from "react";
import { FadeLoader } from "react-spinners";

export default function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="w-full absolute z-[9999999] top-0 right-0 bottom-0 left-0 bg-white/25 backdrop-blur-sm flex flex-col justify-center items-center">
      <FadeLoader
        color="#2460eb"
        width={10}
        height={30}
        radius={5}
        margin={15}
      />
      <p className="text-primary font-bold text-center mt-8">{message}</p>
    </div>
  );
}

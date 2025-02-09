"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ReactQueryConfiguration({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

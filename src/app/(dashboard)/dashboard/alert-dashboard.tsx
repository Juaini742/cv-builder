"use client";

import { useEffect, useState } from "react";

export default function AlertDashboard() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasSeenAlert = localStorage.getItem("seenMobileAlert");

    if (isMobile && !hasSeenAlert) {
      setShowAlert(true);
      localStorage.setItem("seenMobileAlert", "true");
    }
  }, []);

  if (!showAlert) return null;

  return (
    <div className="fixed top-5 w-full left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-md text-sm font-medium z-50">
      ⚠️ For the best experience, we recommend using a laptop or desktop.
    </div>
  );
}

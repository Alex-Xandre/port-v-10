"use client";

import { useEffect } from "react";

export default function Oneko() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/oneko.js";
    document.body.appendChild(script);
    return () => {
      script.remove();
      document.getElementById("oneko")?.remove();
    };
  }, []);

  return null;
}

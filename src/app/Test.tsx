"use client";

import Script from "next/script";
import { useState } from "react";

export default function TestPage() {
  const [isAttributeLoaded, setIsAttributeLoaded] = useState(false);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Colors Page</h1>
      </main>
      <Script
          src="https://chir.ag/projects/ntc/ntc.js"
          strategy="afterInteractive"
          onLoad={() => {
            console.log("NTC is loaded");
            setIsAttributeLoaded(true)}
          }
        />
    </>

  )
}
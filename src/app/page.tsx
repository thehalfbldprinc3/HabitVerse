"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignedInLanding from "@/components/landing/signedInLanding";
import PublicLanding from "@/components/landing/publicLanding";



export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden overflow-y-auto">
      <SignedIn>
        <SignedInLanding />
      </SignedIn>
      <SignedOut>
        <PublicLanding />
      </SignedOut>
      
    </div>
  );
}
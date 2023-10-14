'use client';

import {
  SessionProvider,
  SessionProviderProps
} from "next-auth/react";

export default function AuthContext({
  children,
}: SessionProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
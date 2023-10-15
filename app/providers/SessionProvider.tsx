'use client';

import {
  SessionProvider as Provider,
  SessionProviderProps
} from "next-auth/react";

export default function SessionProvider({
  children,
}: SessionProviderProps) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}

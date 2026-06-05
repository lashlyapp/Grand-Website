"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Room } from "@/content/rooms";
import RoomModal from "./RoomModal";

type RoomDetailContextValue = {
  room: Room | null;
  openRoom: (room: Room) => void;
  closeRoom: () => void;
};

const RoomDetailContext = createContext<RoomDetailContextValue | null>(null);

export function useRoomDetail() {
  const ctx = useContext(RoomDetailContext);
  if (!ctx) {
    throw new Error("useRoomDetail must be used within a RoomDetailProvider");
  }
  return ctx;
}

// Holds the "active room" for the room detail / virtual-tour modal at the app
// root so any room card on any page can open it. Renders the modal once.
export function RoomDetailProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room | null>(null);

  const openRoom = useCallback((next: Room) => setRoom(next), []);
  const closeRoom = useCallback(() => setRoom(null), []);

  const value = useMemo(
    () => ({ room, openRoom, closeRoom }),
    [room, openRoom, closeRoom],
  );

  return (
    <RoomDetailContext.Provider value={value}>
      {children}
      <RoomModal />
    </RoomDetailContext.Provider>
  );
}

"use client";

import { useRoomDetail } from "./RoomDetailProvider";
import type { Room } from "@/content/rooms";

// Opens the room detail / virtual-tour modal. Lets server-rendered room cards
// trigger the modal without becoming client components themselves.
export default function RoomDetailButton({
  room,
  className,
  children,
}: {
  room: Room;
  className?: string;
  children: React.ReactNode;
}) {
  const { openRoom } = useRoomDetail();
  return (
    <button type="button" onClick={() => openRoom(room)} className={className}>
      {children}
    </button>
  );
}

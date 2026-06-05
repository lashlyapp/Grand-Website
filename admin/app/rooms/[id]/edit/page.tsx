import { notFound } from "next/navigation";
import { getRoomById } from "@/lib/rooms";
import { isAdmin } from "@/lib/auth";
import RoomForm from "@/components/RoomForm";
import NotAdmin from "@/components/NotAdmin";
import { updateRoom, deleteRoom } from "@/app/rooms/actions";

export const dynamic = "force-dynamic";

export default async function EditRoomPage({
  params,
}: {
  params: { id: string };
}) {
  if (!(await isAdmin())) return <NotAdmin />;
  const room = await getRoomById(params.id);
  if (!room) notFound();

  const update = updateRoom.bind(null, room.id);
  const del = deleteRoom.bind(null, room.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <a href="/rooms" className="text-sm text-ink/50 hover:text-ink">
            ← Rooms
          </a>
          <h1 className="text-xl font-semibold">Edit {room.name}</h1>
        </div>
        <form action={del}>
          <button className="text-sm text-red-600 hover:underline">
            Delete room
          </button>
        </form>
      </div>
      <RoomForm action={update} room={room} submitLabel="Save changes" />
    </div>
  );
}

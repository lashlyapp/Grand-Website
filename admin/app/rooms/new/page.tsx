import { getHotels } from "@/lib/rooms";
import { isAdmin } from "@/lib/auth";
import RoomForm from "@/components/RoomForm";
import NotAdmin from "@/components/NotAdmin";
import { createRoom } from "@/app/rooms/actions";

export const dynamic = "force-dynamic";

export default async function NewRoomPage() {
  if (!(await isAdmin())) return <NotAdmin />;
  const hotels = await getHotels();

  return (
    <div className="space-y-6">
      <div>
        <a href="/rooms" className="text-sm text-ink/50 hover:text-ink">
          ← Rooms
        </a>
        <h1 className="text-xl font-semibold">New room</h1>
      </div>
      <RoomForm action={createRoom} hotels={hotels} submitLabel="Create room" />
    </div>
  );
}

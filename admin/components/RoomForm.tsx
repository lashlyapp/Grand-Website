import type { Hotel, Room } from "@/lib/types";

// Server-rendered room form, reused for create and edit. The `action` is a bound
// server action (createRoom, or updateRoom.bind(null, id)).
export default function RoomForm({
  action,
  room,
  hotels,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  room?: Room;
  hotels?: Hotel[]; // passed on create for the hotel selector
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      {hotels ? (
        <Field label="Hotel">
          <select name="hotel_id" required className={inputCls} defaultValue="">
            <option value="" disabled>
              Select a hotel…
            </option>
            {hotels.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </Field>
      ) : (
        <input type="hidden" name="hotel_id" value={room?.hotel_id ?? ""} />
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field label="Name">
          <input name="name" required defaultValue={room?.name} className={inputCls} />
        </Field>
        <Field label="Code (RezTrip)">
          <input name="code" required defaultValue={room?.code} className={inputCls} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Category">
          <select name="category" defaultValue={room?.category ?? "room"} className={inputCls}>
            <option value="room">room</option>
            <option value="villa">villa</option>
            <option value="suite">suite</option>
          </select>
        </Field>
        <Field label="Beds">
          <input name="beds" defaultValue={room?.beds} className={inputCls} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Tonight's rate (USD, blank hides it)">
          <input
            name="rate_tonight"
            type="number"
            step="0.01"
            min="0"
            defaultValue={room?.rate_tonight ?? ""}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          name="description"
          rows={3}
          defaultValue={room?.description}
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Features (one per line)">
          <textarea
            name="features"
            rows={6}
            defaultValue={room?.features?.join("\n")}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>
        <Field label="Gallery image paths (one per line)">
          <textarea
            name="gallery"
            rows={6}
            defaultValue={room?.gallery?.join("\n")}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>
      </div>

      <Field label="Tour video URL">
        <input name="video_url" defaultValue={room?.video_url ?? ""} className={inputCls} />
      </Field>
      <Field label="Cover image URL (auto-filled from a video frame in Phase 2)">
        <input
          name="cover_image_url"
          defaultValue={room?.cover_image_url ?? ""}
          className={inputCls}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-6">
        <Checkbox name="accessible" label="Accessible" defaultChecked={room?.accessible} />
        <Checkbox name="pet_friendly" label="Pet friendly" defaultChecked={room?.pet_friendly} />
        <Checkbox
          name="published"
          label="Published"
          defaultChecked={room ? room.published : true}
        />
        <Field label="Sort order">
          <input
            name="sort_order"
            type="number"
            defaultValue={room?.sort_order ?? 0}
            className={`${inputCls} w-24`}
          />
        </Field>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-white hover:bg-gold-dark"
        >
          {submitLabel}
        </button>
        <a href="/rooms" className="text-sm text-ink/60 hover:text-ink">
          Cancel
        </a>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-gold";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}

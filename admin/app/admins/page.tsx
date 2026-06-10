import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSuperAdmin } from "@/lib/auth";
import { inviteAdmin, removeAdmin } from "./actions";

// Always render at request time — the data lives in Supabase and changes via the
// admin, so we never want a stale prerender.
export const dynamic = "force-dynamic";

type AdminRow = {
  email: string;
  role: "admin" | "superadmin";
  created_at: string;
};

export default async function AdminsPage() {
  if (!(await isSuperAdmin())) {
    return (
      <div className="mx-auto max-w-md pt-12 text-center">
        <h1 className="text-lg font-semibold">Not authorized</h1>
        <p className="mt-2 text-sm text-ink/60">
          Only superadmins can manage admin access.
        </p>
      </div>
    );
  }

  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("admins")
    .select("email, role, created_at")
    .order("created_at");
  const admins = (data ?? []) as AdminRow[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Admins</h1>
        <p className="mt-1 text-sm text-ink/60">
          People who can sign in and manage room content. Invitees don&rsquo;t
          get an email — once added, they sign in at the login page with their
          @cghotelgroup.com address and receive a magic link.
        </p>
      </div>

      <section className="rounded-lg border border-ink/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Invite an admin</h2>
        <form action={inviteAdmin} className="mt-3 flex gap-3">
          <input
            type="email"
            name="email"
            required
            pattern=".+@cghotelgroup\.com"
            title="Admin access is limited to @cghotelgroup.com addresses."
            placeholder="name@cghotelgroup.com"
            className="w-full max-w-sm rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-gold"
          />
          <button className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white hover:bg-gold-dark">
            Add admin
          </button>
        </form>
      </section>

      <section className="rounded-lg border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-ink/60">
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Added</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.email} className="border-b border-ink/5">
                <td className="px-5 py-3 font-medium">{admin.email}</td>
                <td className="px-5 py-3 text-ink/70">
                  {admin.role === "superadmin" ? "Superadmin" : "Admin"}
                </td>
                <td className="px-5 py-3 text-ink/70">
                  {new Date(admin.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-3 text-right">
                  {admin.role === "admin" && (
                    <form action={removeAdmin}>
                      <input type="hidden" name="email" value={admin.email} />
                      <button className="text-red-600 hover:underline">
                        Remove
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

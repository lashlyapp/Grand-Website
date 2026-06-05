import { getUser } from "@/lib/auth";

export default async function NotAdmin() {
  const user = await getUser();
  return (
    <div className="mx-auto max-w-md pt-12 text-center">
      <h1 className="text-lg font-semibold">Not authorized</h1>
      <p className="mt-2 text-sm text-ink/60">
        You&rsquo;re signed in as{" "}
        <span className="font-medium">{user?.email ?? "unknown"}</span>, but this
        account isn&rsquo;t an admin yet. Ask an existing admin to add you.
      </p>
      <form action="/auth/signout" method="post" className="mt-4">
        <button className="text-sm text-gold hover:underline">Sign out</button>
      </form>
    </div>
  );
}

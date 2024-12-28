import config from "@/config";

export async function getUserProfile() {
  const res = await fetch(`${config.serverUrl}/users/profile`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data?.data;
}

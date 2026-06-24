export function hasInsforgeConfig(): boolean {
  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
  const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

  if (!baseUrl || !anonKey) {
    return false;
  }

  try {
    const url = new URL(baseUrl);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      !anonKey.startsWith("http://") &&
      !anonKey.startsWith("https://")
    );
  } catch {
    return false;
  }
}

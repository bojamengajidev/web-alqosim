export async function getHijriDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formatted = `${day}-${month}-${year}`; // DD-MM-YYYY (LOCAL)

  const res = await fetch(
    `https://api.aladhan.com/v1/gToH?date=${formatted}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Hijri date");
  }

  const json = await res.json();

  return json.data.hijri;
}

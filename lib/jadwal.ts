// Helpers for the monthly kajian schedule (jadwal kajian).
// Dates are handled in Asia/Jakarta time so "today" and month labels
// stay correct regardless of the server timezone.

import type {
  StrapiKajianKategori,
  StrapiKajianSession,
} from "./strapi.d";

const TIMEZONE = "Asia/Jakarta";

export interface JadwalMonthOption {
  key: string;
  label: string;
}

export interface JadwalSessionGroup {
  date: string;
  sessions: StrapiKajianSession[];
}

export interface JadwalSessionLink {
  href: string;
  valid: boolean;
}

/**
 * Converts a month key (`2026-11`) into a Strapi date value (`2026-11-01`).
 */
export function monthKeyToDate(monthKey: string): string | null {
  const match = /^(\d{4})-(\d{2})$/.exec(monthKey);
  if (!match) return null;

  const [, year, month] = match;
  const monthNumber = Number(month);

  if (monthNumber < 1 || monthNumber > 12) return null;

  return `${year}-${month}-01`;
}

export function dateToMonthKey(date: string): string {
  return date.slice(0, 7);
}

export function getTodayKey(timeZone = TIMEZONE): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const value = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function getCurrentMonthKey(timeZone = TIMEZONE): string {
  return getTodayKey(timeZone).slice(0, 7);
}

export function formatMonthLabel(monthKey: string): string {
  const isoDate = monthKeyToDate(monthKey);
  if (!isoDate) return monthKey;

  const date = new Date(`${isoDate}T00:00:00+07:00`);
  if (Number.isNaN(date.getTime())) return monthKey;

  return date.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
    timeZone: TIMEZONE,
  });
}

export function formatSessionDate(dateValue: string): string {
  const date = new Date(`${dateValue}T00:00:00+07:00`);
  if (Number.isNaN(date.getTime())) return dateValue;

  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIMEZONE,
  });
}

/**
 * Formats Strapi time values (`08:00:00.000`) as `08.00`.
 */
export function formatTime(value?: string | null): string {
  if (!value) return "";

  const [hours = "", minutes = "00"] = value.split(":");
  return `${hours.padStart(2, "0")}.${minutes.slice(0, 2)}`;
}

export function formatTimeRange(
  start?: string | null,
  end?: string | null,
): string {
  const startTime = formatTime(start);
  const endTime = formatTime(end);

  if (startTime && endTime) return `${startTime}–${endTime}`;
  return startTime || endTime;
}

export function kategoriLabel(
  kategori?: string | null,
): string | null {
  if (!kategori) return null;

  const label = kategori.toLowerCase();
  if (label === "rutin") return "Rutin";
  if (label === "khusus") return "Khusus";
  if (label === "umum") return "Umum";

  // Return the category as-is with first letter capitalized for unknown values
  return kategori.charAt(0).toUpperCase() + kategori.slice(1);
}

export function isSafeHttpUrl(value?: string | null): value is string {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function sortSessions(
  sessions: StrapiKajianSession[],
): StrapiKajianSession[] {
  return [...sessions].sort((a, b) =>
    `${a.tanggal}T${a.waktuMulai}`.localeCompare(
      `${b.tanggal}T${b.waktuMulai}`,
    ),
  );
}

export function groupSessions(
  sessions: StrapiKajianSession[],
): JadwalSessionGroup[] {
  const groups: JadwalSessionGroup[] = [];

  for (const session of sortSessions(sessions)) {
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.date === session.tanggal) {
      lastGroup.sessions.push(session);
    } else {
      groups.push({ date: session.tanggal, sessions: [session] });
    }
  }

  return groups;
}

/**
 * Picks the default month to display:
 * current month → nearest upcoming month → latest available month.
 */
export function pickDefaultMonth(
  monthKeys: string[],
  currentMonth = getCurrentMonthKey(),
): string {
  if (monthKeys.length === 0) return currentMonth;
  if (monthKeys.includes(currentMonth)) return currentMonth;

  const upcoming = monthKeys.filter((key) => key > currentMonth).sort()[0];
  return upcoming ?? monthKeys[0];
}

function dayKey(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

function addUtcDays(date: Date, delta: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + delta);
  return next;
}

/** Consecutive-day streak ending today or yesterday (a one-day grace period). */
export function computeStreak(createdAts: string[]): number {
  if (createdAts.length === 0) return 0;

  const days = new Set(createdAts.map(dayKey));
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const yesterday = addUtcDays(today, -1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  let cursor: Date;
  if (days.has(todayKey)) {
    cursor = today;
  } else if (days.has(yesterdayKey)) {
    cursor = yesterday;
  } else {
    return 0;
  }

  let streak = 0;
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor = addUtcDays(cursor, -1);
  }
  return streak;
}

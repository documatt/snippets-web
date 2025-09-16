export function formatElapsedTime(ms: number): string {
  return Math.round(ms).toLocaleString() + " ms";
}

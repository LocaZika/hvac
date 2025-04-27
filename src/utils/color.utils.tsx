export function generateRandomColor(): string {
  const r = Math.floor(Math.random() * 140);
  const g = Math.floor(Math.random() * 160);
  const b = Math.floor(Math.random() * 150);
  return `rgb(${r}, ${g}, ${b})`;
}
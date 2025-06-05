export function Stat({ label, count }: { label: string; count: number }) {
  return (
    <li key={label} className="flex gap-2">
      {label}
      <span className="font-bold">{count}</span>
    </li>
  );
}

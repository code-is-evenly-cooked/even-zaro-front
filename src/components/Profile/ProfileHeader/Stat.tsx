export function Stat({ label, count }: { label: string; count: number }) {
  return (
    <li key={label}>
      {label}
      <span className="ml-2 font-bold">{count}</span>
    </li>
  );
}

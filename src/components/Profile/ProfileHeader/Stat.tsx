export function Stat({ label, count }: { label: string; count: number }) {
  return (
    <li key={label} className="flex sm:flex-row flex-col-reverse gap-2 text-center">
      {label}
      <span className="font-bold text-center">{count}</span>
    </li>
  );
}

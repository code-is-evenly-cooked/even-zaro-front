import clsx from "clsx";

interface StatProps {
  label: string;
  count: number;
  onClick?: () => void;
  className?: string;
}

export function Stat({ label, count, onClick, className }: StatProps) {
  return (
    <li
      role="button"
      key={label}
      onClick={onClick}
      className={clsx(
        "flex sm:flex-row flex-col-reverse gap-2 text-center whitespace-nowrap",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {label}
      <span className="font-bold text-center">{count}</span>
    </li>
  );
}

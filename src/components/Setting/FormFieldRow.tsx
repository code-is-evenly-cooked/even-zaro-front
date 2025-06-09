interface FormFieldRowProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const FormFieldRow = ({ label, children, className }: FormFieldRowProps) => {
  return (
    <li
      className={`flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 ${className}`}
      key={label}
    >
      <label
        className="text-lg whitespace-nowrap shrink-0 w-24"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="w-auto">{children}</div>
    </li>
  );
};

export default FormFieldRow;

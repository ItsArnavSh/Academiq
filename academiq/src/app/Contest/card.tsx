interface ContestCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    headerClassName?: string;
    contentClassName?: string;
  }
  
  export function Card({
    title,
    children,
    className = "",
    headerClassName = "",
    contentClassName = "",
  }: ContestCardProps) {
    return (
      <div
        className={`bg-[#6b5558] border-none shadow-lg rounded-md p-4 ${className}`}
      >
        <div className={`pb-3 ${headerClassName}`}>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className={`${contentClassName}`}>{children}</div>
      </div>
    );
  }
  
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  right?: ReactNode;
}

export function PageHeader({ title, description, right }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="text-sm font-semibold text-muted-foreground sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>

      {right ? <div className="shrink-0 pt-2">{right}</div> : null}
    </div>
  );
}

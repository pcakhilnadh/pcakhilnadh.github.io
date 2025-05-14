import React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Timeline({ children, className, ...props }: TimelineProps) {
  return (
    <div className={cn("timeline relative", className)} {...props}>
      {/* Center line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
      {children}
    </div>
  );
}



import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = ComponentProps<"div"> & {
  size?: "page" | "wide";
};

export function Container({ size = "page", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-16",
        size === "wide" ? "max-w-wide" : "max-w-page",
        className,
      )}
      {...props}
    />
  );
}

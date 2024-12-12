import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function AnimatedGradientTextComponent() {
  return (
    
      <AnimatedGradientText>
        🎉 PRO Coming Soon <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300 " />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-violet-500 via-pink-500/70 to-pink-700/80 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent `,
          )}
        >
           Join the Waitlist
          
        </span>
        <ChevronRight className="ml-1 w- h-3" />
      </AnimatedGradientText>
  );
}

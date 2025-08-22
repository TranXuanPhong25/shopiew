import { cn } from "@/lib/utils";

export default function SectionWrapper({
   children,
   className = "",
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <div className={cn("p-6 bg-white shadow-md rounded-lg ", className)}>
         {children}
      </div>
   );
}
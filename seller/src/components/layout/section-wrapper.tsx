export default function SectionWrapper({
   children,
   className = "",
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <div className="p-6 bg-white shadow-md rounded-lg ">
         {children}
      </div>
   );
}
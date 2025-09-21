import { AuthProvider } from '@/features/auth';
import Image from 'next/image'
import Link from "next/link"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <AuthProvider>
         <div className="flex flex-col gap-4 p-6 md:p-10 h-screen">
            <Image
               src="/Google_AI_Studio_2025-09-21T03_57_07.490Z.png"
               alt="Image"
               width={1920}
               height={1080}
               priority
               quality={100}
               style={{ objectFit: "cover" }}
               className="absolute inset-0  h-full w-full object-cover brightness-[72%] dark:brightness-[0.2] z-0  "
            />

            <div className=" z-10 p-10 rounded-xl bg-white shadow-lg w-[400px] m-auto">
               <div className="flex justify-center gap-2 md:justify-start mx-auto w-fit mb-6">
                  <Link href="/" className="flex items-center gap-2 font-bold text-xl text-sky-400">
                     <Image
                        src="/icon.png"
                        alt="Shopiew Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                     />
                     Shopiew Seller
                  </Link>
               </div>
               {children}
            </div>

         </div>
      </AuthProvider>
   )
}
export default AuthLayout;
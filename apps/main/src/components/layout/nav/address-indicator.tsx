import { MapPin } from "lucide-react"
import Link from "next/link"

// https://nominatim.openstreetmap.org/reverse?lat=10.762622&lon=106.660172&format=json
function AddressIndicator() {
   return (
      <div className="flex justify-between">
         <div
            className="hidden lg:flex gap-3 mt-2 text-xs text-gray-600/70 font-semibold leading-tight">
            {/* Categories - Desktop */}
            {['điện gia dụng', 'xe cộ', 'mẹ & bé', 'khỏe đẹp', 'nhà cửa', 'sách', 'thể thao'].map((suggestion) => (
               <Link key={suggestion} href={"/search?query=" + suggestion}
                  className="hover:text-blue-500">
                  {suggestion}
               </Link>
            ))}
         </div>
         {/* Location */}
         <div className="mt-2 flex items-center text-xs sm:text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="sm:hidden">Giao đến:</span>
            <span className="hidden sm:inline">Giao đến:</span>
            <span className="ml-1 font-medium truncate">Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</span>
         </div>
      </div>
   )
}
export default AddressIndicator
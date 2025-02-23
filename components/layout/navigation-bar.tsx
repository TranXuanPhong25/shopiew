import React from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {MapPin, User, ShoppingCart, Search,  Menu} from "lucide-react";

const NavigationBar = () => {
    return (
        <div className="w-full">
            {/*promotion banner*/}
            <div className="w-full bg-green-50 py-1 px-4 text-center text-green-600 text-sm">
                <span className="hidden sm:inline">Buy goods, feel good</span>
                <span className="sm:hidden">Freeship order from 2$</span>
                <span className="font-medium"> FREESHIP XTRA</span>
            </div>

            {/* Main header */}
            <div className="w-full px-2 sm:px-4 py-2 sm:py-3 bg-white border-b">
                <nav className="max-w-7xl mx-auto flex items-center px-4">
                    <div>
                        {/* Mobile menu button */}
                        <Button variant="ghost" className="lg:hidden p-1">
                            <Menu className="w-5 h-5"/>
                        </Button>

                        {/* Logo */}
                        <div className="text-blue-500 font-bold text-xl sm:text-3xl">
                            Shopiew
                            <div className="text-[10px] sm:text-xs font-normal mt-1">Good and goods</div>
                        </div>

                    </div>
                    <div className="w-full px-2 sm:px-4 py-2 sm:py-3 ">
                        <div className="flex items-center gap-2 sm:gap-8 ">
                            {/*Search bar*/}
                            <div className="flex-1 relative">
                                <div className="flex">
                                    <div className="relative flex-1">
                                        <Input
                                            placeholder="Instant delivery"
                                            className="w-full pl-10 h-9 sm:h-10"
                                        />
                                        <Search className="w-4 h-4 absolute left-3 top-[10px] text-gray-400"/>
                                    </div>
                                    <Button className="ml-2 bg-blue-500 hover:bg-blue-600 hidden sm:flex">
                                        Search
                                    </Button>
                                    <Button className="ml-1 bg-blue-500 hover:bg-blue-600 sm:hidden p-2">
                                        <Search className="w-4 h-4"/>
                                    </Button>
                                </div>
                            </div>

                            {/* Right side buttons */}
                            <div className="flex items-center gap-2 sm:gap-6">
                                <Button variant="ghost" className="hidden sm:flex items-center">
                                    <User className="w-5 h-5 mr-2"/>
                                    Tài khoản
                                </Button>
                                <Button variant="ghost" className="sm:hidden p-2">
                                    <User className="w-5 h-5"/>
                                </Button>

                                <div className="relative">
                                    <Button variant="ghost" className="p-2">
                                        <ShoppingCart className="w-5 h-5"/>
                                    </Button>
                                    <div
                                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                                        0
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">

                            <div className="hidden lg:flex gap-3 mt-2 text-xs text-gray-600/70 font-semibold leading-tight">
                                {/* Categories - Desktop */}
                                {['điện gia dụng', 'xe cộ', 'mẹ & bé', 'khỏe đẹp', 'nhà cửa', 'sách', 'thể thao'].map((category) => (
                                    <a key={category} href="#" className="hover:text-blue-500">
                                        {category}
                                    </a>
                                ))}
                            </div>
                            {/* Location */}
                            <div className="mt-2 flex items-center text-xs sm:text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1"/>
                                <span className="sm:hidden">Giao đến:</span>
                                <span className="hidden sm:inline">Giao đến:</span>
                                <span className="ml-1 font-medium truncate">Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</span>
                            </div>
                        </div>
                    </div>


                </nav>
            </div>
        </div>
    );
};

export default NavigationBar;
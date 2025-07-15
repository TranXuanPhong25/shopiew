"use client";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {User} from "lucide-react";

const AccountButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="ghost"
                className={open ? "bg-gray-100" : ""}
                onClick={() => setOpen(true)}
            >
                <User className="w-5 h-5 mr-2 sm:mr-2" />
                <span className="hidden sm:inline">Tài khoản</span>
            </Button>
            
            {open && (
                <>
                    <div 
                        className="fixed inset-0 z-50 bg-black/40" 
                        onClick={() => setOpen(false)}
                    />
                    <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Đăng nhập</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700 text-xl"
                                onClick={() => setOpen(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="email@example.com"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="********"
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input 
                                        id="remember-me" 
                                        type="checkbox" 
                                        className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Nhớ tài khoản
                                    </label>
                                </div>
                                <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
                                    Quên mật khẩu?
                                </a>
                            </div>
                            
                            <Button className="w-full bg-blue-500 hover:bg-blue-600">
                                Đăng nhập
                            </Button>
                            
                            <div className="text-center text-sm text-gray-600">
                                Chưa có tài khoản?{" "}
                                <a href="#" className="text-blue-500 hover:text-blue-600">
                                    Đăng ký ngay
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default AccountButton;

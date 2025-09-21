"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, Mail, Shield, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { SignupForm } from "@/features/auth/components/signup-form";
import Link from "next/link";
import Image from "next/image";
export default function HeroSection() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });


    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 10,
            },
        },
    };

    const benefits = [
        {
            icon: Users,
            title: "Tiếp cận 10M+ khách hàng",
            description: "Kết nối với cộng đồng mua sắm trực tuyến lớn nhất Việt Nam"
        },
        {
            icon: BarChart3,
            title: "Tăng trưởng doanh thu 300%",
            description: "Công cụ phân tích và tối ưu bán hàng thông minh"
        },
        {
            icon: Shield,
            title: "Bảo mật tuyệt đối",
            description: "Hệ thống thanh toán an toàn, bảo vệ người bán 24/7"
        }
    ];

    const stats = [
        { number: "10M+", label: "Người dùng hoạt động" },
        { number: "500K+", label: "Người bán thành công" },
        { number: "99.9%", label: "Thời gian hoạt động" },
        { number: "24/7", label: "Hỗ trợ khách hàng" }
    ];

    return (
        <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden" id="hero-section">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                ref={ref}
                className="container mx-auto px-4 py-12 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
                    {/* Left Content */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="space-y-6">
                            <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700">
                                <Sparkles className="w-4 h-4" />
                                Nền tảng bán hàng #1 Việt Nam
                            </Badge>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                    Phát triển
                                </span>
                                <br />
                                <span className="text-gray-900">
                                    kinh doanh với
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Shopiew
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                                Nếu là nhà bán lẻ, thương hiệu hay doanh nghiệp, bạn luôn có thể bán hàng trên Shopiew với số lượng người theo dõi bất kỳ.
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    // variants={itemVariants}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-all duration-300"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                        <benefit.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50">
                                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Registration Form */}
                    <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
                        <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
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
                            <SignupForm />
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

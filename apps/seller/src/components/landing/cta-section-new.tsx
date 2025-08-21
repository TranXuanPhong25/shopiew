"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
    ArrowRight, 
    Sparkles, 
    CheckCircle, 
    Star, 
    Users,
    TrendingUp,
    Shield,
    Zap,
    Mail,
    Phone
} from "lucide-react";
import { useState } from "react";

const benefits = [
    "Miễn phí mở cửa hàng",
    "Hoa hồng thấp nhất thị trường",
    "Công cụ marketing tích hợp",
    "Hỗ trợ 24/7 bằng tiếng Việt",
    "Thanh toán nhanh chóng",
    "Đào tạo miễn phí"
];

const steps = [
    {
        step: "01",
        title: "Đăng ký tài khoản",
        description: "Tạo tài khoản miễn phí chỉ trong 2 phút"
    },
    {
        step: "02", 
        title: "Thêm sản phẩm",
        description: "Upload sản phẩm với công cụ đơn giản"
    },
    {
        step: "03",
        title: "Bắt đầu bán hàng",
        description: "Tiếp cận khách hàng và tăng doanh thu ngay"
    }
];

export default function CTASection() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

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

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                ref={ref}
                className="container mx-auto max-w-7xl relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="space-y-6">
                            <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 border-white/30 text-white backdrop-blur-sm">
                                <Sparkles className="w-4 h-4" />
                                Ưu đãi đặc biệt
                            </Badge>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Bắt đầu bán hàng
                                <br />
                                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                    miễn phí ngay hôm nay
                                </span>
                            </h2>

                            <p className="text-xl text-blue-100 leading-relaxed">
                                Tham gia cùng hàng trăm nghìn người bán đang kinh doanh thành công trên Shopiew. 
                                Không phí setup, không cam kết dài hạn.
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                                    <span className="text-blue-100">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Steps */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            <h3 className="text-2xl font-bold text-white">Chỉ 3 bước đơn giản:</h3>
                            <div className="space-y-4">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">{step.step}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                                            <p className="text-blue-100 text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Social proof */}
                        <motion.div variants={itemVariants} className="flex items-center gap-6 pt-6">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center">
                                            <Users className="w-5 h-5 text-white" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-blue-100 text-sm ml-2">500K+ người bán</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                                ))}
                                <span className="text-blue-100 text-sm ml-2">4.9/5 đánh giá</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Registration Form */}
                    <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
                        <Card className="w-full max-w-lg p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                            <div className="space-y-6">
                                <div className="text-center space-y-3">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                                        <Zap className="w-4 h-4 text-green-600" />
                                        <span className="text-green-700 font-medium text-sm">Đăng ký nhanh 2 phút</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Tạo cửa hàng miễn phí</h3>
                                    <p className="text-gray-600">Bắt đầu bán hàng và kiếm tiền ngay hôm nay</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email *</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input 
                                                type="email"
                                                placeholder="Nhập email của bạn"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-11 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Số điện thoại *</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                                <span className="text-sm text-gray-600">🇻🇳 +84</span>
                                            </div>
                                            <Input 
                                                type="tel"
                                                placeholder="Nhập số điện thoại"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="pl-20 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="pt-2"
                                    >
                                        <Button 
                                            size="lg"
                                            className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            <Zap className="mr-2 w-5 h-5" />
                                            Tạo cửa hàng miễn phí
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </motion.div>

                                    <div className="text-center space-y-2">
                                        <p className="text-sm text-gray-500">
                                            Bạn đã có tài khoản? 
                                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                                                Đăng nhập ngay
                                            </a>
                                        </p>
                                        
                                        <div className="flex items-center gap-2 justify-center pt-3">
                                            <Shield className="w-4 h-4 text-green-500" />
                                            <span className="text-xs text-gray-500">
                                                Thông tin của bạn được bảo mật 100%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 leading-relaxed text-center">
                                        Bằng việc đăng ký, bạn đồng ý với 
                                        <a href="#" className="text-blue-600 hover:text-blue-700"> Điều khoản sử dụng</a> và 
                                        <a href="#" className="text-blue-600 hover:text-blue-700"> Chính sách bảo mật</a> của Shopiew.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Bottom stats */}
                <motion.div variants={itemVariants} className="mt-20 pt-12 border-t border-white/20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Users, number: "500K+", label: "Người bán tin tưởng" },
                            { icon: TrendingUp, number: "250%", label: "Tăng trưởng trung bình" },
                            { icon: Shield, number: "99.9%", label: "Thời gian hoạt động" },
                            { icon: Zap, number: "24/7", label: "Hỗ trợ không ngừng" }
                        ].map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="space-y-3">
                                    <Icon className="w-8 h-8 text-white/80 mx-auto" />
                                    <div className="text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
                                    <div className="text-blue-100 text-sm">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

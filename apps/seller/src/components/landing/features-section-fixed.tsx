"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
    BarChart3,
    Globe,
    Headphones,
    Heart,
    ShoppingCart,
    Smartphone,
    Sparkles,
    TrendingUp,
    Users,
    ArrowRight,
    Star,
    Zap,
} from "lucide-react";

const features = [
    {
        icon: ShoppingCart,
        title: "Quản lý sản phẩm dễ dàng",
        description: "Thêm, chỉnh sửa và quản lý hàng nghìn sản phẩm chỉ với vài cú click. Hệ thống drag & drop trực quan, import hàng loạt từ Excel, và tự động tối ưu SEO cho mỗi sản phẩm.",
        color: "from-blue-500 to-cyan-500",
        image: "/add-photo-placeholder.jpg",
        features: ["Import hàng loạt từ Excel", "Drag & drop trực quan", "Tự động tối ưu SEO"],
        reverse: false,
    },
    {
        icon: BarChart3,
        title: "Phân tích doanh số thông minh",
        description: "Báo cáo chi tiết về doanh thu, lượng truy cập và xu hướng khách hàng. Dashboard real-time với biểu đồ trực quan và insights thông minh giúp bạn đưa ra quyết định kinh doanh chính xác.",
        color: "from-purple-500 to-pink-500",
        image: "/add-photo-placeholder.jpg",
        features: ["Dashboard real-time", "Biểu đồ trực quan", "AI Insights"],
        reverse: true,
    },
    {
        icon: Users,
        title: "Tiếp cận khách hàng rộng lớn",
        description: "Kết nối với hàng triệu người mua tiềm năng trên toàn quốc. Tích hợp đa kênh bán hàng, marketing automation và CRM để tối ưu hóa trải nghiệm khách hàng.",
        color: "from-green-500 to-emerald-500",
        image: "/add-photo-placeholder.jpg",
        features: ["Đa kênh bán hàng", "Marketing automation", "CRM tích hợp"],
        reverse: false,
    },
    {
        icon: Smartphone,
        title: "Bán hàng mọi lúc mọi nơi",
        description: "Ứng dụng mobile giúp bạn quản lý cửa hàng ngay trên điện thoại. Nhận thông báo đơn hàng, chat với khách hàng và cập nhật inventory trong thời gian thực.",
        color: "from-orange-500 to-red-500",
        image: "/add-photo-placeholder.jpg",
        features: ["App mobile", "Thông báo real-time", "Chat tích hợp"],
        reverse: true,
    },
];

const highlights = [
    {
        icon: TrendingUp,
        title: "Tăng trưởng doanh thu",
        subtitle: "Trung bình 250% trong 6 tháng đầu",
        color: "from-green-400 to-emerald-400",
    },
    {
        icon: Globe,
        title: "Phủ sóng toàn quốc",
        subtitle: "Giao hàng đến 63 tỉnh thành",
        color: "from-blue-400 to-cyan-400",
    },
    {
        icon: Headphones,
        title: "Hỗ trợ 24/7",
        subtitle: "Đội ngũ chăm sóc khách hàng chuyên nghiệp",
        color: "from-purple-400 to-pink-400",
    },
];

// Feature Item Component
function FeatureItem({ feature, index }: { feature: typeof features[0], index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // UseInView with stable configuration
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true, // Changed back to true to prevent flickering
        rootMargin: '0px 0px -50px 0px'
    });

    // Parallax scroll effects
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yContent = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const yImage = useTransform(scrollYProgress, [0, 1], [-20, 20]);

    const Icon = feature.icon;

    return (
        <div ref={containerRef}>
            <motion.div
                ref={ref}
                className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 py-20`}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut"
                }}
            >
                {/* Content Side */}
                <motion.div
                    style={{ y: yContent }}
                    className="flex-1 space-y-8"
                >
                    <motion.div 
                        className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.color} shadow-2xl`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ 
                            delay: 0.2 + index * 0.1, 
                            type: "spring", 
                            stiffness: 200,
                            damping: 20
                        }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                        <Icon className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <motion.h3 
                        className="text-4xl md:text-5xl font-black text-gray-900 leading-tight"
                        initial={{ y: 30, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                        transition={{ 
                            delay: 0.3 + index * 0.1,
                            duration: 0.6,
                            ease: "easeOut"
                        }}
                    >
                        {feature.title}
                    </motion.h3>
                    
                    <motion.p 
                        className="text-xl text-gray-600 leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ 
                            delay: 0.4 + index * 0.1,
                            duration: 0.6,
                            ease: "easeOut"
                        }}
                    >
                        {feature.description}
                    </motion.p>

                    <motion.div className="space-y-4">
                        {feature.features.map((feat, idx) => (
                            <motion.div 
                                key={idx} 
                                className="flex items-center gap-4"
                                initial={{ x: -20, opacity: 0 }}
                                animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                                transition={{ 
                                    delay: 0.5 + index * 0.1 + idx * 0.05,
                                    duration: 0.4,
                                    ease: "easeOut"
                                }}
                            >
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${feature.color}`} />
                                <span className="text-gray-700 font-semibold">{feat}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.button 
                        className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${feature.color} text-white rounded-2xl font-bold text-lg shadow-xl`}
                        initial={{ y: 30, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                        transition={{ 
                            delay: 0.7 + index * 0.1,
                            duration: 0.5,
                            ease: "easeOut"
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Khám phá ngay
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>

                </motion.div>

                {/* Image Side */}
                <motion.div
                    style={{ y: yImage }}
                    className="flex-1"
                    initial={{ x: feature.reverse ? -100 : 100, opacity: 0 }}
                    animate={inView ? { x: 0, opacity: 1 } : { x: feature.reverse ? -100 : 100, opacity: 0 }}
                    transition={{ 
                        delay: 0.2 + index * 0.1, 
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            width={700}
                            height={500}
                            className="w-full h-[500px] object-cover"
                        />
                        
                        <motion.div 
                            className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl"
                            initial={{ y: 20, opacity: 0 }}
                            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                            transition={{ 
                                delay: 0.6 + index * 0.1,
                                duration: 0.5,
                                ease: "easeOut"
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${feature.color}`} />
                                <span className="text-gray-800 font-bold">{feature.features[0]}</span>
                                <Star className="w-4 h-4 text-yellow-500 fill-current ml-auto" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

// Highlight Item Component
function HighlightItem({ highlight, index }: { highlight: typeof highlights[0], index: number }) {
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true, // Changed to true to prevent flickering
        rootMargin: '0px 0px -30px 0px'
    });

    const Icon = highlight.icon;

    return (
        <motion.div
            ref={ref}
            className="text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={inView ? { y: 0, opacity: 1, scale: 1 } : { y: 50, opacity: 0, scale: 0.9 }}
            transition={{ 
                delay: index * 0.15, 
                duration: 0.6,
                ease: "easeOut"
            }}
            whileHover={{ y: -5, scale: 1.02 }}
        >
            <motion.div 
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${highlight.color} mb-6 shadow-lg`}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ 
                    delay: 0.2 + index * 0.1, 
                    type: "spring", 
                    stiffness: 200,
                    damping: 20
                }}
                whileHover={{ rotate: 360, scale: 1.1 }}
            >
                <Icon className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.h3 
                className="text-xl font-bold text-gray-900 mb-2"
                initial={{ y: 15, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
                transition={{ 
                    delay: 0.3 + index * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                }}
            >
                {highlight.title}
            </motion.h3>
            
            <motion.p 
                className="text-gray-600 font-medium"
                initial={{ y: 15, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
                transition={{ 
                    delay: 0.4 + index * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                }}
            >
                {highlight.subtitle}
            </motion.p>
        </motion.div>
    );
}

export default function FeaturesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { ref: headerRef, inView: headerInView } = useInView({
        threshold: 0.1,
        triggerOnce: true, // Changed to true to prevent flickering
    });

    // Global parallax effects
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    
    const yBg1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yBg2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <motion.section 
            ref={sectionRef}
            className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                    className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"
                    style={{ y: yBg1 }}
                />
                <motion.div 
                    className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30"
                    style={{ y: yBg2 }}
                />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <motion.div 
                    ref={headerRef}
                    className="text-center mb-20 space-y-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                >
                    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700">
                        <Sparkles className="w-4 h-4" />
                        Tính năng nổi bật
                    </Badge>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Mọi thứ bạn cần để{" "}
                        <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                            bán hàng thành công
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Shopiew tích hợp đầy đủ các công cụ hiện đại giúp bạn quản lý và phát triển cửa hàng trực tuyến một cách chuyên nghiệp
                    </p>
                </motion.div>

                {/* Highlights */}
                <div className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map((highlight, index) => (
                        <HighlightItem 
                            key={index} 
                            highlight={highlight} 
                            index={index} 
                        />
                    ))}
                </div>

                {/* Features */}
                <div className="space-y-32">
                    {features.map((feature, index) => (
                        <FeatureItem 
                            key={index} 
                            feature={feature} 
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div 
                    className="text-center mt-32"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div 
                        className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-3xl border-2 border-blue-200 shadow-xl group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Heart className="w-8 h-8 text-red-500" />
                        <span className="text-xl font-bold text-gray-700">
                            Được tin tưởng bởi{" "}
                            <span className="font-black text-blue-600 text-2xl">500,000+</span>
                            {" "}người bán trên toàn quốc
                        </span>
                        <Globe className="w-8 h-8 text-blue-500" />
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
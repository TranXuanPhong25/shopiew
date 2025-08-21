"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ShoppingCart,
    BarChart3,
    Users,
    Smartphone,
    Shield,
    Sparkles,
    TrendingUp,
    CreditCard,
    Headphones,
    Globe,
    Heart,
} from "lucide-react";

const features = [
    {
        icon: ShoppingCart,
        title: "Quản lý sản phẩm dễ dàng",
        description: "Thêm, chỉnh sửa và quản lý hàng nghìn sản phẩm chỉ với vài cú click",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: BarChart3,
        title: "Phân tích doanh số thông minh",
        description: "Báo cáo chi tiết về doanh thu, lượng truy cập và xu hướng khách hàng",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: Users,
        title: "Tiếp cận khách hàng rộng lớn",
        description: "Kết nối với hàng triệu người mua tiềm năng trên toàn quốc",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: Smartphone,
        title: "Bán hàng mọi lúc mọi nơi",
        description: "Ứng dụng mobile giúp bạn quản lý cửa hàng ngay trên điện thoại",
        color: "from-orange-500 to-red-500",
    },
    {
        icon: Shield,
        title: "Bảo mật & An toàn",
        description: "Hệ thống bảo mật đa lớp, mã hóa SSL và tuân thủ chuẩn quốc tế",
        color: "from-indigo-500 to-purple-500",
    },
    {
        icon: CreditCard,
        title: "Thanh toán linh hoạt",
        description: "Hỗ trợ đa dạng phương thức thanh toán, từ COD đến ví điện tử",
        color: "from-pink-500 to-rose-500",
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

export default function FeaturesSection() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { y: 50, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <section className="py-20 px-4 bg-white relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50"></div>
            </div>

            <motion.div
                ref={ref}
                className="container mx-auto max-w-7xl relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <motion.div variants={itemVariants} className="text-center mb-16 space-y-6">
                    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 text-gray-700">
                        <Sparkles className="w-4 h-4" />
                        Tính năng nổi bật
                    </Badge>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Mọi thứ bạn cần để{" "}
                        <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                            bán hàng thành công
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Shopiew tích hợp đầy đủ các công cụ hiện đại giúp bạn quản lý và phát triển cửa hàng trực tuyến một cách chuyên nghiệp
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {highlights.map((highlight, index) => {
                            const Icon = highlight.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${highlight.color} mb-6`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
                                    <p className="text-gray-600">{highlight.subtitle}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.2 },
                                    }}
                                    className="group"
                                >
                                    <Card className="p-8 h-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} mb-6 relative shadow-lg`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                                            {feature.description}
                                        </p>

                                        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center mt-20">
                    <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                        <Heart className="w-6 h-6 text-red-500" />
                        <span className="text-lg font-medium text-gray-700">
                            Được tin tưởng bởi <span className="font-bold text-gray-700">500,000+</span> người bán trên toàn quốc
                        </span>
                        <Globe className="w-6 h-6 text-gray-500" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

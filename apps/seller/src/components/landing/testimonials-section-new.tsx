"use client";

import {motion, type Variants} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Award, CheckCircle2, Quote, ShoppingBag, Star, TrendingUp, Users} from "lucide-react";

const testimonials = [
    {
        name: "Nguyễn Minh Anh",
        role: "Chủ shop thời trang",
        location: "Hà Nội",
        avatar: "MA",
        rating: 5,
        revenue: "120 triệu/tháng",
        growth: "+350%",
        quote: "Shopiew đã thay đổi hoàn toàn cách tôi bán hàng online. Doanh thu tăng gấp 3 lần chỉ sau 4 tháng sử dụng. Công cụ phân tích khách hàng rất chi tiết và chính xác.",
        products: "Thời trang nữ",
        time: "8 tháng"
    },
    {
        name: "Trần Văn Hùng",
        role: "Kinh doanh điện tử",
        location: "TP.HCM", 
        avatar: "TH",
        rating: 5,
        revenue: "200 triệu/tháng",
        growth: "+280%",
        quote: "Tính năng marketing tự động giúp tôi tiết kiệm 70% thời gian. Khách hàng quay lại mua nhiều hơn nhờ hệ thống gợi ý sản phẩm thông minh.",
        products: "Điện tử, Công nghệ",
        time: "1 năm"
    },
    {
        name: "Lê Thị Mai",
        role: "Handmade Creator",
        location: "Đà Nẵng",
        avatar: "LM",
        rating: 5,
        revenue: "75 triệu/tháng",
        growth: "+420%",
        quote: "Từ một người hoàn toàn mới với bán hàng online, giờ tôi đã có cửa hàng với hơn 5000 khách hàng thân thiết. Hỗ trợ 24/7 rất tận tình.",
        products: "Handmade, Quà tặng",
        time: "6 tháng"
    },
    {
        name: "Phạm Đức Long",
        role: "F&B Entrepreneur", 
        location: "Hải Phòng",
        avatar: "PL",
        rating: 5,
        revenue: "150 triệu/tháng",
        growth: "+300%",
        quote: "Hệ thống quản lý đơn hàng và giao hàng rất mượt mà. Tôi có thể tập trung phát triển sản phẩm thay vì lo về logistics.",
        products: "Thực phẩm, Đồ uống",
        time: "10 tháng"
    }
];

const stats = [
    {
        icon: Users,
        number: "500K+",
        label: "Người bán đang hoạt động",
        description: "Cộng đồng seller lớn nhất Việt Nam"
    },
    {
        icon: ShoppingBag,
        number: "50M+",
        label: "Đơn hàng thành công",
        description: "Được xử lý mỗi tháng"
    },
    {
        icon: TrendingUp,
        number: "285%",
        label: "Tăng trưởng trung bình",
        description: "Doanh thu của seller trong năm đầu"
    },
    {
        icon: Award,
        number: "99.8%",
        label: "Tỷ lệ hài lòng",
        description: "Seller đánh giá 4-5 sao"
    }
];

export default function TestimonialsSection() {
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
        hidden: { y: 50, opacity: 0 },
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

    return (
        <section className="py-20 px-4 bg-gray-50">
            <motion.div
                ref={ref}
                className="container mx-auto max-w-7xl"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center space-y-6 mb-16">
                    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border-blue-200 text-blue-700">
                        <Award className="w-4 h-4" />
                        Câu chuyện thành công
                    </Badge>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Hàng trăm nghìn seller
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            đã thành công cùng Shopiew
                        </span>
                    </h2>
                    
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Từ những cửa hàng nhỏ đến các doanh nghiệp lớn, Shopiew đã giúp họ tăng trưởng vượt bậc và đạt được ước mơ kinh doanh.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                                <div className="text-sm text-gray-500">{stat.description}</div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="p-8 h-full bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                                {/* Background Quote */}
                                <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-100" />
                                
                                <div className="space-y-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500">
                                                <AvatarFallback className="text-white font-bold text-lg">
                                                    {testimonial.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                                                <p className="text-gray-600">{testimonial.role}</p>
                                                <p className="text-sm text-gray-500">{testimonial.location}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-green-600">{testimonial.revenue}</div>
                                            <div className="text-xs text-gray-500">Doanh thu/tháng</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-blue-600">{testimonial.growth}</div>
                                            <div className="text-xs text-gray-500">Tăng trưởng</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-purple-600">{testimonial.time}</div>
                                            <div className="text-xs text-gray-500">Sử dụng</div>
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="text-gray-700 leading-relaxed italic">
                                        {`"${testimonial.quote}"`}
                                    </blockquote>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span className="text-sm text-gray-600">{testimonial.products}</span>
                                        </div>
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                            Đã xác thực
                                        </Badge>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div variants={itemVariants} className="text-center space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Bạn có muốn trở thành câu chuyện thành công tiếp theo?
                    </h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Tham gia cùng cộng đồng seller Shopiew và bắt đầu hành trình kinh doanh thành công của bạn ngay hôm nay.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Miễn phí tạo cửa hàng</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Hỗ trợ 24/7</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Không cam kết dài hạn</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

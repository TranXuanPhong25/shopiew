    "use client";

    import { motion, type Variants } from "framer-motion";
    import { useInView } from "react-intersection-observer";
    import { Button } from "@/components/ui/button";
    import { Card } from "@/components/ui/card";
    import { Badge } from "@/components/ui/badge";
    import { Input } from "@/components/ui/input";
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
        Phone,
        User,
        Building
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

        const [formData, setFormData] = useState({
            fullName: "",
            email: "",
            phone: "",
            businessName: "",
            password: "",
            confirmPassword: ""
        });

        const [isLoading, setIsLoading] = useState(false);
        const [errors, setErrors] = useState<{[key: string]: string}>({});

        const handleInputChange = (field: string, value: string) => {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
            // Clear error when user starts typing
            if (errors[field]) {
                setErrors(prev => ({
                    ...prev,
                    [field]: ""
                }));
            }
        };

        const validateForm = () => {
            const newErrors: {[key: string]: string} = {};
            
            if (!formData.fullName.trim()) {
                newErrors.fullName = "Vui lòng nhập họ tên";
            }
            
            if (!formData.email.trim()) {
                newErrors.email = "Vui lòng nhập email";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = "Email không hợp lệ";
            }
            
            if (!formData.phone.trim()) {
                newErrors.phone = "Vui lòng nhập số điện thoại";
            } else if (!/^[0-9]{9,11}$/.test(formData.phone.replace(/\s/g, ''))) {
                newErrors.phone = "Số điện thoại không hợp lệ";
            }
            
            if (!formData.businessName.trim()) {
                newErrors.businessName = "Vui lòng nhập tên cửa hàng";
            }
            
            if (!formData.password) {
                newErrors.password = "Vui lòng nhập mật khẩu";
            } else if (formData.password.length < 6) {
                newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
            }
            
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
            }
            
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            setIsLoading(true);
            
            try {
                // TODO: Replace with actual API call
                console.log("Submitting registration:", formData);
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // On success, redirect to dashboard or show success message
                alert("Đăng ký thành công! Chào mừng bạn đến với Shopiew!");
                
                // Reset form
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    businessName: "",
                    password: "",
                    confirmPassword: ""
                });
                
            } catch (error) {
                console.error("Registration error:", error);
                alert("Có lỗi xảy ra. Vui lòng thử lại!");
            } finally {
                setIsLoading(false);
            }
        };

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
            <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-white/3 rounded-full blur-3xl"></div>
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
                                <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                                    <Sparkles className="w-4 h-4" />
                                    Ưu đãi đặc biệt
                                </Badge>

                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                    Bắt đầu bán hàng
                                    <br />
                                    <span className="bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
                                        miễn phí ngay hôm nay
                                    </span>
                                </h2>

                                <p className="text-xl text-gray-300 leading-relaxed">
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
                                        <CheckCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                                        <span className="text-gray-300">{benefit}</span>
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
                                                <p className="text-gray-300 text-sm">{step.description}</p>
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
                                            <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 border-2 border-white flex items-center justify-center">
                                                <Users className="w-5 h-5 text-white" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-gray-300 text-sm ml-2">500K+ người bán</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-gray-300 text-gray-300" />
                                    ))}
                                    <span className="text-gray-300 text-sm ml-2">4.9/5 đánh giá</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Registration Form */}
                        <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
                            <Card className="w-full max-w-lg p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="text-center space-y-3">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full">
                                            <Sparkles className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-700 font-medium">Đăng ký miễn phí</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900">Tạo cửa hàng ngay</h3>
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            Bắt đầu bán hàng và kiếm tiền chỉ trong 2 phút
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Full Name */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Họ và tên *</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <Input 
                                                    type="text"
                                                    placeholder="Nhập họ và tên của bạn"
                                                    value={formData.fullName}
                                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                    className={`pl-11 h-12 border-gray-200 focus:border-gray-500 focus:ring-gray-500 ${errors.fullName ? 'border-red-500' : ''}`}
                                                    required
                                                />
                                            </div>
                                            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Email *</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <Input 
                                                    type="email"
                                                    placeholder="Nhập email của bạn"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className={`pl-11 h-12 border-gray-200 focus:border-gray-500 focus:ring-gray-500 ${errors.email ? 'border-red-500' : ''}`}
                                                    required
                                                />
                                            </div>
                                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Số điện thoại *</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">🇻🇳 +84</span>
                                                </div>
                                                <Input 
                                                    type="tel"
                                                    placeholder="Nhập số điện thoại"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    className={`pl-20 h-12 border-gray-200 focus:border-gray-500 focus:ring-gray-500 ${errors.phone ? 'border-red-500' : ''}`}
                                                    required
                                                />
                                            </div>
                                            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                        </div>

                                        {/* Business Name */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Tên cửa hàng *</label>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <Input 
                                                    type="text"
                                                    placeholder="Nhập tên cửa hàng của bạn"
                                                    value={formData.businessName}
                                                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                                                    className={`pl-11 h-12 border-gray-200 focus:border-gray-500 focus:ring-gray-500 ${errors.businessName ? 'border-red-500' : ''}`}
                                                    required
                                                />
                                            </div>
                                            {errors.businessName && <p className="text-sm text-red-500">{errors.businessName}</p>}
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Mật khẩu *</label>
                                            <Input 
                                                type="password"
                                                placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                                                value={formData.password}
                                                onChange={(e) => handleInputChange('password', e.target.value)}
                                                className={`h-12 border-gray-200 focus:border-gray-500 focus:ring-gray-500 ${errors.password ? 'border-red-500' : ''}`}
                                                required
                                            />
                                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu *</label>
                                            <Input 
                                                type="password"
                                                placeholder="Nhập lại mật khẩu"
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                className={`h-12 border-gray-200 focus:border-gray-500 focus:ring-gray-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                                required
                                            />
                                            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                                        </div>

                                        {/* Submit Button */}
                                        <motion.div
                                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                            className="pt-4"
                                        >
                                            <Button 
                                                type="submit"
                                                size="lg"
                                                disabled={isLoading}
                                                className="w-full h-14 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                        Đang tạo cửa hàng...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap className="mr-2 w-5 h-5" />
                                                        Tạo cửa hàng miễn phí
                                                        <ArrowRight className="ml-2 w-5 h-5" />
                                                    </>
                                                )}
                                            </Button>
                                        </motion.div>

                                        <div className="text-center space-y-2">
                                            <p className="text-sm text-gray-500">
                                                Đã có tài khoản? 
                                                <a href="/auth/login" className="text-gray-700 hover:text-gray-800 font-medium ml-1">
                                                    Đăng nhập tại đây
                                                </a>
                                            </p>
                                            
                                            <div className="flex items-center gap-2 justify-center pt-3">
                                                <Shield className="w-4 h-4 text-gray-500" />
                                                <span className="text-xs text-gray-500">
                                                    Thông tin của bạn được bảo mật 100%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <p className="text-xs text-gray-500 leading-relaxed text-center">
                                            Bằng việc đăng ký, bạn đồng ý với 
                                            <a href="/terms" className="text-gray-700 hover:text-gray-800"> Điều khoản sử dụng</a> và 
                                            <a href="/privacy" className="text-gray-700 hover:text-gray-800"> Chính sách bảo mật</a> của Shopiew.
                                        </p>
                                    </div>
                                </form>
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
                                        <div className="text-gray-300 text-sm">{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        );
    }

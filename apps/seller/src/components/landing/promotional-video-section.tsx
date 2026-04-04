"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromotionalVideoSection() {
	const { ref, inView } = useInView({
		threshold: 0.15,
		triggerOnce: true,
	});

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { y: 32, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 120,
				damping: 16,
			},
		},
	};

	return (
		<section
			className="relative min-h-screen overflow-hidden bg-slate-950"
			aria-labelledby="seller-promo-video-heading"
		>
			<div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-black/35 to-black/70" />

			<motion.div
				ref={ref}
				className="relative z-10 flex min-h-screen w-full items-end"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<motion.div
					variants={itemVariants}
					className="absolute inset-0"
					role="group"
					aria-label="Video giới thiệu nền tảng Shopiew"
					aria-describedby="seller-promo-video-description"
				>
					<video
						className="h-full w-full object-cover"
						autoPlay
						muted
						loop
						playsInline
						preload="metadata"
					>
						<source src="/videos/shopiew-loop-8s.mp4" type="video/mp4" />
						Trình duyệt của bạn không hỗ trợ video HTML5.
					</video>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="relative mx-auto w-full max-w-7xl px-4 pb-12 md:pb-16"
				>
					<div className="max-w-3xl rounded-2xl border border-white/20 bg-black/35 p-6 backdrop-blur-sm md:p-8">
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100">
							<PlayCircle className="h-4 w-4" />
							Trải nghiệm Shopiew trong 8 giây
						</div>
						<h2
							id="seller-promo-video-heading"
							className="text-3xl font-black leading-tight text-white md:text-5xl"
						>
							Một video ngắn, một bước bật tốc doanh thu cùng Shopiew.
						</h2>
					<p
						id="seller-promo-video-description"
						className="mt-4 max-w-2xl text-base text-slate-200 md:text-lg"
					>
						Bắt đầu gian hàng trong vài phút và để hệ thống Shopiew giúp
						bạn chốt nhiều đơn hơn mỗi ngày.
					</p>
					<div className="mt-6">
						<Button
							asChild
							size="lg"
							className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 text-white hover:from-cyan-600 hover:to-blue-700"
						>
							<Link href="/auth/signup">
								Mở gian hàng miễn phí
								<ArrowRight className="h-5 w-5" />
							</Link>
						</Button>
					</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}

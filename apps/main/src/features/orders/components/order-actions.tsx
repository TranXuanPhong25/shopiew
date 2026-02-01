"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MessageCircle, Headphones } from "lucide-react";

export function OrderActions() {
	return (
		<Card className="p-4">
			<h2 className="font-semibold mb-4">Hỗ trợ đơn hàng</h2>
			<div className="space-y-3">
				<Button
					variant="outline"
					className="w-full justify-start gap-3 h-auto py-3"
				>
					<FileText className="h-5 w-5 flex-shrink-0" />
					<div className="text-left">
						<p className="font-medium">Biên nhận</p>
						<p className="text-xs text-muted-foreground">
							Xem và tải xuống biên nhận đơn hàng
						</p>
					</div>
				</Button>

				<Button
					variant="outline"
					className="w-full justify-start gap-3 h-auto py-3"
				>
					<MessageCircle className="h-5 w-5 flex-shrink-0" />
					<div className="text-left">
						<p className="font-medium">Liên hệ người bán</p>
						<p className="text-xs text-muted-foreground">
							Gửi tin nhắn trực tiếp cho người bán
						</p>
					</div>
				</Button>

				<Button
					variant="outline"
					className="w-full justify-start gap-3 h-auto py-3"
				>
					<Headphones className="h-5 w-5 flex-shrink-0" />
					<div className="text-left">
						<p className="font-medium">Liên hệ Shopiew</p>
						<p className="text-xs text-muted-foreground">
							Hỗ trợ từ đội ngũ chăm sóc khách hàng
						</p>
					</div>
				</Button>
			</div>
		</Card>
	);
}

"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Package, Truck } from "lucide-react";
import { OrderService } from "../services";
import { toast } from "sonner";
import type { OrderListItemDTO } from "../types";

interface ReadyToShipDialogProps {
	order: OrderListItemDTO | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
}

export function ReadyToShipDialog({
	order,
	open,
	onOpenChange,
	onSuccess,
}: ReadyToShipDialogProps) {
	const [loading, setLoading] = useState(false);
	const [specialInstructions, setSpecialInstructions] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!order) return;

		setLoading(true);

		try {
			const response = await OrderService.markReadyToShip(order.id, {
				specialInstructions: specialInstructions.trim() || undefined,
			});

			toast.success("Đã xác nhận sẵn sàng giao hàng!", {
				description: `Mã vận đơn: ${response.packageNumber}. Shipper sẽ đến lấy hàng.`,
			});

			onOpenChange(false);
			onSuccess?.();

			// Reset form
			setSpecialInstructions("");
		} catch (error: any) {
			console.error("Failed to mark ready to ship:", error);
			toast.error("Không thể xác nhận", {
				description:
					error.response?.data?.message ||
					"Đã có lỗi xảy ra. Vui lòng thử lại.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Truck className="h-5 w-5" />
						Xác nhận sẵn sàng giao hàng
					</DialogTitle>
					<DialogDescription>
						Đơn hàng{" "}
						<span className="font-semibold">{order?.orderNumber}</span> đã
						được chuẩn bị xong. Shipper sẽ đến lấy hàng tại địa chỉ cửa hàng
						đã đăng ký.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="specialInstructions">Ghi chú cho shipper (tuỳ chọn)</Label>
						<Textarea
							id="specialInstructions"
							placeholder="VD: Hàng dễ vỡ, cần xử lý cẩn thận, gọi trước 30 phút..."
							value={specialInstructions}
							onChange={(e) => setSpecialInstructions(e.target.value)}
							rows={3}
							disabled={loading}
						/>
						<p className="text-xs text-muted-foreground">
							Thông tin lấy hàng sẽ lấy từ địa chỉ cửa hàng đã đăng ký
						</p>
					</div>

					<div className="rounded-lg border bg-muted/50 p-4">
						<div className="flex items-start gap-3">
							<Package className="h-5 w-5 text-muted-foreground" />
							<div className="text-sm">
								<p className="font-medium">Lưu ý:</p>
								<ul className="mt-1 list-inside list-disc space-y-1 text-muted-foreground">
									<li>
										Vui lòng đóng gói cẩn thận để bảo vệ hàng hóa trong quá
										trình vận chuyển
									</li>
									<li>
										Shipper sẽ đến lấy hàng trong vòng 24 giờ tới (thường là
										ngày hôm sau)
									</li>
									<li>
										Bạn sẽ nhận được mã vận đơn để theo dõi hành trình giao
										hàng
									</li>
								</ul>
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={loading}
						>
							Hủy
						</Button>
						<Button type="submit" disabled={loading}>
							{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Xác nhận sẵn sàng
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

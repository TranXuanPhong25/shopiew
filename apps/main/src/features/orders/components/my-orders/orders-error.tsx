import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface OrdersErrorProps {
	onRetry: () => void;
}

export function OrdersError({ onRetry }: OrdersErrorProps) {
	return (
		<Card className="p-6 text-center space-y-3">
			<p className="text-sm text-muted-foreground">
				Không thể tải danh sách đơn hàng. Vui lòng thử lại.
			</p>
			<Button variant="outline" onClick={onRetry}>
				Thử lại
			</Button>
		</Card>
	);
}

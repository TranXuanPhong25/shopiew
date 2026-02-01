import Link from "next/link";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function OrdersEmpty() {
	return (
		<Card className="p-6 text-center space-y-3">
			<Package className="h-10 w-10 mx-auto text-muted-foreground" />
			<p className="font-medium">Bạn chưa có đơn hàng nào</p>
			<p className="text-sm text-muted-foreground">
				Khi mua hàng, đơn sẽ hiển thị tại đây.
			</p>
			<Link href="/">
				<Button>Tiếp tục mua sắm</Button>
			</Link>
		</Card>
	);
}

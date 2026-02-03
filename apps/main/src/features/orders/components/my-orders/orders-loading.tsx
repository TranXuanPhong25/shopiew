import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function OrdersLoading() {
	return (
		<div className="space-y-4">
			{Array.from({ length: 3 }).map((_, idx) => (
				<Card key={idx} className="p-4">
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<Skeleton className="h-4 w-40" />
							<Skeleton className="h-3 w-24" />
						</div>
						<Skeleton className="h-6 w-24" />
					</div>
					<Separator className="my-4" />
					<div className="flex items-center gap-3">
						<Skeleton className="h-10 w-10 rounded-md" />
						<div className="flex-1 space-y-2">
							<Skeleton className="h-4 w-48" />
							<Skeleton className="h-3 w-32" />
						</div>
						<Skeleton className="h-4 w-20" />
					</div>
				</Card>
			))}
		</div>
	);
}

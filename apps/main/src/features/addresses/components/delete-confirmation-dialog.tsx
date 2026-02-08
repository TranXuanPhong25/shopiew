"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface DeleteConfirmationDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	addressName: string;
	isLoading?: boolean;
}

export function DeleteConfirmationDialog({
	open,
	onOpenChange,
	onConfirm,
	addressName,
	isLoading = false,
}: DeleteConfirmationDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-labelledby="delete-dialog-title">
				<DialogHeader>
					<div className="flex items-start gap-3">
						<div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
							<AlertCircle className="h-5 w-5 text-red-600" aria-hidden="true" />
						</div>
						<div className="flex-1">
							<DialogTitle id="delete-dialog-title" className="text-lg">
								Xác nhận xóa địa chỉ
							</DialogTitle>
							<DialogDescription className="space-y-2 mt-2">
								<p>
									Bạn có chắc chắn muốn xóa địa chỉ của{" "}
									<strong className="text-gray-900">{addressName}</strong>?
								</p>
								<p className="text-sm text-gray-600">
									Hành động này không thể hoàn tác. Địa chỉ sẽ bị xóa vĩnh viễn.
								</p>
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>
				<DialogFooter className="gap-2 sm:gap-0">
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isLoading}
						className="min-h-[44px]"
					>
						Hủy
					</Button>
					<Button
						type="button"
						onClick={onConfirm}
						disabled={isLoading}
						className="bg-red-600 hover:bg-red-700 focus:ring-red-600 min-h-[44px]"
					>
						{isLoading ? (
							<>
								<span className="animate-spin mr-2">⏳</span>
								Đang xóa...
							</>
						) : (
							"Xóa địa chỉ"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

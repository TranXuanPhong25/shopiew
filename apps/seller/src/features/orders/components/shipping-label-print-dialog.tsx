"use client";

import { useRef } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, X, Package, MapPin, Store, Hash } from "lucide-react";
import type { OrderListItemDTO } from "../types";
import { format } from "date-fns";

interface ShippingLabelPrintDialogProps {
	orders: OrderListItemDTO[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

function BarcodeStripes({ value }: { value: string }) {
	// deterministic stripe pattern from order number chars
	const pattern = Array.from(value).flatMap((ch) => {
		const n = ch.charCodeAt(0) % 8;
		return [
			{ w: (n % 3) + 1, gap: false },
			{ w: 1, gap: true },
		];
	});
	return (
		<div className="flex h-10 items-end gap-0 overflow-hidden">
			{pattern.map((bar, i) =>
				bar.gap ? (
					<div
						key={i}
						style={{ width: bar.w * 2 }}
						className="h-full bg-white"
					/>
				) : (
					<div
						key={i}
						style={{ width: bar.w * 2 }}
						className="bg-black h-full"
					/>
				),
			)}
		</div>
	);
}

function ShippingLabel({ order }: { order: OrderListItemDTO }) {
	const formatCurrency = (amount: number) =>
		new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
			maximumFractionDigits: 0,
		}).format(amount);

	const formatDate = (d: string) => {
		try {
			return format(new Date(d), "dd/MM/yyyy HH:mm");
		} catch {
			return d;
		}
	};

	return (
		<div
			className="shipping-label w-[400px] border-2 border-black bg-white text-black text-[13px] font-sans"
			style={{ pageBreakAfter: "always", breakAfter: "page" }}
		>
			{/* Header */}
			<div className="flex items-center justify-between border-b-2 border-black px-3 py-2">
				<span className="text-lg font-black tracking-widest">SHOPIEW</span>
				<span className="rounded border border-black px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
					Phiếu giao hàng
				</span>
			</div>

			{/* Order number + barcode */}
			<div className="border-b border-dashed border-black px-3 py-2">
				<div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
					<Hash className="h-3 w-3" />
					<span>Mã đơn hàng</span>
				</div>
				<p className="text-xl font-black tracking-wider">
					#{order.orderNumber}
				</p>
				<div className="mt-2 overflow-hidden rounded">
					<BarcodeStripes value={order.orderNumber} />
					<p className="mt-0.5 text-center font-mono text-[10px] tracking-[4px]">
						{order.orderNumber}
					</p>
				</div>
			</div>

			{/* Sender */}
			<div className="border-b border-dashed border-black px-3 py-2">
				<div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase text-gray-500">
					<Store className="h-3 w-3" />
					<span>Người gửi</span>
				</div>
				<p className="font-semibold">{order.shopName || order.shopId}</p>
			</div>

			{/* Recipient */}
			<div className="border-b border-dashed border-black px-3 py-2">
				<div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase text-gray-500">
					<MapPin className="h-3 w-3" />
					<span>Người nhận</span>
				</div>
				<p className="font-semibold">{order.customerName || "—"}</p>
				{order.shippingAddress && (
					<p className="mt-0.5 text-xs text-gray-700 leading-snug">
						{order.shippingAddress}
					</p>
				)}
			</div>

			{/* Footer info */}
			<div className="px-3 py-2 flex items-center justify-between">
				<div className="flex items-center gap-1 text-xs text-gray-600">
					<Package className="h-3 w-3" />
					<span>{order.itemCount} sản phẩm</span>
				</div>
				<div className="text-right">
					<p className="text-xs text-gray-500">COD (Thu hộ)</p>
					<p className="text-base font-black">
						{formatCurrency(order.totalAmount)}
					</p>
				</div>
			</div>

			<div className="border-t border-dashed border-black px-3 py-1.5 text-[10px] text-gray-500 flex justify-between">
				<span>Ngày tạo: {formatDate(order.createdAt)}</span>
				<span>ID: {order.id}</span>
			</div>
		</div>
	);
}

export function ShippingLabelPrintDialog({
	orders,
	open,
	onOpenChange,
}: ShippingLabelPrintDialogProps) {
	const printRef = useRef<HTMLDivElement>(null);

	const handlePrint = () => {
		const printContent = printRef.current;
		if (!printContent) return;

		const printWindow = window.open("", "_blank", "width=900,height=700");
		if (!printWindow) return;

		printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Phiếu giao hàng</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { background: white; font-family: sans-serif; }
            .print-grid { display: flex; flex-wrap: wrap; gap: 16px; padding: 16px; }
            .shipping-label { width: 400px; border: 2px solid black; background: white; color: black; font-size: 13px; page-break-after: always; break-after: page; }
            .shipping-label > * { padding: 8px 12px; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid black; }
            .header .brand { font-size: 18px; font-weight: 900; letter-spacing: 4px; }
            .header .badge { border: 1px solid black; padding: 2px 8px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
            .section { border-bottom: 1px dashed black; }
            .label-sm { font-size: 10px; font-weight: bold; text-transform: uppercase; color: #666; margin-bottom: 2px; }
            .order-number { font-size: 20px; font-weight: 900; letter-spacing: 2px; }
            .barcode-container { margin-top: 6px; overflow: hidden; }
            .barcode-mono { text-align: center; font-family: monospace; font-size: 10px; letter-spacing: 4px; margin-top: 2px; }
            .name { font-weight: 600; }
            .address { font-size: 11px; color: #444; margin-top: 2px; line-height: 1.4; }
            .footer-row { display: flex; justify-content: space-between; align-items: center; }
            .items-count { font-size: 12px; color: #555; }
            .cod-label { font-size: 10px; color: #555; text-align: right; }
            .cod-amount { font-size: 16px; font-weight: 900; text-align: right; }
            .meta { border-top: 1px dashed black; font-size: 10px; color: #888; display: flex; justify-content: space-between; }
            @media print {
              .print-grid { gap: 0; padding: 0; }
              .shipping-label { break-after: page; page-break-after: always; width: 100%; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
		printWindow.document.close();
		printWindow.focus();
		setTimeout(() => {
			printWindow.print();
			printWindow.close();
		}, 300);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Printer className="h-5 w-5" />
						In phiếu giao hàng ({orders.length} đơn)
					</DialogTitle>
				</DialogHeader>

				{/* Preview */}
				<div className="flex-1 overflow-y-auto rounded-lg border bg-gray-100 p-4">
					<div
						ref={printRef}
						id="shipping-labels-print-area"
						className="print-grid flex flex-wrap gap-4"
					>
						{orders.map((order) => (
							<ShippingLabel key={order.id} order={order} />
						))}
					</div>
				</div>

				<DialogFooter className="gap-2">
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						<X className="mr-2 h-4 w-4" />
						Đóng
					</Button>
					<Button onClick={handlePrint} className="gap-2">
						<Printer className="h-4 w-4" />
						In phiếu ({orders.length})
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

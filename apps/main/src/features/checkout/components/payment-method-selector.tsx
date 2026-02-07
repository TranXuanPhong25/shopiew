"use client";

import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
	Wallet, 
	CreditCard, 
	Smartphone,
	Banknote,
	Check
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethodSelectorProps {
	selectedMethod: string;
	onMethodSelect: (method: string) => void;
}

const paymentMethods = [
	{
		id: "cod",
		name: "Thanh toán khi nhận hàng",
		description: "Thanh toán bằng tiền mặt khi nhận hàng",
		icon: Banknote,
		color: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		id: "bank_transfer",
		name: "Chuyển khoản ngân hàng",
		description: "Chuyển khoản qua VietQR hoặc STK",
		icon: CreditCard,
		color: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	{
		id: "momo",
		name: "Ví MoMo",
		description: "Thanh toán qua ứng dụng MoMo",
		icon: Smartphone,
		color: "text-pink-600",
		bgColor: "bg-pink-50",
	},
	{
		id: "zalopay",
		name: "Ví ZaloPay",
		description: "Thanh toán qua ứng dụng ZaloPay",
		icon: Wallet,
		color: "text-cyan-600",
		bgColor: "bg-cyan-50",
	},
];

export function PaymentMethodSelector({ selectedMethod, onMethodSelect }: PaymentMethodSelectorProps) {
	return (
		<Card className="p-6">
			<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
				<Wallet className="w-5 h-5 text-brand-500" />
				Phương thức thanh toán
			</h2>

			<div className="space-y-3">
				{paymentMethods.map((method) => {
					const Icon = method.icon;
					const isSelected = selectedMethod === method.id;

					return (
						<div
							key={method.id}
							onClick={() => onMethodSelect(method.id)}
							className={cn(
								"p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-brand-300 hover:shadow-sm",
								isSelected
									? "border-brand-500 bg-brand-50 shadow-md"
									: "border-gray-200"
							)}
						>
							<div className="flex items-center gap-4">
								<div className={cn("p-3 rounded-xl", method.bgColor)}>
									<Icon className={cn("w-6 h-6", method.color)} />
								</div>
								
								<div className="flex-1">
									<p className="font-medium text-gray-900">{method.name}</p>
									<p className="text-sm text-gray-500 mt-0.5">{method.description}</p>
								</div>

								{isSelected && (
									<div className="ml-auto flex-shrink-0">
										<div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
											<Check className="w-4 h-4 text-white" />
										</div>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</Card>
	);
}

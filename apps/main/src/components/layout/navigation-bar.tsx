import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { DroppableSearch } from "@/components/layout/droppable-search";
import AccountButton from "@/components/layout/account-button";
import AddressIndicator from "./nav/address-indicator";
import CartIndicator from "./nav/cart-indicator";
import PromoTopBarServer from "@/features/promotions/components/promo-top-bar-server";

const NavigationBar = () => {
	return (
		<div className="w-full top-0 z-50">
			{/*promotion banner*/}
			<PromoTopBarServer />

			{/* Main header */}
			<div className="w-full px-2 sm:px-4 border-b bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60">
				<nav className="max-w-7xl mx-auto flex items-center px-4">
					<div>
						{/* Mobile menu button */}
						<Button
							variant="ghost"
							size="icon"
							className="lg:hidden"
							aria-label="Open menu"
						>
							<Menu className="w-5 h-5" aria-hidden="true" />
						</Button>
						{/* Logo */}
						<Link href="/" className="group flex flex-col">
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700 font-bold text-xl sm:text-3xl transition-all group-hover:from-brand-600 group-hover:to-brand-800">
								Shopiew
							</span>
							<span className="text-[10px] sm:text-xs font-normal text-muted-foreground mt-0.5">
								Good & goods
							</span>
						</Link>
					</div>
					<div className="w-full px-2 sm:px-4 py-3">
						<div className="flex items-center gap-2 sm:gap-8">
							{/*Search bar*/}
							<div className="flex-1 relative">
								<DroppableSearch />
							</div>

							{/* Right side buttons */}
							<div className="flex items-center gap-2 sm:gap-4">
								<div className="hidden sm:block">
									<AccountButton />
								</div>
								<div className="sm:hidden">
									<AccountButton />
								</div>

								<CartIndicator />
							</div>
						</div>

						<AddressIndicator />
					</div>
				</nav>
			</div>
		</div>
	);
};

export default NavigationBar;

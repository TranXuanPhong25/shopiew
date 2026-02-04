"use client";

import * as React from "react";
import { Search, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// This is a mock function to simulate search results
const mockSearch = (query: string) => {
	const items = [
		"Apple",
		"Banana",
		"Cherry",
		"Date",
		"Elderberry",
		"Fig",
		"Grape",
		"Honeydew",
		"Imbe",
		"Jackfruit",
	];
	return items.filter((item) =>
		item.toLowerCase().includes(query.toLowerCase()),
	);
};

export function DroppableSearch() {
	const [query, setQuery] = React.useState("");
	const [results, setResults] = React.useState<string[]>([]);
	const [isOpen, setIsOpen] = React.useState(false);
	const [selectedIndex, setSelectedIndex] = React.useState(-1);
	const [isFocused, setIsFocused] = React.useState(false);
	const dropdownRef = React.useRef<HTMLDivElement>(null);
	const router = useRouter();

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		setQuery(newQuery);
		if (newQuery.trim()) {
			const searchResults = mockSearch(newQuery);
			setResults(searchResults);
			setIsOpen(true);
			setSelectedIndex(-1);
		} else {
			setResults([]);
			setIsOpen(false);
		}
	};

	const handleClick = (result: string) => {
		setQuery(result);
		setIsOpen(false);
		router.push(`/search?query=${result}`);
	};
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex((prev) =>
				prev < results.length - 1 ? prev + 1 : prev,
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
		} else if (e.key === "Enter") {
			if (selectedIndex === -1) {
				router.push(`/search?query=${query}`);
				setIsOpen(false);
				setQuery(query);
				return;
			}
			router.push(`/search?query=${results[selectedIndex]}`);
			setQuery(results[selectedIndex]);
			setIsOpen(false);
		} else if (e.key === "Escape") {
			setIsOpen(false);
		}
	};

	const handleClickOutside = React.useCallback((e: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(e.target as Node)
		) {
			setIsOpen(false);
		}
	}, []);

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]);

	const handleClickSearch = () => {
		router.push(`/search?q=${query}`);
	};

	return (
		<div className="relative w-full" ref={dropdownRef}>
			<div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
				<div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
					<Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
				</div>
				<Input
					type="search"
					placeholder="Search products, brands…"
					value={query}
					onChange={handleSearch}
					onKeyDown={handleKeyDown}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					autoComplete="off"
					spellCheck={false}
					className="pl-10 pr-20 h-11 bg-slate-50/80 border-slate-200 focus:bg-white focus-visible:ring-brand-500/20 focus-visible:border-brand-500 rounded-xl"
					aria-label="Search products"
					aria-expanded={isOpen}
					aria-controls="search-results"
					role="combobox"
				/>
				<div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
					<Button
						size="sm"
						variant="ghost"
						className="h-8 w-8 p-0 text-muted-foreground hover:text-brand-500"
						aria-label="Voice search"
						type="button"
					>
						<Mic className="h-4 w-4" aria-hidden="true" />
					</Button>
					<Button
						size="sm"
						className="h-8 px-3 rounded-lg bg-brand-500 hover:bg-brand-600"
						aria-label="Search"
						onClick={handleClickSearch}
						type="button"
					>
						<Search className="h-4 w-4" aria-hidden="true" />
					</Button>
				</div>
			</div>
			{isOpen && results.length > 0 && (
				<div 
					id="search-results"
					className="absolute z-50 w-full mt-2 rounded-xl border border-border/50 bg-white/95 backdrop-blur-lg shadow-xl animate-fade-in overflow-hidden"
				>
					<ul className="max-h-72 overflow-auto py-2" role="listbox">
						{results.map((result, index) => (
							<li
								key={result}
								className={`cursor-pointer px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
									index === selectedIndex
										? "bg-brand-50 text-brand-700"
										: "hover:bg-slate-50"
								}`}
								role="option"
								aria-selected={index === selectedIndex}
								onClick={() => handleClick(result)}
							>
								<Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
								<span>{result}</span>
							</li>
						))}
					</ul>
					<div className="border-t px-4 py-2 text-xs text-muted-foreground">
						Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px]">↵</kbd> to search
					</div>
				</div>
			)}
		</div>
	);
}

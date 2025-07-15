"use client"

import * as React from "react"
import {Search} from "lucide-react"
import {Input} from "@/src/components/ui/input"
import {Button} from "@/src/components/ui/button"
import {useRouter} from 'next/navigation'

// This is a mock function to simulate search results
const mockSearch = (query: string) => {
    const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew", "Imbe", "Jackfruit"]
    return items.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
}

export function DroppableSearch() {
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState<string[]>([])
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(-1)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const router = useRouter()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        setQuery(newQuery)
        if (newQuery.trim()) {
            const searchResults = mockSearch(newQuery)
            setResults(searchResults)
            setIsOpen(true)
            setSelectedIndex(-1)
        } else {
            setResults([])
            setIsOpen(false)
        }
    }

    const handleClick = (result: string) => {
        setQuery(result)
        setIsOpen(false)
        router.push(`/search?query=${result}`)
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault()
            setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        } else if (e.key === "Enter") {
            if (selectedIndex === -1) {
                router.push(`/search?query=${query}`)
                setIsOpen(false)
                setQuery(query)
                return
            }
            router.push(`/search?query=${results[selectedIndex]}`)
            setQuery(results[selectedIndex])
            setIsOpen(false)
        } else if (e.key === "Escape") {
            setIsOpen(false)
        }
    }

    const handleClickOutside = React.useCallback((e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false)
        }
    }, [])

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside])

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div className="relative">
                <Input
                    type="search"
                    placeholder="Search..."
                    value={query}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    className="pr-10 focus-visible:ring-2 focus-visible:ring-custom-1 focus-visible:ring-opacity-0 focus-visible:border-t-0 focus-visible:rounded-b-none transition-all"
                />
                <Button size="sm" variant="ghost"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-custom-1 hover:text-white"
                        aria-label="Search">
                    <Search className="h-4 w-4"/>
                </Button>
            </div>
            {isOpen && results.length > 0 && (
                <div
                    className="absolute z-10  w-full rounded-b-lg border border-border bg-background/70 backdrop-blur-2xl shadow-lg border-t-0">
                    <ul className="max-h-60 overflow-auto py-1" role="listbox">
                        {results.map((result, index) => (
                            <li
                                key={result}
                                className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-300 hover:text-accent-foreground ${
                                    index === selectedIndex ? "bg-gray-300 text-accent-foreground" : ""
                                }`}
                                role="option"
                                aria-selected={index === selectedIndex}
                                onClick={() => handleClick(result)}
                            >
                                {result}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}


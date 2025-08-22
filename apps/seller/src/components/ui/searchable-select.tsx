"use client"

import * as React from "react"
import {Check, ChevronsUpDown} from 'lucide-react'

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"

export default function SearchableSelect() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [brands, setBrands] = React.useState([
    {
      value: "wellaiya",
      label: "Wellaiya",
    },
    {
      value: "brand-a",
      label: "Brand A",
    },
    {
      value: "brand-b",
      label: "Brand B",
    },
    {
      value: "nike",
      label: "Nike",
    },
    {
      value: "adidas",
      label: "Adidas",
    },
    {
      value: "puma",
      label: "Puma",
    },
  ])
  const [searchTerm, setSearchTerm] = React.useState("")

  const addNewBrand = (brandName: string) => {
    const newBrand = {
      value: brandName.toLowerCase().replace(/\s+/g, '-'),
      label: brandName,
    }
    setBrands(prev => [...prev, newBrand])
    setValue(newBrand.value)
    setOpen(false)
    setSearchTerm("")
  }

  return (
    <div className="w-full max-w-sm space-y-2">
      <label className="text-sm font-medium text-gray-700">
        * Thương hiệu
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left font-normal"
          >
            {value
              ? brands.find((brand) => brand.value === value)?.label
              : "Chọn thương hiệu"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Tìm kiếm thương hiệu..." 
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList>
              <CommandEmpty>
                <div className="py-2">
                  <p className="text-sm text-gray-500 mb-2">Không tìm thấy thương hiệu.</p>
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => addNewBrand(searchTerm)}
                    >
                      <span className="text-blue-600">+ Thêm "{searchTerm}"</span>
                    </Button>
                  )}
                </div>
              </CommandEmpty>
              <CommandGroup>
                {brands.map((brand) => (
                  <CommandItem
                    key={brand.value}
                    value={brand.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === brand.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {brand.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      {/* Display selected value */}
      {value && (
        <p className="text-sm text-gray-600">
          Selected: {brands.find((brand) => brand.value === value)?.label}
        </p>
      )}
    </div>
  )
}

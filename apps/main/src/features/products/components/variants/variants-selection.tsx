"use client"

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, ChevronDown, X } from 'lucide-react'
import Image from 'next/image'
import { VariantOption, VariantOptionValue, SelectedVariant } from '@/features/products/types'
import { useVariantSelectionStore } from '../../../../stores/variant-selection-store'

interface VariantsSelectionProps {
  disabled?: boolean
  compact?: boolean
  onClearSelection?: () => void
}

export default function VariantsSelection({
  disabled = false,
  compact = false,
  onClearSelection
}: VariantsSelectionProps) {
  // Get variant selection state from store
  const {
    options,
    selectedVariant,
    selectVariant,
    clearSelection
  } = useVariantSelectionStore();
  
  const handleClearSelection = () => {
    clearSelection();
    onClearSelection?.();
  };

  if (!options || options.length === 0) {
    return null
  }

  const renderOptionValue = (option: VariantOption, value: VariantOptionValue) => {
    const isSelected = selectedVariant[option.name] === value.value
    const isDisabled = disabled || value.disabled || value.available === false

    // Color variant with image preview (like Shopee/TikTok)
    if (option.name.toLowerCase() === 'color' && value.images && value.images.length > 0) {
      return (
        <Button
          key={value.id}
          variant="ghost"
          size={compact ? "sm" : "default"}
          onClick={() => !isDisabled && selectVariant(option.name, value.value)}
          disabled={isDisabled}
          className={cn(
            "relative flex items-center gap-2 p-2 h-auto border-2 transition-all",
            "hover:border-orange-300 hover:bg-orange-50",
            isSelected 
              ? "border-orange-500 bg-orange-50 text-orange-700" 
              : "border-gray-200 bg-white",
            isDisabled && "opacity-50 cursor-not-allowed",
            compact && "text-xs p-1.5"
          )}
        >
          <div className={cn(
            "relative rounded overflow-hidden border",
            compact ? "w-6 h-6" : "w-8 h-8"
          )}>
            <Image
              src={value.images[0]}
              alt={value.value}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium">{value.value}</span>
          {isSelected && (
            <Check className={cn(
              "text-orange-600",
              compact ? "w-3 h-3" : "w-4 h-4"
            )} />
          )}
          {isDisabled && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <X className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </Button>
      )
    }

    // Size variant (like Shopify/Fashion sites)
    if (option.name.toLowerCase() === 'size') {
      return (
        <Button
          key={value.id}
          variant="ghost"
          size={compact ? "sm" : "default"}
          onClick={() => !isDisabled && selectVariant(option.name, value.value)}
          disabled={isDisabled}
          className={cn(
            "relative border-2 font-semibold transition-all min-w-[3rem]",
            "hover:border-orange-300 hover:bg-orange-50",
            isSelected 
              ? "border-orange-500 bg-orange-500 text-white hover:bg-orange-500" 
              : "border-gray-200 bg-white text-gray-700",
            isDisabled && "opacity-50 cursor-not-allowed line-through",
            compact && "text-xs min-w-[2.5rem] h-8"
          )}
        >
          {value.value}
          {isDisabled && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <X className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </Button>
      )
    }

    // Style/Material variant (like luxury brands)
    if (option.name.toLowerCase() === 'style' || option.name.toLowerCase() === 'material') {
      return (
        <Badge
          key={value.id}
          variant={isSelected ? "default" : "outline"}
          className={cn(
            "cursor-pointer px-3 py-2 text-sm font-medium transition-all",
            "hover:bg-orange-50 hover:border-orange-300",
            isSelected 
              ? "bg-orange-500 text-white border-orange-500" 
              : "bg-white text-gray-700 border-gray-200",
            isDisabled && "opacity-50 cursor-not-allowed",
            compact && "text-xs px-2 py-1"
          )}
          onClick={() => !isDisabled && selectVariant(option.name, value.value)}
        >
          {value.value}
          {isSelected && <Check className="ml-1 w-3 h-3" />}
        </Badge>
      )
    }

    // Default variant type
    return (
      <Button
        key={value.id}
        variant={isSelected ? "default" : "outline"}
        size={compact ? "sm" : "default"}
        onClick={() => !isDisabled && selectVariant(option.name, value.value)}
        disabled={isDisabled}
        className={cn(
          "transition-all",
          "hover:border-sky-300 hover:bg-sky-50",
          isSelected 
            ? "bg-sky-500 text-white border-sky-500 hover:bg-sky-500" 
            : "text-gray-700 border-gray-200",
          isDisabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {value.value}
        {isSelected && <Check className="ml-1 w-4 h-4" />}
      </Button>
    )
  }

  return (
    <div className={cn("space-y-4", compact && "space-y-3")}>
      {/* Selected variant summary (like TikTok Shop) */}
      {Object.keys(selectedVariant).length > 0 && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Selected:</span>
            <div className="flex gap-1">
              {Object.entries(selectedVariant).map(([key, value]) => (
                <Badge key={key} variant="secondary" className="text-xs">
                  {key}: {value}
                </Badge>
              ))}
            </div>
          </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSelection}
              className="h-6 px-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-3 h-3" />
            </Button>
        </div>
      )}

      {/* Variant options */}
      {options.map((option) => (
        <div key={option.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className={cn(
              "font-medium text-gray-800",
              compact ? "text-sm" : "text-base"
            )}>
              {option.name}
              {selectedVariant[option.name] && (
                <span className="ml-2 text-orange-600 font-semibold">
                  {selectedVariant[option.name]}
                </span>
              )}
            </h3>
            
            {/* Availability indicator */}
            {option.values.some(v => !v.available) && (
              <span className="text-xs text-gray-500">
                {option.values.filter(v => v.available !== false).length} available
              </span>
            )}
          </div>

          {/* Option values */}
          <div className={cn(
            "flex flex-wrap gap-2",
            compact && "gap-1.5"
          )}>
            {option.values.map((value) => renderOptionValue(option, value))}
          </div>

          {/* Out of stock message */}
          {selectedVariant[option.name] && 
           option.values.find(v => v.value === selectedVariant[option.name])?.available === false && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <X className="w-4 h-4" />
              This variant is currently out of stock
            </p>
          )}
        </div>
      ))}

      {/* Guidance text (like Shopee) */}
      {Object.keys(selectedVariant).length < options.length && (
        <p className="text-sm text-gray-500 italic">
          Please select {options.find(opt => !selectedVariant[opt.name])?.name.toLowerCase() || 'all options'} to continue
        </p>
      )}
    </div>
  )
}
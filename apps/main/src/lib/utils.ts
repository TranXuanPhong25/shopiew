import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handlePlural(value: number, unit: string, shouldTruncate: boolean = false): string {
  unit = " " + unit;
  if (value > 1 && unit != " ") {
    unit += "s";
  }

  if (shouldTruncate && value > 1000) {
    value = Math.floor(value / 1000);
    unit = "K" + unit;
  } else {
    const formattedNumber = new Intl.NumberFormat('en-US').format(value);
    return `${formattedNumber}${unit}`;
  }

  return `${value}${unit}`;
}

export function formatCurrency(value: number, currency: string = 'VND'): string {
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(value)
}

export function parseLinks(text: string) {
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        parts.push(`<a href="${match[1]}" class="text-blue-500 dark:text-blue-400 hover:underline">${match[2]}</a>`);
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }
    return parts.join('');
}
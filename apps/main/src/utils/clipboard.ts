/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (err) {
		console.error("Failed to copy to clipboard:", err);
		return false;
	}
}

/**
 * Hook-like utility for managing copy state
 * Returns a copy function that automatically manages copied state
 */
export function createCopyHandler(
	text: string,
	onCopiedChange: (copied: boolean) => void,
	duration = 2000,
) {
	return async () => {
		const success = await copyToClipboard(text);
		if (success) {
			onCopiedChange(true);
			setTimeout(() => onCopiedChange(false), duration);
		}
	};
}

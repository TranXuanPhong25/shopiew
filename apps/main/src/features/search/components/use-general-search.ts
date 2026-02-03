import { useQuery } from "@tanstack/react-query";
import searchService from "../service";

// Statuses that should continue polling

export function useGeneralSearch(query: string) {
	return useQuery({
		queryKey: ["search", query],
		queryFn: () => searchService.searchQuery(query),
		enabled: !!query,
		refetchIntervalInBackground: false,
	});
}

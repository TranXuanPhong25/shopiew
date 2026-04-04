import axiosClient from "@/utils/axiosClient";
import { SearchAutocompleteResponse, SearchResult } from "./type";

class SearchService {
	async searchQuery(query: string) {
		const response = await axiosClient.get<SearchResult>("/search", {
			params: { q: query },
		});
		return response.data;
	}

	async autocomplete(query: string, limit: number = 5) {
		const response = await axiosClient.get<SearchAutocompleteResponse>(
			"/search/autocomplete",
			{
				params: {
					q: query,
					query,
					limit,
				},
			},
		);

		return response.data;
	}
}

const searchService = new SearchService();

export default searchService;

import axiosClient from "@/utils/axiosClient";
import { SearchResult } from "./type";

class SearchService {
	async searchQuery(query: string) {
		const response = await axiosClient.get<SearchResult>("/search", {
			params: { q: query },
		});
		return response.data;
	}
}

const searchService = new SearchService();

export default searchService;

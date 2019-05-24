import { GeneralService } from './general/general.service';

export class SearchService {
	public static searchProjects (search_field: string) {
		return GeneralService.makeGetRequest ('projectSearch?search-field=' + search_field);
	}
	
	public static searchUsers (search_field: string) {
		return GeneralService.makeGetRequest ('userSearch?search-field=' + search_field);
	}
}

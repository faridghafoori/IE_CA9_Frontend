import { GeneralService } from './general/general.service';

export class UserService {
	public static getAllUsers () {
		return GeneralService.makeGetRequest ('users');
	}
	
	public static getUser (user_id: string) {
		return GeneralService.makeGetRequest ('users/' + user_id);
	}
	
	public static getProfile () {
		return GeneralService.makeGetRequest ('profile');
	}
}

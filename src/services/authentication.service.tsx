import { GeneralService } from './general/general.service';

let md5 = require ('md5');

export class AuthenticationService {
	static signIn (userName: string, password: string) {
		let md5_pass = md5 (password);
		return GeneralService.makePostRequest ('sign-in', {
			'userName': userName,
			'password': md5_pass
		});
	}

	static signUp (firstName: string, lastName: string, userName: string, password: string, confirmPassword: string, jobTitle: string, profilePictureUrl: string, bio: string) {
		let md5_pass         = md5 (password);
		let md5_confirm_pass = md5 (confirmPassword);
		if (md5_pass === md5_confirm_pass) {
			return GeneralService.makePostRequest ('sign-up', {
				'firstName'        : firstName,
				'lastName'         : lastName,
				'userName'         : userName,
				'password'         : md5 (password),
				'jobTitle'         : jobTitle,
				'profilePictureURL': profilePictureUrl,
				'bio'              : bio
			});
		} else {
			alert ('password and confirm password not matched !');
		}
	}
}

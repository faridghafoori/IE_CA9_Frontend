import { Config }        from './config';
import { CookieService } from '../cookie.service';

const axios = require ('axios');

export class GeneralService {
	public static user_token = '';

	public static updateUserToken () {
		//@ts-ignore
		this.user_token = CookieService.getCookie ('user-token');
	}

	public static setTitle (title: string) {
		document.title = title;
	}

	public static getWindowUrl (): string {
		return window.location.pathname;
	}

	public static makeGetRequest (url: string, params?: Object): any {
		this.updateUserToken ();
		const final_service_url = GeneralService.makeFinalRequestUrl (url, params);
		return axios.get (final_service_url, GeneralService.setHeader (this.user_token));
	}

	public static fixPageHeight () {
		let page = document.getElementById ('main');
		if (page) {
			page.style.minHeight = Math.max (document.documentElement.clientHeight, window.innerHeight || 0) - 149 + 'px';
		}
	}

	public static makeFinalRequestUrl (req_url: string, params?: Object) {
		return Config.base_url + req_url;
	}

	public static setHeader (value: string) {
		return { headers: { 'user-token': value } };
	}

	public static makePostRequest (url: string, params: object) {
		this.updateUserToken ();
		const final_service_url = Config.base_url + url;
		return axios.post (final_service_url, params, GeneralService.setHeader (this.user_token));
	}

	public static goToUrl (url: string) {
	}
}

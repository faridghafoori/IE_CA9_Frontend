export class CookieService {

	static setCookie (name: string, value: string) {
		localStorage.setItem (name, value);
	}

	static getCookie (name: string) {
		return localStorage.getItem (name) ? localStorage.getItem (name) : '';
	}

	static removeCookie (name: string) {
		localStorage.removeItem (name);
	}
}

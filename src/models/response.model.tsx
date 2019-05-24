export class ResponseModel {
	private _data!: Array<any>;

	get data (): Array<any> {
		return this._data;
	}

	set data (value: Array<any>) {
		this._data = value;
	}

	private _headers!: any;

	get headers (): any {
		return this._headers;
	}

	set headers (value: any) {
		this._headers = value;
	}

	private _status!: number;

	get status (): number {
		return this._status;
	}

	set status (value: number) {
		this._status = value;
	}

	private _statusText!: string;

	get statusText (): string {
		return this._statusText;
	}

	set statusText (value: string) {
		this._statusText = value;
	}

	private _config!: Object;

	get config (): Object {
		return this._config;
	}

	set config (value: Object) {
		this._config = value;
	}

	private _request!: Object;

	get request (): Object {
		return this._request;
	}

	set request (value: Object) {
		this._request = value;
	}

	public static setResponseModel (value: any): ResponseModel {
		let response = new ResponseModel ();
		if (value) {
			response.config     = value.config;
			response.data       = value.data;
			response.status     = value.status;
			response.statusText = value.statusText;
			response.request    = value.request;
			response.headers    = value.headers;
		}
		return response;
	}
}

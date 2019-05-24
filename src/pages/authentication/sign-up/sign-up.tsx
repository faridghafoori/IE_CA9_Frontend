import * as React                from 'react';
import { Component }             from 'react';
import { GeneralService }        from '../../../services/general/general.service';
import './sign-up.scss';
import { AuthenticationService } from '../../../services/authentication.service';
import { ResponseModel }         from '../../../models/response.model';
import { CookieService }         from '../../../services/cookie.service';

export class SignUp extends Component {
	state = {
		first_name      : '',
		last_name       : '',
		username        : '',
		password        : '',
		confirm_password: '',
		job_title       : '',
		profile_pic_url : '',
		bio             : ''
	};

	constructor (props: Readonly<any>) {
		super (props);
		GeneralService.setTitle ('صفحه ثبت‌ نام');
	}

	componentDidMount (): void {
		GeneralService.fixPageHeight ();
	}

	handleInputChanges (state_name: string, event: any) {
		this.setState ({
			[ state_name ]: event.target.value
		});
	}

	handleSubmit (event: any) {
		event.preventDefault ();
		AuthenticationService.signUp (this.state.first_name, this.state.last_name, this.state.username, this.state.password, this.state.confirm_password, this.state.job_title, this.state.profile_pic_url, this.state.bio)
							 .then ((res: ResponseModel) => {
								 if (res.status === 200) {
									 CookieService.removeCookie ('user-token');
									 CookieService.setCookie ('user-token', res.headers[ 'user-token' ]);
								 }
								 alert (res.data);
							 });
	}

	render () {
		return (<div className="container-fluid main p-0"
					 id="main">

			<div className="bg-light-blue">
				<div className="row no-gutters">
					<div className="container">
						<div className="row">
							<div className="col-12 title font-weight-bolder d-flex p-0 pt-5">
                                <span className="font-weight-light">
                                    <span>برای پیدا کردن کار، تو </span>
                                    <span className="font-weight-bold text-joboonja-aqua"> جاب‌اونجا </span>
                                    <span>ثبت نام کن !</span>
                                </span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row no-gutters">
				<div className="container p-0">
					<div className="row no-gutters form-section">
						<form className="col-8 mx-auto">
							<div className="row no-gutters my-3">
								<label className="w-100 d-flex justify-content-between align-items-center m-0">
									<div className="w-25 text-right d-flex justify-content-between font-weight-bold">
										<span className="d-flex align-items-center">نام</span>
									</div>
									<input className="mr-3 w-75 px-2"
										   onChange={ () => {
											   // eslint-disable-next-line no-restricted-globals
											   this.handleInputChanges ('first_name', event);
										   } }
										   placeholder="نام خود را وارد کنید"/>
								</label>
							</div>
							<div className="row no-gutters my-3">
								<label className="w-100 d-flex justify-content-between align-items-center m-0">
									<div className="w-25 text-right d-flex justify-content-between font-weight-bold">
										<span className="d-flex align-items-center">نام خانوادگی</span>
									</div>
									<input className="mr-3 w-75 px-2"
										   onChange={ () => {
											   // eslint-disable-next-line no-restricted-globals
											   this.handleInputChanges ('last_name', event);
										   } }
										   placeholder="نام خانوادگی خود را وارد کنید"
										   type="text"/>
								</label>
							</div>
							<div className="row no-gutters my-3">
								<label className="w-100 d-flex justify-content-between align-items-center m-0">
									<div className="w-25 text-right d-flex justify-content-between font-weight-bold">
										<span className="d-flex align-items-center">نام کاربری</span>
									</div>
									<input className="mr-3 w-75 px-2"
										   onChange={ () => {
											   // eslint-disable-next-line no-restricted-globals
											   this.handleInputChanges ('username', event);
										   } }
										   placeholder="نام کاربری خود را وارد کنید"
										   type="text"/>
								</label>
							</div>
							<div className="row no-gutters my-3">
								<label className="w-100 d-flex justify-content-between align-items-center m-0">
									<div className="w-25 text-right d-flex justify-content-between font-weight-bold">
										<span className="d-flex align-items-center">رمز عبور</span>
									</div>
									<input className="mr-3 w-75 px-2"
										   onChange={ () => {
											   // eslint-disable-next-line no-restricted-globals
											   this.handleInputChanges ('password', event);
										   } }
										   placeholder="رمز عبور خود را وارد کنید"
										   type="password"/>
								</label>
							</div>
							<div className="row no-gutters my-3">
								<label className="w-100 d-flex justify-content-between align-items-center m-0">
									<div className="w-25 text-right d-flex justify-content-between font-weight-bold">
										<span className="d-flex align-items-center">تکرار رمز عبور</span>
									</div>
									<input className="mr-3 w-75 px-2"
										   onChange={ () => {
											   // eslint-disable-next-line no-restricted-globals
											   this.handleInputChanges ('confirm_password', event);
										   } }
										   placeholder="رمز عبور خود را تکرار کنید"
										   type="password"/>
								</label>
							</div>
							<div className="row no-gutters my-3">
								<label className="w-100 d-flex justify-content-between align-items-center m-0">
									<div className="w-25 text-right d-flex justify-content-between font-weight-bold">
										<span className="d-flex align-items-center">عنوان شغلی</span>
									</div>
									<input className="mr-3 w-75 px-2"
										   onChange={ () => {
											   // eslint-disable-next-line no-restricted-globals
											   this.handleInputChanges ('job_title', event);
										   } }
										   placeholder="عنوان شغلی را وارد کنید"
										   type="text"/>
								</label>
							</div>
							<div className="row no-gutters my-3">
								<label className="w-100 d-flex justify-content-between align-items-center m-0">
									<div className="w-25 text-right d-flex justify-content-between font-weight-bold">
										<span className="d-flex align-items-center">لینگ عکس پروفایل</span>
									</div>
									<input className="mr-3 w-75 px-2"
										   onChange={ () => {
											   // eslint-disable-next-line no-restricted-globals
											   this.handleInputChanges ('profile_pic_url', event);
										   } }
										   placeholder="لینگ عکس پروفایل خود را وارد کنید"
										   type="text"/>
								</label>
							</div>
							<div className="row no-gutters my-3">
								<label className="w-100 d-flex justify-content-between align-items-center m-0">
									<div className="w-25 text-right d-flex justify-content-between font-weight-bold">
										<span className="d-flex align-items-center">بیو</span>
									</div>
									<textarea cols={ 500 }
											  rows={ 4 }
											  onChange={ () => {
												  // eslint-disable-next-line no-restricted-globals
												  this.handleInputChanges ('bio', event);
											  } }
											  placeholder="بیو خود را وارد کنید"
											  className="mr-3 w-75 p-2"
											  datatype="text">
									</textarea>
								</label>
							</div>
							<div className="row no-gutters my-3 justify-content-end">
								<button className="btn btn-success px-5"
										onClick={ () => {
											// eslint-disable-next-line no-restricted-globals
											this.handleSubmit (event);
										} }>
									<span>ثبت نام</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>);
	}
}

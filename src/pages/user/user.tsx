import * as React         from 'react';
import { Component }      from 'react';
import { GeneralService } from '../../services/general/general.service';
import { UserModel }      from '../../models/user.model';
import { UserService }    from '../../services/user.service';
import { ResponseModel }  from '../../models/response.model';
import './user.scss';
import userPic            from '../../assets/images/users/photo_2019-03-14 11.10.35.jpeg';
import { SkillModel }     from '../../models/skill.model';
import { SkillService }   from '../../services/skill.service';
import { AxiosError }     from 'axios';

export class User extends Component {
	state = {
		user     : new UserModel (),
		isLoading: true,
		error    : null,
		profile  : new UserModel ()
	};
	
	constructor (props: Readonly<any>) {
		super (props);
		GeneralService.setTitle ('صفحه کاربر');
	}
	
	getUserData () {
		const user_id = GeneralService.getWindowUrl ().split ('/')[ 2 ];
		UserService.getUser (user_id).then ((res: ResponseModel) => {
			this.setState ({
				               user     : UserModel.setUser (res.data),
				               isLoading: false
			               });
		}).catch ((error: Error) => {
			this.setState ({
				               error    : error,
				               isLoading: false
			               });
		});
	}
	
	endorseSkill (user_id: string, skill_name: string) {
		SkillService.endorseSkill (user_id, skill_name).then ((res: ResponseModel) => {
			if (res.status === 200) {
				this.getUserData ();
			}
		}).catch ((error: AxiosError) => {
			let error_data = ResponseModel.setResponseModel (error.response);
			alert (error_data.data);
		});
	};
	
	getProfile () {
		UserService.getProfile ().then ((res: ResponseModel) => {
			if (res.status === 200) {
				this.setState ({
					               profile  : res.data,
					               isLoading: false
				               });
			}
		}).catch ((error: Error) => {
			this.setState ({
				               error    : error,
				               isLoading: false
			               });
		});
	}
	
	checkEndorsers (endorsers: Array<string>): boolean {
		for (let i = 0; i < endorsers.length; i++) {
			if (endorsers[ i ] === this.state.profile.id) {
				return true;
			}
		}
		return false;
	}
	
	componentDidMount (): void {
		this.getUserData ();
		this.getProfile ();
		GeneralService.fixPageHeight ();
	}
	
	render () {
		const { isLoading, user } = this.state;
		return <div id="main"
		            className="container-fluid main p-0">
			<div className="container-fluid">
				<div className="row blue-bar">
				</div>
			</div>
			{ !isLoading ? (<div className="container">
				<div className="row mb-2 justify-content-end">
					<div className="col-md-3 col-xs-12 text-md-right">
						<img alt={ user.firstName + ' ' + user.lastName }
						     className="img-fluid profile-picture shadow-sm"
						     src={ userPic }/>
					</div>
					<div className="col-md-9 col-xs-12 text-md-right">
						<h2 className="font-weight-bold mt-4">{ user.firstName + ' ' + user.lastName }</h2>
						<h5 className="font-weight-lighter mb-md-3">{ user.jobTitle }</h5>
					</div>
				</div>
				<div className="row description-row">
					<div className="col-sm-12">
						<p className="font-weight-light py-4 d-flex">{ user.bio }</p>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-sm-12">
						<div className="row skills dir-ltr">
							{ user.skills && user.skills.length > 0 ? (user.skills.map ((skill: SkillModel, index) => {
								return <div className="badge custom-badge font-weight-light general-box-shadow mx-1 dir-rtl pointer"
								            onClick={ () => {
									            this.endorseSkill (user.id, skill.name);
								            } }
								            key={ index }>
									{ this.checkEndorsers (skill.endorsers) ? (<div className="d-flex w-100 h-100">
										<span className="endorsed d-flex px-1 h-100 align-items-center justify-content-center">
											<span>{ skill.point }</span>
										</span>
										<span className="title d-flex px-1 h-100 align-items-center pr-2">{ skill.name }</span>
									</div>) : (<div className="d-flex w-100 h-100">
										<span className="endorse d-flex px-1 h-100 align-items-center justify-content-center">
											<span>+</span>
											<span>{ skill.point }</span>
										</span>
										<span className="title d-flex px-1 h-100 align-items-center pr-2">{ skill.name }</span>
									</div>) }
								</div>;
							})) : (<div className="text-danger">
								مهارتی برای این کاربر وجود ندارد
							</div>) }
						</div>
					</div>
				</div>
			</div>) : ((<div className="h-100 d-flex justify-content-center align-items-center">
				<p>loading...</p>
			</div>)) }
		</div>;
	}
}

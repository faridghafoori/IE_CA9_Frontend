import * as React         from 'react';
import { Component }      from 'react';
import { GeneralService } from '../../services/general/general.service';
import userPic            from '../../assets/images/users/photo_2019-03-14 11.10.35.jpeg';
import { UserService }    from '../../services/user.service';
import { ResponseModel }  from '../../models/response.model';
import { UserModel }      from '../../models/user.model';
import { Dropdown }       from 'react-bootstrap';
import { SkillModel }     from '../../models/skill.model';
import './profile.scss';
import { SkillService }   from '../../services/skill.service';

export class Profile extends Component {
	public default_dropdown_title = '-- انتخاب مهارت --';
	state                         = {
		user         : new UserModel (),
		isLoading    : true,
		error        : null,
		dropdownTitle: this.default_dropdown_title,
		skills       : []
	};
	
	constructor (props: Readonly<any>) {
		super (props);
		GeneralService.setTitle ('صفحه حساب کاربری');
	}
	
	getProfile () {
		UserService.getProfile ().then ((res: ResponseModel) => {
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
	
	getSkills () {
		SkillService.getAllSkills ().then ((res: ResponseModel) => {
			if (res.status === 200) {
				this.setState ({
					               skills: SkillModel.setSkills (res.data)
				               });
			}
		}).catch ((error: Error) => {
			this.setState ({
				               error    : error,
				               isLoading: false
			               });
		});
	}
	
	componentDidMount (): void {
		this.getProfile ();
		this.getSkills ();
		GeneralService.fixPageHeight ();
	}
	
	selectDropdownTitle (select_item: string) {
		this.setState ({
			               dropdownTitle: select_item
		               });
	}
	
	addSkill (skill_name: string) {
		if (skill_name === this.default_dropdown_title) {
			alert ('مهارت خود را انتخاب کنید !');
		} else {
			SkillService.addSkill (skill_name).then ((res: ResponseModel) => {
				if (res.status === 200) {
					this.getProfile ();
				}
			});
		}
	}
	
	render () {
		const { isLoading, user, skills } = this.state;
		return <div id="main"
		            className="container-fluid main p-0">
			<div className="container-fluid">
				<div className="row blue-bar"/>
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
						<p className="font-weight-light d-flex py-4">{ user.bio }</p>
					</div>
				</div>
				<div className="container">
					<div className="row mt-2 mb-2">
						<div className="col-auto d-flex align-items-center">
							<h4 className="font-weight-bold m-0">مهارت ها :</h4>
						</div>
						<div className="col-auto d-inline shadow-sm rounded bg-white add-skill p-0">
							<div className="row input-group m-1">
								<Dropdown>
									<Dropdown.Toggle variant="light"
									                 className="d-flex align-items-center ml-2 h-100 justify-content-between"
									                 id="dropdown-basic">
										<span className="text-truncate"
										      onChange={ () => {
										      } }>{ this.state.dropdownTitle }</span>
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{ skills && skills.length > 0 ? (skills.map ((skill: SkillModel, index) => {
											return <Dropdown.Item key={ index }
											                      className="dir-ltr"
											                      onSelect={ () => {
												                      this.selectDropdownTitle (skill.name);
											                      } }>{ skill.name }</Dropdown.Item>;
										})) : (<div>
											لیست مهارت ها خالی است
										</div>) }
									</Dropdown.Menu>
								</Dropdown>
								<div className="col-auto p-0">
									<button className="btn btn-primary bg-info font-weight-lighter border-0 h-100"
									        type="button"
									        onClick={ () => {
										        this.addSkill (this.state.dropdownTitle);
									        } }>افزودن مهارت
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">
						<div className="row skills dir-ltr">
							{ (user.skills && user.skills.length > 0) ? (<div className="py-4">
								{ (user.skills.map ((skill: SkillModel, index) => {
									return <div className="badge profile-badge font-weight-light general-box-shadow mx-1 dir-rtl default mt-2"
									            key={ index }>
										<div className="d-flex w-100 h-100">
											<span className="endorse d-flex px-1 h-100 align-items-center justify-content-center">
												<span>{ skill.point }</span>
											</span>
											<span className="title d-flex px-1 h-100 align-items-center pr-2">{ skill.name }</span>
										</div>
									</div>;
								})) }
							</div>) : (<div className="text-danger dir-rtl font-weight-bold w-100 d-flex py-4">
								مهارت‌هایتان را ثبت کنید.
							</div>) }
						</div>
					</div>
				</div>
			</div>) : (<div>
				isLoading...
			</div>) }
		</div>;
	}
}

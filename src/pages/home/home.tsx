import * as React         from 'react';
import { Component }      from 'react';
import { GeneralService } from '../../services/general/general.service';
import { ResponseModel }  from '../../models/response.model';
import { ProjectModel }   from '../../models/project.model';
import './home.scss';
import { ProjectSection } from '../../components/project_section/project-section';
import { ProjectService } from '../../services/project.service';
import { UserService }    from '../../services/user.service';
import { UserModel }      from '../../models/user.model';
import { UserSection }    from '../../components/user_section/user-section';
import { SearchService }  from '../../services/search.service';

export class Home extends Component {
	state       = {
		projects           : [],
		users              : [],
		isLoading          : true,
		error              : null,
		projects_empty_list: false,
		search_project     : '',
		search_user        : ''
	};
	page_number = 0;
	
	constructor (probs: Readonly<any>) {
		super (probs);
		GeneralService.setTitle ('جاب‌اونجا | صفحه اصلی');
	}
	
	getProjectsData () {
		ProjectService.getAllProjects (this.page_number).then ((res: ResponseModel) => {
			if (res.status === 200) {
				this.setState ({
					               projects : ProjectModel.setProjects (res.data),
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
	
	getUsersData () {
		UserService.getAllUsers ().then ((res: ResponseModel) => {
			if (res.status === 200) {
				this.setState ({
					               users    : UserModel.setUsers (res.data),
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
	
	getHomePageData () {
		this.getProjectsData ();
		this.getUsersData ();
	}
	
	loadMoreProjects () {
		this.page_number += 1;
		ProjectService.getAllProjects (this.page_number).then ((res: ResponseModel) => {
			if (res.status === 200) {
				this.setState ({
					               projects           : ProjectService.mergeProjects (this.state.projects, ProjectModel.setProjects (res.data)),
					               projects_empty_list: res.data.length === 0,
					               isLoading          : false
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
		this.getHomePageData ();
		GeneralService.fixPageHeight ();
	}
	
	handleInputChanges (state_name: string, event: any) {
		this.setState ({
			               [ state_name ]: event.target.value
		               });
	}
	
	submitSearchProject (event: any) {
		event.preventDefault ();
		SearchService.searchProjects (this.state.search_project).then ((res: ResponseModel) => {
			if (res.status === 200) {
				this.setState ({
					               projects           : ProjectModel.setProjects (res.data),
					               projects_empty_list: true,
					               isLoading          : false
				               });
			}
		}).catch ((error: Error) => {
			this.setState ({
				               error    : error,
				               isLoading: false
			               });
		});
	}
	
	submitSearchUser (event: any) {
		event.preventDefault ();
		SearchService.searchUsers (this.state.search_user).then ((res: ResponseModel) => {
			if (res.status === 200) {
				this.setState ({
					               users    : UserModel.setUsers (res.data),
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
	
	render (): React.ReactNode {
		const { isLoading, projects, users, projects_empty_list } = this.state;
		return <div id="main"
		            className="container-fluid main w-100 p-0">
			<div className="row no-gutters">
				<section className="search-section w-100">
					<div className="container">
						<div className="row mt-5">
							<div className="title">
								<span>جاب‌اونجا خوب است !</span>
							</div>
							<div className="description mt-3">
								<p className="text-right pr-5">
									لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
									برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
							</div>
							<div className="col-9 mx-auto mt-4">
								<div className="row no-gutters">
									<form className="w-100">
										<input className="w-100 border-0 no-outline pr-3"
										       onChangeCapture={ () => {
												   // eslint-disable-next-line no-restricted-globals
											       this.handleInputChanges ('search_project', event);
										       } }
										       placeholder="جستجو در جاب‌اونجا"/>
										<button className="btn border-radius-0 text-white"
										        onClick={ () => {
													// eslint-disable-next-line no-restricted-globals
											        this.submitSearchProject (event);
										        } }>جستجو
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className="row no-gutters">
				<section className="main-section w-100">
					<div className="container p-0">
						<div className="row">
							<div className="col-3">
								<div className="bg-white p-1 mb-3 user-search general-box-shadow">
									<form onKeyUp={ () => {
										// eslint-disable-next-line no-restricted-globals
										this.submitSearchUser (event);
									} }>
										<input className="w-100 border-0 no-outline px-2"
										       onChange={ () => {
												   // eslint-disable-next-line no-restricted-globals
											       this.handleInputChanges ('search_user', event);
										       } }
										       placeholder="جستجوی نام کاربر"/>
									</form>
								</div>
								<div className="users-section">
									{ !isLoading ? (users.map ((user: UserModel, index) => {
										return (<div key={ index }>
											<UserSection User={ user }/>
										</div>);
									})) : (<div className="h-100 d-flex justify-content-center align-items-center">
										<p>loading...</p>
									</div>) }
								</div>
							</div>
							<div className="col-9">
								{ !isLoading ? (projects.map ((project: ProjectModel, index) => {
									return (<div key={ index }
									             className="row no-gutters">
										<ProjectSection Project={ project }/>
									</div>);
								})) : (<div className="h-100 d-flex justify-content-center align-items-center">
									<p>loading...</p>
								</div>) }
								{ !projects_empty_list ? (<div className="row no-gutters justify-content-center">
									<button className="btn btn-primary load-more no-outline border-0"
									        onClick={ () => {
										        this.loadMoreProjects ();
									        } }>
										مشاهده بیشتر
									</button>
								</div>) : (<div/>) }
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>;
	}
	
}

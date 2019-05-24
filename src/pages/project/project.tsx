import * as React                 from 'react';
import { Component }              from 'react';
import { GeneralService }         from '../../services/general/general.service';
import { ProjectModel }           from '../../models/project.model';
import './project.scss';
import { ConvertTimestampToDate } from '../../pipes/convert-timestamp-to-date';
import { SkillModel }             from '../../models/skill.model';
import { ProjectService }         from '../../services/project.service';
import { ResponseModel }          from '../../models/response.model';
import { AxiosError }             from 'axios';

export class Project extends Component {
	project_id = '';
	custom_css = {
		background  : '#F9F9F9',
		borderBottom: '1px solid #DDD'
	};
	state      = {
		project  : new ProjectModel (),
		isLoading: true,
		error    : null,
		bidAmount: ''
	};
	
	constructor (props: Readonly<any>) {
		super (props);
	}
	
	static winnerConditions (project: ProjectModel) {
		if (!ConvertTimestampToDate.checkDeadlineReached (project.deadline)) {
			return (<div>
				<div className="d-flex align-items-center remaining-time mt-3 mb-2">
					<i className="flaticon-deadline font-weight-lighter"/>
					<span className="px-2 font-weight-bold">زمان باقیمانده :‌ </span>
					<span className="font-weight-lighter">
						<span className={ ((ConvertTimestampToDate.convertTimestampToDate (project.deadline).enable ? 'd-block' : 'd-none')) }> </span>
						<span className="dir-ltr"> { ConvertTimestampToDate.convertTimestampToDate (project.deadline).time } </span>
					</span>
				</div>
				<div className="d-flex align-items-center budget font-weight-bold">
					<i className="flaticon-money-bag"/>
					<span className="px-2">بودجه :‌ </span>
					<span>{ project.budget } تومان</span>
				</div>
			</div>);
		} else {
			return (<div>
				<div className="d-flex align-items-center deadline-reached mt-3">
					<i className="flaticon-deadline font-weight-lighter"/>
					<span className="px-2">مهلت تمام شده</span>
				</div>
				<div className="d-flex align-items-center budget font-weight-bold">
					<i className="flaticon-money-bag"/>
					<span className="px-2">بودجه :‌ </span>
					<span>{ project.budget } تومان</span>
				</div>
				<div className="d-flex align-items-center font-weight-bold recorded">
					<i className="flaticon-check-mark"/>
					<span className="px-2">برنده :‌ </span>
					{ project.winner.id === undefined ? (<span>نامشخص</span>) : (<span> { project.winner.firstName + ' ' + project.winner.lastName } </span>) }
				</div>
			</div>);
		}
	}
	
	bidConditions (project: ProjectModel) {
		if (ConvertTimestampToDate.checkDeadlineReached (project.deadline)) {
			return <div className="row p-2rem deadline-reached d-flex align-items-center">
				<i className="flaticon-danger"/>
				<span className="px-2">مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده است !</span>
			</div>;
		} else {
			if (project.bids.length > 0) {
				return <div className="row p-2rem d-flex align-items-center font-weight-light recorded">
					<i className="flaticon-check-mark"/>
					<span className="px-2">شما قبلا پیشنهاد خود را ثبت کرده‌اید.</span>
				</div>;
			} else {
				return <div className="row p-2rem add-bid">
					<div className="col-12 p-0 font-weight-bolder text-right mb-3">ثبت پیشنهاد
					</div>
					<div className="p-0 text-right">
						<form className="input-group dir-ltr h-100"
						      onSubmit={ () => {
								  // eslint-disable-next-line no-restricted-globals
							      this.handleBidAmountSubmit (event);
						      } }>
							<button className="btn btn-send text-white font-weight-light mr-3"
							        type={ 'submit' }>ارسال
							</button>
							<div className="input-group-prepend h-100">
								<span className="input-group-text custom-addon">تومان</span>
							</div>
							<input className="form-control h-100 dir-rtl no-outline"
								   name={ 'bid' }
								   type={ 'number' }
								   onChange={ () => {
									   // eslint-disable-next-line no-restricted-globals
									   this.handleBidAmountChange (event);
								   } }
								   placeholder="پیشنهاد خود را وارد کنید"/>
						</form>
					</div>
				</div>;
			}
		}
	}
	
	handleBidAmountChange (event: any) {
		this.setState ({
			               bidAmount: event.target.value
		               });
	}
	
	handleBidAmountSubmit (event: any) {
		event.preventDefault ();
		ProjectService.addBid (this.state.bidAmount, this.project_id).then ((res: ResponseModel) => {
			if (res.status === 200) {
				alert (res.data);
			}
		}).catch ((error: AxiosError) => {
			let error_data = ResponseModel.setResponseModel (error.response);
			alert (error_data.data);
		});
	}
	
	getProject () {
		ProjectService.getProject (this.project_id).then ((res: ResponseModel) => {
			if (res.status === 200) {
				this.setState ({
					               project  : ProjectModel.setProject (res.data),
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
	
	componentDidMount (): void {
		this.project_id = GeneralService.getWindowUrl ().split ('/')[ 2 ];
		this.getProject ();
		GeneralService.fixPageHeight ();
	}
	
	render (): React.ReactNode {
		const { isLoading, project } = this.state;
		GeneralService.setTitle ('پروژه | ' + this.state.project.title);
		return <div className="container-fluid main p-0"
		            id={ 'main' }>
			{ !isLoading ? (<div className="row no-gutters">
				<div className="bg-light-blue w-100"/>
				<div className="container">
					<div className="row project-section">
						<div className="col-12 bg-white general-box-shadow">
							<div className="row p-2rem border-dash">
								<img className="d-flex"
								     src={ project.imageUrl }
								     alt={ '' }/>
								<div className="info mr-4 text-right">
									<div className="font-weight-bold title">{ project.title }</div>
									{ Project.winnerConditions (project) }
									<div className="font-weight-bolder my-3 description-title">توضیحات</div>
									<div>
										<p className="text-justify font-weight-light">
											{ project.description }
										</p>
									</div>
								</div>
							</div>
							<div className="row p-2rem"
							     style={ this.custom_css }>
								<div className="col-12 p-0 text-right">
									<span className="font-weight-bolder">مهارت‌های لازم : </span>
								</div>
								<div className="col-12 p-0 skills text-left">
									{ (project.skills.map ((skill: SkillModel, index) => {
										return <div className="badge custom-badge font-weight-light general-box-shadow mx-1"
										            key={ index }>
											<div className="d-flex w-100 h-100">
												<span className="endorse d-flex px-1 h-100 align-items-center justify-content-center">{ skill.point }</span>
												<span className="title d-flex px-1 h-100 align-items-center pr-2">{ skill.name }</span>
											</div>
										</div>;
									})) }
								</div>
							</div>
							{ this.bidConditions (project) }
						</div>
					</div>
				</div>
			</div>) : (<div className="h-100 d-flex justify-content-center align-items-center">
				<p>loading...</p>
			</div>) }
		</div>;
	}
}

import { ProjectModel }               from '../../models/project.model';
import { Link }                       from 'react-router-dom';
import * as React                     from 'react';
import { Component }                  from 'react';
import { SkillModel }                 from '../../models/skill.model';
import './project-section.scss';
import { ConvertTimestampToDate }     from '../../pipes/convert-timestamp-to-date';
import { MinimizeProjectDescription } from '../../pipes/minimize-project-description';

export class ProjectSection extends Component<Props> {
	skillStyle = { color: '#999' };
	
	constructor (props: Props) {
		super (props);
	}
	
	render () {
		return <Link className="col-12 projects-section general-box-shadow bg-white p-3 d-flex mb-3"
		             to={ '/project/' + this.props.Project.id }>
			<img className="pointer"
			     src={ this.props.Project.imageUrl }
			     alt={ this.props.Project.title }/>
			<div className="w-100 mr-3">
				<div className="row no-gutters d-flex justify-content-between">
					<div className="title font-weight-bold pointer text-dark text-truncate text-right">{ this.props.Project.title }</div>
					<div className={ 'remaining-time p-1 px-2 ' + (ConvertTimestampToDate.convertTimestampToDate (this.props.Project.deadline).enable ? '' : 'finished') }>
								<span className="d-inline-flex">
									<span className={ ((ConvertTimestampToDate.convertTimestampToDate (this.props.Project.deadline).enable ? 'd-block' : 'd-none')) }> زمان باقیمانده : </span>
									<span className="mr-1"> { ConvertTimestampToDate.convertTimestampToDate (this.props.Project.deadline).time } </span>
								</span>
					</div>
				</div>
				<div className="row no-gutters">
					<p className="text-right text-dark text-justify py-2 m-0">
						{ MinimizeProjectDescription.transform (this.props.Project.description) }
					</p>
				</div>
				<div className="row no-gutters budget">
					<span className="font-weight-bold">بودجه : { this.props.Project.budget } تومان</span>
				</div>
				<div className="row no-gutters pt-2">
							<span className="ml-2"
							      style={ this.skillStyle }>مهارت ها :
							</span>
					<div className="skills">
						{ (this.props.Project.skills.map ((skill: SkillModel, index) => {
							return <div key={ index }
							            className="badge d-inline-flex align-items-center justify-content-center pointer mx-1">{ skill.name }</div>;
						})) }
					</div>
				</div>
			</div>
		</Link>;
	}
}

interface Props {
	Project: ProjectModel
}

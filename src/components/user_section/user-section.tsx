import { UserModel } from '../../models/user.model';
import { Link }      from 'react-router-dom';
import userPic1      from '../../assets/images/users/photo_2019-03-14 11.10.35.jpeg';
import * as React    from 'react';
import { Component } from 'react';

export class UserSection extends Component<Props> {
	constructor (props: Props) {
		super (props);
	}
	
	render () {
		return <Link to={ '/user/' + this.props.User.id }
		             className="bg-white user-box pointer mb-2 p-2 d-flex general-box-shadow">
			<img className="h-100"
			     src={ userPic1 }
			     alt={ this.props.User.firstName }/>
			<div className="info mr-3 w-100 text-right text-truncate">
				<div className="name text-truncate py-1 text-dark">{ this.props.User.firstName + ' ' + this.props.User.lastName }</div>
				<div className="job text-truncate">{ this.props.User.jobTitle }</div>
			</div>
		</Link>;
	}
}

interface Props {
	User: UserModel
}

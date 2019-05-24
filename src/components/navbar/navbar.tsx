import * as React              from 'react';
import { Component }           from 'react';
import logo                    from '../../assets/images/logo_v1.png';
import { BrowserRouter, Link } from 'react-router-dom';
import './navbar.scss';
import { MyRouter }            from '../my-router/my-router';
import { UserService }         from '../../services/user.service';
import { ResponseModel }       from '../../models/response.model';
import { UserModel }           from '../../models/user.model';
import { GeneralService }      from '../../services/general/general.service';

export class Navbar extends Component {
	state = {
		user     : new UserModel (),
		isLoading: true,
		error    : null
	};
	
	constructor (props: Readonly<any>) {
		super (props);
	}
	
	getProfile () {
		if (GeneralService.user_token !== '') {
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
	}
	
	componentWillUpdate (nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void {
		this.getProfile ();
	}
	
	componentDidMount (): void {
		this.getProfile ();
	}
	
	render (): React.ReactNode {
		const { user } = this.state;
		return <BrowserRouter>
			<header className={ 'container-fluid bg-white fixed-top' }>
				<div className={ 'row h-100' }>
					<div className={ 'container' }>
						<div className={ 'row d-flex justify-content-between align-items-center h-100' }>
							<Link className={ 'logo' }
							      to="/">
								<img className={ 'w-100 h-100 pointer' }
								     src={ logo }
								     alt={ 'جاب اونجا' }/>
							</Link>
							{ user.id === undefined ? (<div>
								<Link className={ 'text-dark mx-3 pointer' }
								      to="/sign-up">
									<span>ثبت نام</span>
								</Link>
								<Link className={ 'text-dark mx-3 pointer' }
								      to="/log-in">
									<span>ورود</span>
								</Link>
							</div>) : (<div>
								<Link className={ 'text-dark mx-3 pointer' }
								      to="/profile">
									<span>حساب کاربری</span>
								</Link>
								<span className={ 'pointer' }>خروج</span>
							</div>) }
						</div>
					</div>
				</div>
			</header>
			<MyRouter/>
		</BrowserRouter>;
	}
}

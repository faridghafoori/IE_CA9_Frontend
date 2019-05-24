import * as React        from 'react';
import { Component }     from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home }          from '../../pages/home/home';
import { NotFound }      from '../../pages/not-found/not-found';
import { User }          from '../../pages/user/user';
import { Project }       from '../../pages/project/project';
import { Footer }        from '../footer/footer';
import { Profile }       from '../../pages/profile/profile';
import { SignUp }        from '../../pages/authentication/sign-up/sign-up';
import { SignIn }        from '../../pages/authentication/sign-in/sign-in';

export class MyRouter extends Component {
	render (): React.ReactNode {
		return <div>
			<Switch>
				<Route path="/"
				       exact={ true }
				       component={ Home }/>
				<Route path="/user/:id"
				       component={ User }/>
				<Route path="/profile"
				       component={ Profile }/>
				<Route path={ '/project/:id' }
				       component={ Project }/>
				<Route path="/sign-up"
				       component={ SignUp }/>
				<Route path="/log-in"
				       component={ SignIn }/>
				<Route component={ NotFound }/>
			</Switch>
			<Footer/>
		</div>;
	}
}

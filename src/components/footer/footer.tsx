import * as React    from 'react';
import { Component } from 'react';
import './footer.scss';

export class Footer extends Component {
	constructor (props: Readonly<any>) {
		super (props);
	}
	
	render (): React.ReactNode {
		return <footer className="container-fluid bg-dark d-flex align-items-center mt-4">
			<div className="container">
				<div className="footer-quote">
					<small className="text-muted">© تمامی حقوق این سایت متعلق به جاب اونجا می باشد</small>
				</div>
			</div>
		</footer>;
	}
	
}

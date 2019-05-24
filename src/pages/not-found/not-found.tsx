import * as React         from 'react';
import { Component }      from 'react';
import { GeneralService } from '../../services/general/general.service';

export class NotFound extends Component {
	constructor (probs: Readonly<any>) {
		super (probs);
		GeneralService.setTitle ('۴۰۴');
	}

	componentDidMount (): void {
		GeneralService.fixPageHeight ();
	}

	render (): React.ReactNode {
		return <div className={ 'row' }>
			<div id={ 'main' }
				 className={ 'w-100 d-flex justify-content-center align-items-center' }>
				NotFound
			</div>
		</div>;
	}
}

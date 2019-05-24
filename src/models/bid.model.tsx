import { ProjectModel } from './project.model';
import { UserModel }    from './user.model';
import { SkillModel }   from './skill.model';

export class BidModel {
	private _bidAmount!: number;
	
	get bidAmount (): number {
		return this._bidAmount;
	}
	
	set bidAmount (value: number) {
		this._bidAmount = value;
	}
	
	private _project!: ProjectModel;
	
	get project (): ProjectModel {
		return this._project;
	}
	
	set project (value: ProjectModel) {
		this._project = value;
	}
	
	private _biddingUser!: UserModel;
	
	get biddingUser (): UserModel {
		return this._biddingUser;
	}
	
	set biddingUser (value: UserModel) {
		this._biddingUser = value;
	}
	
	public static setBid (value: any): BidModel {
		let bid = new BidModel ();
		if (value) {
			bid.bidAmount   = value.bidAmount;
			bid.biddingUser = UserModel.setUser (value.biddingUser);
			bid.project     = ProjectModel.setProject (value.project);
		}
		return bid;
	}
	
	public static setBids (values: Array<any>): Array<BidModel> {
		let bids: Array<BidModel> = [];
		for (let i = 0; i < values.length; i++) {
			bids.push (this.setBid (values[ i ]));
		}
		return bids;
	}
}

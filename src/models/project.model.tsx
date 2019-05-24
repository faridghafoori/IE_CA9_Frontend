import { SkillModel } from './skill.model';
import { BidModel }   from './bid.model';
import { UserModel }  from './user.model';

export class ProjectModel {
	private _bids!: Array<BidModel>;
	
	get bids (): Array<BidModel> {
		return this._bids;
	}
	
	set bids (value: Array<BidModel>) {
		this._bids = value;
	}
	
	private _winner!: UserModel;
	
	get winner (): UserModel {
		return this._winner;
	}
	
	set winner (value: UserModel) {
		this._winner = value;
	}
	
	private _title!: string;
	
	get title (): string {
		return this._title;
	}
	
	set title (value: string) {
		this._title = value;
	}
	
	private _id!: string;
	
	get id (): string {
		return this._id;
	}
	
	set id (value: string) {
		this._id = value;
	}
	
	private _budget!: number;
	
	get budget (): number {
		return this._budget;
	}
	
	set budget (value: number) {
		this._budget = value;
	}
	
	private _deadline!: number;
	
	get deadline (): number {
		return this._deadline;
	}
	
	set deadline (value: number) {
		this._deadline = value;
	}
	
	private _description!: string;
	
	get description (): string {
		return this._description;
	}
	
	set description (value: string) {
		this._description = value;
	}
	
	private _imageUrl!: string;
	
	get imageUrl (): string {
		return this._imageUrl;
	}
	
	set imageUrl (value: string) {
		this._imageUrl = value;
	}
	
	private _skills!: Array<SkillModel>;
	
	get skills (): Array<SkillModel> {
		return this._skills;
	}
	
	set skills (value: Array<SkillModel>) {
		this._skills = value;
	}
	
	public static setProject (value: any): ProjectModel {
		const project = new ProjectModel ();
		if (value) {
			project.title       = value.title;
			project.budget      = value.budget;
			project.id          = value.id;
			project.description = value.description;
			project.imageUrl    = value.imageUrl;
			project.deadline    = value.deadline;
			project.skills      = SkillModel.setSkills (value.skills);
			project.bids        = BidModel.setBids (value.bids);
			project.winner      = UserModel.setUser (value.winner);
		}
		return project;
	}
	
	public static setProjects (values: Array<any>): Array<ProjectModel> {
		let projects: Array<ProjectModel> = [];
		for (let i = 0; i < values.length; i++) {
			projects.push (this.setProject (values[ i ]));
		}
		return projects;
	}
}


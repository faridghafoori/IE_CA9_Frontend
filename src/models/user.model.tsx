import { SkillModel }   from './skill.model';
import { EndorseModel } from './endorse.model';

export class UserModel {
	private _id!: string;
	
	get id (): string {
		return this._id;
	}
	
	set id (value: string) {
		this._id = value;
	}
	
	private _firstName!: string;
	
	get firstName (): string {
		return this._firstName;
	}
	
	set firstName (value: string) {
		this._firstName = value;
	}
	
	private _lastName!: string;
	
	get lastName (): string {
		return this._lastName;
	}
	
	set lastName (value: string) {
		this._lastName = value;
	}
	
	private _jobTitle!: string;
	
	get jobTitle (): string {
		return this._jobTitle;
	}
	
	set jobTitle (value: string) {
		this._jobTitle = value;
	}
	
	private _profilePictureURL!: string;
	
	get profilePictureURL (): string {
		return this._profilePictureURL;
	}
	
	set profilePictureURL (value: string) {
		this._profilePictureURL = value;
	}
	
	private _skills!: Array<SkillModel>;
	
	get skills (): Array<SkillModel> {
		return this._skills;
	}
	
	set skills (value: Array<SkillModel>) {
		this._skills = value;
	}
	
	private _bio!: string;
	
	get bio (): string {
		return this._bio;
	}
	
	set bio (value: string) {
		this._bio = value;
	}
	
	private _endorsments!: Array<EndorseModel>;
	
	get endorsments (): Array<EndorseModel> {
		return this._endorsments;
	}
	
	set endorsments (value: Array<EndorseModel>) {
		this._endorsments = value;
	}
	
	public static setUser (value: any): UserModel {
		let user = new UserModel ();
		if (value) {
			user.id                = value.id;
			user.firstName         = value.firstName;
			user.lastName          = value.lastName;
			user.jobTitle          = value.jobTitle;
			user.profilePictureURL = value.profilePictureURL;
			user.skills            = SkillModel.setSkills (value.skills);
			user.bio               = value.bio;
			user.endorsments       = EndorseModel.setEndorses (value.endorsments);
		}
		return user;
	}
	
	public static setUsers (values: Array<any>): Array<UserModel> {
		let users: Array<UserModel> = [];
		for (let i = 0; i < values.length; i++) {
			users.push (this.setUser (values[ i ]));
		}
		return users;
	}
}

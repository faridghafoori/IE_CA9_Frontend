import { SkillModel } from './skill.model';
import { UserModel }  from './user.model';

export class EndorseModel {
	private _endorsedSkill!: SkillModel;
	
	get endorsedSkill (): SkillModel {
		return this._endorsedSkill;
	}
	
	set endorsedSkill (value: SkillModel) {
		this._endorsedSkill = value;
	}
	
	private _endorsedUser!: UserModel;
	
	get endorsedUser (): UserModel {
		return this._endorsedUser;
	}
	
	set endorsedUser (value: UserModel) {
		this._endorsedUser = value;
	}
	
	private _endorsingUser!: UserModel;
	
	get endorsingUser (): UserModel {
		return this._endorsingUser;
	}
	
	set endorsingUser (value: UserModel) {
		this._endorsingUser = value;
	}
	
	public static setEndorse (value: any): EndorseModel {
		let endorse = new EndorseModel ();
		if (value) {
			endorse.endorsedUser  = UserModel.setUser (value.endorsedUser);
			endorse.endorsingUser = UserModel.setUser (value.endorsingUser);
			endorse.endorsedSkill = SkillModel.setSkill (value.endorsedSkill);
		}
		return endorse;
	}
	
	public static setEndorses (values: Array<any>): Array<EndorseModel> {
		let endorses: Array<EndorseModel> = [];
		if (values) {
			for (let i = 0; i < values.length; i++) {
				endorses.push (this.setEndorse (values[ i ]));
			}
		}
		return endorses;
	}
}

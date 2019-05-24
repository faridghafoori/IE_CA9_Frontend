export class SkillModel {
	private _name!: string;
	
	get name (): string {
		return this._name;
	}
	
	set name (value: string) {
		this._name = value;
	}
	
	private _point!: number;
	
	get point (): number {
		return this._point;
	}
	
	set point (value: number) {
		this._point = value;
	}
	
	private _endorsers!: Array<string>;
	
	
	get endorsers (): Array<string> {
		return this._endorsers;
	}
	
	set endorsers (value: Array<string>) {
		this._endorsers = value;
	}
	
	public static setSkill (value: any): SkillModel {
		let skill = new SkillModel ();
		if (value) {
			skill.name      = value.name;
			skill.point     = value.point;
			skill.endorsers = value.endorsers;
		}
		return skill;
	}
	
	public static setSkills (values: Array<any>): Array<SkillModel> {
		let skills: Array<SkillModel> = [];
		for (let i = 0; i < values.length; i++) {
			skills.push (this.setSkill (values[ i ]));
		}
		return skills;
	}
}

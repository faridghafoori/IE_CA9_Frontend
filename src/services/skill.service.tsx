import { GeneralService } from './general/general.service';

export class SkillService {
	public static endorseSkill (user_id: string, skill_name: string) {
		return GeneralService.makePostRequest ('endorse', {
			userID   : user_id,
			skillName: skill_name
		});
	}
	
	public static addSkill (skill_name: string) {
		return GeneralService.makePostRequest ('addSkill', {
			skillName: skill_name
		});
	}
	
	public static getAllSkills() {
		return GeneralService.makeGetRequest('skills');
	}
}

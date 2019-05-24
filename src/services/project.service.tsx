import { GeneralService } from './general/general.service';
import { ProjectModel }   from '../models/project.model';

export class ProjectService {
	public static addBid (bidAmount: string, projectID: string) {
		return GeneralService.makePostRequest ('addBid', {
			'bidAmount': bidAmount,
			'projectID': projectID
		});
	}
	
	public static getAllProjects (page_number: number) {
		return GeneralService.makeGetRequest ('projects?page_number=' + page_number);
	}
	
	public static getProject (project_id: string) {
		return GeneralService.makeGetRequest ('projects/' + project_id);
	}
	
	public static mergeProjects (all_projects: ProjectModel[], new_projects: ProjectModel[]) {
		for (let i = 0; i < new_projects.length; i++) {
			all_projects.push (new_projects[ i ]);
		}
		return all_projects;
	}
}

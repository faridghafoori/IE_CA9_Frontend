export class MinimizeProjectDescription {
	public static transform (description: string): string {
		let desc = '';
		if (description.length > 150) {
			for (let i = 0; i < 150; i++) {
				desc += description[ i ];
			}
		} else {
			desc = description;
		}
		return desc + '...';
	}
}

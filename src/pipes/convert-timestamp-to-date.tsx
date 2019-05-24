export class ConvertTimestampToDate {
	static convertTimestampToDate (time: number): DeadlineRemaining {
		let today  = new Date ().getTime ();
		let diffMs = (time - today);
		if (diffMs > 0) {
			let diffDays    = Math.floor (diffMs / 86400000);
			let diffHours   = Math.floor ((diffMs % 86400000) / 3600000);
			let diffMinutes = Math.round (((diffMs % 86400000) % 3600000) / 60000);
			if (diffDays === 0) {
				return {
					enable: true,
					time  : diffHours.toString () + ' ساعت و ' + diffMinutes.toString () + ' دقیقه '
				};
			} else if (diffDays === 0 && diffHours === 0) {
				return {
					enable: true,
					time  : diffMinutes.toString () + ' دقیقه '
				};
			} else {
				return {
					enable: true,
					time  : diffDays.toString () + ' روز و ' + diffHours.toString () + ' ساعت و ' + diffMinutes.toString () + ' دقیقه '
				};
			}
		}
		return {
			enable: false,
			time  : 'مهلت تمام شده'
		};
	}
	
	static checkDeadlineReached (time: number): boolean {
		return this.convertTimestampToDate (time).time === 'مهلت تمام شده';
		
	}
}


interface DeadlineRemaining {
	enable: boolean,
	time: string
}

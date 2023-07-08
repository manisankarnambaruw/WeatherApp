function getCurrentTime(apiRes: any) {
	function getCurrentDay(num: number) {
		switch (num) {
			case 1:
				return "Mon";
			case 2:
				return "Tue";
			case 3:
				return "Wed";
			case 4:
				return "Thu";
			case 5:
				return "Fri";
			case 6:
				return "Sat";
			case 0:
				return "Sun";
			default:
				return "";
		}
	}

	function getCurrentMonth(num: number) {
		switch (num) {
			case 1:
				return "February";
			case 2:
				return "MArch";
			case 3:
				return "April";
			case 4:
				return "May";
			case 5:
				return "June";
			case 6:
				return "July";
			case 7:
				return "August";
			case 8:
				return "September";
			case 9:
				return "October";
			case 10:
				return "Novomber";
			case 11:
				return "December";
			case 0:
				return "January";
			default:
				return "";
		}
	}
	const timeStamp = apiRes["current_weather"]["time"];
	const date = new Date(timeStamp * 1000);
	return (
		getCurrentDay(date.getDay()) +
		", " +
		getCurrentMonth(date.getMonth()) +
		" " +
		(date.getDate().toString().length === 1
			? "0" + date.getDate()
			: date.getDate())
	);
}
export default getCurrentTime;

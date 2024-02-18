export const getParamsFromString = (element: string[]):string[] | null => {
	if(element && element.length === 1){
		if(element[0].length === 0){
			return null;
		}
		return element.join().split(",");
	} else {
		return null;
	}
} 
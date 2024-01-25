export interface ErrorExpanded extends Error {
	status: number;
	code: number;
}

export interface ErrorMassageFromStatuse {
	readonly [index: number]: string,
}
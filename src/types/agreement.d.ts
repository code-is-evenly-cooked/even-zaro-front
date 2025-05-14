export type AgreementsType = "all" | "terms" | "privacy";

export interface AgreementsState {
	all: boolean;
	terms: boolean;
	privacy: boolean;
}

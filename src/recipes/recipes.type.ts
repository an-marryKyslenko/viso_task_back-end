export type Recipe = {
	title: string;
	description?: string;
	time: string;
	ingredients: { name: string }[];
	instructions: string;
	userId: string
};
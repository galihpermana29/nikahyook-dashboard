interface IOption {
	value: number;
	label: string;
}

export const useGenerateDropdownOptions = () => {
	const weddingRoleOptions: IOption[] = [
		{
			value: 1,
			label: 'Wedding Planner',
		},
	];

	const planOptions: IOption[] = [
		{
			value: 1,
			label: 'Reception',
		},
		{
			value: 2,
			label: 'Marriage Ceremony',
		},
	];

	const themeOptions: IOption[] = [
		{
			value: 1,
			label: 'Modern',
		},
		{
			value: 2,
			label: 'Classic',
		},
	];

	return { weddingRoleOptions, planOptions, themeOptions };
};

import { Row } from 'antd';

interface IFormRow {
	title: string;
	description: string;
	children: React.ReactNode;
}

export const FormRow = ({ title, description, children }: IFormRow) => {
	return (
		<Row className="pt-5">
			<div className="basis-1/3">
				<h3 className="font-medium">{title}</h3>
				<p className="text-sm">{description}</p>
			</div>
			<div className="basis-1/2">{children}</div>
		</Row>
	);
};

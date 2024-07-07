import { Row } from 'antd';

interface IFormRow {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const FormRow = ({ title, description, children }: IFormRow) => {
  return (
    <Row className="pt-5 flex-col sm:flex-row">
      <div className="basis-1 sm:basis-1/3 mb-2 sm:mb-0">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-ny-gray-400">{description}</p>
      </div>
      <div className="basis-1 sm:basis-1/2">{children}</div>
    </Row>
  );
};

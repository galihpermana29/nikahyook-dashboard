import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';

import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { DatePicker, Form, FormInstance, Input, Select } from 'antd';

interface IFormEdit {
	form: FormInstance<any>;
	handleMutate: any;
	footer: React.ReactNode;
	roles: TGeneralSelectOptions[];
	disable: boolean;
}
const FormEdit = ({
	form,
	handleMutate,
	footer,
	roles,
	disable,
}: IFormEdit) => {
	return (
		<div>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleMutate}
				disabled={disable}>
				<div className="flex gap-[20px]">
					<div className="w-full max-w-[187px] flex-1">
						<Form.Item noStyle name={'profile_image_uri'}>
							<DraggerUpload
								data={null}
								form={form}
								formItemName="profile_image_uri"
							/>
						</Form.Item>
					</div>

					<div className="flex-1">
						<Form.Item
							className="my-[8px]"
							name={'email'}
							label="Email"
							rules={[
								{
									required: true,
									message: 'Please input your email!',
								},
								{
									type: 'email',
									message: 'The input is not valid email',
								},
							]}>
							<Input
								placeholder="Enter your detail here"
								className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
							/>
						</Form.Item>
						<Form.Item
							className="my-[8px]"
							name={'name'}
							label="Name"
							rules={[
								{
									required: true,
									message: 'Please input your fullname!',
								},
							]}>
							<Input
								placeholder="Enter your detail here"
								className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
							/>
						</Form.Item>
						<Form.Item
							className="my-[8px]"
							name={'date_of_birth'}
							label="Date of Birth"
							rules={[
								{
									required: true,
									message: 'Please input your date of birth!',
								},
							]}>
							<DatePicker
								placeholder="Enter your detail here"
								className="w-full h-[40px] rounded-[8px] text-caption-1 font-[400]"
							/>
						</Form.Item>
						<Form.Item
							name={'role_id'}
							label="Role"
							rules={[
								{
									required: true,
									message: 'Please input your role!',
								},
							]}>
							<Select
								placeholder="Enter your detail here"
								options={roles}
								className="h-[40px] rounded-[8px]"
							/>
						</Form.Item>
					</div>
				</div>
				{footer}
			</Form>
		</div>
	);
};

export default FormEdit;

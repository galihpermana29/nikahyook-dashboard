import defaultProfle from '@/assets/default-profile-image.png';
import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { DatePicker, Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { FormRow } from './FormRow';

interface IFormCreate {
	// handleMutate: UseMutateFunction<
	// 	ICreateUserResponseRoot,
	// 	AxiosError<unknown, any>,
	// 	ICreateUserPayloadRoot,
	// 	unknown
	// >;
	form: FormInstance;
}

export const PageFormCreate = ({ form }: IFormCreate) => {
	return (
		<Form
			form={form}
			layout="vertical"
			className="flex flex-col gap-5 divide-y">
			<FormRow
				title="Profile Picture"
				description="This will be displayed on your profile">
				<div className="flex gap-2">
					<div className="w-[100px] h-fit shrink-0 aspect-square rounded-md bg-ny-gray-100">
						<img
							src={defaultProfle}
							alt="profile picture"
							className="object-cover"
						/>
					</div>
					<DraggerUpload form={form} formItemName="" />
				</div>
			</FormRow>

			<FormRow
				title="Basic Details"
				description="Set your basic profile details">
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
						placeholder="Enter your detail here!"
						className="text-caption-1"
					/>
				</Form.Item>
				<Form.Item
					className="my-[8px]"
					name={'name'}
					label="Name"
					rules={[
						{
							required: true,
							message: 'Please input your name!',
						},
					]}>
					<Input
						placeholder="Enter your detail here!"
						className="text-caption-1"
					/>
				</Form.Item>
				<Form.Item
					className="my-[8px]"
					name={'password'}
					label="Password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}>
					<Input.Password
						placeholder="Enter your detail here!"
						className="text-caption-1"
					/>
				</Form.Item>
				<Form.Item
					className="my-[8px]"
					name={'password_confirmation'}
					label="Re-enter Password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('The password does not match!')
								);
							},
						}),
					]}>
					<Input.Password
						placeholder="Enter your detail here!"
						className="text-caption-1"
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
						placeholder="Enter your detail here!"
						className="text-caption-1 w-full"
					/>
				</Form.Item>
			</FormRow>

			<FormRow
				title="Additional Details"
				description="Set your additional details to your profile">
				<div className="flex flex-col w-full">
					<Form.Item
						className="my-[8px]"
						name={'description'}
						label="Vendor Description"
						rules={[
							{
								required: true,
								message: 'Please input vendor description!',
							},
						]}>
						<TextArea
							placeholder="Enter a description ..."
							className="text-caption-1"
							style={{ height: 120, resize: 'none' }}
						/>
					</Form.Item>
					<div className="flex w-full gap-2">
						<Form.Item
							className="my-[8px] w-full"
							name={'location'}
							label="Vendor Location"
							rules={[
								{
									required: true,
									message: 'Please select vendor location!',
								},
							]}>
							<Select
								options={[
									{ label: 'Bali', value: 'bali' },
									{ label: 'Jakarta', value: 'jakarta' },
								]}
								placeholder="Enter your detail here!"
								className="text-caption-1"
							/>
						</Form.Item>
						<Form.Item
							className="my-[8px] w-full"
							name={'type'}
							label="Vendor Type"
							rules={[
								{
									required: true,
									message: 'Please select vendor type!',
								},
							]}>
							<Select
								options={[
									{ label: 'Wedding', value: 'wedding' },
									{ label: 'Catering', value: 'catering' },
								]}
								placeholder="Enter your detail here!"
								className="text-caption-1"
							/>
						</Form.Item>
					</div>
				</div>
			</FormRow>

			<FormRow
				title="Album"
				description="Set your additional photo to your album">
				<div></div>
			</FormRow>
		</Form>
	);
};

import {
	IAllRolesResponseRoot,
	ICreateRolePayloadRoot,
	ICreateRoleResponseRoot,
	IDetailRoleResponseRoot,
	IUpdateRolePayloadRoot,
	IUpdateRoleResponseRoot,
} from '../models/roleServicesInterface';
import { ApiClass } from './generalApi';

class DashboardRoleServices extends ApiClass {
	constructor(baseURL?: string, config?: Record<string, any>) {
		super(baseURL, config);
	}

	public async getAllRoles(query?: string): Promise<IAllRolesResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } = await this.axiosInstance.get<IAllRolesResponseRoot>(
			`/roles${query ? `?${query}` : ''}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		return data;
	}

	public async getRoleById(id: string): Promise<IDetailRoleResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);
		const { data } = await this.axiosInstance.get<IDetailRoleResponseRoot>(
			`/roles/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	}

	public async createRole(
		payload: ICreateRolePayloadRoot
	): Promise<ICreateRoleResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } = await this.axiosInstance.post<ICreateRoleResponseRoot>(
			'/roles',
			payload,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	}

	public async editRole(
		payload: IUpdateRolePayloadRoot,
		id: string
	): Promise<IUpdateRoleResponseRoot> {
		const token = JSON.parse(localStorage.getItem('token')!);

		const { data } = await this.axiosInstance.patch<IUpdateRoleResponseRoot>(
			`/roles/${id}`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	}
}

export const DashboardRoleAPI = new DashboardRoleServices();

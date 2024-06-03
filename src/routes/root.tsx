import {
  IDetailUserData,
  ILoginData,
} from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
/**
 * This loader will load permission before pages rendered
 * Get the data with useLoaderData()
 *
 */

interface IPermissionsData {
  create: boolean;
  edit: boolean;
  remove: boolean;
  view: boolean;
}

export interface ILoaderData {
  data: IDetailUserData;
  permissions: IPermissionsData;
}

export async function PermissionLoader(): Promise<ILoaderData> {
  const admin: ILoginData = JSON.parse(localStorage.getItem('admin')!);
  const { data } = await DashboardUserAPI.getUserById(admin.user_id);
  const currentRoute = window.location.pathname
    .split('/')[1]
    .split('-')
    .join(' ');
  const parsedPermissions = admin.permissions
    .map((dx) => JSON.parse(dx))
    .filter((dy) => dy['feature_permission'] === currentRoute)[0];

  const permissions: IPermissionsData = parsedPermissions
    ? {
        create: parsedPermissions.feature_access.includes('create'),
        edit: parsedPermissions.feature_access.includes('update'),
        remove: parsedPermissions.feature_access.includes('delete'),
        view: parsedPermissions.feature_access.includes('view'),
      }
    : {
        create: false,
        edit: false,
        remove: false,
        view: false,
      };

  return { data, permissions };
}

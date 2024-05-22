import adminManagIconGray from '@/assets/icon/admin-manag-icon-gray.svg';
import dashboardIconGray from '@/assets/icon/dashboard-icon-gray.svg';
import AdminUserManagementContainer from '@/routes/admin/admin-management/admin-user-management/AdminUserManagement';
import { VendorContentContainer } from '@/routes/admin/vendor-management/vendor-content/VendorContent';
import { VendorUserManagementContainer } from '@/routes/admin/vendor-management/vendor-user-management/VendorUserManagement';
import DashboardContainer from '../../../../../routes/admin/dashboard/Dashboard';
import { ItemsDataI } from './types';
import { AdminRoleManagementContainer } from '@/routes/admin/admin-management/admin-role-management/AdminRoleManagement';
import VendorDashboardContainer from '@/routes/vendor/dashboard/VendorDashboard';
import VendorContentEditContainer from '@/routes/admin/vendor-management/vendor-content/view/container/Edit/VendorContentEdit';
import VendorUserCreateContainer from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';

export const vendorRoutes: ItemsDataI[] = [
	{
		label: (
			<div className="text-caption-1 font-[400] text-ny-gray-300">
				Dashboard
			</div>
		),
		key: '/home',
		path: 'home',
		children: [],
		icon: <img src={dashboardIconGray} alt="icon" />,
		components: <VendorDashboardContainer />,
		show: true,
	},
	{
		label: (
			<div className="text-caption-1 font-[400] text-ny-gray-300">Product</div>
		),
		key: '/vendor-product',
		path: 'vendor-product',
		children: [],
		icon: <img src={dashboardIconGray} alt="icon" />,
		components: <VendorDashboardContainer />,
		show: true,
	},
];

export const staffRoutes: ItemsDataI[] = [
	{
		label: (
			<div className="text-caption-1 font-[400] text-ny-gray-300">
				Dashboard
			</div>
		),
		key: '/home',
		path: 'home',
		children: [],
		icon: <img src={dashboardIconGray} alt="icon" />,
		components: <DashboardContainer />,
		show: true,
	},
	{
		label: (
			<div>
				<div className="text-caption-1 font-[400] text-ny-gray-300">
					ADMIN MANAGEMENT
				</div>
			</div>
		),
		key: '/admin-management',
		path: 'admin-management',
		children: [
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Admin User Management
					</div>
				),
				key: '/admin-user-management',
				path: 'admin-user-management',
				children: null,
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <AdminUserManagementContainer />,
				show: true,
			},
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Admin Role Management
					</div>
				),
				key: '/admin-role-management',
				path: 'admin-role-management',
				children: null,
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <AdminRoleManagementContainer />,
				show: true,
			},
		],
		icon: null,
		components: <DashboardContainer />,
		show: true,
	},
	{
		label: (
			<div>
				<div className="text-caption-1 font-[400] text-ny-gray-300">
					VENDOR MANAGEMENT
				</div>
			</div>
		),
		key: '/vendor-management',
		path: 'vendor-management',
		children: [
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Vendor User Management
					</div>
				),
				key: '/vendor-user-management',
				path: 'vendor-user-management',
				children: null,
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <VendorUserManagementContainer />,
				show: true,
			},
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Vendor Edit
					</div>
				),
				key: '/vendor-user-management/create-user',
				path: 'vendor-user-management/create-user',
				children: [],
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <VendorUserCreateContainer />,
				show: false,
			},
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Vendor Content
					</div>
				),
				key: '/vendor-content',
				path: 'vendor-content',
				children: null,
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <VendorContentContainer />,
				show: true,
			},
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Vendor Edit
					</div>
				),
				key: '/vendor-content/edit-product',
				path: 'vendor-content/edit-product',
				children: [],
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <VendorContentEditContainer />,
				show: false,
			},
		],
		icon: null,
		components: <DashboardContainer />,
		show: true,
	},
];

import adminManagIconGray from '@/assets/icon/admin-manag-icon-gray.svg';
import dashboardIconGray from '@/assets/icon/dashboard-icon-gray.svg';
import { AdminRoleManagementContainer } from '@/routes/admin/admin-management/admin-role-management/AdminRoleManagement';
import AdminUserManagementContainer from '@/routes/admin/admin-management/admin-user-management/AdminUserManagement';
import { VendorContentContainer } from '@/routes/admin/vendor-management/vendor-content/VendorContent';
import VendorContentDetailContainer from '@/routes/admin/vendor-management/vendor-content/view/container/Detail/VendorContentDetail';
import VendorContentEditContainer from '@/routes/admin/vendor-management/vendor-content/view/container/Edit/VendorContentEdit';
import { VendorUserManagementContainer } from '@/routes/admin/vendor-management/vendor-user-management/VendorUserManagement';
import VendorUserCreateContainer from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';
import VendorDashboardContainer from '@/routes/vendor/dashboard/VendorDashboard';
import DashboardContainer from '../../../../../routes/admin/dashboard/Dashboard';
import { ItemsDataI } from './types';
import VendorUserEditContainer from '@/routes/admin/vendor-management/vendor-user-management/view/container/Edit/VendorUserEdit';
import VendorUserDetailContainer from '@/routes/admin/vendor-management/vendor-user-management/view/container/Detail/VendorUserDetail';
import { VendorMasterDataContainer } from '@/routes/admin/vendor-management/vendor-master-data/VendorMasterData';
import { VendorProductContainer } from '@/routes/vendor/product/VendorProduct';
import VendorProductCreateContainer from '@/routes/vendor/product/view/container/Create/VendorContentCreate';
import VendorProductEditContainer from '@/routes/vendor/product/view/container/Edit/VendorContentEdit';
import VendorProductDetailContainer from '@/routes/vendor/product/view/container/Detail/VendorContentDetail';
import ContentInspiration from '@/routes/admin/content-management/inspirations/ContentInspiration';

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
		components: <VendorProductContainer />,
		show: true,
	},
	{
		label: (
			<div className="text-caption-1 font-[400] text-ny-gray-300">Product</div>
		),
		key: '/vendor-product/create',
		path: 'vendor-product/create',
		children: [],
		icon: <img src={dashboardIconGray} alt="icon" />,
		components: <VendorProductCreateContainer />,
		show: false,
	},
	{
		label: (
			<div className="text-caption-1 font-[400] text-ny-gray-300">Product</div>
		),
		key: '/vendor-product/edit/:id',
		path: 'vendor-product/edit/:id',
		children: [],
		icon: <img src={dashboardIconGray} alt="icon" />,
		components: <VendorProductEditContainer />,
		show: false,
	},
	{
		label: (
			<div className="text-caption-1 font-[400] text-ny-gray-300">Product</div>
		),
		key: '/vendor-product/detail/:id',
		path: 'vendor-product/detail/:id',
		children: [],
		icon: <img src={dashboardIconGray} alt="icon" />,
		components: <VendorProductDetailContainer />,
		show: false,
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
				<div className="text-caption-1 font-[400] text-ny-gray-300">ADMIN</div>
			</div>
		),
		key: '/admin-management',
		path: 'admin-management',
		children: [
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Admin Account
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
						Role Management
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
				<div className="text-caption-1 font-[400] text-ny-gray-300">VENDOR</div>
			</div>
		),
		key: '/vendor-management',
		path: 'vendor-management',
		children: [
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Vendor Account
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
						Vendor User Create
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
						Vendor User Create
					</div>
				),
				key: '/vendor-user-management/detail-user',
				path: 'vendor-user-management/detail-user/:id',
				children: [],
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <VendorUserDetailContainer />,
				show: false,
			},
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Vendor Edit
					</div>
				),
				key: '/vendor-user-management/edit-user',
				path: 'vendor-user-management/edit-user/:id',
				children: [],
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <VendorUserEditContainer />,
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
				path: 'vendor-content/edit-product/:id',
				children: [],
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <VendorContentEditContainer />,
				show: false,
			},
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Vendor Detail
					</div>
				),
				key: '/vendor-content/detail-product',
				path: 'vendor-content/detail-product/:id',
				children: [],
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <VendorContentDetailContainer />,
				show: false,
			},
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Master Data
					</div>
				),
				key: '/vendor-master-data',
				path: 'vendor-master-data',
				children: null,
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <VendorMasterDataContainer />,
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
					CONTENT
				</div>
			</div>
		),
		key: '/content-management',
		path: 'content-management',
		children: [
			{
				label: (
					<div className="text-caption-1 font-[400] text-ny-gray-300">
						Inspiration
					</div>
				),
				key: '/inspiration',
				path: 'inspiration',
				children: null,
				icon: <img src={adminManagIconGray} alt="icon" />,
				components: <ContentInspiration />,
				show: true,
			},
		],
		icon: null,
		components: <ContentInspiration />,
		show: true,
	},
];

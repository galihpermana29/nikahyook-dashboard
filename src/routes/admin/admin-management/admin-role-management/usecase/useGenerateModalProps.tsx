const useGenerateModalProps = () => {
	const transformToPayload = (input) => {
		const permissionsKey = input.permissions
			? 'permissions'
			: 'permissions_edit';

		const result = {
			name: input.name,
			permissions: [],
		};

		const permissionMap = new Map();

		input[permissionsKey].forEach((permission: string[]) => {
			const feature = permission[0];
			const access = permission[1] || 'all';

			if (!permissionMap.has(feature)) {
				permissionMap.set(feature, []);
			}

			if (access === 'all') {
				permissionMap.set(feature, ['create', 'delete', 'update', 'view']);
			} else {
				permissionMap.get(feature).push(access);
			}
		});

		permissionMap.forEach((accessList, feature) => {
			result.permissions.push({
				feature_permission: feature,
				feature_access: accessList,
			} as never);
		});

		return result;
	};

	function transformToCascaderData(input) {
		const result = {
			name: input.name,
			permissions_edit: [],
		};

		input.permissions.forEach((permission) => {
			const feature = permission.feature_permission;
			const accesses = permission.feature_access;

			if (accesses.length === 0) {
				result.permissions_edit.push([feature] as never);
			} else {
				accesses.forEach((access) => {
					result.permissions_edit.push([feature, access] as never);
				});
			}
		});

		// Remove any empty permission arrays
		result.permissions_edit = result.permissions_edit.filter(
			(permission: any) => permission?.length > 1
		);

		return result;
	}

	return { transformToPayload, transformToCascaderData };
};

export default useGenerateModalProps;

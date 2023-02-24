import DataGridTable from "components/DataTable"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useFetch from "hooks/useFetch";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import { Badge, Stack } from "@mui/material";
import moment from "moment";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
	{
		field: 'title',
		headerName: 'Title',
	},
	{
		field: 'permissions',
		headerName: 'Permissions',
		render: (row, id) => (
			row.permissions?.length || 0
			// render: (row, id) => (
			// 	<pre key={id}>{
			// 		(row.permissions !== undefined && row.permissions.map((i, index) =>
			// 			<Stack key={index} sx={{ mb: 1 }}>
			// 				{i + '\n'}
			// 			</Stack>
			// 		))}
			// 	</pre>)
		),
		// render: (row, id) => (
		// 	<pre key={id}>{
		// 		(row.permissions !== undefined && row.permissions.map((i, index) =>
		// 			<Stack key={index} sx={{ mb: 1 }}>
		// 				{i + '\n'}
		// 			</Stack>
		// 		))}
		// 	</pre>)
	},
	// {
	// 	field: 'createdAt',
	// 	headerName: 'Created date',
	// 	render: (row) => (
	// 		`${moment(row.createdAt).format('MMMM Do YYYY')}`
	// 	)
	// },
	// {
	// 	field: 'updatedAt',
	// 	headerName: 'Last updated date',
	// 	render: (row) => (
	// 		`${moment(row.updatedAt).format('MMMM Do YYYY')}`
	// 	)
	// },
	{
		field: "status",
		headerName: 'Status',
		render: (row) => {
			return (
				<Badge sx={{ pl: 3 }} badgeContent={row.status ? 'Active' : 'Inactive'} color={row.status ? 'success' : 'error'} />
			);
		}
	},
];

const ListRoles = () => {

	return (
		<>
			<MDBox display='flex' justifyContent="flex-end" >
				<MDButton
					component={Link}
					to='/roles/new'
					variant="gradient"
					color='info'
					sx={{ mt: 2 }}
				>
					Add New Role
				</MDButton>
			</MDBox>
			<DataGridTable
				columns={columns}
				itemsUrl='/roles'
				title='Role Table'
				actions={{
					editRoute: ({ _id }) => `/roles/edit/${_id}`,
					viewRoute: ({ _id }) => `/roles/view/${_id}`,
					delUrl: ({ _id }) => `/roles/${_id}`
				}}
				customActions={[
					{
						label: ({ status }) => status ? "Disable Role" : "Enable Role",
						icon: ({ status }) => status ? <CloseIcon /> : <CheckIcon />,
						conformation: {
							title: ({ status }) => status ? "Disable Role" : "Enable Role",
							message: ({ status, title }) => `Confirm ${status ? "Disable" : "Enable"} the ${title} role?`
						},
						url: ({ _id }) => `/roles/status/${_id}`,
						body: ({ _id, status }) => ({ status: !status }),
						rowAfterSuccess: ({ ...row }) => {
							row.status = !row.status;
							return row
						},
						method: 'PUT'
					}
				]}
			/>
		</>
	)
}
export default ListRoles
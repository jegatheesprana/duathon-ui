import DataGridTable from "components/DataTable"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useFetch from "hooks/useFetch";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import { Badge, Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
	{
		field: 'code',
		headerName: 'Customer code',
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		valueGetter: (row) =>
			`${row.firstname || ''} ${row.lastname || ''}`,
	},
	{
		field: 'email',
		headerName: 'Email',
	},
	{
		field: 'phone',
		headerName: 'Phone',
	},
	{
		field: 'address',
		headerName: 'Address',
	},
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

const ListCustomers = () => {

	return (
		<>
			<MDBox display='flex' justifyContent="flex-end" >
				<MDButton
					component={Link}
					to='/customers/new'
					variant="gradient"
					color='info'
					sx={{ mt: 2 }}
				>
					Add New Customer
				</MDButton>
			</MDBox>
			<DataGridTable
				columns={columns}
				itemsUrl='/customers'
				title='Customers Table'
				actions={{
					editRoute: ({ _id }) => `/customers/edit/${_id}`,
					viewRoute: ({ _id }) => `/customers/view/${_id}`,
					delUrl: ({ _id }) => `/customers/${_id}`
				}}
				customActions={[
					{
						label: ({ status }) => status ? "Disable Customer" : "Enable Customer",
						icon: ({ status }) => status ? <CloseIcon /> : <CheckIcon />,
						conformation: {
							title: ({ status }) => status ? "Disable Customer" : "Enable Customer",
							message: ({ status, firstname, lastname }) => `Confirm ${status ? "Disable" : "Enable"} the customer ${firstname} ${lastname}?`
						},
						url: ({ _id }) => `/customers/status/${_id}`,
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
export default ListCustomers
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
		field: 'employeeCode',
		headerName: 'Employee code',
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
		field: 'status',
		headerName: 'Status',
	},
	{
		field: "Login",
		headerName: 'Login',
		render: (row) => {
			return (
				<Badge sx={{ pl: 3 }} badgeContent={row.loginEnabled ? 'Enable' : 'Disable'} color={row.loginEnabled ? 'success' : 'error'} />
			);
		}
	},
];

const ListEmployees = () => {

	return (
		<>
			<MDBox display='flex' justifyContent="flex-end" >
				<MDButton
					component={Link}
					to='/employees/new'
					variant="gradient"
					color='info'
					sx={{ mt: 2 }}
				>
					Add New Employee
				</MDButton>
			</MDBox>
			<DataGridTable
				columns={columns}
				itemsUrl='/employees'
				title='Employees Table'
				actions={{
					editRoute: ({ _id }) => `/employees/edit/${_id}`,
					viewRoute: ({ _id }) => `/employees/view/${_id}`,
					delUrl: ({ _id }) => `/employees/${_id}`
				}}
				customActions={[
					{
						label: ({ loginEnabled }) => loginEnabled ? "Block Login" : "Enable Login",
						icon: ({ loginEnabled }) => loginEnabled ? <CloseIcon /> : <CheckIcon />,
						conformation: {
							title: ({ loginEnabled }) => loginEnabled ? "Block Login" : "Enable Login",
							message: ({ loginEnabled }) => `Confirm ${loginEnabled ? "Block" : "Enable"} the Login access for this employee?`
						},
						url: ({ _id }) => `/employees/user/status`,
						body: ({ _id, loginEnabled }) => ({ employeeId: _id, loginEnabled: !loginEnabled }),
						rowAfterSuccess: ({ ...row }) => {
							row.loginEnabled = !row.loginEnabled;
							return row
						},
						successMessage: ({ loginEnabled }) => loginEnabled ? "Employee has been blocked" : "Employee has been enabled",
						method: 'POST'
					},
				]}
			/>
		</>
	)
}
export default ListEmployees
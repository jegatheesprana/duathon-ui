import DataGridTable from "components/DataTable"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useFetch from "hooks/useFetch";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
// import UserMoreMenu from "components/DataTable/UserMoreMenu";
import MDAlert from "components/MDAlert";
import { Badge } from "@mui/material";
import MDBox from "components/MDBox";


const columns = [
	{
		field: 'code',
		headerName: 'Department code',
	},
	{
		field: 'title',
		headerName: 'Title',

	},
	{
		field: 'description',
		headerName: 'Description',

	},
	{
		field: 'createdAt',
		headerName: 'Created Date',
		valueGetter: (params) =>
			`${new Date(params.createdAt).toLocaleDateString('en-Gb')}`

	},
	{
		field: 'updatedAt',
		headerName: 'Updated Date',
		valueGetter: (params) =>
			`${new Date(params.updatedAt).toLocaleDateString('en-Gb')}`
	}
];

const ListDepartments = () => {

	return (
		<>
			<MDBox display='flex' justifyContent="flex-end" >
				<MDButton
					component={Link}
					to='/departments/new'
					variant="gradient"
					color='info'
					sx={{ mt: 2 }}
				>
					Add New Department
				</MDButton>
			</MDBox>
			<DataGridTable
				columns={columns}
				itemsUrl='/departments'
				title='Department Table'
				actions={{
					editRoute: ({ _id }) => `/departments/edit/${_id}`,
					// viewRoute: ({ _id }) => `${_id}`,
					delUrl: ({ _id }) => `/departments/${_id}`
				}}
			/>
		</>
	)
}
export default ListDepartments


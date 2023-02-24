import DataGridTable from "components/DataTable"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useFetch from "hooks/useFetch";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import { Badge, Button } from "@mui/material";
import moment from "moment"


const columns = [
	{
		field: 'code',
		headerName: 'Resource code',
	},
	{
		field: 'title',
		headerName: 'Title',
	},
	{
		field: 'cratedAt',
		headerName: 'Created date',
		render: (row) => (
			`${moment(row.createdAt).format('MMMM Do YYYY')}`
		)
	},
	{
		field: 'updatedAt',
		headerName: 'Last updated date',
		render: (row) => (
			`${moment(row.updatedAt).format('MMMM Do YYYY')}`
		)
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

const BuildingResources = ({resources}) => {
    
	return (
		<>
			{/* <MDBox display='flex' justifyContent="flex-end" >
				<MDButton
					component={Link}
					to='/resources/new'
					variant="gradient"
					color='info'
					sx={{ mt: 2 }}
				>
					Add New Resource
				</MDButton>
			</MDBox> */}
			<DataGridTable
				columns={columns}
				rows={resources}
				title='Resource Table'
				// actions={{
				// 	editRoute: ({ _id }) => `/resources/edit/${_id}`,
				// 	delUrl: ({ _id }) => `/resources/${_id}`
				// }}
			/>
		</>
	)
}
export default BuildingResources
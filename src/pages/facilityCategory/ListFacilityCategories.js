import DataGridTable from "components/DataTable"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useFetch from "hooks/useFetch";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import { Badge, Button } from "@mui/material";
import moment from "moment";


const columns = [
	{
		field: 'code',
		headerName: 'Code',
	},
	{
		field: 'title',
		headerName: 'Title',
	},
	{
		field: 'details',
		headerName: 'Details',
	},
	{
		field: 'icon',
		headerName: 'Icon',
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

const ListFacilityCategories = () => {

	return (
		<>
			<MDBox display='flex' justifyContent="flex-end" >
				<MDButton
					component={Link}
					to='/facilityCategories/new'
					variant="gradient"
					color='dark'
					sx={{ mt: 2 }}
				>
					Add New Facility Category
				</MDButton>
			</MDBox>
			<DataGridTable
				columns={columns}
				itemsUrl='/facilityCategories'
				title='Facility Category Table'
				actions={{
					editRoute: ({ _id }) => `/facilityCategories/edit/${_id}`,
					delUrl: ({ _id }) => `/facilityCategories/${_id}`
				}}
			/>
		</>
	)
}
export default ListFacilityCategories
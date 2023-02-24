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
		headerName: 'Facility code',
	},
	{
		field: 'name',
		headerName: 'Name',
	},
	{
		field: 'buildingFloorId',
		headerName: 'Floor Name',
		render: (row) => {
			return(
				row.floor.name
			)
		}
	},
	{
		field: 'facilityCategoryId',
		headerName: 'Category',
		render: (row) => {
			return(
				row.facilityCategory.title
			)
		}
	},
	{
		field: 'details',
		headerName: 'Details'
	},
	{
		field: 'common',
		headerName: 'Membership',
		render: (row) => {
			return (
				<div>
					{row.common ? 'Common' : 'Private'}
				</div>
			)
		}
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

const innerTableColumns = [
	{
		field: 'code',
		headerName: 'Facility item code',
	},
	{
		field: 'name',
		headerName: 'Facility item name',
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
	}
]

const ListFacilities = ({ buildingId }) => {
	const fac = useFetch('/facilities/byBuilding/'+buildingId)
	console.log(fac)
	return (
		<>
			<MDBox display='flex' justifyContent="flex-end" >
				<MDButton
					component={Link}
					to={`new`}
					variant="gradient"
					color="dark"
					sx={{ mt: 2 }}
				>
					Add New Facility
				</MDButton>
			</MDBox>
			<DataGridTable
				columns={columns}
				itemsUrl={`/facilities/byBuilding/${buildingId}`}
				title='Facilities'
				actions={{
					editRoute: ({ _id }) => `edit/${_id}`,
					viewRoute: ({ _id }) => `/buildings/view/${buildingId}/facilities/view/${_id}`,
					delUrl: ({ _id }) => `/facilities/${_id}`
				}}
				expand={{
					field: "items",
					columns: innerTableColumns,
					heading: ({ name }) => `${name} - Facility Items`,
				}}
			/>
		</>
	)
}
export default ListFacilities
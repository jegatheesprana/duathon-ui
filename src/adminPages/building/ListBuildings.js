import DataGridTable from "components/DataTable"
import MDTypography from "components/MDTypography"
import useFetch from "hooks/useFetch";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import { Badge, Button } from "@mui/material";
import moment from "moment"


const columns = [
	{
		field: 'buildingCode',
		headerName: 'Building code',
	},
	{
		field: 'name',
		headerName: 'Name',
	},
	{
		field: 'city',
		headerName: 'City',
	},
	{
		field: 'country',
		headerName: 'Country',
	},
	{
		field: 'buildingType',
		headerName: 'Building type',
	},
	{
		field: 'floors',
		headerName: 'Floors count',
		render: (row) =>
			<div>{(row.floors.length)}</div>
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
		headerName: 'Floor code',
	},
	{
		field: 'name',
		headerName: 'Name',
	},
	{
		field: 'details',
		headerName: 'Details',
		render: (row) => (
			<div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '20rem', whiteSpace: 'nowrap' }}>
				{row.details}
			</div>
		)
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
]

const ListBuildings = () => {

	return (
		<>
			<MDBox display='flex' justifyContent="flex-end" >
				<MDButton
					component={Link}
					to='/buildings/new'
					variant="gradient"
					color='info'
					sx={{ mt: 2 }}
				>
					Add New Building
				</MDButton>
			</MDBox>
			<DataGridTable
				columns={columns}
				itemsUrl='/buildings'
				title='Building Table'
				actions={{
					editRoute: ({ _id }) => `/buildings/edit/${_id}`,
					viewRoute: ({ _id }) => `/buildings/view/${_id}/basicInformation`,
					delUrl: ({ _id }) => `/buildings/${_id}`
				}}
				expand={{
					field: "floors",
					columns: innerTableColumns,
					heading: () => 'Floors Details',
					actions: {
						delUrl: ({ _id }, { _id: buildingId }) => `/floors/${_id}`,
						editRoute: ({ _id }, { _id: buildingId }) => `/buildings/view/${buildingId}/floors/edit/${_id}`,
					}
				}}
			/>
		</>
	)
}
export default ListBuildings
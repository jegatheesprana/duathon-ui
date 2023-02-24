import DataGridTable from "components/DataTable"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useFetch from "hooks/useFetch";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import { Badge, Button } from "@mui/material";
import moment from "moment";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
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
			<div style={{overflow: "hidden", textOverflow: "ellipsis", width: '20rem', whiteSpace: 'nowrap'}}> 
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
];


const ListFloors = ({ buildingId }) => {
    
	return (
		<>
			<MDBox display='flex' justifyContent="flex-end" >
				<MDButton
					component={Link}
					to={`/buildings/view/${buildingId}/floors/new`}
					variant="gradient"
					color="dark"
					sx={{ mt: 2 }}
				>
					Add New Floor
				</MDButton>
			</MDBox>
			<DataGridTable
				columns={columns}
				itemsUrl={`/floors/byBuilding/${buildingId}`}
				title='Floors'
				actions={{
                    viewRoute: ({ _id }) => `/buildings/view/${buildingId}/floors/view/${_id}`,
					editRoute: ({ _id }) => `/buildings/view/${buildingId}/floors/edit/${_id}`,
					delUrl: ({ _id }) => `/floors/${_id}`
				}}
				customActions={[
					{
						label: ({ status }) => status ? "Disable Floor" : "Enable Floor",
						icon: ({ status }) => status ? <CloseIcon /> : <CheckIcon />,
						conformation: {
							title: ({ status }) => status ? "Disable Floor" : "Enable Floor",
							message: ({ status, name }) => `Confirm ${status ? "Disable" : "Enable"} the ${name} floor?`
						},
						url: ({ _id }) => `/floors/status/${_id}`,
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
export default ListFloors
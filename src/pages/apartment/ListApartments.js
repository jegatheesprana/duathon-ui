import DataGridTable from "components/DataTable"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useFetch from "hooks/useFetch";
import MDButton from "components/MDButton";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import UserMoreMenu from "components/DataTable/UserMoreMenu";
import MDAlert from "components/MDAlert";
import { Badge } from "@mui/material";
import MDBox from "components/MDBox";
import moment from "moment"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
	{
		field: 'code',
		headerName: 'Apartment code',
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
	// {
	// 	field: 'floorId',
	// 	headerName: 'Floor',
	// },
	// {
	// 	field: 'ownerId',
	// 	headerName: 'Owner',
	// },
	{
		field: 'status',
		headerName: 'Status',
		render: (row) => {
			return (
				<Badge sx={{ pl: 3 }} badgeContent={row.status ? 'Enable' : 'Disable'} color={row.status ? 'success' : 'error'} />
			);
		}
	},
	{
		field: 'createdAt',
		headerName: 'Created Date',
		valueGetter: (params) =>
			`${moment(params.createdAt).format('MMMM Do YYYY')}`

	},
	{
		field: 'updatedAt',
		headerName: 'Last updated Date',
		valueGetter: (params) =>
			`${moment(params.updatedAt).format('MMMM Do YYYY')}`
	}
];

const ListApartments = ({buildingId}) => {
	const navigate = useNavigate()
	// const [departments, loading] = useFetch('/employee/departments')

	return (
		<>
			<MDBox display='flex' justifyContent="flex-end" >
				<MDButton 
					component={Link}
					to={`new`}
					variant="gradient"
					color='dark'
					sx={{mt:2}}
				>
					Add New Apartment
				</MDButton>
			</MDBox>
			<DataGridTable
				columns={columns}
				itemsUrl={`/apartments/byBuilding/${buildingId}`}
				title='Apartment Table'
				actions={{
					editRoute: ({ _id }) => `edit/${_id}`,
					viewRoute: ({ _id }) => `/buildings/view/${buildingId}/apartments/view/${_id}`,
					delUrl: ({ _id }) => `/apartments/${_id}`,
				}}
				customActions={[
					{
						label: ({ status }) => status ? "Disable Apartment" : "Enable Apartment",
						icon: ({ status }) => status ? <CloseIcon /> : <CheckIcon />,
						conformation: {
							title: ({ status }) => status ? "Disable Apartment" : "Enable Apartment",
							message: ({ status, name }) => `Confirm ${status ? "Disable" : "Enable"} the ${name} apartment?`
						},
						url: ({ _id }) => `/apartments/status/${_id}`,
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
export default ListApartments


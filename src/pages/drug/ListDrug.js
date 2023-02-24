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
import moment from "moment";


const columns = [
	{
		field: 'medicine.name',
		headerName: 'Medicine Name',
        render: (row) => (
			<div style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: 'nowrap'}}> 
				{row.medicine?.name}
			</div>
		)
	},
	{
		field: 'medicine.manufacture',
		headerName: 'Manufacture',
        render: (row) => (
			<div style={{overflow: "hidden", textOverflow: "ellipsis",  whiteSpace: 'nowrap'}}> 
				{row.medicine?.manufacture}
			</div>
		)

	},
	{
		field: 'supplier',
		headerName: 'Supplier',
        render: (row) => (
			<div style={{overflow: "hidden", textOverflow: "ellipsis",  whiteSpace: 'nowrap'}}> 
				{row.medicine?.supplier}
			</div>
		)

	},
    {
		field: 'NDC',
		headerName: 'NDC',

	},
    {
		field: 'expDate',
		headerName: 'Expiration Date',
        render: (row) => (
			`${moment(row.updatedAt).format('MMMM Do YYYY')}`
		)

	},
    {
        field: 'quantity',
        headerName: 'Quantity',
    },
    {
        field: 'price',
        headerName: 'Unit price',
    }

	// {
	// 	field: 'createdAt',
	// 	headerName: 'Created Date',
	// 	valueGetter: (params) =>
	// 		`${new Date(params.createdAt).toLocaleDateString('en-Gb')}`

	// },
	// {
	// 	field: 'updatedAt',
	// 	headerName: 'Updated Date',
	// 	valueGetter: (params) =>
	// 		`${new Date(params.updatedAt).toLocaleDateString('en-Gb')}`
	// }
];

const ListDrug = () => {

	return (
		<>
			<MDBox display='flex' justifyContent="flex-end" >
				<MDButton
					component={Link}
					to='/drugs/new'
					variant="gradient"
					color='info'
					sx={{ mt: 2 }}
				>
					Add New Drug
				</MDButton>
			</MDBox>
			<DataGridTable
				columns={columns}
				itemsUrl='/pharmacy/inventories'
				title='Drugs Details'
				actions={{
					editRoute: ({ _id }) => `/drugs/edit/${_id}`,
					// viewRoute: ({ _id }) => `${_id}`,
					delUrl: ({ _id }) => `/pharmacy/inventories/${_id}`
				}}
			/>
		</>
	)
}
export default ListDrug


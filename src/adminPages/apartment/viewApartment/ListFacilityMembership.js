import React from 'react'
import DataGridTable from "components/DataTable"
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import { Badge, Button } from "@mui/material";

const STRING_LENGTH = 65
const trimString = (string, length=50) =>{
  if(string.length >= length){
    return string.substring(0,length-3) + '...'
  }
  return string
}
const getMembershipMessage = (facilityMembership) => {
  switch(facilityMembership.type){
    case 'fulltime':
      return 'fulltime'
    case 'weekly':
      const weekdays = facilityMembership?.membership?.weekly?.map(mem=>mem.day)
      return trimString(weekdays.join(", "), STRING_LENGTH)
    case 'monthly':
      const days = facilityMembership?.membership?.monthly?.map(mem=>mem.day)
      console.log(days)
      return trimString(days.sort((a, b)=>{return a - b}).join(", "), STRING_LENGTH)
    case 'once':
      const date = facilityMembership?.membership?.once?.map(mem=> new Date(mem.datetime).toLocaleDateString())
      return trimString(date.join(", "), STRING_LENGTH)
    default:
      return 'No Access Found'
  }
}
const columns = [
	{
		headerName: 'Facility',
    render: (row) => {
			return row?.facility?.name;
		}
	},
	{
		field: 'type',
		headerName: 'Type',
	},
	{
		headerName: 'Access',
    render: (row) => {
			return getMembershipMessage(row)
		}
	},
	{
		headerName: 'status',
		render: (row) => {
			return (
				<Badge sx={{ pl: 3 }} badgeContent={row.status ? 'Enable' : 'Disable'} color={row.status ? 'success' : 'error'} />
			);
		}
	},
];

const ListFacilityMembership = ( 
  {
  apartment: {
    facilityMemberships, _id
  }, 
  loading,
  buildingId
}) => {
  return (
    <>
			{
        !loading &&
        <>
          <MDBox display='flex' justifyContent="flex-end" >
            <MDButton
              component={Link}
              to={`/buildings/view/${buildingId}/facilityMembership/new?apartmentId=${_id}`}
              variant="gradient"
              color='dark'
              sx={{ mt: 2 }}
            >
              Add New Facility Membership
            </MDButton>
          </MDBox>
          <DataGridTable
            columns={columns}
            rows={facilityMemberships}
            title='FacilityMembership Table'
            actions={{
              editRoute: ({ _id }) => `/buildings/view/${buildingId}/facilityMembership/edit/${_id}`,
              viewRoute: ({ _id }) => `/buildings/view/${buildingId}/facilityMembership/view/${_id}`,
              delUrl: ({ _id }) => `/facilityMembership/${_id}`
            }}
          />
        </>
      }
		</>
  )
}

export default ListFacilityMembership
import React from 'react'
import DataGridTable from "components/DataTable"
import MDBox from "components/MDBox";

const columns = [
	{
		field: 'code',
		headerName: 'Code',
	},
	{
		field: 'name',
		headerName: 'Name',
	}
];

const ListFacilityItem = ( 
  {
    facility: {
      items, _id
    }, 
    loading,
    buildingId
}) => {
  return (
    <>
			{
        !loading &&
        <>
          <MDBox display='flex' justifyContent="flex-end">
          </MDBox>
          <DataGridTable
            columns={columns}
            rows={items}
            title='Facility Items Table'
          />
        </>
      }
		</>
  )
}

export default ListFacilityItem
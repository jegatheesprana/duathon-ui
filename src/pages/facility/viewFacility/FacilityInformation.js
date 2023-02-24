import BasicInfoCard from "components/BasicInfoCard/BasicInfoCard"
import { Badge } from "@mui/material";

const FacilityInformation = (
    {
        facility: {
            code, name, building, floor, details , common, divisible, facilityCategory, status, createdAt, _id
        }, 
        loading,
        buildingId
    }) => {
    const infoItems = loading ? [] :[
        {
            headerName: 'Facility Code',
            value: code
        },
        {
            headerName: 'Name',
            value: name
        },
        {
            headerName: 'Building',
            value: building.name
        },
        {
            headerName: 'Floor',
            value: floor.name
        }, 
        {
            headerName: 'Common',
            value: common ? "Yes": "No"
        }, 
        {
            headerName: 'Facility Category',
            value: facilityCategory.title
        },
        {
            headerName: 'Divisible',
            value: <Badge sx={{ pl: 3 }} badgeContent={divisible ? 'Divisible' : 'Indivisible'} color={divisible ? 'success' : 'error'} />
        },
        {
            headerName: 'Status',
            value: status ? 'Active' : 'Inactive',
            bg: status ? 'success' : 'error',
            badge: true
        },
        {
            headerName: 'Details',
            value: details
        }
    ]
    return(
        <BasicInfoCard 
            infoItems={infoItems} 
            loading={loading} 
            title={'Facility Information'}
            createdAt={createdAt}
            subTitle={name}
            path={`/buildings/view/${buildingId}/facilities/edit/${_id}`}
            md={4}
        />
    )
}
 export default FacilityInformation
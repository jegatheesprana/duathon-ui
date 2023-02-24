import BasicInfoCard from "components/BasicInfoCard/BasicInfoCard"
import {Link, useParams} from 'react-router-dom'




const ApartmentInformation = (
    {
        apartment: {
            code, name, owner, building, floor, details , status, createdAt, _id
        }, 
        loading,
        buildingId
    }) => {
    const {apartmentId} = useParams()
    const infoItems = [
        {
            headerName: 'Apartment Code',
            value: code
        },
        {
            headerName: 'Name',
            value: name
        },
        {
            headerName: 'Owner',
            value: 
                !!owner ? `${owner?.firstname} ${owner?.lastname}` : <Link to={`/buildings/view/${buildingId}/apartments/assignOwner/${apartmentId}`}>Assign owner</Link>
        },
        {
            headerName: 'Building',
            value: building?.name
        },
        {
            headerName: 'Floor',
            value: floor?.name
        }, 
        {
            headerName: 'Status',
            value: status ? 'Active' : 'Inactive',
            bg: status ? 'success' : 'error',
            badge: true
        },
        {
            headerName: 'Details',
            value: details,
            fullWidth: true
        }
    ]
    return(
        <BasicInfoCard 
            infoItems={infoItems} 
            loading={loading} 
            title={'Apartment Information'}
            createdAt={createdAt}
            subTitle={name}
            path={`/buildings/view/${buildingId}/apartments/edit/${_id}`}
            md={4}
        />
    )
}
 export default ApartmentInformation
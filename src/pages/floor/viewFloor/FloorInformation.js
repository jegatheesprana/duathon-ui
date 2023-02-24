import BasicInfoCard from "components/BasicInfoCard/BasicInfoCard"
import { useParams } from "react-router-dom"





const FloorInformation = (
    {
        floor: {
            code, name, details, status, createdAt, _id
        }, 
        loading
    }) => {
    
    const {buildingId} = useParams()
    
    const infoItems = [
        {
            headerName: 'Floor Code',
            value: code
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
        },
    ]
    return(
        <BasicInfoCard 
            infoItems={infoItems} 
            loading={loading} 
            title={'Floor Information'}
            createdAt={createdAt}
            subTitle={name}
            path={`/buildings/view/${buildingId}/floors/edit/${_id}`}
            md={6}
        />
    )
}
 export default FloorInformation
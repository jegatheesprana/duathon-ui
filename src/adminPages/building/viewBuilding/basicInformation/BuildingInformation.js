import BasicInfoCard from "components/BasicInfoCard/BasicInfoCard"
//&apos;

const BuildingInformation = ({title, buildings:{address, buildingCode, name, city, country, buildingType, status, createdAt, _id}, loading}) => {
    const infoItems = [
        {
            headerName: 'Building Code',
            value: buildingCode
        },
        {
            headerName: 'City',
            value: city
        },
        {
            headerName: 'Country',
            value: country
        },
        {
            headerName: 'Address',
            value: address
        },
        {
            headerName: 'Building Type',
            value: buildingType
        },
        {
            headerName: 'Status',
            value: status ? 'Active' : 'Inactive',
            bg: status ? 'success' : 'error',
            badge: true
        }
    ]
    return(
        <BasicInfoCard 
            infoItems={infoItems} 
            loading={loading} 
            title={title}
            createdAt={createdAt}
            subTitle={name}
            path={`/buildings/edit/${_id}`}
            md={4}
        />
    )
}
export default BuildingInformation


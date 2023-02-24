import BasicInfoCard from "components/BasicInfoCard/BasicInfoCard"





const CustomerInformation = (
    {
        customer: {
            code, firstname, lastname, email, phone, address, status, createdAt, _id
        }, 
        loading
    }) => {
    const infoItems = [
        {
            headerName: 'Customer Code',
            value: code
        },
        {
            headerName: 'Email',
            value: email
        },
        {
            headerName: 'Phone',
            value: phone
        },
        {
            headerName: 'Address',
            value: address
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
            title={'Customer Information'}
            createdAt={createdAt}
            subTitle={firstname + ' ' + lastname}
            path={`/customers/edit/${_id}`}
            md={4}
        />
    )
}
 export default CustomerInformation
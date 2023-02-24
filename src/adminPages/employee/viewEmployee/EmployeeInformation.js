import BasicInfoCard from "components/BasicInfoCard/BasicInfoCard"
import { Link } from "react-router-dom"




const EmployeeInformation = (
    {
        employee: {
            employeeCode, 
            firstname, 
            lastname, 
            email, 
            phone, 
            address, 
            status, 
            loginEnabled, 
            createdAt, 
            _id, 
            reportToId, 
            jobRoleId, 
            departmentId,
            department=[],
            reportTo=[], 
            role=[], 
        }, 
        loading
    }) => {
    const infoItems = [
        {
            headerName: 'Employee Code',
            value: employeeCode
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
            headerName: 'Report to',
            value: <Link to={`/employees/view/${reportToId}`}>{reportTo[0]?.employeeCode}</Link>
        },
        {
            headerName: 'Job Role',
            value: <Link to={`/roles/view/${jobRoleId}`}>{role[0]?.title}</Link>
        },
        {
            headerName: 'Department',
            value: <Link to={`/departments`}>{department[0]?.code}</Link>
        },
        {
            headerName: 'Status',
            value: status ? 'Active' : 'Inactive',
            bg: status ? 'success' : 'error',
        },
        {
            headerName: 'Login Status',
            value: loginEnabled ? 'Active' : 'Inactive',
            bg: loginEnabled ? 'success' : 'error',
            badge: true
        }
    ]
    return(
        <BasicInfoCard 
            infoItems={infoItems} 
            loading={loading} 
            title={'Employee Information'}
            createdAt={createdAt}
            subTitle={firstname + ' ' + lastname}
            path={`/employees/edit/${_id}`}
            md={4}
        />
    )
}
 export default EmployeeInformation
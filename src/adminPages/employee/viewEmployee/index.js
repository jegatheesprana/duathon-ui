import useFetch from "hooks/useFetch"
import { useParams } from "react-router-dom"
import EmployeeInformation from "./EmployeeInformation"




const ViewEmployee = () => {
    const {id} = useParams()
    const [employee, loading] = useFetch(`/employees/${id}`)

    return(
        <EmployeeInformation employee={employee} loading={loading} />
    )
}

export default ViewEmployee
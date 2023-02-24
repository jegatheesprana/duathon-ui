import useFetch from "hooks/useFetch"
import { useParams } from "react-router-dom"
import CustomerInformation from "./CustomerInformation"




const ViewCustomer = () => {
    const {id} = useParams()
    const [customer, loading] = useFetch(`/customers/${id}`)

    return(
        <CustomerInformation customer={customer} loading={loading} />
    )
}

export default ViewCustomer
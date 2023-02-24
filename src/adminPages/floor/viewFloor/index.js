import useFetch from "hooks/useFetch"
import { useParams } from "react-router-dom"
import FloorInformation from "./FloorInformation"
import ApartmentDetails from "./ApartmentDetails"
import FacilityDetails from "./FacilityDetails"




const ViewFloor = () => {
    const {id} = useParams()
    const [floor, loading] = useFetch(`/floors/${id}`)
    console.log(floor)
    
    return(
        <>
            <FloorInformation floor={floor} loading={loading} />
            <ApartmentDetails 
                apartments={floor.apartments}
                loading={loading}
            />
            <FacilityDetails 
                facilities={floor.facilities}
                loading={loading}
            />
        </>
    )
}

export default ViewFloor
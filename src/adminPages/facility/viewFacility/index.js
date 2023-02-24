import useFetch from "hooks/useFetch"
import { useParams } from "react-router-dom"
import FacilityInformation from "./FacilityInformation"
import ListFacilityItem from "../facilityItem/ListFacilityItem"
import ListFacilityMembership from "./ListFacilityMembership"




const ViewApartment = () => {
    const {buildingId, facilityId} = useParams()
    const [facility, loading] = useFetch(`/facilities/${facilityId}`)
    return(
        <>
            <FacilityInformation facility={facility} buildingId={buildingId} loading={loading} />
            <ListFacilityItem facility={facility} buildingId={buildingId} loading={loading} />
            <ListFacilityMembership facility={facility} buildingId={buildingId} loading={loading} />
        </>
    )
}

export default ViewApartment
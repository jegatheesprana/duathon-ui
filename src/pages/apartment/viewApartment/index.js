import useFetch from "hooks/useFetch"
import { useParams } from "react-router-dom"
import ApartmentInformation from "./ApartmentInformation"
import ListFacilityMembership from "./ListFacilityMembership"




const ViewApartment = () => {
    const {buildingId, apartmentId} = useParams()
    const [apartment, loading] = useFetch(`/apartments/${apartmentId}`)
    const [facilityMemberShip, facilityMemberShipLoading] = useFetch(`/facilityMembership/6251e0c99e27465ce04aee7f`)
    console.log(facilityMemberShip)
    return(
        <>
            <ApartmentInformation apartment={apartment} buildingId={buildingId} loading={loading} />
            <ListFacilityMembership apartment={apartment} buildingId={buildingId} loading={loading} />
        </>
    )
}

export default ViewApartment
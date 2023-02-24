import BuildingInformation from "./BuildingInformation"
import ListFloors from "pages/floor/ListFloors"
import ImageInformation from "./ImageInformation"
import BuildingResources from "../BuildingResources"




const BasciInformation = ({buildings, loading, buildingId}) => {
    return(
        <>
            <BuildingInformation title='Building Information' buildings={buildings} loading={loading} />
            <ImageInformation />
            <BuildingResources resources={buildings?.resources || []}/>
        </>
    )
}
export default BasciInformation
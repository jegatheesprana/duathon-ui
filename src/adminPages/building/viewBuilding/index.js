import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ListFacilities from "pages/facility/ListFacilities";
import { useParams } from "react-router-dom";
import useFetch from "hooks/useFetch";
import BuildingInformation from "./basicInformation/BuildingInformation";
import { Card, Icon, Badge } from "@mui/material"
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography"
import { Link } from "react-router-dom"
import BasicTab from "components/Tab";
import ListFloors from "pages/floor/ListFloors";
import BasicInformation from "./basicInformation";
import ListApartments from "pages/apartment/ListApartments";

const ViewBuilding = () => {
    const { id, tab } = useParams()
    const [buildings, buildingLoading] = useFetch(`/buildings/${id}`)

    return (
        <>
            <BasicTab
                tabs={['Basic Information', 'Apartments', 'Floors', 'Facilities']}
                keys={['basicInformation', 'apartments', 'floors', 'facilities']}
                navigatePath={`/buildings/view/${id}/`}
                currentTab={tab}
                panelsComponent={[
                    <BasicInformation buildings={buildings} loading={buildingLoading} buildingId={id} />,
                    <ListApartments buildingId={id} />,
                    <ListFloors buildingId={id} />,
                    <ListFacilities buildingId={id} />
                ]}
                sx={{ mb: 2 }}
            />
        </>
    );
}

export default ViewBuilding;

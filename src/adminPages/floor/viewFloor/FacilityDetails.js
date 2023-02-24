import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton"
import { Icon, Stack, Badge, Grid } from "@mui/material";
import SingleItemCard from "../../../components/BasicInfoCard/SingleItemCard";
import { Link } from "react-router-dom";
import CircularLoader from "components/Loader/CircularLoader";
import moment from "moment"
import {useParams} from "react-router-dom"
import BasicInfoCard from "../../../components/BasicInfoCard/BasicInfoCard";

const FacilityDetails = ({facilities, loading}) => {
    const {buildingId, id: floorId} = useParams()
    

    return (
        <Card id="Facility-details" sx={{mt:2}}>
            {loading ? <CircularLoader/> :
            <div>
            <MDBox pt={3} px={2} display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h6" fontWeight="medium">
                    Facility Details
                </MDTypography>
                <MDButton variant="gradient" color="dark" component={Link} to={`/buildings/view/${buildingId}/facilities/new?floor=${floorId}`}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;add new facility
                </MDButton>
            </MDBox>
            <MDBox pt={1} pb={2} px={2}>
                <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    <Grid container spacing={2}>
                        {
                            
                            facilities && facilities.map(({code , name, status, common, items, createdAt, _id}, id)=>{
                                const infoItems = [
                                    {
                                        headerName: 'Name',
                                        value: name
                                    },
                                    {
                                        headerName: 'Status',
                                        value: status ? 'Active' : 'Inactive',
                                        bg: status ? 'success' : 'error',
                                        badge: true
                                    },
                                    {
                                        headerName: 'Common',
                                        value: common ? 'Common' : 'Private',
                                        bg: status ? 'success' : 'warning',
                                        badge: true
                                    },
                                    {
                                        headerName: 'Facility Item',
                                        value: items,
                                        iterable: true,
                                        fullWidth: false,
                                        iterablWidth: 6
                                    },
                                ]
                                
                                return(
                                        <Grid item md={6}>
                                            <BasicInfoCard 
                                                infoItems={infoItems} 
                                                loading={loading} 
                                                // title={code}
                                                createdAt={createdAt}
                                                subTitle={code}
                                                path={`/buildings/view/${buildingId}/facilities/edit/${_id}?floor=${floorId}`}
                                                md={6}
                                            />
                                        </Grid>
                                )
                            })

                        }
                    </Grid>
                </MDBox>
            </MDBox>
            </div>
            }
        </Card>
    );
}

export default FacilityDetails;


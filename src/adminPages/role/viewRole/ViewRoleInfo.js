import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Card, Grid, Stack, Badge} from "@mui/material";
import PermissionItem from "./PermissionItem";
import permissionsList from "assets/data/premissions";
import moment from "moment";
import { Icon } from "@mui/material";
import SingleItemCard from "components/BasicInfoCard/SingleItemCard";
import { useParams } from "react-router-dom";
import CircularLoader from "components/Loader/CircularLoader";

function ViewRoleInfo({ role, loading }) {
    const {roleId} = useParams()
    return (
        <MDBox pt={6} pb={3}>
            { loading ? <CircularLoader/> : (
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            {/* <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    {"Role"}
                                </MDTypography>
                            </MDBox> */}
                            <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
                                <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                                    Role Information
                                </MDTypography>
                                <MDBox display="flex" alignItems="flex-start">
                                    <MDBox color="text" mr={0.5} lineHeight={0}>
                                        <Icon color="inherit" fontSize="small">
                                            date_range
                                        </Icon>
                                    </MDBox>
                                    <MDTypography variant="button" color="text" fontWeight="regular">
                                        {moment(role?.createdAt).format('MMMM Do YYYY, h:mm a')}
                                    </MDTypography>
                                </MDBox>
                            </MDBox>
                            <MDBox px={2} sx={{height:'100%', pb:2}}>
                            <SingleItemCard title={role?.title} path={`/roles/edit/${roleId}`}>
                                {/* <Grid container spacing={2} py={2} px={4}>
                                    <Grid item md={6}>
                                        <MDTypography variant="button" fontWeight="medium" textTransform="capitalize" pr={1}>
                                            {"Title: " }
                                        </MDTypography>
                                        <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                                            {role?.title}
                                        </MDTypography>
                                    </Grid>
                                    <Grid item md={6}>
                                        <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                                            {"Status: " }
                                        </MDTypography>
                                        <Badge sx={{ pl: 5 }} badgeContent={role?.status ? 'Enabled' : 'Disabled'} color={role?.status ? 'success' : 'error'} />
                                    </Grid>
                                </Grid> */}
                                <Stack spacing={3} p={2}>
                                    <Grid container spacing={2}>
                                        {Object.keys(permissionsList).map((permission) => {
                                            return (
                                                <PermissionItem
                                                    permissions={permissionsList[permission]}
                                                    role={role}
                                                />
                                            );
                                        })}
                                    </Grid>
                                    <Grid item md={6} px={3}>
                                        <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                                            {"Status: " }
                                        </MDTypography>
                                        <Badge sx={{ pl: 5 }} badgeContent={role?.status ? 'Enabled' : 'Disabled'} color={role?.status ? 'success' : 'error'} />
                                    </Grid>
                                </Stack>
                            </SingleItemCard>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </MDBox>
    );
}

export default ViewRoleInfo;

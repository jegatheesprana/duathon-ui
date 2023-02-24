import {Card, Icon, Badge, Grid} from "@mui/material"
import MDBox from "components/MDBox"
import MDTypography from "components/MDTypography"
import moment from "moment"
import CircularLoader from "components/Loader/CircularLoader"
import SingleItemCard from "./SingleItemCard"



const BasicInfoCard = ({infoItems, loading, createdAt, title, path, subTitle, md, ...rest}) => {

    return(
        <Card sx={{ height: "100%", position:'relative'}}>
            { loading ? <CircularLoader/> :
            <div>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2} mb={2}>
                <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    {title}
                </MDTypography>
                <MDBox display="flex" alignItems="flex-start">
                    <MDBox color="text" mr={0.5} lineHeight={0}>
                        <Icon color="inherit" fontSize="small">
                            date_range
                        </Icon>
                    </MDBox>
                    <MDTypography variant="button" color="text" fontWeight="regular">
                        {moment(createdAt).format('MMMM Do YYYY, h:mm a')}
                    </MDTypography>
                </MDBox>
            </MDBox>
            <MDBox px={2} sx={{height:'100%'}}>
                <SingleItemCard title={subTitle} path={path} {...rest}>
                    <Grid container spacing={1} >
                        {
                            infoItems.map(({value, headerName, badge, fullWidth, bg, iterable, iterablWidth}, id)=>{
                                const localMd = fullWidth ? 12 : md || 4
                                return(
                                    badge ? 
                                        <Grid item md={localMd} {...rest} key={id}>
                                            <MDBox mb={1} lineHeight={0} >
                                                <MDTypography variant="caption" color="text">
                                                    {headerName}:&nbsp;&nbsp;&nbsp;
                                                    <MDTypography variant="caption" fontWeight="medium">
                                                        <Badge sx={{ pl: 3 }} badgeContent={value} color={bg} />
                                                    </MDTypography>
                                                </MDTypography>
                                            </MDBox>
                                        </Grid>
                                    :
                                    iterable ? 
                                        value.map((data, id)=>{
                                            const {_id, ...ittObj} = data
                                            return(
                                                <Grid item md={iterablWidth} key={id}>
                                                    <MDTypography variant="caption" fontWeight="medium">{headerName + ' - '}{parseInt(id)+1}</MDTypography>
                                                    {Object.keys(ittObj).map((key) => {
                                                        return(
                                                            <MDTypography variant="caption" color="text">
                                                                <MDTypography variant="caption" fontWeight="medium">
                                                                    <Grid item md={localMd} {...rest} key={id+key}>
                                                                        <MDBox mb={1} lineHeight={0} >
                                                                            <MDTypography variant="caption" color="text">
                                                                                {key}:&nbsp;&nbsp;&nbsp;
                                                                                <MDTypography variant="caption" fontWeight="medium">
                                                                                    {data[key]}
                                                                                </MDTypography>
                                                                            </MDTypography>
                                                                        </MDBox>
                                                                    </Grid>
                                                                </MDTypography>
                                                            </MDTypography>
                                                        )
                                                    })}
                                                </Grid>
                                            )
                                        })
                                    : 
                                    <Grid item md={localMd} {...rest} key={id}>
                                        <MDBox mb={1} lineHeight={0} >
                                            <MDTypography variant="caption" color="text">
                                                {headerName}:&nbsp;&nbsp;&nbsp;
                                                <MDTypography variant="caption" fontWeight="medium">
                                                    {value}
                                                </MDTypography>
                                            </MDTypography>
                                        </MDBox>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </SingleItemCard>
            </MDBox>
            </div>
            }
        </Card>
    )
}

export default BasicInfoCard
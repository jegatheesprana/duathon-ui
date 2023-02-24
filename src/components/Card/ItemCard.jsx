import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function ItemCard({title, icon, timeRange, titleIcon= <EventIcon/>, timeRangeIcon= <AccessTimeIcon/> }) {
    return (
        <Card>
            <MDBox display="flex" justifyContent="space-between" pt={1} px={2} >
                <MDBox textAlign="left" lineHeight={1.25}>
                    <MDTypography variant="button" fontWeight="light" color="text" sx={{pr:1}}>
                        {titleIcon}
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="light" color="text">
                        {title}
                    </MDTypography>
                    <br/>
                    <MDTypography variant="button" fontWeight="light" color="text" sx={{pr:1}}>
                        {timeRangeIcon}
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="light" color="text">
                        {timeRange}
                    </MDTypography>
                </MDBox>
                <Divider orientation="vertical"  variant="middle" />
                    {icon}
            </MDBox>
        </Card>
    );
}

export default ItemCard;

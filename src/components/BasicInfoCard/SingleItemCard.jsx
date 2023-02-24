import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import { Link } from "react-router-dom";



const SingleItemCard = ({children, title, noGutter, path}) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    return(
        <MDBox
            component="li"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            bgColor={darkMode ? "transparent" : "grey-100"}
            borderRadius="lg"
            p={3}
            mb={noGutter ? 0 : 1}
            mt={2}
            
        >
            <MDBox width="100%" display="flex" flexDirection="column">
                <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    flexDirection={{ xs: "column", sm: "row" }}
                    mb={2}
                >
                    <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                        {title}
                    </MDTypography>

                    {!!path &&
                    <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                        {/* <MDBox mr={1}>
                            <MDButton variant="text" color="error">
                                <Icon>delete</Icon>&nbsp;delete
                            </MDButton>
                        </MDBox> */}
                        <MDButton variant="text" color={darkMode ? "white" : "dark"} component={Link} to={path}>
                            <Icon>edit</Icon>&nbsp;edit
                        </MDButton>
                    </MDBox>
                    }
                </MDBox>
                {children}
            </MDBox>
        </MDBox>
    )
}
export default SingleItemCard
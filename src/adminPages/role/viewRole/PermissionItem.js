import { Grid, FormGroup } from "@mui/material";
import MDTypography from "components/MDTypography";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const PermissionItem = ({ permissions: {label, items} , role}) => {

    const renderCheckedIcon= (checked) => {
        return (
            <div style={{height:"100%", marginRight: "5px"}}>
                {checked ? <RadioButtonCheckedIcon style={{marginBottom:"15px"}} /> : <RadioButtonUncheckedIcon style={{marginBottom:"15px"}} />}
            </div>
        )
    }

    return (
        <>
            <Grid item md={6} xs={12} sm={12} >
                <FormGroup row sx={{ pl: 2 }}>
                    {renderCheckedIcon(items.every(i=>role?.permissions?.includes(i.value)))}
                    <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                        {label}
                    </MDTypography>
                </FormGroup>
            </Grid>
            <Grid item md={6} xs={12} sm={12} >
                <FormGroup>
                    {items.map((item, id) => (
                        <FormGroup row>
                            {renderCheckedIcon(role?.permissions?.includes(item.value))}
                            <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                                {item?.label}
                            </MDTypography>
                        </FormGroup>
                    ))}
                </FormGroup>
            </Grid>
        </>
    );
}

export default PermissionItem;
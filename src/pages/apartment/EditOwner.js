import React, { useState, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import MDForm from "components/Form";
import { Stack, Grid } from "@mui/material";
import useEditData from "hooks/useEditData"
import useFetch from "hooks/useFetch";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";


const EditOwner = () => {
    const { id, buildingId } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        ownerId: ''
    })

    const validationSchema = Yup.object().shape({
        ownerId: Yup.string()
            .required("owner is required")
    })

    const [customers, customerLoading] = useFetch('/customers')

    const formItems = [
        {
            name: "ownerId",
            label: "Customers",
            autoComplete: true,
            options: customers
        }
    ]

    useEditData(
        id && '/apartments/' + id,
        details => {
            if (id) {
                setValues(details)
                setLoading(false)
            }
        }
    )

    console.log(values)

    const navigate = useNavigate()
    const handlers = {
        formData: (data) => data,
        afterSubmit: () => {
            navigate(`/buildings/vew/${buildingId}/apartments`)
        }
    }


    return (
        <>
            <MDForm
                formItems={formItems}
                loading={loading || customerLoading}
                validationSchema={validationSchema}
                method={id ? 'PUT' : 'POST'}
                action={'/apartments/owner/' + id}
                values={values}
                title={'Assign Owner'}
                subTitle={
                    !!values.owner ?
                    <Grid container spacing={2} sx={{px:2}}>
                        <Grid item md={12}><MDTypography variant="caption" color="text" >Previous owner details:</MDTypography></Grid>
                        {/* <MDTypography variant="caption" color="text" mt={2} px={2}>
                            <MDTypography variant="caption" fontWeight="medium"> */}
                                <Grid item md={3}>
                                    <MDBox lineHeight={0} >
                                        <MDTypography variant="caption" color="text">
                                            Fullname:&nbsp;&nbsp;&nbsp;
                                            <MDTypography variant="caption" fontWeight="medium">
                                                {values.owner.firstname + ' ' + values.owner.lastname}
                                            </MDTypography>
                                        </MDTypography>
                                    </MDBox>
                                </Grid>
                                <Grid item md={3}>
                                    <MDBox  lineHeight={0} >
                                        <MDTypography variant="caption" color="text">
                                            Code:&nbsp;&nbsp;&nbsp;
                                            <MDTypography variant="caption" fontWeight="medium">
                                                {values.owner.code}
                                            </MDTypography>
                                        </MDTypography>
                                    </MDBox>
                                </Grid>
                                <Grid item md={3}>
                                    <MDBox  lineHeight={0} >
                                        <MDTypography variant="caption" color="text">
                                            Email:&nbsp;&nbsp;&nbsp;
                                            <MDTypography variant="caption" fontWeight="medium">
                                                {values.owner.email}
                                            </MDTypography>
                                        </MDTypography>
                                    </MDBox>
                                </Grid>
                            {/* </MDTypography>
                        </MDTypography> */}
                    </Grid>
                    : ''
                }
                handlers={handlers}
            />
        </>
    )
}

export default EditOwner
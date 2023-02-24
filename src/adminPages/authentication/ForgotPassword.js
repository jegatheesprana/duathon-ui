import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

import BasicLayout from "./basicLayout";
import bgImage from "assets/images/bg-reset-cover.jpeg";

import * as Yup from 'yup';
import { FormikProvider, useFormik, Form } from "formik";
import { useState } from "react";

const ForgotPassword = () => {
    const [err, setErr] = useState('')
    const initialValues = {
        email: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
        console.log(values)
            setSubmitting(true)
            fetch(process.env.REACT_APP_API_HOST + `/auth/forgotPassword/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
            })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    setSubmitting(false)
                    resetForm()
                    setErr('')
                } else {
                    setSubmitting(false)
                    setErr('Oops! Something wrong happened.')
                }
            })
            .catch(err => {
                setSubmitting(false)
                setErr('Oops! Something wrong happened.')
            })
        }
    })

    const { errors, touched, values, isSubmitting, setSubmitting, handleChange, handleSubmit, setFieldValue, getFieldProps, resetForm } = formik;

    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={-3}
                    py={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
                        Forgot Password
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Lost your password? Please enter your email address. You will receive a link to create a new password via email.
                    </MDTypography>
                </MDBox>
                {err && <MDAlert sx={{ mt: 1 }} color='error' >{err}</MDAlert>}
                <MDBox pt={4} pb={3} px={3}>
                    <FormikProvider value={formik} >
                        <Form autoComplete="on" onSubmit={handleSubmit}>
                            <MDBox mb={4}>
                                <MDInput 
                                    type="email" 
                                    label="Email" 
                                    variant="standard" 
                                    fullWidth 
                                    {...getFieldProps("email")}
                                    error={Boolean(touched.email && errors.email)}
                                    autoComplete="on"
                                />
                            </MDBox>
                            <MDBox mt={6} mb={1}>
                                <MDButton variant="gradient" color="info" fullWidth type='submit'>
                                    {isSubmitting ? 'Loading...' : 'reset'}
                                </MDButton>
                            </MDBox>
                        </Form>
                    </FormikProvider>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default ForgotPassword;

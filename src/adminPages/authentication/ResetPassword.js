import React, {useState} from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from 'components/MDAlert';

import BasicLayout from "./basicLayout";
import bgImage from "assets/images/bg-reset-cover.jpeg";
// import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import * as Yup from 'yup';
import { FormikProvider, useFormik, Form, getIn } from "formik";
import { 
    FormHelperText,
    IconButton,
    InputAdornment,
    Card
} from "@mui/material";

import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const {email, otp} = useParams()
    const navigate = useNavigate()
    const [err, setErr] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConPassword = () => setShowConPassword(!showConPassword);

    const initialValues = {
        email: email || '',
        OTP: otp || '',
        newPassword: '',
        conPassword: ''
    }

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required("Password is required")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight , at least one uppercase letter, one lowercase letter, one number and one special character'),
        conPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("newPassword"), null], "Password and conform password must match")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight , at least one uppercase letter, one lowercase letter, one number and one special character')
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: ({email, OTP, newPassword}, { setSubmitting }) => {
        console.log(newPassword)
            setSubmitting(true)
            fetch(process.env.REACT_APP_API_HOST + `/auth/forgotPassword/reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, OTP, newPassword})
            })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    setSubmitting(false)
                    resetForm()
                    setErr('')
                    navigate('/authentication/login', { replace: true })
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
                        Reset Password
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Please enter your new password.
                    </MDTypography>
                </MDBox>
                {err && <MDAlert sx={{ mt: 1 }} color='error' >{err}</MDAlert>}
                <MDBox pt={4} pb={3} px={3}>
                    <FormikProvider value={formik} >
                        <Form autoComplete="on" onSubmit={handleSubmit}>
                            <MDBox mb={4}>
                                <MDInput 
                                    type={showPassword ? "text" : "password"}
                                    label="Password" 
                                    variant="standard" 
                                    fullWidth 
                                    {...getFieldProps("newPassword")}
                                    error={Boolean(touched.newPassword && errors.newPassword)}
                                    autoComplete="on"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleShowPassword} edge="end">
                                                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <FormHelperText error={Boolean(getIn(formik.touched, `newPassword`) && getIn(formik.errors, `newPassword`))} >
                                    {getIn(formik.touched, `newPassword`) && getIn(formik.errors, `newPassword`)}
                                </FormHelperText>
                            </MDBox>
                            <MDBox mb={4}>
                                <MDInput 
                                     type={showConPassword ? "text" : "password"}
                                    label="Confirm Password" 
                                    variant="standard" 
                                    fullWidth 
                                    {...getFieldProps("conPassword")}
                                    error={Boolean(touched.conPassword && errors.conPassword)}
                                    autoComplete="on"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleShowConPassword} edge="end">
                                                    <Icon icon={showConPassword ? eyeFill : eyeOffFill} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <FormHelperText error={Boolean(getIn(formik.touched, `conPassword`) && getIn(formik.errors, `conPassword`))} >
                                    {getIn(formik.touched, `conPassword`) && getIn(formik.errors, `conPassword`)}
                                </FormHelperText>
                            </MDBox>
                            <MDBox mt={6} mb={1}>
                                <MDButton variant="gradient" color="info" fullWidth type='submit'>
                                    {isSubmitting ? 'Loading...' : 'change password'}
                                </MDButton>
                            </MDBox>
                        </Form>
                    </FormikProvider>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default ResetPassword;

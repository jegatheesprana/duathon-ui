

import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "./basicLayout";

import * as Yup from 'yup';
import { FormikProvider, useFormik, Form } from "formik";
import { useNavigate } from "react-router-dom";

import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import {
    IconButton,
    InputAdornment
} from "@mui/material";

import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useAuth } from "context/AuthContext";
import MDAlert from "components/MDAlert";

const SignIn = () => {
    const navigate = useNavigate()
    const { type } = useParams()
    const [searchParams, setSearchParams] = useSearchParams({})

    const { login } = useAuth()
    const [err, setErr] = useState('')

    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            login(values.email, values.password, values.rememberMe)
                .then((callback) => {
                    const from = searchParams.get('from')
                    if (from) {
                        navigate(from, { replace: true });
                    } else {
                        navigate('/dashboard', { replace: true });
                    }
                    callback()
                })
                .catch(error => {
                    setErr('invalid credentials')
                    setSubmitting(false)
                })
        }
    })

    const { errors, touched, values, isSubmitting, setSubmitting, handleChange, handleSubmit, setFieldValue, getFieldProps, resetForm } = formik;

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const loginMessage = useMemo(() => {
        switch (type) {
            case 'expired':
                return 'Session Expired'
            case 'notLogged':
                return 'Login first'
            case 'loggedOut':
                return 'You\'re logged out'
        }
    }, [type])

    
    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Sign in
                    </MDTypography>
                </MDBox>

                <MDBox pb={0} px={3}>
                    {loginMessage && <MDAlert sx={{ mt: 1 }} color='warning' >{loginMessage}</MDAlert>}
                    {err && <MDAlert sx={{ mt: 1 }} color='error' >{err}</MDAlert>}
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <FormikProvider value={formik} >
                        <Form autoComplete="on" onSubmit={handleSubmit}>
                            <MDBox mb={2}>
                                <MDInput
                                    type="email"
                                    label="Email"
                                    name='email' fullWidth
                                    {...getFieldProps("email")}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type={showPassword ? "text" : "password"}
                                    label="Password" fullWidth
                                    {...getFieldProps("password")}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
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
                            </MDBox>
                            <MDBox display="flex" alignItems="center" ml={-1}>
                                <Switch checked={values.rememberMe} name='rememberMe' onChange={handleChange} />
                                <MDTypography
                                    variant="button"
                                    fontWeight="regular"
                                    color="text"
                                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                                >
                                    &nbsp;&nbsp;Remember me
                                </MDTypography>
                            </MDBox>
                            <MDBox mt={4} mb={1}>
                                <MDButton variant="gradient" color="info" fullWidth type='submit'>
                                    {isSubmitting ? 'Loading...' : 'sign in'}
                                </MDButton>
                            </MDBox>
                            <MDBox mt={3} mb={1} textAlign="center">
                                <MDTypography variant="button" color="text">
                                    Lost your password?{" "}
                                    <MDTypography
                                        component={Link}
                                        to="/authentication/forgot-password"
                                        variant="button"
                                        color="info"
                                        fontWeight="medium"
                                        textGradient
                                    >
                                        Forgot Password
                                    </MDTypography>
                                </MDTypography>
                            </MDBox>
                        </Form>
                    </FormikProvider>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default SignIn;

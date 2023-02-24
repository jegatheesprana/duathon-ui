import { useMemo, useState } from "react";

// react-router-dom components
import { Link, useParams, useSearchParams } from "react-router-dom";

// @mui material components
import {Card,Grid, MenuItem} from "@mui/material";
import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import * as Yup from 'yup';
import { FormikProvider, useFormik, Form } from "formik";
import { useNavigate } from "react-router-dom";

// Images
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

const dis = ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya", "Puttalam", "Kurunegala", "Gampaha", "Colombo", "Kalutara", "Anuradhapura", "Polonnaruwa", "Matale", "Kandy", "Nuwara", "Eliya", "Kegalle", "Ratnapura", "Trincomalee", "Batticaloa", "Ampara", "Badulla", "Monaragala", "Hambantota", "Matara", "Galle"]
function SignUp() {

    const navigate = useNavigate()
    const { type } = useParams()
    const [searchParams, setSearchParams] = useSearchParams({})

    const { login } = useAuth()
    const [err, setErr] = useState('')

    const initialValues = {
        name: '',
        email: '',
        lane: '', town: '', district: '',
        phone: '',
        licenseNumber: '',
        password: '',
        confirmPassword: '',
        website: ''

    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        // password: Yup.string()
        //     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight , at least one uppercase letter, one lowercase letter, one number and one special character')
        //     .when([], {
        //         is: () => !id,
        //         then: Yup.string().required("Password is required"),
        //         otherwise: Yup.string().notRequired(),
        //     }),
        // confirmPassword: Yup.string()
        //     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight , at least one uppercase letter, one lowercase letter, one number and one special character')
        //     .when([], {
        //         // is: () => !id,
        //         then: Yup.string().required("Confirm Password is required")
        //             .oneOf([Yup.ref("password"), null], "Password and conform password must match"),
        //         otherwise: Yup.string().notRequired(),
        //     }),
        name: Yup.string().required("Name is required"),
        // address: Yup.object().shape({
        lane: Yup.string().required("Lane is required"),
        town: Yup.string().required("Town is required"),
        district: Yup.string().required("Town is required"),
        // }),
        phone: Yup.string().required("Phone number is required").matches(/^[0-9]{9,10}/, 'Not valid number'),
        licenseNumber: Yup.string().required("License number is required").matches(/^[0-9]{9,10}/, 'Not valid number'),
        website: Yup.string()
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
                const data = {
                    ...values,
                    address: {lane: values.lane, town: values.town, district: values.district}
                }
                setSubmitting(true)
                fetch(process.env.REACT_APP_API_HOST + `/pharmacy/pharmacies/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
                })
                .then((response) => {
                    if (response.status === 201 || response.status === 200) {
                        setSubmitting(false)
                        resetForm()
                        setErr('')
                        navigate('/login')
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
    // console.log(values)
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConPassword = () => setShowConPassword(!showConPassword);

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
            <Card sx={{ minWidth: 500 }}>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={1}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Sign up
                    </MDTypography>
                    {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
                </MDBox>

                <MDBox pb={0} px={3}>
                    {/* {loginMessage && <MDAlert sx={{ mt: 1 }} color='warning' >{loginMessage}</MDAlert>} */}
                    {err && <MDAlert sx={{ mt: 1 }} color='error' >{err}</MDAlert>}
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <FormikProvider value={formik} >
                        <Form autoComplete="on" onSubmit={handleSubmit}>
                            {/* <MDBox component="form" role="form" onSubmit={handleSubmit}> */}
                            <Grid container spacing={2}>
                            <Grid item md={6}>
                                <MDBox mb={2}>
                                    <MDInput
                                        type="text"
                                        label="Pharmacy Name"
                                        name='name' fullWidth
                                        {...getFieldProps("name")}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item md={6}>
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
                            </Grid>
                            <Grid item md={6}>
                                <MDBox mb={2}>
                                    <MDInput
                                        type="text"
                                        label="Lane"
                                        name='lane' fullWidth
                                        {...getFieldProps("lane")}
                                        error={Boolean(touched.lane && errors.lane)}
                                        helperText={touched.lane && errors.lane}
                                    />
                                </MDBox>
                            </Grid>

                            <Grid item md={6}>
                                <MDBox mb={2}>
                                    <MDInput
                                        type="text"
                                        label="Town"
                                        name='town' fullWidth
                                        {...getFieldProps("town")}
                                        error={Boolean(touched.town && errors.town)}
                                        helperText={touched.town && errors.town}
                                    />
                                </MDBox>
                            </Grid>

                            <Grid item md={6}>
                                <MDBox mb={2}>
                                    <MDInput
                                        // type={showPassword ? 'text' : type}
                                        // rows={field.rows}
                                        select
                                        label={'District'}
                                        name={'district'}
                                        fullWidth
                                        {...getFieldProps('district')}
                                        error={Boolean(touched.district && errors.district)}
                                        helperText={touched.district && errors.district}
                                        InputProps={{
                                            style: {
                                                height: '44.13px'
                                            }
                                        }}
                                    >
                                        {dis?.map((val) => (
                                            <MenuItem key={val} value={val}>
                                                {val}
                                            </MenuItem>
                                        ))}
                                    </MDInput>
                                </MDBox>
                            </Grid>
                            <Grid item md={6}>
                                <MDBox mb={2}>
                                    <MDInput
                                        type="text"
                                        label="Phone Number"
                                        name='phone' fullWidth
                                        {...getFieldProps("phone")}
                                        error={Boolean(touched.phone && errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item md={6}>
                                <MDBox mb={2}>
                                    <MDInput
                                        type="text"
                                        label="Pharmacy license Number"
                                        name='licenseNumber' fullWidth
                                        {...getFieldProps("licenseNumber")}
                                        error={Boolean(touched.licenseNumber && errors.licenseNumber)}
                                        helperText={touched.licenseNumber && errors.licenseNumber}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item md={6}>
                                <MDBox mb={2}>
                                    <MDInput
                                        type="text"
                                        label="Website"
                                        name='website' fullWidth
                                        {...getFieldProps("website")}
                                        error={Boolean(touched.website && errors.website)}
                                        helperText={touched.website && errors.website}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item md={6}>
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
                            </Grid>
                            <Grid item md={6}>

                                <MDBox mb={2}>
                                    <MDInput
                                        type={showConPassword ? "text" : "password"}
                                        label="Confirm Password" fullWidth
                                        {...getFieldProps("confirmPassword")}
                                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
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
                                </MDBox>
                            </Grid>
                                {/* <MDBox display="flex" alignItems="center" ml={-1}>
                                    <Switch checked={values.rememberMe} name='rememberMe' onChange={handleChange} />
                                    <MDTypography
                                        variant="button"
                                        fontWeight="regular"
                                        color="text"
                                        sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                                    >
                                        &nbsp;&nbsp;Remember me
                                    </MDTypography>
                                </MDBox> */}
                            
                            <Grid item md={12}>
                                <MDBox mb={1}>
                                    <MDButton variant="gradient" color="info" fullWidth type='submit'>
                                        {isSubmitting ? 'Loading...' : 'sign up'}
                                    </MDButton>
                                </MDBox>
                                <MDBox mt={3} mb={1} textAlign="center">
                                    <MDTypography variant="button" color="text">
                                        Do you have an account?{" "}
                                        <MDTypography
                                            component={Link}
                                            to="/authentication/login"
                                            variant="button"
                                            color="info"
                                            fontWeight="medium"
                                            textGradient
                                        >
                                            Sign in
                                        </MDTypography>
                                    </MDTypography>
                                </MDBox>
                            
                            {/* </MDBox> */}
                            </Grid>
                        </Grid>
                        </Form>
                    </FormikProvider>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default SignUp;
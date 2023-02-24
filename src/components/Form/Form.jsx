import React, { useState, useEffect } from "react";
import MDButton from "components/MDButton";
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { Form, FormikProvider, useFormik } from 'formik';
import Input from "./Input";
import {
    Box,
    Card,
    Grid,
    Stack,
    CircularProgress
} from '@mui/material';
import { useAuth } from "context/AuthContext";
import { InputSkelton, ButtonSkelton } from "components/Loader/SkeltonLoader";
import MDAlert from "components/MDAlert";
import { useToast } from "context/ToastContext";

const MDForm = (props) => {
    const {
        children,
        action,
        method = "POST",
        loading,
        validationSchema,
        formItems = [],
        values: formValues = {},
        setValues,
        title = 'Form',
        subTitle,
        handlers: { formData = (data) => data, afterSubmit, verify = () => true } = {},
        autoComplete = "on",
        successMessage,
        setData = () => null,
        changingField = '',
        pt = 3,
    } = props;

    const { customFetch } = useAuth()
    const [error, setError] = useState(false)

    const { toastMessage } = useToast()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            const data = formData(values)
            setSubmitting(true)
            setError(false)
            if (!verify(data)) return setSubmitting(false)
            customFetch(action, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (response.status === 201 || response.status === 200) {
                        setSubmitting(false)
                        if (successMessage) {
                            toastMessage(successMessage)
                        }
                        resetForm()
                        afterSubmit(data)
                    } else {
                        setError(true)
                        setSubmitting(false)
                    }
                })
                .catch(err => {
                    setError(true)
                    setSubmitting(false)
                })
        }
    })
    useEffect(() => {
        if (formValues) {
            Object.keys(formValues).forEach((key) => {
                setFieldValue(key, formValues[key]);
            });
        }
    }, [formValues])

    const { errors, touched, values, isSubmitting, setSubmitting, handleChange, handleSubmit, setFieldValue, getFieldProps, resetForm } = formik;

    const handleValueChange = e => {
        handleChange(e)
        typeof setValues === 'function' && setValues(({ ...values }) => {
            values[e.target.name] = e.target.value
            return values
        })
    }
    useEffect(() => {
        setData(values)
    }, [values[changingField]])

    return (
        <FormikProvider value={formik} >
            <Form autoComplete={autoComplete} onSubmit={handleSubmit}>
                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card>
                                <MDBox
                                    mx={0}
                                    // mt={-3}
                                    py={1.5}
                                    px={2}
                                    variant="gradient"
                                    bgColor="info"
                                    borderRadius="lg"
                                    coloredShadow="info"
                                    sx={{ borderRadius: '0.5rem 0.5rem 0 0' }}
                                >
                                    <MDTypography variant="h6" color="white">
                                        {title}
                                    </MDTypography>
                                </MDBox>

                                <MDBox pt={pt}>
                                    {error &&
                                        <Stack px={2}>
                                            <MDAlert color='error' sx={{ width: '100%' }} >Oops! Something went wrong.</MDAlert>
                                        </Stack>
                                    }
                                    <Stack spacing={3} p={2}>
                                        {subTitle}
                                        <Grid container spacing={2}>
                                            {formItems.map(({ fullwidth, ...rest }, id) => (
                                                <Grid item md={fullwidth ? 12 : 6} xs={12} sm={12} key={id}>
                                                    {loading
                                                        ? <InputSkelton key={id} multi={rest.multiline} />
                                                        : <Input key={id} value={values[rest.name]} onChange={handleValueChange} {...rest} formik={formik} getFieldProps={getFieldProps} values={values} setFieldValue={setFieldValue} />}
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Stack>

                                    {!loading && children}

                                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                                        {loading ?
                                            <ButtonSkelton />
                                            : <MDButton variant="contained" color='success' type="submit" disabled={isSubmitting} >
                                                Save Changes
                                            </MDButton>
                                        }

                                    </Box>
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
            </Form>
        </FormikProvider>
    )
}
export default MDForm
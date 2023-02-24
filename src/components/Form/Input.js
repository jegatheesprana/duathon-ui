import React, { useState } from "react";
import MDInput from "components/MDInput"
import MDTypography from "components/MDTypography";
import Switch from "@mui/material/Switch";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Grid, MenuItem, Stack, Typography } from '@mui/material';
import {
    IconButton,
    InputAdornment
} from "@mui/material";

import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { getIn, FieldArray } from 'formik';
import MDButton from 'components/MDButton'
import DeleteIcon from '@mui/icons-material/Delete';
import { FormHelperText } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";


const Input = ({ name, label, type, error, check, helperText, getFieldProps, setFieldValue, formik, value, values, handleChange, isFullWidth = true, special, autoComplete, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    if (type === 'divider' || type === 'heading') {
        var body = (
            <>
                {type === 'divider' && <Box sx={{ my: 2 }}>
                    <Divider />
                </Box>}
                {label && <Typography sx={{ ml: 2 }} variant="h6">{label}</Typography>}
            </>
        )
    } else if (special) {
        var body = (
            <FieldArray
                name={name}
                render={arrayHelpers => (
                    <div>
                        {
                            props.dependfield ?
                                values[props.dependfield] &&
                                <MDButton type="button" variant="outlined" color='info' onClick={() => arrayHelpers.push(props.newfloor)} sx={{ mb: 2 }}>
                                    {props.buttontext}
                                </MDButton>
                                :
                                <MDButton type="button" variant="outlined" color='info' onClick={() => arrayHelpers.push(props.newfloor)} sx={{ mb: 2 }}>
                                    {props.buttontext}
                                </MDButton>
                        }
                        {
                            // value && value.length > 0 ? (
                            (props.dependfield ? values[props.dependfield] : true) ?
                                value.map((floor, index) => (
                                    <div key={index}>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} sx={{ mb: 2 }}>
                                            {
                                                props.fields.map((field, id) => {
                                                    return (
                                                        <Grid item md={4} key={id} >
                                                            {
                                                                field.check ?

                                                                    <div key={id}>
                                                                        <Switch checked={floor.status} name={`${name}.${index}.${field.name}`} {...getFieldProps(`${name}.${index}.${field.name}`)} size='medium' />
                                                                        <MDTypography
                                                                            variant="button"
                                                                            fontWeight="regular"
                                                                            color="text"
                                                                            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                                                                        >
                                                                            &nbsp;&nbsp;{field.label}
                                                                        </MDTypography>
                                                                    </div>

                                                                    :

                                                                    <div key={id}>
                                                                        <MDInput
                                                                            type={showPassword ? 'text' : type}
                                                                            rows={field.rows}
                                                                            select={field.select}
                                                                            label={field.label}
                                                                            name={`${name}.${index}.${field.name}`}
                                                                            fullWidth={isFullWidth}
                                                                            {...getFieldProps(`${name}.${index}.${field.name}`)}
                                                                            error={Boolean(getIn(formik.touched, `${`${name}.${index}.${field.name}`}`) && getIn(formik.errors, `${name}.${index}.${field.name}`))}
                                                                            // helperText={getIn(formik.touched,`${name}.${index}.${field.name}`) && getIn(formik.errors,`${name}.${index}.${field.name}`)}
                                                                            InputProps={{
                                                                                endAdornment: (
                                                                                    type == 'password' &&
                                                                                    <InputAdornment position="end">
                                                                                        <IconButton onClick={handleShowPassword} edge="end">
                                                                                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                                                                        </IconButton>
                                                                                    </InputAdornment>
                                                                                ),
                                                                                style: {
                                                                                    height: field.select ? '44.13px' : ''
                                                                                }
                                                                            }}
                                                                            SelectProps={{
                                                                                multiple: field.multiple
                                                                            }}
                                                                            {...props}
                                                                        >
                                                                            {field.select && field.options?.map(({ value, label, ...props }, id) => (
                                                                                <MenuItem key={value} value={value} {...props}>
                                                                                    {label}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </MDInput>
                                                                        <FormHelperText error={Boolean(getIn(formik.touched, `${`${name}.${index}.${field.name}`}`) && getIn(formik.errors, `${name}.${index}.${field.name}`))} sx={{ px: 2 }} >
                                                                            {getIn(formik.touched, `${name}.${index}.${field.name}`) && getIn(formik.errors, `${name}.${index}.${field.name}`)}
                                                                        </FormHelperText>
                                                                    </div>

                                                            }
                                                        </Grid>
                                                    )
                                                })
                                            }
                                            <IconButton aria-label="delete" size="large" onClick={() => arrayHelpers.remove(index)} key={index}>
                                                <DeleteIcon fontSize="inherit" color="error" />
                                            </IconButton>
                                            {/* <IconButton aria-label="delete" size="large" onClick={() => arrayHelpers.insert(index, props.newfloor)}>
                                                <AddIcon fontSize="inherit" color="info" />
                                            </IconButton> */}
                                        </Stack>
                                    </div>
                                ))
                                //) 
                                // : (
                                //     <MDButton type="button" variant="outlined" color='info' onClick={() => arrayHelpers.push(props.newfloor)}>
                                //         {props.buttontext}
                                //     </MDButton>
                                // )
                                :
                                null
                        }
                    </div>
                )}
            />
        )
    } else if (check) {
        var body = (
            <>
                <Switch checked={value} name={name} onChange={handleChange} {...getFieldProps({ name })} />
                <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                    &nbsp;&nbsp;{label}
                </MDTypography>
            </>
        )
    } else if (autoComplete) {
        var body = (
            <>
                <Autocomplete
                    options={props.options}
                    onChange={(event, value) => setFieldValue(name, value?._id)}
                    getOptionLabel={(option) => option.code + ' ' + option.firstname}
                    renderInput={(params) =>
                        <MDInput {...params} label={label} variant="outlined"
                            {
                            ...getFieldProps(name)}
                            name={name}
                            error={Boolean(getIn(formik.touched, `${name}`) && getIn(formik.errors, `${name}`))}
                        />
                    }
                />
                <FormHelperText error={Boolean(getIn(formik.touched, `${name}`) && getIn(formik.errors, `${name}`))} sx={{ px: 2 }}>
                    {getIn(formik.touched, `${name}`) && getIn(formik.errors, `${name}`)}
                </FormHelperText>
            </>
        )
    } else {
        var body = (
            <>
                <MDInput
                    type={showPassword ? 'text' : type}
                    rows={props.rows}
                    select={props.select}
                    label={label}
                    name={name}
                    fullWidth={isFullWidth}
                    {...getFieldProps({ name })}
                    error={Boolean(getIn(formik.touched, `${name}`) && getIn(formik.errors, `${name}`))}
                    // helperText={getIn(formik.touched,`${name}`) && getIn(formik.errors,`${name}`)}
                    value={value}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            type == 'password' &&
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword} edge="end">
                                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                </IconButton>
                            </InputAdornment>
                        ),
                        style: {
                            height: props.select ? '44.13px' : ''
                        }
                    }}
                    SelectProps={{
                        multiple: props.multiple
                    }}
                    autoComplete="new-password"
                    {...props}
                >
                    {props.select && props.options?.map(({ value, label, ...props }, id) => (
                        <MenuItem key={value} value={value} {...props}>
                            {label}
                        </MenuItem>
                    ))}
                </MDInput>
                <FormHelperText error={Boolean(getIn(formik.touched, `${name}`) && getIn(formik.errors, `${name}`))} sx={{ px: 2 }}>
                    {getIn(formik.touched, `${name}`) && getIn(formik.errors, `${name}`)}
                </FormHelperText>
            </>
        )
    }

    return (
        <Grid item xs={12} sm={12}>
            {body}
        </Grid>
    )
}
export default Input
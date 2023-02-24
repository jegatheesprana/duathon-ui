import React, { useState } from "react";
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Collapse from '@mui/material/Collapse';
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';

import MDBox from "components/MDBox";
import ItemCard from "components/Card";

const DateTime = ({ children, initialValues, size = 6, type, membership, setMembership }) => {
    const [values, setValues] = useState({
        ...initialValues,
        fullday: true,
        from: moment().format('HH:mm'),
        to: moment().add(2, 'hours').format('HH:mm'),
    })

    const handleChange = (event) => {
        setValues(({ ...values }) => {
            values[event.target.name] = event.target.value
            return values
        });
    };

    const handleFulldayChange = event => {
        setValues(({ ...values }) => {
            values[event.target.name] = event.target.checked
            return values
        });
    }

    const handleAdd = () => {
        setMembership(({ ...membership }) => {
            const dupValues = { ...values }
            if (dupValues.fullday) {
                delete dupValues.from
                delete dupValues.to
            }
            membership[type] = [...membership[type], dupValues]
            return membership
        })
    }

    const handleRemove = id => {
        setMembership(({ ...membership }) => {
            membership[type] = membership[type].filter((_, _id) => id !== _id)
            return membership
        })
    }

    const childrenWithProps = React.Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(child)) {
            return (
                <Grid item md={size} xs={size} sm={12} >
                    {React.cloneElement(child, { value: values[child.props.name], onChange: handleChange })}
                </Grid>
            );
        }
        return child;
    });

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav">
                {/* <List> */}
                <Grid container spacing={2}>
                    {membership[type].map((item, id) => (
                        // <ListItem key={id} divider sx={{ px: 2 }}>
                        <>
                            {
                                type === 'weekly' || type === 'monthly' ?
                                    <Grid item md={4} lg={3} sm={12} xs={6} key={id}>
                                        <MDBox mb={1.5} mt={1.5}>
                                            <ItemCard
                                                icon=
                                                {<MDButton variant="text" sx={{ p: 0 }} color='primary' onClick={() => handleRemove(id)}>
                                                    <DeleteIcon fontSize="large" />
                                                </MDButton>}
                                                title={item.day}
                                                timeRange={item.fullday ? '00:00 - 12:00' : `${item.from}  -  ${item.to}`}
                                            />
                                        </MDBox>
                                    </Grid>
                                    :
                                    type === 'once' ?
                                        <Grid item md={4} lg={3} sm={12} xs={6} key={id}>
                                            <MDBox mb={1.5} mt={1.5}>
                                                <ItemCard
                                                    icon=
                                                    {<MDButton variant="text" sx={{ p: 0 }} color='primary' onClick={() => handleRemove(id)}>
                                                        <DeleteIcon fontSize="large" />
                                                    </MDButton>}
                                                    title={item.date}
                                                    timeRange={item.fullday ? item.time : `${item.from}  -  ${item.to}`}
                                                />
                                            </MDBox>
                                        </Grid>
                                        :
                                        null
                            }
                            {/* <Grid item md={10} xs={10} sm={12} >
                                    <ListItemText >
                                        {Object.keys(item).map(key => `${key}: ${item[key]}`).join(', ')}
                                    </ListItemText>
                                </Grid>
                                <Grid item md={2} xs={2} sm={12} >
                                    <MDButton variant="text" sx={{ p: 0 }} color='primary' onClick={() => handleRemove(id)}>
                                        <DeleteIcon fontSize="large" />
                                    </MDButton>
                                </Grid> */}
                        </>
                        // </ListItem>
                    ))}
                </Grid>
                {/* </List> */}
            </Box>
            {/* <Grid item md={2} xs={2} sm={12} >
                <MDButton fullWidth style={{ height: '100%' }} variant="outlined" color='info' onClick={handleAdd}>
                    Add
                </MDButton>
            </Grid> */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item sm={12} >
                    <hr />
                </Grid>
                <Grid item md={10} xs={10} sm={12} >
                    <Grid container spacing={2}>
                        {childrenWithProps}
                        <Grid item md={4} xs={4} sm={6} >
                            <FormGroup>
                                <FormControlLabel control={<Switch name="fullday" checked={values.fullday} onChange={handleFulldayChange} />} label="Full Day" />
                            </FormGroup>
                        </Grid>

                        <Grid item md={6} xs={6} sm={12} >
                            <Collapse in={!values.fullday}>
                                <MDInput
                                    type="time"
                                    label="From"
                                    name="from"
                                    fullWidth
                                    value={values.from}
                                    onChange={handleChange}
                                />
                            </Collapse>
                        </Grid>
                        <Grid item md={6} xs={6} sm={12} >
                            <Collapse in={!values.fullday}>
                                <MDInput
                                    type="time"
                                    label="To"
                                    name="to"
                                    fullWidth
                                    value={values.to}
                                    onChange={handleChange}
                                />
                            </Collapse>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={2} xs={2} sm={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <MDButton fullWidth variant="outlined" color='info' onClick={handleAdd}>
                        Add
                    </MDButton>
                </Grid>
                <Grid item sm={12} >
                    <hr />
                </Grid>
            </Grid>
        </>
    );
}

export default DateTime;
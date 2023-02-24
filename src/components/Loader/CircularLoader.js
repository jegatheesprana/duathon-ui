import * as React from 'react';
import {Stack, Grid }from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularLoader() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100px' }}
        >

            <Grid item xs={3}>
                <CircularProgress color="inherit" />
            </Grid>   
        
        </Grid> 
    );
}
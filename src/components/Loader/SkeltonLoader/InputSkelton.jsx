import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Stack, Grid } from '@mui/material';

export default function InputSkelton({ multi }) {

    return (
        <Box sx={{ width: '100%' }}>
            <Skeleton width='100%' height={multi ? '104px' : '44.13px'} animation="wave" variant='text' />
        </Box>
    );
}

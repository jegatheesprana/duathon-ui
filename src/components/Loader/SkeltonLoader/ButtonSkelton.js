import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Stack, Grid } from '@mui/material';

export default function ButtonSkelton() {

    return (
        <Skeleton width={100} height={60} animation="wave" />
    );
}

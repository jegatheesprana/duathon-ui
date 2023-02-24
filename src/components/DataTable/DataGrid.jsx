import React, { useState } from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses
} from "@mui/x-data-grid";

import { Grid, Card, Stack, Button } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import TableSkeletonLoader from 'components/Loader/SkeltonLoader/TableSkeletonLoader'
import { Link, NavLink } from "react-router-dom";



export default function DataGridTable({ rows = [], columns = [], title = 'Table', loading, path, buttonText }) {
    const [pageSize, setPageSize] = useState(5);

    return (
        <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={3}
                            px={2}
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                        >
                            <MDTypography variant="h6" color="white">
                                {title}
                            </MDTypography>
                        </MDBox>
                        {
                            loading ?
                                <TableSkeletonLoader columnLength={columns.length} pageSize={pageSize} />
                                :
                                <>
                                    <Stack direction="row" alignItems="center" justifyContent="flex-end" mt={2} mx={2}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            component={Link}
                                            to={path}
                                        >
                                            {buttonText}
                                        </Button>
                                    </Stack>
                                    <MDBox pt={3}>
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            autoHeight
                                            pageSize={pageSize}
                                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                            rowsPerPageOptions={[5, 10, 20, 50]}
                                            disableSelectionOnClick
                                            editMode='cell'
                                        // components={{
                                        //     LoadingOverlay: loadingSk,
                                        //   }}
                                        // loading={loading}
                                        />
                                    </MDBox>
                                </>
                        }
                    </Card>
                </Grid>
            </Grid>
        </MDBox>
    );
}

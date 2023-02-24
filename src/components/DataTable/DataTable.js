import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    CircularProgress
} from '@mui/material';
import Row from './Row';
import Conformation from './Conformation';
import { useAuth } from 'context/AuthContext';
import { useToast } from 'context/ToastContext'
import TableSkeletonLoader from 'components/Loader/SkeltonLoader/TableSkeletonLoader';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const DatTable = (props) => {
    const {
        title,
        columns = [],
        itemsUrl,
        rows: items,
        loading,
        actions = {},
        customActions = [],
        expand,
        pagination = true,
        tableOnly,
        additionalData,
        refresh,
        ...rest
    } = props;

    const { customFetch } = useAuth()
    const { toastMessage } = useToast()

    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [selectedrowIds, setSelectedrowIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const [conformation, setConformation] = useState({ title: null, message: null, show: false, onSuccess: null })

    const handleConformationClose = () => {
        setConformation({ ...conformation, show: false, onSuccess: null })
    }

    const removerow = (item, additionalData, id, callback) => {
        const delApiURL = actions.delUrl(item, additionalData, id);
        customFetch(delApiURL.startsWith('/') ? delApiURL : '/' + delApiURL, {
            method: 'DELETE',
        }).then(() => {
            toastMessage("Successfully Removed")
            callback()
            setRows(rows.filter(i => i !== item))
        })
            .catch(console.log)
    }

    const updateRow = (rowId, newRow) => {
        if (!newRow) {
            setRows(rows.filter((i, id) => id !== rowId))
        } else {
            const duplicate = [...rows]
            duplicate[rowId] = newRow
            setRows(duplicate)
        }
    }

    useEffect(() => {
        if (itemsUrl) {
            const abortCont = new AbortController();
            customFetch(itemsUrl, { signal: abortCont.signal })
                .then(res => {
                    if (res.status !== 200 && res.status !== 304) {
                        throw Error('could not fetch data')
                    }
                    return res.json()
                })
                .then(data => {
                    setRows(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        setIsLoading(false);
                        setError(err.message);
                    }
                });
            return () => abortCont.abort();
        }
    }, [itemsUrl, refresh])

    useEffect(() => {
        if (!itemsUrl) {
            setRows(items)
        }
    }, [items])

    useEffect(() => {
        if (!itemsUrl) {
            setIsLoading(loading)
        }
    }, [loading])

    const handleSelectAll = (event) => {
        let newSelectedrowIds;

        if (event.target.checked) {
            newSelectedrowIds = rows.map((row) => row.id);
        } else {
            newSelectedrowIds = [];
        }

        setSelectedrowIds(newSelectedrowIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedrowIds.indexOf(id);
        let newSelectedrowIds = [];

        if (selectedIndex === -1) {
            newSelectedrowIds = newSelectedrowIds.concat(selectedrowIds, id);
        } else if (selectedIndex === 0) {
            newSelectedrowIds = newSelectedrowIds.concat(selectedrowIds.slice(1));
        } else if (selectedIndex === selectedrowIds.length - 1) {
            newSelectedrowIds = newSelectedrowIds.concat(selectedrowIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedrowIds = newSelectedrowIds.concat(
                selectedrowIds.slice(0, selectedIndex),
                selectedrowIds.slice(selectedIndex + 1)
            );
        }

        setSelectedrowIds(newSelectedrowIds);
    };

    const handleLimitChange = (event) => {
        setPage(0);
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    if (isLoading) {

        // <Box sx={{
        //     pt: 3,
        //     justifyContent: "center",
        //     display: "flex",
        //     flexDirection: "column",
        //     height: "100%",
        //     alignItems: 'center'
        // }}>
        //     <CircularProgress color="primary" />
        // </Box>
        var body = <TableSkeletonLoader pageSize={limit} columnLength={columns.length} />
    } else {
        var body = (
            <>
                <Box style={{ overflowX: 'auto' }}>
                    <Table {...rest}>
                        <TableHead style={{ display: 'table-header-group' }}>
                            <TableRow>
                                {expand &&
                                    <TableCell padding="checkbox" />
                                }
                                {/* <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedrowIds.length === rows.length}
                                    color="primary"
                                    indeterminate={
                                        selectedrowIds.length > 0
                                        && selectedrowIds.length < rows.length
                                    }
                                    onChange={handleSelectAll}
                                />
                            </TableCell> */}
                                {columns.map((column, id) => (
                                    <TableCell key={id}>
                                        {column.headerName}
                                    </TableCell>
                                ))}
                                {!!Object.keys(actions).length &&
                                    <TableCell align="center" sx={{ width: 50 }} />
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * limit, page * limit + limit).map((row, id) => (
                                <Row
                                    key={id}
                                    row={row}
                                    updateRow={updateRow}
                                    columns={columns}
                                    additionalData={additionalData}
                                    selectedrowIds={selectedrowIds}
                                    handleSelectOne={handleSelectOne}
                                    id={id}
                                    actions={actions}
                                    customActions={customActions}
                                    expand={expand}
                                    removerow={removerow}
                                    setConformation={setConformation}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                {pagination &&
                    <TablePagination
                        component="div"
                        count={rows.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                }
            </>
        )
    }


    return (
        <Card sx={{ mt: 2 }}>
            {!!title &&
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
                </MDBox>}
            {isLoading ? <TableSkeletonLoader pageSize={limit} columnLength={columns.length} /> :
                <>
                {rows.length > 0 ?
                    <Box style={{ overflowX: 'auto' }}>
                        <Table {...rest}>
                            <TableHead style={{ display: 'table-header-group' }}>
                                <TableRow>
                                    {expand &&
                                        <TableCell padding="checkbox" />
                                    }
                                    {/* <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedrowIds.length === rows.length}
                                    color="primary"
                                    indeterminate={
                                        selectedrowIds.length > 0
                                        && selectedrowIds.length < rows.length
                                    }
                                    onChange={handleSelectAll}
                                />
                            </TableCell> */}
                                    {columns.map((column, id) => (
                                        <TableCell key={id}>
                                            {column.headerName}
                                        </TableCell>
                                    ))}
                                    {!!Object.keys(actions).length &&
                                        <TableCell align="center" sx={{ width: 50 }} />
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * limit, page * limit + limit).map((row, id) => (
                                    <Row
                                        key={id}
                                        row={row}
                                        updateRow={updateRow}
                                        columns={columns}
                                        additionalData={additionalData}
                                        selectedrowIds={selectedrowIds}
                                        handleSelectOne={handleSelectOne}
                                        id={id}
                                        actions={actions}
                                        customActions={customActions}
                                        expand={expand}
                                        removerow={removerow}
                                        setConformation={setConformation}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                    :
                    <Box
                        component="img"
                        src="/static/No_Data.png"
                        sx={{ height: 260, mx: 'auto'}}
                    />
                    }

                    {pagination &&
                        <TablePagination
                            component="div"
                            count={rows.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleLimitChange}
                            page={page}
                            rowsPerPage={limit}
                            rowsPerPageOptions={[5, 10, 25]}
                        />
                    }
                </>
            }
            <Conformation properties={conformation} onClose={handleConformationClose} />
        </Card>
    );

    // if (tableOnly) {
    //     return <TableComponent />
    // } else {
    //     return (
    //         <Card {...rest}>
    //             <PerfectScrollbar>
    //                 <Box sx={{ minWidth: 1050 }}>
    //                     <TableComponent />
    //                 </Box>
    //             </PerfectScrollbar>
    //             <TablePagination
    //                 component="div"
    //                 count={rows.length}
    //                 onPageChange={handlePageChange}
    //                 onRowsPerPageChange={handleLimitChange}
    //                 page={page}
    //                 rowsPerPage={limit}
    //                 rowsPerPageOptions={[5, 10, 25]}
    //             />
    //         </Card>
    //     );
    // };
}

Table.propTypes = {
    //columns: PropTypes.array.isRequired
};

export default DatTable;
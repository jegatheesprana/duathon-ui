import { Stack } from '@mui/material';
import MDBox from 'components/MDBox';
import { Skeleton } from '@mui/material';




const TableSkeletonLoader = ({ pageSize, columnLength }) => {

    const skeletonArray = Array(pageSize + 1).fill('');
    const skeltonColumn = Array(columnLength).fill('')

    return (
        <Stack sx={{ mt: 1 }}>
            {/* <MDBox sx={{ width: '95%' }} display="flex" justifyContent="flex-end">
                <Skeleton width='15%' height={'70px'} animation="wave" variant='text' />
            </MDBox> */}
            {
                skeletonArray.map((row, id) => {
                    return (
                        <Stack direction='row' key={id} mx={2}>
                            {

                                skeltonColumn.map((column, index) => {
                                    return (
                                        <MDBox sx={{ width: '100%' }} key={index + id} >
                                            <Skeleton width='90%' height={'44.13px'} animation="wave" variant='text' />
                                        </MDBox>
                                    )
                                })
                            }
                        </Stack>
                    )
                })
            }
            <Stack direction='row'>
                <MDBox sx={{ width: '100%' }} display="flex" justifyContent="space-between" />
                <MDBox sx={{ width: '50%' }} display="flex" justifyContent="space-between" mx={2}>
                    <Skeleton width='30%' height={'44.13px'} animation="wave" variant='text' />
                    <Skeleton width='10%' height={'44.13px'} animation="wave" variant='text' />
                    <Skeleton width='20%' height={'44.13px'} animation="wave" variant='text' />
                    <Skeleton width='20%' height={'44.13px'} animation="wave" variant='text' />
                </MDBox>
            </Stack>
        </Stack>
    )
}

export default TableSkeletonLoader
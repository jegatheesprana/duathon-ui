import { Stack } from "@mui/material"
import { Skeleton } from "@mui/material"
import { Grid } from "@mui/material"

const PageSkeletonLoader = () => {
    return (
        <Grid container spacing={2}>
            <Grid item md={2} mt={5}>
                <Skeleton
                    width="240px"
                    height="600px"
                    animation="wave"
                    variant="rectangular"
                />
            </Grid>
            <Grid item md={9} mt={2} mx={5}>
                <Stack display="flex" justifyContent="space-between">
                    <Skeleton width="100%" height="100px" animation="wave" />
                    <Skeleton
                        width="100%"
                        height="500px"
                        animation="wave"
                        variant="rectangular"
                    />
                </Stack>
            </Grid>
        </Grid>
    )
}
export default PageSkeletonLoader

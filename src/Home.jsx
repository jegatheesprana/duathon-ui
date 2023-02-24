import { useState, useEffect } from "react"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import SearchIcon from "@mui/icons-material/SearchOutlined"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
// import I_Image from './assets/image.jpg';
import { useSearchParams } from "react-router-dom"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import TablePagination from "@mui/material/TablePagination"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material/"

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="#">
                Search Medicines
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    )
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const theme = createTheme()

export default function App() {
    const [results, setResults] = useState([])
    const [num_results, setNum_results] = useState({ result: 0, time: 0 })
    const [loading, setLoading] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("query") || "")
    const [sub, setSub] = useState(false)

    const handleSearchChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        setSub((su) => !su)
        e.preventDefault()
        setSearchParams({ query })
    }

    const [fvalue, setFvalue] = useState({
        year_order: "asc",
        from: "1900",
        to: "2023",
    })

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value))
        setPage(0)
    }

    useEffect(() => {
        if (!searchParams.get("query")) return
        console.log(fvalue.year_order)
        // if (!searchParams.get("query")) return
        setLoading(true)
        fetch(
            process.env.REACT_APP_API_HOST +
                `/endUser/medicines?q=${searchParams.get("query")}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setNum_results(data.length)
                setResults(data)
                setLoading(false)
            })
    }, [searchParams, fvalue.year_order, sub, rowsPerPage, page])

    const [filter, setFiletr] = useState(false)
    const handleClickAdvancedFilter = () => {
        setFiletr((val) => !val)
    }

    const [filters, setFIlters] = useState({})

    const handleChange = (e) => {
        setFIlters((filters) => {
            const _filters = { ...filters }
            _filters[e.target.name] = e.target.checked
            return _filters
        })
    }

    const districts = [
        "Jaffna",
        "Kilinochchi",
        "Mannar",
        "Mullaitivu",
        "Vavuniya",
        "Puttalam",
        "Kurunegala",
        "Gampaha",
        "Colombo",
        "Kalutara",
        "Anuradhapura",
        "Polonnaruwa",
        "Matale",
        "Kandy",
        "Nuwara",
        "Eliya",
        "Kegalle",
        "Ratnapura",
        "Trincomalee",
        "Batticaloa",
        "Ampara",
        "Badulla",
        "Monaragala",
        "Hambantota",
        "Matara",
        "Galle",
    ]

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit}>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <SearchIcon sx={{ mr: 2 }} />
                        <Typography variant="h6" color="inherit" noWrap>
                            Medicine Search
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <Box
                        sx={{
                            bgcolor: "background.paper",
                            pt: 8,
                            pb: 6,
                        }}
                    >
                        <Container maxWidth="md">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                Search Medicine
                            </Typography>
                            <Typography
                                variant="h5"
                                align="center"
                                color="text.secondary"
                                paragraph
                            >
                                In here you can find the Medicines
                            </Typography>
                            {/* <Stack
							sx={{ pb: 4 }}
							direction="row"
							spacing={2}
							justifyContent="center"
							fullwidth
						>
							<Button variant="contained">All</Button>
							<Button variant="outlined">Year</Button>
						</Stack> */}
                            <Stack container spacing={4}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                {" "}
                                                Filter
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Age"
                                                onChange={handleChange}
                                            >
                                                {districts.map((value) => {
                                                    return (
                                                        <MenuItem value={value}>
                                                            {value}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <TextField
                                                id="outlined-basic"
                                                label="Search here..."
                                                fullwidth
                                                size="medium"
                                                variant="outlined"
                                                onChange={handleSearchChange}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            sx={{ height: "100%" }}
                                            type="submit"
                                        >
                                            <SearchIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Container>
                    </Box>

                    {/* <Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={loading}
						// onClick={handleClose}
				>
						<CircularProgress color="inherit" />
				</Backdrop> */}

                    <Card sx={{ py: 2, m: 2, p: 2 }} maxWidth="md">
                        <Typography
                            variant="body"
                            align="start"
                            color="text.secondary"
                            paragraph
                        >
                            About {0} results
                        </Typography>
                        <Grid container spacing={4}>
                            {results?.map(
                                (
                                    {
                                        NDC,
                                        createdAt,
                                        manufacture,
                                        name,
                                        status,
                                        supplier,
                                        updatedAt,
                                    },
                                    id
                                ) => (
                                    <Grid item key={id} xs={12} sm={12} md={6}>
                                        <Card
                                            sx={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    Name {name}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    Supplier {supplier}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    Manufacture {manufacture}
                                                </Typography>
                                                <Button size="small"></Button>
                                                <br />
                                                <Button size="small"></Button>
                                                <br />

                                                <Button size="small"></Button>
                                                <br />
                                                <Button size="small"></Button>
                                                <br />
                                            </CardContent>

                                            <CardActions></CardActions>
                                        </Card>
                                    </Grid>
                                )
                            )}
                        </Grid>
                        <TablePagination
                            component="div"
                            count={num_results.result}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        />
                    </Card>
                </main>
                <Box
                    sx={{ bgcolor: "background.paper", p: 6 }}
                    component="footer"
                >
                    <Copyright />
                </Box>
            </form>
        </ThemeProvider>
    )
}

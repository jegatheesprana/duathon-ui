import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from "react-router-dom"
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import { ImageListItemBar, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemSecondaryAction } from '@mui/material';
// import { makeStyles } from '@mui/styles';


// const useStyles = makeStyles((theme) => ({

//     imageList: {
//       flexWrap: 'nowrap',
//       // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//       transform: 'translateZ(0)',
//     },
//   }));

export default function ImageGallery({ itemData, path }) {
    // const classes = useStyles();
    return (
        <>
            <MDBox display='flex' justifyContent="flex-end" >
                <MDButton
                    component={Link}
                    to={path}
                    variant="gradient"
                    color="dark"
                    sx={{ mt: 2, mb: 2 }}
                >
                    Add Images
                </MDButton>
            </MDBox>
            <ImageList sx={{ width: '100%', height: 400 }} cols={6} rowHeight={194} variant='string'>
                {/* rowHeight={164} */}
                {itemData.map((item, key) => (
                    <ImageListItem key={key + item.img}>
                        <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            // title={item.title}
                            // subtitle={item.author}
                            position="bottom"
                            actionPosition='right'
                            sx={{ py: 0.5 }}
                            actionIcon={
                                <ListItemSecondaryAction>
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.title}`}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.title}`}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.title}`}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
}

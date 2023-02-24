import { Icon } from '@iconify/react';
import { Fragment, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { NavLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import viewFill from '@iconify/icons-eva/book-open-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useAuth } from 'context/AuthContext';
import { useToast } from 'context/ToastContext';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;

export default function Action({ item, updateRow, id, actions: { viewRoute, editRoute, onViewClick, onDelClick, onEditClick }, removerow, customActions, additionalData, setConformation }) {
    const { customFetch } = useAuth()
    const { toastMessage } = useToast()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelClick = () => {
        handleClose()
        setConformation({
            title: "Conform the Deletion", message: "Do you really want to delete these records? This process cannot be undone.", show: true, onSuccess: () => {
                removerow(item, additionalData, id, () => {
                    setConformation(confirmation => ({ ...confirmation, show: false, onSuccess: null }))
                })
            }
        })
    }

    const handleCustomActionClick = (action, actionId) => {
        handleClose()
        // const localUpdateRow = row => {
        //     handleClose()
        //     updateRow(id, row)
        // }

        const success = () => {
            if (action.onClick && typeof action.onClick === 'function') {
                action.onClick(item, id, (row) => {
                    setConformation({ title: null, message: null, show: false, onSuccess: null })
                    updateRow(id, row)
                })
            } else {
                const apiURL = action.url(item, additionalData, id);
                if (action.body && typeof action.body === 'function') {
                    var body = { body: JSON.stringify(action.body(item, additionalData, id)) }
                } else {
                    var body = {}
                }
                customFetch(apiURL.startsWith('/') ? apiURL : '/' + apiURL, {
                    method: action.method || 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    ...body
                }).then(() => {
                    setConformation({ title: null, message: null, show: false, onSuccess: null })
                    const newRow = (action.rowAfterSuccess && typeof action.rowAfterSuccess === 'function') ? action.rowAfterSuccess(item, additionalData, id) : item
                    updateRow(id, newRow)
                })
                    .catch(console.log)
            }
            if (action.successMessage && typeof action.successMessage === 'function') {
                toastMessage(action.successMessage(item, additionalData, id))
            }
        }
        if (action.conformation) {
            const title = (typeof action.conformation.title === 'function') ? action.conformation.title(item, additionalData, id) : typeof action.conformation.title === 'string' ? action.conformation.title : "Confirm Action";
            const message = (typeof action.conformation.message === 'function') ? action.conformation.message(item, additionalData, id) : typeof action.conformation.message === 'string' ? action.conformation.message : "Confirm Action";
            setConformation({
                title, message, show: true, onSuccess: () => {
                    success()
                }
            })
        } else {
            success()
        }

    }

    return (
        <>
            <IconButton aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                size="large"
            >
                <Icon icon={moreVerticalFill} width={20} height={20} />
            </IconButton>

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        border: 0
                    },
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                getContentAnchorEl={null}
            >
                {viewRoute &&
                    <MenuItem component={NavLink} to={viewRoute(item, additionalData, id)} sx={{ color: 'text.secondary' }}>
                        <ListItemIcon>
                            <Icon icon={viewFill} width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>
                }
                {onViewClick &&
                    <MenuItem onClick={() => { handleClose(); onViewClick(item, id) }} sx={{ color: 'text.secondary' }}>
                        <ListItemIcon>
                            <Icon icon={viewFill} width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>
                }
                {editRoute &&
                    <MenuItem component={NavLink} to={editRoute(item, additionalData, id)} sx={{ color: 'text.secondary' }}>
                        <ListItemIcon>
                            <Icon icon={editFill} width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>
                }
                {
                    onEditClick &&
                    <MenuItem sx={{ color: 'text.secondary' }} onClick={() => { handleClose(); onEditClick(item, additionalData, id) }}>
                        <ListItemIcon>
                            <Icon icon={editFill} width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>
                }

                <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelClick}>
                    <ListItemIcon>
                        <Icon icon={trash2Outline} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>
                {customActions.reduce((acc, action, id) => {
                    const renderedMenuItem = <MenuItem key={'com-' + id} onClick={() => handleCustomActionClick(action, id)}>
                        <ListItemIcon>
                            {/* <Icon icon={action.icon(item, additionalData, id) || 'carbon:status-change'} width={20} height={20} /> */}
                            {action.icon(item, additionalData, id)}
                        </ListItemIcon>
                        <ListItemText primary={action.label(item, additionalData, id)} primaryTypographyProps={{ variant: 'body2' }} />
                    </MenuItem>

                    return [
                        ...acc,
                        <Divider key={'divider-' + id} />,
                        ...action.to ? [<NavLink key={'com-' + id} style={{ cursor: 'pointer', color: 'unset' }} to={action.to(item, additionalData, id)}>
                            {renderedMenuItem}
                        </NavLink>]
                            : [renderedMenuItem]
                    ]
                }, [])
                }
            </Menu>
        </>
    );
}

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom"

import { useTheme } from '@mui/material/styles';

function TabPanel(props) {
const { children, value, index, ...other } = props;

return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <div>
                {children}
            </div>
           
        )}
    </div>
);
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTab({tabs,panelsComponent,keys,navigatePath,currentTab,...rest}) {

const theme = useTheme()
    
const navigate=useNavigate()
const [value, setValue] = useState(keys.indexOf(currentTab));

useEffect(()=>{setValue(keys.indexOf(currentTab))},[currentTab])

const handleTabChange = (event, newValue) => {
    navigate((navigatePath) + keys[newValue])
};

return (
    <Box sx={{ width: '100%' }} key={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} {...rest}>
            <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs" variant="scrollable" scrollButtons="auto" sx={{bgcolor: '#3993ee'}}>
                {
                    tabs && tabs.map((tab,index)=>{
                        return(
                            <Tab 
                                label={tab} 
                                {...a11yProps(index)} 
                                key={index} 
                                sx={{
                                    color: value != index ?'white !important' : '', 
                                    [theme.breakpoints.up('sm')]: {
                                        flex: "1 1 auto"
                                    }
                                }}
                            />
                        )
                    })
                }
            </Tabs>
        </Box>
        {
            panelsComponent && panelsComponent.map((panel,id)=>{
                return(
                    <TabPanel value={value} index={id} key={id}>
                        {panel}
                    </TabPanel>
                )
            })
        }
    </Box>
);
}

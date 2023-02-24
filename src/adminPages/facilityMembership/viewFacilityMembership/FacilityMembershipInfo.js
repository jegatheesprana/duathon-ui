import BasicInfoCard from "components/BasicInfoCard/BasicInfoCard"
import { useParams } from "react-router-dom"
import { Divider, Grid }  from "@mui/material"
import MDBox from "components/MDBox"
import ItemCard from "components/Card"
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from "moment"



const FacilityMembershipInfo = (
    {
      membership: {
        apartment={}, status, createdAt, _id: membershipId, facility={}, facilityItem={}, membership={}, type=''
        }, 
        loading
    }) => {
    
    const {buildingId} = useParams()

    
    const infoItems = [
        {
            value: <Divider textAlign="left">Facility Details</Divider>,
            fullWidth: true,
        },
        {
            headerName: 'Facility Name',
            value: facility.name
        },
        {
            headerName: 'Facility Code',
            value: facility.code
        },
        {
            headerName: 'Facility Item Name',
            value: facilityItem.name
        },
        {
            headerName: 'Facility Item Code',
            value: facilityItem.code
        },
        {
            headerName: 'Facility Details',
            value: facility.details,
            fullWidth: true
        },
        {
            value: <Divider textAlign="left">Apartment Details</Divider>,
            fullWidth: true,
        },
        {
            headerName: 'Apartment Name',
            value: apartment.name
        },
        {
            headerName: 'Apartment Code',
            value: apartment.code
        },
        {
            headerName: 'Apartment Details',
            value: apartment.details,
            fullWidth: true
        },
        {
            value: <Divider textAlign="left">Membership</Divider>,
            fullWidth: true,
        },
        {
            headerName: 'Type',
            value: type
        },
        {
            headerName: 'Membership Status',
            value: status ? 'Active' : 'Inactive',
            bg: status ? 'success' : 'error',
            badge: true
        },
        {
            headerName: 'Membership',
            fullWidth: true,
            value: 
            <Grid container spacing={2}>
                {
                type != 'fulltime' ? 
                    membership[type].map((item, id) => (
                        <>
                            {
                                type === 'weekly' ||  type === 'monthly'?
                                <Grid item md={4} lg={3} sm={12} xs={6} key={id}>
                                    <MDBox mb={1.5} mt={1.5}>
                                        <ItemCard
                                            icon= {<CardMembershipIcon fontSize="large" />}
                                            title= {item.day}
                                            titleIcon={<EventIcon/>}
                                            timeRangeIcon={<AccessTimeIcon/>}
                                            timeRange= {item.fullday ? '00:00 - 12:00' : `${moment(item.from.hour + ' : ' + item.from.minute, 'hh:mm').format('HH:mm')}  -  ${moment(item.to.hour + ' : ' + item.to.minute, 'hh:mm').format('HH:mm')}`}
                                        />
                                    </MDBox>
                                </Grid>
                                :
                                type === 'once' ? 
                                <Grid item md={4} lg={3} sm={12} xs={6} key={id}>
                                    <MDBox mb={1.5} mt={1.5}>
                                        <ItemCard
                                            icon= {<CardMembershipIcon fontSize="large" />}
                                            title= {moment(item.datetime).format('DD-MM-YYYY')}
                                            timeRange= {item.fullday ? '00:00 - 12:00' : `${moment(item.from.hour + ' : ' + item.from.minute, 'hh:mm').format('HH:mm')}  -  ${moment(item.to.hour + ' : ' + item.to.minute, 'hh:mm').format('HH:mm')}`}
                                        />
                                    </MDBox>
                                </Grid>
                                :
                                null
                            }
                        </>
                    ))
                :
                null
                }
            </Grid>
        }
    ]


    return(
        <>
        <BasicInfoCard 
            infoItems={infoItems} 
            loading={loading} 
            title={'Facility Membership Information'}
            createdAt={createdAt}
            subTitle={type + ' ' + 'Membership'}
            path={`/buildings/view/${buildingId}/facilityMembership/edit/${membershipId}`}
            md={6}
        />
        </>
    )
}
 export default FacilityMembershipInfo
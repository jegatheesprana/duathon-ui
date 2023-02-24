import { useState, useMemo, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Stack, Grid } from "@mui/material";
import Button from "components/MDButton";

import * as Yup from 'yup';

import MDForm from "components/Form";
import MDAlert from "components/MDAlert";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"

import Weekly from './Weekly'
import Monthly from './Monthly'
import Once from './Once'

const TYPES = ["weekly", "monthly", "once", "fulltime"]

const NewFacilityMembership = () => {
    const { buildingId, id } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        facilityId: '',
        facilityItemId: '',
        apartmentId: ''
    })
    const [selectedType, setSelectedType] = useState(TYPES[0])
    const [membership, setMembership] = useState({
        weekly: [],
        monthly: [],
        once: []
    })
    const [error, setError] = useState()

    const [facilities, facilityLoading] = useFetch(`/facilities/byBuilding/${buildingId}?common=0`)
    const [apartments, apartmentLoading] = useFetch(`/apartments/byBuilding/${buildingId}`)

    useEffect(() => {
        setError()
    }, [membership])

    const validationSchema = Yup.object().shape({
        facilityId: Yup.string()
            .required("Facility is required"),
        apartmentId: Yup.string()
            .required("Apartment is required"),
    })

    const selectedFacility = useMemo(() => values.facilityId && facilities.find(facility => facility._id === values.facilityId), [values.facilityId, facilities])

    const formItems = [
        {
            name: "facilityId",
            label: "Facility",
            required: true,
            select: true,
            options: useMemo(() => facilities.map(data => ({ label: `${data.name} - ${data.code}`, value: data._id })), [facilities]),
            fullwidth: !selectedFacility || !selectedFacility.divisible
        },
        ...(selectedFacility && selectedFacility.divisible ? [{
            name: "facilityItemId",
            label: "Facility Item",
            required: true,
            select: true,
            options: selectedFacility.items.map(data => ({ label: `${data.name} - ${data.code}`, value: data._id })),
        }] : []),
        {
            name: "apartmentId",
            label: "Apartment",
            required: true,
            select: true,
            options: useMemo(() => apartments.map(data => ({ label: `${data.name} - ${data.code}`, value: data._id })), [apartments]),
            fullwidth: true
        },
    ]
    useEditData(
        id && '/facilityCategories/' + id,
        details => {
            if (id) {
                setValues(details)
                setLoading(false)
            }
        }
    )
    const navigate = useNavigate()
    const handlers = {
        formData: (data) => {
            data.type = selectedType
            data.membership = {}
            if (selectedType !== 'fulltime') {
                data.membership[selectedType] = membership[selectedType].map(({ ...item }) => {
                    if (!item.fullday) {
                        item.from = { hour: item.from.split(":")[0], to: item.from.split(":")[1] }
                        item.to = { hour: item.to.split(":")[0], to: item.to.split(":")[1] }
                    }
                    return item
                })
            }
            // switch (selectedType) {
            //     case 'weekly':
            //         data.membership.weekly = membership.weekly
            //         break;
            //     case 'monthly':
            //         data.membership.monthly = membership.monthly
            //         break;
            //     case 'once':
            //         body = <Once membership={membership} setMembership={setMembership} />
            //         break;
            //     case 'fulltime':
            //         body = null
            //         break;
            // }
            return data
        },
        verify: data => {
            if (data.membership[selectedType].length) {
                return true
            } else {
                setError("Add at least one item")
                return false
            }
        },
        afterSubmit: () => {
            navigate(`/buildings/view/${buildingId}/facilityMembership/new`)
        }
    }

    let body;
    switch (selectedType) {
        case 'weekly':
            body = <Weekly membership={membership} setMembership={setMembership} />
            break;
        case 'monthly':
            body = <Monthly membership={membership} setMembership={setMembership} />
            break;
        case 'once':
            body = <Once membership={membership} setMembership={setMembership} />
            break;
        case 'fulltime':
            body = null
            break;
    }

    return (
        <MDForm
            formItems={formItems}
            loading={loading || facilityLoading || apartmentLoading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/facilityMembership/update/' + id : '/facilityMembership'}
            values={values}
            setValues={setValues}
            title={id ? 'Edit Facility Membership' : 'Add Facility Membership'}
            handlers={handlers}
        >
            <Stack spacing={3} p={2}>
                <Stack direction="row" spacing={2}>
                    {TYPES.map((type, id) => (
                        <Button key={type + id} variant={selectedType === type ? "contained" : "outlined"} color='secondary' onClick={() => setSelectedType(type)}>{type}</Button>
                    ))}
                </Stack>
            </Stack>
            <Stack p={2}>
                {error && <MDAlert sx={{ mb: 1 }} color='error' >{error}</MDAlert>}
                {body}
            </Stack>
        </MDForm>
    )
}

export default NewFacilityMembership
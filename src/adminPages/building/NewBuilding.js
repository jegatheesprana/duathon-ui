import React, { useState, useMemo } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

import * as Yup from 'yup';

import MDForm from "components/Form";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"

import moment from "moment";

const NewBuilding = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        buildingCode: '',
        name: '',
        city: '',
        country: '',
        address: '',
        buildingType: 'default',
        floors: [{
            code: '',
            name: '',
            details: '',
            status: true
        }],
        status: true,
        resourceIds: [],

        startDate: moment(new Date()).format("YYYY-MM-DD"),
        endDate: moment(new Date()).format("YYYY-MM-DD"),
        year: (new Date()).getFullYear()
    })

    const [resources, resourcesLoading] = useFetch('/resources')

    const validationSchema = Yup.object().shape({
        buildingCode: Yup.string()
            .required("Employee code is required"),
        name: Yup.string()
            .required("Name is required"),
        city: Yup.string()
            .required("City is required"),
        country: Yup.string()
            .required("Country is required"),
        address: Yup.string()
            .required("Address is required"),
        buildingType: Yup.string()
            .required("Building type is required"),
        floors: Yup.array()
            .of(
                Yup.object().shape({
                    code: Yup.string().required("Code is required"),
                    name: Yup.string().required("Name is required"),
                    details: Yup.string().max(255, 'Max 255 charecters'),
                    status: Yup.boolean().required("Status is required")
                })
            )
            .min(1, "at least 1")
            .required("required"),
        status: Yup.boolean()
            .required("Status is required"),
        resourceIds: Yup.array()
            .min(1, "at least one resource"),
        startDate: Yup.date()
            .when([], {
                is: () => !!(values.buildingType === 'upcoming'),
                then: Yup.date().required("Start date is required")
                    .min(
                        moment().subtract(1, 'days'), "starting date can't be before current date"
                    )
                    .max(
                        Yup.ref('endDate'), "starting date can't be after ending date"
                    ),
                otherwise: Yup.date().notRequired(),
            }),
        endDate: Yup.date()
            .when([], {
                is: () => values.buildingType === 'upcoming',
                then: Yup.date().required("End date is required")
                    .min(
                        Yup.ref('startDate'), "Ending date can't be before starting date"
                    )
                    .max(
                        moment().add(1, 'years'), "Ending date can't be after 1 year from current date"
                    ),
                otherwise: Yup.date().notRequired(),
            }),
    })

    const formItems = [
        {
            type: 'heading',
            fullwidth: true,
            label: "Basic Info"
        },
        {
            name: "buildingCode",
            label: "Building code",
            required: true,
            // fullwidth: true
        },
        {
            name: "buildingType",
            label: "Building type",
            required: true,
            select: true,
            options: [
                { value: 'new', label: 'New' },
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'future', label: 'Future' },
                { value: 'default', label: 'Default' }
            ],
        },
        {
            name: "name",
            label: "Name",
            required: true
        },
        {
            type: 'divider',
            fullwidth: true,
            label: "Address"
        },
        {
            name: "city",
            label: "City",
            required: true
        },
        {
            name: "country",
            label: "Country",
            required: true
        },
        {
            name: "address",
            label: "Address",
            multiline: true,
            rows: 4,
            required: true
        },
        {
            type: 'divider',
            fullwidth: true,
            label: "Features"
        },
        {
            name: "resourceIds",
            label: "Resources",
            required: true,
            select: true,
            options: useMemo(() => resources.map(data => ({ label: data.title, value: data._id })), [resources]),
            multiple: true
        },

        ...(values.buildingType === 'upcoming') ?
            [
                {
                    name: "startDate",
                    label: "Start Date",
                    required: true,
                    type: 'date'
                },
                {
                    name: "endDate",
                    label: "End Date",
                    required: true,
                    type: 'date'
                }
            ]
            : (values.buildingType === 'future') ?
                [
                    {
                        name: "year",
                        label: "Making of Year",
                        required: true,
                        type: 'year'
                    }
                ]
                :
                [],

        {
            name: "status",
            label: "Status",
            required: true,
            check: true
        },
        {
            type: 'divider',
            fullwidth: true,
            label: "Floors"
        },
        {
            name: "floors",
            label: "Floors",
            special: true,
            fullwidth: true,
            fields: [
                { name: 'code', label: 'Code', required: true },
                { name: 'name', label: 'Name', required: true },
                { name: 'details', label: 'Details', multiline: true, rows: 4, },
                { name: 'status', label: 'Status', check: true }
            ],
            newfloor: {
                code: '',
                name: '',
                details: '',
                status: true
            },
            buttontext: 'Add a floor'
        }
    ]
    useEditData(
        id && '/buildings/' + id,
        details => {
            if (id) {
                setValues(details)
                setLoading(false)
            }
        }
    )

    const navigate = useNavigate()
    const handlers = {
        formData: (data) => data,
        afterSubmit: () => {
            navigate(`/buildings/view/${id}/basicInformation`)
        }
    }

    const setData = (details) => {
        setValues(details)
    }

    return (
        <MDForm
            formItems={formItems}
            loading={loading || resourcesLoading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/buildings/' + id : '/buildings'}
            values={values}
            title={id ? 'Edit Building' : 'Add Building'}
            handlers={handlers}
            setData={setData}
            changingField='buildingType'
            pt={1}
        />
    )
}

export default NewBuilding
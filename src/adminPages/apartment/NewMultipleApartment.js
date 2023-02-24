import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

import * as Yup from 'yup';

import MDForm from "components/Form";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"

const NewMultipleApartment = () => {
    const { id } = useParams()
    const { buildingId } = useParams()

    const [searchParms] = useSearchParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        apartments: [{
            code: '',
            name: '',
            details: '',
            status: true,
        }],
        floorId: searchParms.get('floor')||'',
        buildingId: buildingId
    })


    const [floors, floorLoading] = useFetch('/floors/byBuilding/' + buildingId)
    // const [owners, ownersLoading] = useFetch('/customers')

    const validationSchema = Yup.object().shape({
        apartments: Yup.array()
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
        floorId: Yup.string()
            .required("Details is required"),
        // ownerId: Yup.string()
        //   .required("Details is required"),
        // status: Yup.boolean()
        //     .required("Status is required")

    })

    const mappedFloors = useMemo(() => floors?.map(data => ({ label: data.name, value: data._id })), [floors])

    const formItems = [
        ...searchParms.get('floor')?[]:[
            {
                name: "floorId",
                label: "Floor",
                select: true,
                required: true,
                options: mappedFloors,
            },
            {
                type: 'divider',
                fullwidth: true,
                label: "Apartments"
            },
        ]
        ,
        {
            name: "apartments",
            label: "Apartments",
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
            buttontext: 'Add a Apartment'
        },

       
        // {
        //   name: "ownerId",
        //   label: "Owner",
        //   select: true,
        //   required: true,
        //   options: useMemo(() => owners.map(data => ({ label: data.code, value: data._id })), [owners]),
        // },
       
    ]

    useEditData(
        id && '/apartments/' + id,
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
            navigate(`/buildings/view/${buildingId}/apartments`)
        }
    }

    return (
        <MDForm
            formItems={formItems}
            loading={loading || floorLoading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/apartments/' + id : '/apartments'}
            values={values}
            title={id ? 'Edit Apartment' : 'Add Apartment'}
            handlers={handlers}
        />
    )
}

export default NewMultipleApartment
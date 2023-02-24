import React, { useState, useMemo } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

import * as Yup from 'yup';

import MDForm from "components/Form";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"

const NewDrug = () => {
    const { id } = useParams()
    const [medicines, medicinesLoading] = useFetch('/pharmacy/medicines/')
    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({

        manufacturer: '',
        supplier: '',
        ndc: '',
        expDate: '',
        qty: 0,
        unitPrice: '',
        medicineId: ''
    })


    const validationSchema = Yup.object().shape({
        medicineId: Yup.string()
            .required("Code is required"),
        manufacturer: Yup.string()
            .required("Code is required"),
        supplier: Yup.string()
            .required("Code is required"),
        NDC: Yup.string()
            .required("Firstname is required"),
        expDate: Yup.date()
            .required('Required')
            .min(new Date(Date.now()-86400000), 'Please choose a valid date'),
        quantity: Yup.number().positive('Not a valid qty').integer('please enter integer value'),
        price: Yup.number().typeError('Not a valid price').required('required').min(0, 'Not a valid price'),
    })

    const formItems = [
        {
            name: "medicineId",
            label: "Drug Name",
            required: true,
            select: true,
            options: useMemo(() => medicines.map(data => ({ label: data.name, value: data._id })), [medicines]),
            // multiple: true
        },
        {
            name: "manufacturer",
            label: "Manufacturer",
            required: true
        },
        {
            name: "supplier",
            label: "Supplier",
            required: true
        },
        {
            name: "NDC",
            label: "NDC (National Drug Code)",
            required: true
        },
        // ...(!id ? [
        //     {
        //         name: "password",
        //         label: "password",
        //         required: true,
        //         type: 'password'
        //     },
        //     {
        //         name: "conPassword",
        //         label: "Coform password",
        //         required: true,
        //         type: 'password'
        //     }
        // ] : []),
        {
            name: "expDate",
            label: "Select Expiration Date",
            required: true,
            type: 'date'
        },
        {
            name: "quantity",
            label: "Quantity on hand",
            // multiline: true,
            // rows: 4,
            required: true,
            type: 'number'
        },
        {
            name: "price",
            label: "Unit Price",
            required: true,
            // check: true
        },
    ]

    useEditData(
        id && '/pharmacy/inventories/' + id,
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
            navigate(`/drugs`)
        }
    }

    return (
        <MDForm
            formItems={formItems}
            loading={loading && medicinesLoading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/pharmacy/inventories/' + id : '/pharmacy/inventories'}
            values={values}
            title={id ? 'Edit Drug Details' : 'Add Drug Details'}
            handlers={handlers}
        />
    )
}

export default NewDrug
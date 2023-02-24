import React, { useState, useMemo, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

import * as Yup from 'yup';

import MDForm from "components/Form";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"
import { useAuth } from "context/AuthContext";

const NewUser = () => {
    const { id } = useParams()
    const [medicines, medicinesLoading] = useFetch('/pharmacy/medicines/')
    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({

        name: '',
        email: '',
        lane: '', town: '', district: '',
        phone: '',
        licenseNumber: '',
        password: '',
        confirmPassword: '',
        website: ''
    })


    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        // address: Yup.object().shape({
        lane: Yup.string().required("Lane is required"),
        town: Yup.string().required("Town is required"),
        district: Yup.string().required("Town is required"),
        // }),
        phone: Yup.string().required("Phone number is required").matches(/^[0-9]{9,10}/, 'Not valid number'),
        licenseNumber: Yup.string().required("License number is required").matches(/^[0-9]{9,10}/, 'Not valid number'),
        website: Yup.string(),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        ownername: Yup.string().required("Name is required"), 
        owneraddress: Yup.string().required("Address is required"),
        owneremail: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        ownerphone:Yup.string().required("Phone number is required").matches(/^[0-9]{9,10}/, 'Not valid number'),
        ownernic: Yup.string().required("NIC number is required").matches(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/,'Not a valid number')
    })

    const dis = ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya", "Puttalam", "Kurunegala", "Gampaha", "Colombo", "Kalutara", "Anuradhapura", "Polonnaruwa", "Matale", "Kandy", "Nuwara", "Eliya", "Kegalle", "Ratnapura", "Trincomalee", "Batticaloa", "Ampara", "Badulla", "Monaragala", "Hambantota", "Matara", "Galle"]
     

    const formItems = [
        // {
        //     name: "medicineId",
        //     label: "Drug Name",
        //     required: true,
        //     select: true,
        //     options: useMemo(() => medicines.map(data => ({ label: data.name, value: data._id })), [medicines]),
        //     // multiple: true
        // },
        {
            type: 'divider',
            fullwidth: true,
            label: "Pharmacy Information"
        },
        {
            name: "name",
            label: "Pharmacy Name",
            required: true
        },
        {
            name: "email",
            label: "Email",
            required: true
        },
        {
            name: "phone",
            label: "Phone Number",
            required: true
        },
        {
            name: "lane",
            label: "Lane",
            required: true
        },
        {
            name: "town",
            label: "Town",
            required: true
        },
        {
            name: "district",
            label: "District",
            required: true,
            select: true,
            options: useMemo(() => dis.map(data => ({ label: data, value: data })), [dis]),
        },
        {
            name: "website",
            label: "Website",
            required: true
        },
        {
            name: "licenseNumber",
            label: "License Number",
            required: true
        },
        {
            name: "operationgHours",
            label: "Operationg Hours",
            required: true
        },
        {
            type: 'divider',
            fullwidth: true,
            label: "Owner Information"
        },
        {
            name: "ownername",
            label: "Name",
            required: true
        },
        {
            name: "owneremail",
            label: "Email",
            required: true
        },
        {
            name: "ownerphone",
            label: "Phone Number",
            required: true
        },
        {
            name: "owneraddress",
            label: "Address",
            required: true
        },
        {
            name: "ownernic",
            label: "NIC",
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

    const {user} = useAuth()
    useEffect(()=>{
        console.log(user)
        setValues({
            ...user,
            owneraddress: user.owner.address,
            ownerphone: user.owner.phone,
            ownernic: user.owner.nic,
            ownername: user.owner.name,
            owneremail: user.owner.email,
        })
    },[])

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
            title={id ? 'Pharmacy Details' : 'Pharmacy Details'}
            handlers={handlers}
        />
    )
}

export default NewUser
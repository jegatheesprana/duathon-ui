import React, { useState, useMemo } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

import * as Yup from 'yup';

import MDForm from "components/Form";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"

const NewEmployee = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        employeeCode: '',
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        conPassword: '',
        phone: '',
        address: '',
        departmentId: '',
        jobRoleId: '',
        reportToId: '',
        status: '',
        loginEnabled: true
    })

    const [departments, departmentLoading] = useFetch('/departments')
    const [employees, employeeLoading] = useFetch('/employees')
    const [roles, roleLoading] = useFetch('/roles')

    const validationSchema = Yup.object().shape({
        employeeCode: Yup.string()
            .required("Employee code is required"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight , at least one uppercase letter, one lowercase letter, one number and one special character')
            .when([], {
                is: () => !id,
                then: Yup.string().required("Password is required"),
                otherwise: Yup.string().notRequired(),
            }),
        conPassword: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight , at least one uppercase letter, one lowercase letter, one number and one special character')
            .when([], {
                is: () => !id,
                then: Yup.string().required("Confirm Password is required")
                    .oneOf([Yup.ref("password"), null], "Password and conform password must match"),
                otherwise: Yup.string().notRequired(),
            }),
        firstname: Yup.string()
            .required("Firstname is required"),
        username: Yup.string()
            .required("username is required"),
        lastname: Yup.string()
            .required("Lastname is required"),
        phone: Yup.string()
            .required("Mobile number is required")
            .matches(/^([+]?[0-9]{1,4}[ -]?)?[0-9]{9,12}$/, "Not a valid phone number")
            .min(9, "Not a valid phone number")
            .max(12, "Not a valid phone number"),
        address: Yup.string()
            .required("Address is required"),
        departmentId: Yup.string()
            .required("Department is required"),
        reportToId: Yup.string()
            .required("Report to is required"),
        jobRoleId: Yup.string()
            .required("Job role is required"),
        status: Yup.string()
            .required("Status is required")
    })

    const formItems = [
        {
            name: "employeeCode",
            label: "Employee code",
            required: true,
            fullwidth: true
        },
        {
            name: "firstname",
            label: "First name",
            required: true
        },
        {
            name: "lastname",
            label: "Last name",
            required: true
        },
        {
            name: "username",
            label: "User name",
            required: true,
        },
        {
            name: "email",
            label: "Email",
            required: true,
            type: 'email'
        },
        ...(!id ? [
            {
                name: "password",
                label: "password",
                required: true,
                type: 'password',
            },
            {
                name: "conPassword",
                label: "Coform password",
                required: true,
                type: 'password',
            }
        ] : []),
        {
            name: "phone",
            label: "Phone",
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
            name: "departmentId",
            label: "Department",
            required: true,
            select: true,
            options: useMemo(() => departments.map(data => ({ label: data.title, value: data._id })), [departments]),
        },
        {
            name: "reportToId",
            label: "Report to",
            required: true,
            select: true,
            options: useMemo(() => employees.map(data => ({ label: data.employeeCode, value: data._id })), [employees]),
        },
        {
            name: "jobRoleId",
            label: "Jorole",
            required: true,
            select: true,
            options: useMemo(() => roles.map(data => ({ label: data.title, value: data._id })), [roles]),
        },
        {
            name: "status",
            label: "Status",
            required: true,
            select: true,
            options: [
                { value: 'active', label: 'Active' },
                { value: 'leave', label: 'Leave' },
                { value: 'absent', label: 'Absent' },
                { value: 'terminated', label: 'Terminated' }
            ],
        },
        {
            name: "loginEnabled",
            label: "Login Enabled",
            required: true,
            check: true
        },
    ]

    useEditData(
        id && '/employees/' + id,
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
            navigate(`/employees`)
        }
    }

    return (
        <>
            <MDForm
                formItems={formItems}
                loading={loading || departmentLoading || employeeLoading || roleLoading}
                validationSchema={validationSchema}
                method={id ? 'PUT' : 'POST'}
                action={id ? '/employees/update/' + id : '/employees'}
                values={values}
                title={id ? 'Edit Employee' : 'Add Employee'}
                handlers={handlers}
                successMessage={id ? 'Employee Edited' : 'Employee added'}
            />
        </>
    )
}

export default NewEmployee
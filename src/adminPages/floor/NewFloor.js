import React, { useState, useMemo } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

import * as Yup from 'yup';

import MDForm from "components/Form";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"

const NewFloor = () => {
  const { id, buildingId } = useParams()

  const [loading, setLoading] = useState(!!id)
  const [values, setValues] = useState({
    code: '',
    name: '',
    details: '',
    status: true
  })
  //{code: '', name: ''}
  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required("Code is required"),
    name: Yup.string()
      .required("Title is required"),
    details: Yup.string(),
    status: Yup.boolean()
      .required("Status is required")
  })


  const formItems = [
    {
      name: "code",
      label: "Code",
      required: true,
      fullWidth: true
    },
    {
      name: "name",
      label: "Name",
      required: true
    },
    {
      name: "details",
      label: "Details",
      multiline: true,
      rows: 4
    },
    {
      name: "status",
      label: "Status",
      required: true,
      check: true
    }
  ]
  useEditData(
    id && '/floors/' + id,
    details => {
      if (id) {
        setValues(details)
        setLoading(false)
      }
    }
  )
//   const [floor] = useFetch('/floors/'+id)
//   console.log(floor)
  const navigate = useNavigate()
  const handlers = {
    formData: (data) => data,
    afterSubmit: (data) => {
        navigate(`/buildings/view/${buildingId}/floors`)
    }
  }


  return (
    <>
      <MDForm
        formItems={formItems}
        loading={loading}
        validationSchema={validationSchema}
        method={id ? 'PUT' : 'POST'}
        action={id ? '/floors/' + id : '/floors/' + buildingId}
        values={values}
        title={id ? 'Edit Floor' : 'Add Floor'}
        handlers={handlers}
      />
    </>
  )
}

export default NewFloor
import React, { useState, useMemo } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

import * as Yup from 'yup';

import MDForm from "components/Form";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"

const NewFacility = () => {
  const { id } = useParams()
  const { buildingId } = useParams()
  const [searchParms] = useSearchParams()

  const [loading, setLoading] = useState(!!id)
  const [values, setValues] = useState({
    facilityCategoryId: '',
    buildingId: buildingId || '',
    floorId: searchParms.get('floor') || '',
    code: '',
    common: true,
    name: '',
    details: '',
    divisible: false,
    items: [{ code: '', name: '' }],
    status: true
  })
  //{code: '', name: ''}
  const validationSchema = Yup.object().shape({
    facilityCategoryId: Yup.string()
      .required('Facility Category is required'),
    buildingId: Yup.string()
      .required('Building is required'),
    floorId: Yup.string()
      .required('Building Floor is required'),
    code: Yup.string()
      .required("Code is required"),
    name: Yup.string()
      .required("Title is required"),
    details: Yup.string(),
    common: Yup.boolean()
      .required("Common is required"),
    divisible: Yup.boolean()
      .required("Divisible is required"),
    status: Yup.boolean()
      .required("Status is required"),
    items: Yup.array()
      .when(['divisible'], {
        is: (val) => {
          return val;
        },
        then: Yup.array().min(1, 'atleast 1 item')
          .of(
            Yup.object().shape({
              code: Yup.string().required("Code is required"),
              name: Yup.string().required("Name is required")
            })
          ),
        otherwise: Yup.array().min(0).nullable()
      })
  })

  const [facilityCategories, facilityLoading] = useFetch('/facilityCategories')
  const [floors, floorLoading] = useFetch('/floors/byBuilding/' + buildingId)

  const mappedFloors = useMemo(() => floors?.map(data => ({ label: data.name, value: data._id })), [floors])

  const formItems = [
    {
      name: "code",
      label: "Code",
      required: true,
      fullWidth: true
    },
    {
      name: "facilityCategoryId",
      label: "Facility Category",
      required: true,
      select: true,
      options: useMemo(() => facilityCategories.map(data => ({ label: data.title, value: data._id })), [facilityCategories]),
    },
    ...searchParms.get('floor') ? [] : [{
      name: "floorId",
      label: "Floor",
      select: true,
      required: true,
      options: mappedFloors,
    }],
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
    },
    {
      name: "common",
      label: "Common",
      required: true,
      check: true
    },
    {
      name: "divisible",
      label: "Divisible",
      required: true,
      check: true
    },
    {
      name: "items",
      label: "Items",
      special: true,
      fullwidth: true,
      fields: [
        { name: 'code', label: 'Code' },
        { name: 'name', label: 'Name' }
      ],
      newitem: {
        code: '',
        name: ''
      },
      buttontext: 'Add a item',
      dependfield: 'divisible'
    }
  ]
  useEditData(
    id && '/facilities/' + id,
    details => {
      if (id) {
        setValues(details)
        setLoading(false)
      }
    }
  )

  const bId = buildingId
  const navigate = useNavigate()
  const handlers = {
    formData: (data) => {
      if (!data.divisible) {
        data.items = []
      }
      data.items = data.items.filter(item => item.code)
      return data
    },
    afterSubmit: () => {
      navigate(`/buildings/view/${buildingId}/facilities`)
    }
  }


  return (
    <>
      <MDForm
        formItems={formItems}
        loading={loading || facilityLoading || floorLoading}
        validationSchema={validationSchema}
        method={id ? 'PUT' : 'POST'}
        action={id ? '/facilities/update/' + id : '/facilities/' + buildingId}
        values={values}
        title={id ? 'Edit Facility' : 'Add Facility'}
        handlers={handlers}
      />
    </>
  )
}

export default NewFacility
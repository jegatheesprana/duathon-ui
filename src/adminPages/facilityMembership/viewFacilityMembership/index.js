import useFetch from 'hooks/useFetch'
import React from 'react'
import { useParams } from 'react-router-dom'
import FacilityMembershipInfo from "./FacilityMembershipInfo"

function ViewFacilityMembership() {
  const {membershipId} = useParams()
  const [membership, mLoading] = useFetch(`/facilityMembership/${membershipId}`)
  console.log(membership)
  if(mLoading) return null
  return (
    <FacilityMembershipInfo 
      membership={membership}
      loading={mLoading}
    />
  )
}

export default ViewFacilityMembership
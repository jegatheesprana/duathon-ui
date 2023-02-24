import React from 'react'
import ViewRoleInfo from './ViewRoleInfo'
import useFetch from "hooks/useFetch";
import { useParams } from "react-router-dom";

function ViewRole() {
  const { roleId } = useParams();
  const [role, loading] = useFetch(`/roles/${roleId}`);

  return (
    <ViewRoleInfo role={role} loading={loading} />
  )
}

export default ViewRole
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditContact from "./EditContact";

const EditContactWrapper = (props) => {
  const location = useLocation(); // hook to get current route info
  const navigate = useNavigate(); // hook to programmatically navigate

  return (
    <EditContact
      {...props}
      location={location}
      navigate={navigate}
    />
  );
};

export default EditContactWrapper;

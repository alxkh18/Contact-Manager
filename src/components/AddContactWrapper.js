import React from "react";
import AddContact from "./AddContact";
import { useNavigate } from "react-router-dom";

const AddContactWrapper = (props) => {
  const navigate = useNavigate();
  return <AddContact {...props} navigate={navigate} />;
};

export default AddContactWrapper;

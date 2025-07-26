import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { createClient } from "../../redux/action/user";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClient = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialClientState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  };

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [clientData, setClientData] = useState(initialClientState);
  const [validationErrors, setValidationErrors] = useState({});

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, password, phone } = clientData;
    const errors = {};
    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (!phone) errors.phone = "Phone is required";
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;
    dispatch(createClient(clientData, setOpen));
    setClientData(initialClientState);
    setValidationErrors({});
  };

  const handleChange = (field, value) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setOpen(false);
    setClientData(initialClientState);
    setValidationErrors({});
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Client</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Client Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tbody>
                <tr>
                  <td className="pb-4 text-lg">First Name </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      value={clientData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      error={!!validationErrors.firstName}
                      helperText={validationErrors.firstName}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Last Name </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      value={clientData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      error={!!validationErrors.lastName}
                      helperText={validationErrors.lastName}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">User Name </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      value={clientData.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      error={!!validationErrors.username}
                      helperText={validationErrors.username}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Email </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Optional"
                      value={clientData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="flex items-start pt-2 text-lg">Password </td>
                  <td className="pb-4">
                    <TextField
                      type="password"
                      value={clientData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      size="small"
                      fullWidth
                      error={!!validationErrors.password}
                      helperText={validationErrors.password}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="flex items-start pt-2 text-lg">Phone </td>
                  <td className="pb-4">
                    <TextField
                      type="number"
                      size="small"
                      value={clientData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      fullWidth
                      error={!!validationErrors.phone}
                      helperText={validationErrors.phone}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
          >
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateClient; 
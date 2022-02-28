import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const Forms = () => {
  const [Values, setValues] = useState({
    email: "",
    name: "",
  });
  const [addData, setAddedData] = useState([]);
  const [submitButton, setSubmitButton] = useState({
    update: false,
  });

  useEffect(() => {
    let arr = localStorage.getItem("FormData");
    if (arr) {
      let obj = JSON.parse(arr);
      setAddedData(obj);
    }
  }, []);

  /**************************************** Onchange Handler Details  *****************************************************/
  const handleChange = (e) => {
    const { name, value } = e.target;
    let inputValues = Values;
    inputValues[name] = value;
    setValues({ ...inputValues });
  };
  /**************************************** Validate Form Fields  *****************************************************/
  const validateData = () => {
    if (!/^\S+@\S+\.\S+$/.test(Values.email)) {
      alert("Please enter valid Email !!!");
    } else if (!Values.name) {
      alert("Please enter the Name !!!");
    } else {
      return;
    }
  };

  /****************************************Create Form Details  *****************************************************/
  const SaveData = (addObj) => {
    let TempDataList = addData;
    TempDataList.push(addObj);
    localStorage.setItem("FormData", JSON.stringify(TempDataList));
    setAddedData(TempDataList);
  };

  const handleSave = (e) => {
    e.preventDefault();
    validateData();
    let addFormData = {};
    addFormData["name"] = Values.name;
    addFormData["email"] = Values.email;
    console.log(addFormData, "addFormData");
    SaveData(addFormData);
    alert("Created Successfully");
    setValues({ name: "", email: "" });
  };

  /****************************************Update Form Details  *****************************************************/
  const handleUpdate = (e, index, obj) => {
    let tempObj = {};
    tempObj["name"] = Values.name;
    tempObj["email"] = Values.email;
    updateTask(tempObj);
    let tempList = addData;
    tempList[index] = obj;
    console.log(tempList);
    localStorage.setItem("FormData", JSON.stringify(tempList));
    setAddedData(tempList);
    alert("Updated Successflly");
    window.location.reload();
  };

  const updateTask = (obj, index) => {
    console.log(obj);
    setValues(obj);
    setSubmitButton({ update: true, index, obj });
  };

  /****************************************Delete Form Details  *****************************************************/
  const deleteItem = (index) => {
    let tempList = addData;
    const newInventory = addData.filter((obj, objindex) => index !== objindex);
    localStorage.setItem("FormData", JSON.stringify(tempList));
    return setAddedData([...newInventory]);
  };

  return (
    <div>
      <div className="row">
        <div
          className="col-lg-5 col-md-6 col-sm-12 form"
          style={{ height: "400px" }}
        >
          <span
            style={{ fontSize: "20px", fontWeight: "600", padding: "20px" }}
            className="form-header"
          >
            ADD DATA
          </span>
          <form onSubmit={handleSave}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={Values.name}
              onChange={handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={Values.email}
              onChange={handleChange}
              required
            />
            {submitButton.update ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleUpdate()}
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                // onClick={handleSave}
              >
                Submit
              </button>
            )}
          </form>
        </div>
        <div className="col-lg-4 col-md-5 col-sm-12 form-details">
          <span
            className="form-header1"
            style={{ fontSize: "20px", fontWeight: "600", padding: "20px" }}
          >
            FORM DETAILS
          </span>
          {addData &&
            addData.map((obj, index) => (
              <div className="card DisplayData">
                <div className="card-body" key={index}>
                  <span className="card-title">Name: {obj.name}</span>
                  <br />
                  <span className="card-title">Email: {obj.email}</span>
                  <br />
                  <div className="icons">
                    <span className="icon-body">
                      <DeleteIcon
                        onClick={(e) => deleteItem(index)}
                        index={index}
                      />
                    </span>
                    <span className="icon-body">
                      <EditIcon onClick={(e) => updateTask(obj, index)} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Forms;

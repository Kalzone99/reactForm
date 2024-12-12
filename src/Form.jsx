import React, { useState } from "react";

function Form() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm: "",
  });

  const [submittedValues, setSubmittedValues] = useState([]); // State for list items

  const [errors, setErrors] = useState({}); //State for errors

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Regex for Email checking

  //Error verification and messages
  const validateField = (name, value, values) => {
    setErrors((prev) => {
      return { ...prev, [name]: "" };
    });
    //values of password and confirmation to comparate
    const pass = values.password;
    const confirm = values.confirm;

    if (name === "firstname" && value.length < 2) {
      setErrors((prev) => {
        return { ...prev, [name]: "Firstname must be at least 2 characters" };
      });
    }
    if (name === "firstname" && value.length > 10) {
      setErrors((prev) => {
        return { ...prev, [name]: "Firstname must be 10 characters at most" };
      });
    }

    if (name === "lastname" && value.length < 2) {
      setErrors((prev) => {
        return { ...prev, [name]: "Lastname must be at least 2 characters" };
      });
    }
    if (name === "lastname" && value.length > 10) {
      setErrors((prev) => {
        return { ...prev, [name]: "Lastname must be 10 characters at most" };
      });
    }
    if (name === "password" && value.length < 6) {
      setErrors((prev) => {
        return { ...prev, [name]: "Password must be at least 6 characters" };
      });
    }
    if (name === "password" && value.length > 15) {
      setErrors((prev) => {
        return { ...prev, [name]: "Password must be 15 characters at most" };
      });
    }
    if (name === "email" && !emailPattern.test(value)) {
      setErrors((prev) => {
        return { ...prev, [name]: "Not a valid Email" };
      });
    }
    //
    if (name === "confirm" || name === "password") {
      if (pass !== confirm) {
        setErrors((prev) => {
          return { ...prev, confirm: "Passwords do not match" }; //set an error in confirmation doesn't match password
        });
      }
    }
  };

  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues((prev) => {
      return { ...prev, [name]: value }; // Fixed value assignment
    });
    validateField(name, value, { ...values, [name]: value }); //check errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedValues([...submittedValues, values]); // Add current values to the list
    setValues({
      firstname: "",
      lastname: "",
      age: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirm: "",
    }); // Reset the form
    console.log("form submitted!");
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>React Form</h1>
      <label htmlFor="firstname">First Name*: </label>
      <input
        type="text"
        placeholder="Enter First Name"
        name="firstname"
        value={values.firstname}
        onChange={handleChanges}
        required
        className={
          errors.firstname ? "notValid" : values.firstname ? "valid" : ""
        }
      />
      {errors.firstname && <p>{errors.firstname}</p>}

      <label htmlFor="lastname">Last Name*: </label>
      <input
        type="text"
        placeholder="Enter Last Name"
        name="lastname"
        value={values.lastname}
        onChange={handleChanges}
        required
        className={
          errors.lastname ? "notValid" : values.lastname ? "valid" : ""
        }
      />
      {errors.lastname && <p>{errors.lastname}</p>}

      <label htmlFor="age">Age: </label>
      <input
        type="number"
        placeholder="Enter Age"
        name="age"
        value={values.age}
        onChange={handleChanges}
      />

      <label htmlFor="email">Email*: </label>
      <input
        type="email"
        placeholder="Enter Email"
        name="email"
        value={values.email}
        onChange={handleChanges}
        className={errors.email ? "notValid" : values.email ? "valid" : ""}
      />
      {errors.email && <p>{errors.email}</p>}

      <label htmlFor="phoneNumber">Phone Number: </label>
      <input
        type="text"
        placeholder="Enter Phone Number"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={handleChanges}
      />

      <label htmlFor="password">Password*: </label>
      <input
        type="Password"
        placeholder="Enter Password"
        name="password"
        value={values.password}
        onChange={handleChanges}
        required
        className={
          errors.password ? "notValid" : values.password ? "valid" : ""
        }
      />
      {errors.password && <p>{errors.password}</p>}

      <label htmlFor="confirm">Confirm Password*: </label>
      <input
        id="confirm"
        type="password"
        placeholder="Confirm Password"
        name="confirm"
        value={values.confirm}
        onChange={handleChanges}
        required
        className={errors.confirm ? "notValid" : values.confirm ? "valid" : ""}
      />
      {errors.confirm && <p>{errors.confirm}</p>}
      <button type="submit">SUBMIT</button>
      <h5>* field required</h5>

      {/* Dynamically render the list */}
      <ul className="listInput">
        {submittedValues.map((item, index) => (
          <li key={index}>
            {Object.entries(item).map(([key, value]) => (
              <div key={key} className="list">
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Form;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from "formik";
import * as Yup from 'yup';

// New User: Name, Email, Password, ToS(checkbox), a submit button

const NewUserForm = ({ errors, touched, values, status }) => {
    const [user, setUser] = useState([]);
    console.log("this is touched", touched);
    useEffect(() => {
        if (status) {
            setUser([...user, status]);
        }
    }, [status]);

    return (
        <div className="New-User">
            <h1>New User</h1>
            <Form>
                <Field type="text" name="Username" placeholder="Name" />{touched.Username && errors.Username && (
                    <p className="error"
                    >{errors.Username}</p>)}

                <Field type="email" name="Email" placeholder="example@email.com" />{touched.Email && errors.Email && <p className="error">{errors.Email}</p>}

                <Field type="password" name="Password" placeholder="Password" />{touched.Password && errors.Password && <p className="error">{errors.Password}</p>}

                <label className="checkbox-ToS"> I agree with Terms of Service

                <Field
                        type="checkbox"
                        name="ToS"
                        checked={values.ToS} /><span className="checkmark" /></label>

                <button type="submit">Submit!</button>
            </Form>
        </div>
    )
}

const FormikNewUserForm = withFormik({
    mapsPropsToValues({ Username, Email, Password, ToS }) {
        return {
            Username: Username || "",
            Email: Email || "",
            Password: Password || "",
            ToS: ToS || false,

        };
    },
    validationSchema: Yup.object().shape({
        Username: Yup.string().required("UserName is not valid"),
        Password: Yup.string().required("Incorrect Password"),
        Email: Yup.string().required("Valid email is required"),
        ToS: Yup.bool().oneOf([true], "You cannot continue without agreeing to the terms of service"),
    }),
})(NewUserForm)

export default FormikNewUserForm;
// components/Form.js
'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'; // Import Axios

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  // Add validation rules for other fields

  return errors;
};

const MyForm = ({ onSubmit }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Send a POST request to the backend
      await axios.post('https://your-backend-api.com/endpoint', values);
      onSubmit(); // Call the onSubmit callback if the request succeeds
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        phoneNumber: '',
        email: '',
        hobbies: '',
      }}
      validate={validate}
      onSubmit={handleSubmit} // Use the handleSubmit function for form submission
    >
      <Form style={{ color: 'black' }}>
        Name :
        <Field type="text" name="name" placeholder="Name" />
        <ErrorMessage name="name" component="div" className="error" />

        <br />
        <br />

        Phone :
        <Field type="text" name="phoneNumber" placeholder="Phone Number" />
        <ErrorMessage name="phoneNumber" component="div" className="error" />
        <br />
        <br />

        Email :
        <Field type="email" name="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" className="error" />
        <br />
        <br />

        Hobbies :
        <Field type="text" name="hobbies" placeholder="Hobbies" />
        <ErrorMessage name="hobbies" component="div" className="error" />
        <br />
        <br />

        <button style={{ backgroundColor: '#4d0000' }} type="submit">Save</button>
      </Form>
    </Formik>
  );
};

export default MyForm;
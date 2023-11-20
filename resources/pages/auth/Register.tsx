import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import register from "../../axios/auth/register"; // Import the registration function
import ContentBox from '../../components/elements/ContentBox';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../../states';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsofservice: boolean;
}

const Register: React.FC = () => {
  const website = store.getState().website.data;

  const [errMsg, setErrMsg] = useState<string>('');
  const errRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Validation using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters')
      .required('Required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords do not match')
      .required('Required'),
    termsofservice: Yup.boolean()
      .oneOf([true], 'You must agree to the terms of service'),
  });

  // Function to send registration data to the API
  const handleSubmit = async (values: RegisterFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    if (errMsg) setErrMsg('');
    try {
      register({ username: values.username, email: values.email, password: values.password })
        .then((response) => {
          if (response.complete) {
            // Registration successful, redirect to login page or another appropriate page
            navigate("/auth/login");
          } else {
            setErrMsg(response.message || 'Error trying to register.');
          }
        })
        .catch((err) => {
          if (!err?.response) {
            setErrMsg('No response from the server');
          } else if (err.response?.status === 400) {
            setErrMsg('Invalid registration data');
          } else if (err.response?.status === 401) {
            setErrMsg(!err.response.data.message ? 'Unauthorized' : err.response.data.message);
          } else {
            setErrMsg('Failed to register');
          }
          if (errRef.current) errRef.current.focus();
          setSubmitting(false);
        });
    } catch (error) {
      console.error('Error trying to register:', error);
      setSubmitting(false);
    }
  };

  return (
    <ContentBox title="Registration">
      {/* <ShollBarController className=' p-4 top-5 left-5 right-5 rounded-lg shadow-md overflow-y-scroll scrollbar-hide h-screen'> */}
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-8 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Registration Area - {!website ? "Core" : website.title}</h2>
            <p ref={errRef} className={`mb-4 ${errMsg ? 'text-red-600' : 'hidden'}`} aria-live="assertive">{errMsg}</p>
            <Formik
              initialValues={{ username: '', email: '', password: '', confirmPassword: '', termsofservice: false }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="flex flex-wrap mb-4">
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                      <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                      <label htmlFor="username" className="block text-gray-700">Username</label>
                      <Field type="text" name="username" className="mt-1 p-2 w-full rounded border" />
                    </div>
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                      <label htmlFor="email" className="block text-gray-700">Email</label>
                      <Field type="email" name="email" className="mt-1 p-2 w-full rounded border" />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-4">
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                      <label htmlFor="password" className="block text-gray-700">Password</label>
                      <Field type="password" name="password" className="mt-1 p-2 w-full rounded border" />
                    </div>
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                      <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                      <Field type="password" name="confirmPassword" className="mt-1 p-2 w-full rounded border" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="termsofservice" className="block text-gray-700">
                      <Field type="checkbox" name="termsofservice" className="mr-2" />
                      I agree to our {' '}
                      <span className="line">
                        <Link to="/termsofservice" className="text-blue-500 hover:underline">
                          terms of service
                        </Link>
                      </span>
                    </label>
                    <ErrorMessage name="termsofservice" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="mb-4 justify-center text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    >
                      Register
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <p className="mt-4 text-center">
              Already have an account?{' '}
              <span className="line">
                <Link to="/auth/login" className="text-blue-500 hover:underline">
                  Log in
                </Link>
              </span>
            </p>
            <p className="mt-4 text-center">
              Back to {' '}
              <span className="line">
                <Link to="/" className="text-blue-500 hover:underline">
                  home
                </Link>
              </span>
            </p>
          </div>
        </div>
      {/* </ShollBarController> */}
    </ContentBox>
  );
};

export default Register;

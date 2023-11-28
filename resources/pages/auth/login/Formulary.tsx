import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Trans from "../../../components/elements/Trans";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { FormValues } from "./types";
import Submit from "./Submit";

const LoginForm: React.FC = () => {
	const { t } = useTranslation("react:auth");
	const [errMsg, setErrMsg] = useState("");
	const errRef = useRef<HTMLInputElement>(null);

	const initialValues: FormValues = {
		email: "",
		password: "",
		remember_me: false,
	};
	const validationSchema = Yup.object({
		email: Yup.string().email(t("InvalidEmail")).required(t("ObrigatoryCamp")),
		password: Yup.string().required(t("ObrigatoryCamp")),
	});

	return (
		<>
			<p ref={errRef} className={`mb-4 ${errMsg ? "text-red-600" : "hidden"}`} aria-live='assertive'>
				{errMsg}
			</p>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={Submit(errMsg, setErrMsg, errRef, t)}
			>
				{(formik) => (
					<Form className='space-y-6'>
						<div>
							<label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
								<Trans ns='react:auth' i18nKey={"EmailAddress"} />
							</label>
							<div className='mt-2'>
								<Field
									type='email'
									id='email'
									name='email'
									autoComplete='email'
									placeholder={t("InputMail")}
									required
									className={`block px-3 w-full rounded-md border-0 py-1.5 
                                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                    focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
								/>
								<ErrorMessage name='email' component='div' className='text-red-500 text-xs mt-1' />
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
									<Trans ns='react:auth' i18nKey={"Password"} />
								</label>
								<div className='text-sm'>
									<a href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>
										<Trans ns='react:auth' i18nKey={"ForgotPassword"} />?
									</a>
								</div>
							</div>
							<div className='mt-2'>
								<Field
									type='password'
									id='password'
									name='password'
									placeholder={t("InputPass")}
									autoComplete='current-password'
									required
									className={`block px-3 w-full rounded-md border-0 py-1.5 
                                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                    focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
								/>
								<ErrorMessage name='password' component='div' className='text-red-500 text-xs mt-1' />
							</div>
						</div>
						<div className='mb-2'>
							<label htmlFor='remember_me' className='flex items-center text-gray-700'>
								<Field type='checkbox' name='remember_me' className='mr-2' />
								<span className='ml-1'>
									<Trans ns='react:auth' i18nKey={"Remember"} />
								</span>
							</label>
						</div>
						<div>
							<button
								type='submit'
								disabled={formik.isSubmitting}
								className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								{formik.isSubmitting ? (
									<span className='w-5 h-5 block rounded-full border-4 border-t-blue-300 animate-spin' />
								) : (
									<Trans ns='react:auth' i18nKey={"Login"} />
								)}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};
export default LoginForm;

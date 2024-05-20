import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Trans from "../../../components/elements/Trans";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { FormValues } from "./types";
import Submit from "./Submit";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
	const { t } = useTranslation("react:auth");
	const [errMsg, setErrMsg] = useState("");
	const errRef = useRef<HTMLInputElement>(null);

	const initialValues: FormValues = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		termsofservice: false,
	};
	const DiscordResponse = new URLSearchParams(window.location.search).get("Err");

	if(DiscordResponse){
		setErrMsg(DiscordResponse)
	}

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.min(4, t("MinUser", { value: 4 }))
			.required(t("ObrigatoryCamp")),
		email: Yup.string().email(t("InvalidEmail")).required(t("ObrigatoryCamp")),
		password: Yup.string()
			.min(4, t("MinUser", { value: 4 }))
			.required(t("ObrigatoryCamp")),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), undefined], t("PassNotMatch"))
			.required(t("ObrigatoryCamp")),
		termsofservice: Yup.boolean().oneOf([true], t("AgreeTermsOfService")),
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
						<div className='flex flex-wrap mb-4'>
							<div className='w-full md:w-1/2 md:pr-2 mb-4 md:mb-0'>
								<label htmlFor='username' className='block text-sm font-medium leading-6 text-light-primary dark:text-dark-primary  duration-300'>
									<Trans ns='react:auth' i18nKey={"Username"} />
								</label>
								<Field
									type='text'
									name='username'
									placeholder={t("InputUsername")}
									autoComplete='current-username'
									required
									className='mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500 text-light-primary dark:text-dark-primary'
								/>
								<ErrorMessage name='username' component='div' className='text-red-500 text-sm' />
							</div>
							<div className='w-full md:w-1/2 md:pr-2 mb-4 md:mb-0'>
								<label htmlFor='email' className='block text-sm font-medium leading-6 text-light-primary dark:text-dark-primary  duration-300'>
									<Trans ns='react:auth' i18nKey={"EmailAddress"} />
								</label>
								<Field
									type='email'
									name='email'
									placeholder={t("InputMail")}
									autoComplete='current-email'
									required
									className='mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500 text-light-primary dark:text-dark-primary'

								/>
								<ErrorMessage name='email' component='div' className='text-red-500 text-sm' />
							</div>
						</div>
						<div className='flex flex-wrap mb-4'>
							<div className='w-full md:w-1/2 md:pr-2 mb-4 md:mb-0'>
								<label htmlFor='password' className='block text-sm font-medium leading-6 text-light-primary dark:text-dark-primary  duration-300'>
									<Trans ns='react:auth' i18nKey={"Password"} />
								</label>
								<Field
									type='password'
									id='password'
									name='password'
									placeholder={t("InputPass")}
									autoComplete='current-password'
									required
									className='mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500 text-light-primary dark:text-dark-primary'

								/>
								<ErrorMessage name='password' component='div' className='text-red-500 text-xs mt-1' />
							</div>
							<div className='w-full md:w-1/2 md:pr-2 mb-4 md:mb-0'>
								<label
									htmlFor='confirmPassword'
									className='block text-sm font-medium leading-6 text-light-primary dark:text-dark-primary  duration-300'
								>
									<Trans ns='react:auth' i18nKey={"ConfirmPassword"} />
								</label>
								<Field
									type='confirmPassword'
									id='confirmPassword'
									name='confirmPassword'
									placeholder={t("InputConfirmPass")}
									autoComplete='current-confirmPassword'
									required
									className='mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500 text-light-primary dark:text-dark-primary'

								/>
								<ErrorMessage
									name='confirmPassword'
									component='div'
									className='text-red-500 text-xs mt-1'
								/>
							</div>
						</div>
						<div className='mb-2'>
							<label htmlFor='termsofservice' className='block text-light-primary dark:text-dark-primary  duration-300'>
								<Field type='checkbox' name='termsofservice' className='mr-2' />
								<Trans ns='react:auth' i18nKey={"AgreeTerms"} />{" "}
								<span className='line'>
									<Link to='/termsofservice' className='text-blue-500 hover:underline'>
										<Trans ns='react:auth' i18nKey={"TermsOfServices"} />
									</Link>
								</span>
							</label>
							<ErrorMessage name='termsofservice' component='div' className='text-red-500 text-sm' />
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
									<Trans ns='react:auth' i18nKey={"Register"} />
								)}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};
export default RegisterForm;

import { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ContentBox from "../../../components/elements/ContentBox";
import Box from "../../../components/elements/Box";
import BoxNavbar from "../../../components/elements/models/BoxNavbar";
import mail, { MailData } from "../../../axios/admin/settings/mail";

const Mailer = () => {
    const links = [
        {
            link: "/admin/settings",
            title: "Geral",
        },
        {
            link: "/admin/settings/mail",
            title: "Email",
        },
    ];
    const [mailConfig, setMailConfig] = useState<MailData | null>(null);

    useEffect(() => {
        const getMailerSettings = async () => {
            try {
                const response = await mail();
                setMailConfig(response);
            } catch (err) {
                console.error(err);
            }
        };

        if (!mailConfig) getMailerSettings();
    }, [mailConfig]);

    const validationSchema = Yup.object({
        active: Yup.boolean().required("Campo obrigatório"),
        host: Yup.string().required("Campo obrigatório"),
        port: Yup.number().required("Campo obrigatório"),
        secure: Yup.boolean().required("Campo obrigatório"),
        username: Yup.string().required("Campo obrigatório"),
        from: Yup.string().required("Campo obrigatório"),
    });

    const initialData = {
        active: mailConfig?.active || false,
        host: mailConfig?.host || "",
        port: mailConfig?.port || 0,
        secure: mailConfig?.secure || false,
        username: mailConfig?.username || "",
        password: "",
        from: mailConfig?.from || "",
    }

    const onSubmit = (values: typeof initialData) => {

    }

    return (
        <>
            <BoxNavbar links={links} />
            <ContentBox title="Administração - Configurar Email">
                <Box.base title="Configurações do Email" desc="gerencia as configurações do Email">
                    <Formik
                        initialValues={initialData}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {(formik) => (
                            <Form className='space-y-6'>
                                <div className="flex flex-col sm:flex-row">
                                    <div className="flex-1">
                                        <div>
                                            <label htmlFor='active' className='block text-sm font-medium leading-6 text-light-primary dark:text-dark-primary duration-300'>
                                                Habilitar/Desabilitar Email
                                            </label>
                                            <div className='mt-2'>
                                                <Field
                                                    as="select"
                                                    id="active"
                                                    name="active"
                                                    value={formik.values.active ? "true" : "false"}
                                                    className='mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500'
                                                >
                                                    <option value="true">Habilitado</option>
                                                    <option value="false">Desabilitado</option>
                                                </Field>
                                                <ErrorMessage name="active" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor='active' className='block text-sm font-medium leading-6 text-light-primary dark:text-dark-primary duration-300'>
                                                Habilitar/Desabilitar sistema de Email
                                            </label>
                                            <Field type="text" id="host" name="host" placeholder="dominio ou ip da hospedagem SMTP" value={formik.values.host} />
                                            <ErrorMessage name="host" component="div" className="text-red-500 text-xs mt-1" />
                                        </div>
                                    </div>
                                    <div className="flex">

                                        <Field type="number" id="port" name="port" placeholder="Porta :" value={formik.values.port} />
                                        <ErrorMessage name="port" component="div" className="text-red-500 text-xs mt-1" />

                                        <Field type="checkbox" id="secure" name="secure" checked={formik.values.secure} />
                                        <ErrorMessage name="secure" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-light-primary dark:text-dark-primary duration-300">
                                        Nome de Usuário
                                    </label>
                                    <Field type="text" id="username" name="username" placeholder="O nome do Usuário" value={formik.values.username} />
                                    <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div className="mt-2">
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder={""}
                                        className="mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <label htmlFor="from">De:</label>
                                <Field type="text" id="from" name="from" value={formik.values.from} />
                                <ErrorMessage name="from" component="div" className="text-red-500 text-xs mt-1" />

                                <button type="submit">Salvar</button>
                            </Form>
                        )}
                    </Formik>
                </Box.base>
            </ContentBox>
        </>
    );
};

export default Mailer;

import ContentBox from "../../../components/elements/ContentBox";
import BoxModel from "../../../components/elements/models/BoxModel";

interface WarningProps {
    title: string;
    desc: string;
    message: string;
}
const WarningContent: React.FC<WarningProps> = ({ title, desc, message }) => {
    return (
        <ContentBox title={"Administração - Aviso - " + title}>
            <BoxModel title={`Aviso administrativo - ${title}`} desc={desc}>
                <div className='container '>
                    <div className='flex flex-col sm:flex-row justify-center items-center'>
                        <i
                            className={"bx bx-error-alt"}
                            style={{ marginLeft: "-1px", color: "red", fontSize: "200px" }}
                        />
                        <div className='flex-1 shadow-md'>
                            <h1 className='text-2xl font-bold textpri mb-4'>{title}</h1>
                            <p className='mb-6 textsec'>
                                {message}
                            </p>
                        </div>
                    </div>
                </div>
            </BoxModel>
        </ContentBox>
    );
};

export default WarningContent;

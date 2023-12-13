import { Dispatch, ReactNode, SetStateAction } from "react";

interface DialogBoxModelProps {
    children: ReactNode;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>
}
const FloatBoxModel: React.FC<DialogBoxModelProps> = ({ children, show, setShow }) => {
    return (
        <>
            <>
                <div className={`fixed inset-0 z-10 overflow-y-auto origin-center duration-200 ${show ? "" : "scale-0"}`}>
                    <div
                        className={`fixed inset-0 w-full h-full duration-300 opacity-40 ${show ? "bg-black" : ""}`}
                        onClick={() => setShow(false)}
                    ></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-lg p-4 mx-auto corpri rounded-md shadow-lg">
                            {children}
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}
export default FloatBoxModel
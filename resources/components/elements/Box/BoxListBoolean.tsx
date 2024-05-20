
export interface BoxListBooleanProps {
    icon: string;
    iconName?: string;
    title: string;
    value: boolean | null | undefined;
}
export const BoxListBoolean: React.FC<BoxListBooleanProps> = ({ icon, iconName, title, value }) => {
    return <div className="m-0.5 p-0.5 duration-300 rounded bg-light-tertiary dark:bg-dark-tertiary items-center justify-center">
        {value !== undefined && value !== null ? (
            <>
                <div className="flex p-0.5">
                    <i className={`${icon} duration-300 ${iconName ? iconName : "text-light-primary dark:text-dark-primary"}`} style={{ fontSize: "20px" }} />
                    <span className="ml-2 duration-300 text-light-primary dark:text-dark-primary">{title} - <span className={value ? "text-green-500" : "text-red-500"}>{value ? "Habilitado" : "Desabilitado"}</span></span>
                </div>
            </>
        ) : (
            <>
                <i className={`bx bxs-layout animate-pulse text-light-tertiary duration-600 dark:text-dark-tertiary`} style={{ fontSize: "20px" }} />
                <span className="ml-2 pointer-events-none animate-pulse select-none font-bold rounded-md text-transparent duration-200 bg-light-secondary text-none dark:bg-dark-secondary">
                    _____________________
                </span>
                <span className="ml-3 pointer-events-none animate-pulse select-none font-bold rounded-md text-transparent duration-600 bg-light-secondary text-none dark:bg-dark-secondary">
                    ______________
                </span>
            </>
        )}
    </div>
};

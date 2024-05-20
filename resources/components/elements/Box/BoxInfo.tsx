import React from "react";

export interface BoxInfoProps {
    key?:string | number;
    icon?: React.HTMLAttributes<HTMLElement>["className"] ;
    iconName?: React.HTMLAttributes<HTMLElement>["className"] ;
    title: string;
    value: string | number | boolean | null | undefined;
}

export const BoxInfo: React.FC<BoxInfoProps> = ({ icon, iconName, title, value, key }) => {
    let selected = undefined
    if (typeof value === "boolean") {
        selected = <span className={value ? "text-green-800 dark:text-green-500" : "text-red-800 dark:text-red-500"}>{value ? "Habilitado" : "Desabilitado"}</span>;
    } else if (typeof value === "string") {
        selected = <span className="text-light-secondary dark:text-dark-secondary">{value}</span>;
    } else if (typeof value === "number") {
        selected = <span className="text-blue-800 dark:text-blue-600">{value}</span>;
    }

    return <div className="m-0.5 p-0.5 duration-300 rounded bg-light-tertiary dark:bg-dark-tertiary items-center justify-center" key={key}>
        <div className="flex p-0.5">
            {selected ? (
                <>
                    {icon && <i className={`${icon} duration-300 ${iconName ? iconName : "text-light-primary dark:text-dark-primary"}`} style={{ fontSize: "20px" }} />}
                    <span className="ml-2 duration-300 text-light-primary dark:text-dark-primary">{title}{" - "}
                        {selected}
                    </span>
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
    </div>
};

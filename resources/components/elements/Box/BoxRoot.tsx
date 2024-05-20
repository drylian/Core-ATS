import React from 'react';
import tw from 'twin.macro';

export interface BoxRootProps {
    children: React.ReactNode;
    title?: string;
    desc?: string;
    color?: "red" | "blue" | "green" | "yellow"
    icon?: string
}
function ColorSet(color: "red" | "blue" | "green" | "yellow" | undefined) {
    switch (color) {
        case "red":
            return tw`border-red-500`;
        case "blue":
            return tw`border-blue-500`;
        case "green":
            return tw`border-green-500`;
        case "yellow":
            return tw`border-yellow-500`;
        default:
            return tw`border-blue-500`;
    }
}
export const BoxRoot: React.FC<BoxRootProps> = ({ children, title, color, icon, desc }) => {
    return <div className="border-t-2 rounded-t" css={ColorSet(color)}>
        <div className='header bg-light-primary dark:bg-dark-primary duration-300 text-light-primary dark:text-dark-primary flex items-center rounded-t-md p-1'>
            <div className="flex items-center">
                {icon && <i className={`${icon} mt-1 duration-300 text-light-primary dark:text-dark-primary`} style={{ fontSize: "20px", marginTop: "-3px" }} />}
                <p className="ml-2 font-bold text-lg text-light-primary duration-300 dark:text-dark-primary">{title}</p>
                {desc && <span className='ml-2 text-sm text-light-secondary duration-300 dark:text-dark-secondary'><p className=''></p>{" " + desc}</span>}
            </div>
        </div>
        <div className={`overflow-auto border-b-2 border-light-tertiary shadow-md dark:border-dark-tertiary rounded-b-md bg-light-secondary dark:bg-dark-secondary duration-300 p-0.5`}>{children}</div>
    </div>;
};
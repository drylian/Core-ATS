import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge'

export interface NotificationMessageProps {
    title?: string;
    titleClass?:string;
    className?: string;
    message?: string;
    children?: ReactNode;
    counter?:number
}

export const NotificationMessage: React.FC<NotificationMessageProps> = ({ counter, title, message, children, titleClass, className }) => {
    return title ?
        <>
            <div className='flex-1 gap-2'>
                <span className={twMerge('font-bold font-sans', titleClass)}>
                    {title}{' '}{counter && counter !== 1 ? `x${counter}`: ""}
                </span>
                {message ?
                    <div className={twMerge('text-light-primary text-sm dark:text-dark-primary font-sans', className)} >
                        <p>{message}</p>
                    </div> :
                    <div className={twMerge('text-light-primary dark:text-dark-primary', className)} >
                        {children}{' '}{counter && counter !== 1 ? `x${counter}`: ""}
                    </div>}
            </div>
        </>
        :
        <>
            {message ?
                <div className={twMerge('text-light-primary dark:text-dark-primary font-sans', className)} >
                    <span className='font-sm'>{message}</span>
                </div> :
                <div className={twMerge('text-light-primary dark:text-dark-primary', className)} >
                    {children}
                </div>}
        </>;
};

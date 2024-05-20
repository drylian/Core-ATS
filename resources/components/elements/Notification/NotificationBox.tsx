import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge'

export interface NotificationBoxProps {
    className?: string;
    show?: boolean,
    children: ReactNode;
}

export const NotificationBox: React.FC<NotificationBoxProps> = ({ children, show = true, className }) => {
    return (
        <div className={twMerge('overflow-hidden m-2 rounded-md bg-light-primary dark:bg-dark-primary duration-300', className, show ? "" : "scale-0")}>
            {children}
        </div>
    );
};


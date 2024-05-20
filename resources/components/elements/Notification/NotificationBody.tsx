import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge'

export interface NotificationBodyProps {
    className?: string;
    children: ReactNode;
}

export const NotificationBody: React.FC<NotificationBodyProps> = ({ children, className }) => {
    return (
        <div className={twMerge('flex p-1 items-center gap-1', className)}>
            {children}
        </div>
    );
};


import React from 'react';
import { twMerge } from 'tailwind-merge'

export interface NotificationIconProps {
    icon: string;
    className?: string;
    size?: number;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({ icon, size = 20, className }) => {
    return (
        <i className={twMerge(' text-black border-2 rounded-md border-gray-500 p-2', icon, className)} style={{ fontSize: `${size}px` }} />
    );
};
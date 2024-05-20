import { NotificationBody, NotificationBodyProps } from './NotificationBody';
import { NotificationBox, NotificationBoxProps } from './NotificationBox';
import { NotificationIcon, NotificationIconProps } from './NotificationIcon';
import { NotificationMessage, NotificationMessageProps } from './NotificationMessage';
import { NotificationProgress, NotificationProgressProps } from './NotificationProgress';

interface Navigation {
    context: React.ComponentType<NotificationBoxProps>;
    body: React.ComponentType<NotificationBodyProps>;
    icon: React.ComponentType<NotificationIconProps>;
    message: React.ComponentType<NotificationMessageProps>;
    progress: React.ComponentType<NotificationProgressProps>;
}

const Navigation: Navigation = {
    context: NotificationBox,
    body: NotificationBody,
    icon: NotificationIcon,
    message: NotificationMessage,
    progress: NotificationProgress
};

export default Navigation;

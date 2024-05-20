import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Actions, State, useStoreActions, useStoreState } from "easy-peasy";
import { ApplicationStore } from "../states";
import Notification from './elements/Notification';
import { FlashMessage } from '../states/flashes';
import _ from 'lodash';

export type MessageType = "success" | "info" | "warning" | "error";
const Icon = (type?: MessageType): string => {
    switch (type) {
        case "error":
            return "bx bxs-error bg-red-500";
        case "info":
            return "bx bx-info-circle bg-blue-400";
        case "success":
            return "bx bxs-check-circle bg-green-400";
        case "warning":
            return "bx bxs-info-circle bg-yellow-400";
        default:
            return "bx bxs-error bg-red-500";
    }
};

const NotificationController: React.FC = () => {
    const flashes = useStoreState((state: State<ApplicationStore>) => state.flashes.items);
    const [currentFlash, setCurrentFlash] = useState<FlashMessage[]>([]);

    const [counterMap, setCounterMap] = useState<{ [key: string]: number }>({});

    const clear = useStoreActions((actions: Actions<ApplicationStore>) => actions.flashes.clearFlashes);
    let timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (flashes.length > 0) {
            console.log(flashes)
            // Update currentFlash, counting duplicates and limiting to 3
            const uniqueFlashes = _.uniqBy(flashes, 'message').slice(0, 3);

            const updatedCounterMap: { [key: string]: number } = {};

            uniqueFlashes.forEach((flash) => {
                // Check if the flash message already exists in the counterMap
                if (counterMap[flash.message]) {
                    // If it exists, increment its count
                    updatedCounterMap[flash.message] = counterMap[flash.message] + 1;
                } else {
                    // If it doesn't exist, set the count to 1
                    updatedCounterMap[flash.message] = 1;
                }
            });
            clear();
            setCounterMap(updatedCounterMap);
            setCurrentFlash(uniqueFlashes);
        }
    }, [flashes]);

    useEffect(() => {
        if (currentFlash.length > 0) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                setCurrentFlash([]);
            }, 6000);
        }
    }, [currentFlash]);
    return (
        <>
            {currentFlash.map((flash, index) => (
                <div className='mb-1  ' key={flash.message}>
                    <Fragment>
                        {index > 0 && <div className='mt-2' key={`divider-${flash.message.replace(/ /g, "-")}`} />}
                        <div className={`duraction-300`} role={"alert"}>
                            <Notification.context>
                                <Notification.body>
                                    <Notification.icon icon={Icon(flash.type)} />
                                    <Notification.message
                                        title={flash.title}
                                    >
                                        {flash.message} {` x${counterMap[flash.message]}`}
                                    </Notification.message>
                                </Notification.body>
                                <Notification.progress timer={6000} refresh={counterMap[flash.message]} />
                            </Notification.context>
                        </div>
                    </Fragment>
                </div>
            ))}
        </>
    );
};

export default NotificationController;

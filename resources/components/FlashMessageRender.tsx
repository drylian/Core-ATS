import React, { useEffect } from "react";
import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { Fragment } from "react";
import MessageAlert from "./MessageAlert";
import { State } from "easy-peasy";
import { ApplicationStore } from "../states";

const FlashMessageRender: React.FC = () => {
	// Retrieve flash messages from the store
	const flashes = useStoreState((state: State<ApplicationStore>) => state.flashes.items);
	const flash = [...new Set(flashes)];

	const clear = useStoreActions((actions: Actions<ApplicationStore>) => actions.flashes.clearFlashes);

	useEffect(() => {
		// Check if there are any flash messages
		if (flash.length > 0) {
			// Copy the flash messages and clear them from the store
			// console.log(flashes);
			clear();
		}
	}, []);

	// Render flash messages if there are any
	return flash.length
		? flash.map((flash, index) => (
			<div className='mb-4' key={index}>
				<Fragment>
					{index > 0 && <div className='mt-2' key={index} />}
					<MessageAlert type={flash.type} title={flash.title}>
						{flash.message}
					</MessageAlert>
				</Fragment>
			</div>
		))
		: null;
};

export default FlashMessageRender;

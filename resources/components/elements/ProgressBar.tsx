import { Transition } from "@headlessui/react";
import { Actions, State, useStoreActions, useStoreState } from "easy-peasy";
import { Fragment, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

import { randomInt } from "../../helpers";
import { ApplicationStore } from "../../states";
import tw from "twin.macro";

type Timer = ReturnType<typeof setTimeout>;
const RGB = keyframes`
0% {
    border-color: rgb(255, 0, 0);
  }
  50% {
    border-color: rgb(0, 255, 0);
  }
  80% {
    border-color: rgb(0, 0, 255);
  }
  100% {
    border-color: rgb(200, 0, 78);
  }
`;
const AnimatedDiv = styled.div<{ progress: number | undefined }>`
    ${tw`h-full shadow-[0_-2px_10px_2px] transition-all duration-[250ms] ease-in-out border-t-4`}
    /* Aplicando a animação */
  animation: ${RGB} 3000ms infinite; /* Ajuste a duração conforme necessário */
`;
function ProgressBar() {
	const interval = useRef<Timer>();
	const timeout = useRef<Timer>();
	const [visible, setVisible] = useState(false);

	const continuous = useStoreState((state: State<ApplicationStore>) => state.progress.continuous);
	const progress = useStoreState((state: State<ApplicationStore>) => state.progress.progress);
	const setProgress = useStoreActions((actions: Actions<ApplicationStore>) => actions.progress.setProgress);

	useEffect(() => {
		return () => {
			timeout.current && clearTimeout(timeout.current);
			interval.current && clearInterval(interval.current);
		};
	}, []);

	useEffect(() => {
		setVisible((progress || 0) > 0);

		if (progress === 100) {
			timeout.current = setTimeout(() => setProgress(undefined), 500);
		}
	}, [progress]);

	useEffect(() => {
		if (!continuous) {
			interval.current && clearInterval(interval.current);
			return;
		}

		if (!progress || progress === 0) {
			setProgress(randomInt(20, 30));
		}
	}, [continuous]);

	useEffect(() => {
		if (continuous) {
			interval.current && clearInterval(interval.current);
			if ((progress || 0) >= 90) {
				setProgress(90);
			} else {
				interval.current = setTimeout(() => setProgress((progress || 0) + randomInt(1, 5)), 500);
			}
		}
	}, [progress, continuous]);
	return (
		<div className='fixed h-[2px] w-full'>
			<Transition
				as={Fragment}
				show={visible}
				enter='transition-opacity duration-150'
				enterFrom='opacity-0'
				enterTo='opacity-100'
				leave='transition-opacity duration-150'
				leaveFrom='opacity-100'
				leaveTo='opacity-0'
				appear
				unmount
			>
				<AnimatedDiv progress={progress} style={{ width: progress === undefined ? "100%" : `${progress}%` }} />
			</Transition>
		</div>
	);
}

export default ProgressBar;

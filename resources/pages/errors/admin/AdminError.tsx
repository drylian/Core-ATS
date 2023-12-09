import type { ReactNode } from "react";
import { Component } from "react";
import ContentBox from "../../../components/elements/ContentBox";
import BoxModel from "../../../components/elements/models/BoxModel";
import Trans, { trans } from "../../../components/elements/Trans";

interface ErrorBoundaryState {
    hasError: boolean;
}
interface Props {
    children?: ReactNode;
}

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
	override state: ErrorBoundaryState = {
		hasError: false,
	};

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	override componentDidCatch(error: Error) {
		console.error(error);
	}
	static goBack() {
		window.history.back();
	}

	render() {
		if (this.state.hasError) {
			return (
				<ContentBox title={"Admin - " + trans("react:messages").t("ErrorBoundaryReactTitle")}>
					<BoxModel
						title={trans("react:messages").t("ErrorBoundaryReactTitle")}
						desc={trans("react:messages").t("ErrorBoundaryReact")}
					>
						<div className='container '>
							<div className='flex flex-col sm:flex-row justify-center items-center'>
								<i
									className={"bx bx-error-alt"}
									style={{ marginLeft: "-1px", color: "red", fontSize: "200px" }}
								/>
								<div className='flex-1 justid shadow-md'>
									<h1 className='text-2xl font-bold textpri mb-4'>
										<Trans ns={"react:messages"} i18nKey={"ErrorBoundaryReactTitle"} />
									</h1>
									<p className='mb-6 textsec'>
										<Trans ns={"react:messages"} i18nKey={"ErrorBoundaryReact"} />
									</p>
								</div>
							</div>
						</div>
					</BoxModel>
				</ContentBox>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

import { StoreProvider } from "easy-peasy";
import { ThemeProvider } from "styled-components";
import Theme from "../theme";
import { WebsiteConf } from "../states/website";
import { store } from "../states";
import ErrorBoundary from "../pages/errors/ErrorBoundary";
import GlobalRouter from "../routes/Global";
import GlobalStyles from "../assets/StylesSet";
import React from "react";
import Loading from "./elements/Loading";
import { UserData } from "../states/user";
import i18n from "../i18n";

interface ExtWindow extends Window {
	WebsiteConf?: WebsiteConf;
	UserConf?: UserData;
}
export default function App() {
	const { WebsiteConf, UserConf } = window as ExtWindow;
	if (!store.getState().website.data) {
		store.getActions().website.setWebsite(WebsiteConf!);
	}
	if (UserConf && !store.getState().user.data) {
		i18n.changeLanguage(UserConf.lang || "pt-BR");

		store.getActions().user.setUserData(UserConf!);
	}
	const theme = Theme(store.getState()?.website?.data);
	return (
		<>
			<StoreProvider store={store}>
				<ThemeProvider theme={theme}>
					<GlobalStyles />
					<React.Suspense fallback={<Loading />}>
						<ErrorBoundary>
							<div className='mx-auto w-auto'>
								<GlobalRouter />
							</div>
						</ErrorBoundary>
					</React.Suspense>
				</ThemeProvider>
			</StoreProvider>
		</>
	);
}

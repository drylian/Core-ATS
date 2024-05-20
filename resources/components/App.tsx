import { StoreProvider } from "easy-peasy";
import { ThemeProvider } from "styled-components";
import Theme from "../theme";
import { WebsiteConf } from "../states/website";
import { store } from "../states";
import GlobalRouter from "../routes/Global";
import GlobalStyles from "../assets/StylesSet";
import React from "react";
import Loading from "./elements/Loading";
import { UserData } from "../states/user";
import i18n from "../i18n";
import ErrorBoundary from "../pages/errors/ErrorBoundary";
import SocketConnect from "../Socket";

interface ExtWindow extends Window {
	WebsiteConf?: WebsiteConf;
	UserConf?: UserData;
}

function App() {	
	const { WebsiteConf, UserConf } = window as ExtWindow;
	if (!store.getState().website.data) {
		store.getActions().website.setWebsite(WebsiteConf!);
	}
	if (UserConf && !store.getState().user.data) {
		i18n.changeLanguage(UserConf.lang || "pt-BR");

		store.getActions().user.setUserData(UserConf!);
	}
	if(!store.getState().socket.socket) {
		store.getState().socket.socket = SocketConnect(store.getState().website.data?.socket)
	}
	const theme = Theme(store.getState()?.website?.data);
	return (
		<>
			<StoreProvider store={store}>
				<ThemeProvider theme={theme}>
					<GlobalStyles />
					<React.Suspense fallback={<Loading />}>
						<div className='mx-auto w-auto'>
							<ErrorBoundary>
								<GlobalRouter />
							</ErrorBoundary>
						</div>
					</React.Suspense>
				</ThemeProvider>
			</StoreProvider>
		</>
	);
}

export default App;

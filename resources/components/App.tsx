import { StoreProvider } from 'easy-peasy';
import { WebsiteConf } from "../states/website";
import { store } from "../states";
import ErrorBoundary from "../pages/errors/ErrorBoundary";
import GlobalRouter from "../routes/Global";
interface ExtWindow extends Window {
	WebsiteConf?: WebsiteConf;

}
export default function App() {
	const { WebsiteConf } = window as ExtWindow;
	if (!store.getState().website.data) {
		store.getActions().website.setWebsite(WebsiteConf!);
	}
	return (
		<>
			{/**
		  * Configuração de store do easy-peasy
		  */}
			<StoreProvider store={store}>
				<ErrorBoundary>
					<GlobalRouter />
				</ErrorBoundary>
			</StoreProvider>

		</>
	);
}


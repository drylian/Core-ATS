import type { TransProps } from "react-i18next";
import { Trans as Test, useTranslation } from "react-i18next";
/* eslint-disable  react-refresh/only-export-components */
type Props = Omit<TransProps<string, string>, "t">;
const trans = useTranslation;
export { trans };

function Trans({ ns, children, ...props }: Props) {
	const { t } = useTranslation(ns);
	return (
		<Test t={t} {...props}>
			{children}
		</Test>
	);
}
export default Trans;

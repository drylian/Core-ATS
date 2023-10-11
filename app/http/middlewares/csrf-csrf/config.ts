import * as csrfs from "csrf-csrf";

const CsrfConfig = async (csrf:any) => {
	return csrfs.doubleCsrf({
		getSecret: (req:any) => req.secret,
		secret: csrf.secret,
		cookieName: "X-CSRF-TOKEN",
		cookieOptions: { sameSite: csrf.samesite, secure: csrf.secure, signed: csrf.signed },
		size: csrf.size,
		ignoredMethods: ["HEAD", "OPTIONS"],
	});
};

export default CsrfConfig;
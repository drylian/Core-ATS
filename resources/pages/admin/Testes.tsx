import React, { useState } from "react";
import CaptchaBox from "../../components/elements/models/CaptchaBox";

const Test: React.FC = () => {
	const [code, SetCode] = useState<string | null>(null)
	return (
		<>
			<div className="flex-1">
			<CaptchaBox code={SetCode}/>
			{code}
			</div>
		</>
	);
};

export default Test;

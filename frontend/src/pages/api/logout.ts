import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

const logout = (req: NextApiRequest, res: NextApiResponse) => {
	destroyCookie({ res }, "nodebooker.token");
	destroyCookie({ res }, "nodebooker.token");

	res.writeHead(302, { Location: "/" });
	res.end();
};

export default logout;

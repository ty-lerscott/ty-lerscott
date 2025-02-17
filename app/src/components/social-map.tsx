import dynamic from "next/dynamic";

const SOCIALS = {
	bmac: dynamic(() =>
		import("react-icons/bi").then((module) => module.BiCoffeeTogo),
	),
	github: dynamic(() =>
		import("react-icons/ai").then((module) => module.AiFillGithub),
	),
	linkedin: dynamic(() =>
		import("react-icons/ai").then((module) => module.AiFillLinkedin),
	),
	instagram: dynamic(() =>
		import("react-icons/ai").then((module) => module.AiFillInstagram),
	),
	bluesky: dynamic(() =>
		import("react-icons/fa6").then((module) => module.FaBluesky),
	),
};

export default SOCIALS;

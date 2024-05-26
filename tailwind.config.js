/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./*.{html,js}", "./src/**/*/*.{html,js}"],
	theme: {
		extend: {
			fontFamily: {
				merriweather: ["Merriweather", "serif"],
				amiri: ["Amiri Quran", "serif"],
			},
			colors: {
				"white-warm": "#FBF6EA",
				"antique-blue": "#40017F",
				"antique-blue-0.64": "rgb(200,146,255, 0.64)",
				"antique-pink": "#e31277"
			},
		},
	},
	plugins: [],
};

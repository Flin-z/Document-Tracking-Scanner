/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#529d7c",
                primaryLight: "#D3EEE2",
                primaryDark: "#214e34",
                light: "#EFEFEF",
            },
        },
    },
    plugins: [],
};
module.exports = {
  twin: {
    preset: 'styled-components',
  },
  tailwind: {
    plugins: ["macros"],
    config: "./tailwind.config.cjs",
    format: "auto"
  },
};
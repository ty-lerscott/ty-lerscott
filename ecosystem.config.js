module.exports = {
  apps: [
    {
      name: "ty.lerscott.com",
      script: "npm start",
      watch: [".next", "src"],
      // Delay between restart
      watch_delay: 60000,
    },
  ],
};

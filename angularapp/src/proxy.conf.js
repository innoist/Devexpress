const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/employees",
    ],
    target: "https://localhost:7292",
    secure: false
  }
]

module.exports = PROXY_CONFIG;

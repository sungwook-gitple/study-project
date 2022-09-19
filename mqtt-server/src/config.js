require('dotenv').config()

exports.config = {
  mqtt: {
    HTTP_PORT: process.env.HTTP_PORT || 3001,
    WS_PORT: process.env.WS_PORT || 8888,
  }
}

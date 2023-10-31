export const keyloader = {
  mongo_connection: process.env.MONGODB_URI,
  port_number: process.env.PORT || 8000,
  environment: process.env.ENV || 'development'
}
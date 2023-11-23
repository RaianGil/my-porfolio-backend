export const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Porfolio?authSource=admin"
export const port = process.env.PORT || 3001
export const minBuy = 10 || process.env.MIN_BUY
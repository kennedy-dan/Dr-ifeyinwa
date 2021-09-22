module.exports = {
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/mom",
    DB_URI: "mongodb+srv://mom:mommy@cluster0.8gbdb.mongodb.net/ify?retryWrites=true&w=majority",
    reactStrictMode: true,

    CLOUDINARY_CLOUD_NAME: "drxdger3x",
    CLOUDINARY_API_KEY: "597494831934642",
    CLOUDINARY_API_SECRET: "gIr8Q_9aGE2pETYZrluxM_EMca0",

    NEXTAUTH_URL : "https://ify.vercel.app"
  },

  images: {
    domains: ["res.cloudinary.com"],
  },
};

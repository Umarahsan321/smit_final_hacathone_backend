// Database Configuration
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      console.log('MongoDB Connected Successfully');
    } catch (error) {
      console.error('MongoDB Connection Error:', error);
      process.exit(1);
    }
  };
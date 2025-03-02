import mongoose, { connect } from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://detonatorbackup1722:DNhma6uUYNIimDr6@cluster0.9dvr0.mongodb.net/food-del');
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }
}


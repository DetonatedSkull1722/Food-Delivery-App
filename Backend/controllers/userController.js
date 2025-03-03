import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import validator from "validator"


//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });

        //checking if already exists
        if (exists) {
            return res.json({ message: "User already exists", success: false });
        }

        //validating email format &strong password
        if (!validator.isEmail(email)) {
            return res.json({ message: "Invalid email", success: false });
        }

        //checking if password is 8 characters or more
        if (password.length < 8) {
            return res.json({ message: "Password must be atleast 8 characters long", success: false });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ message: "User registered successfully", success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error", success: false });
    }

}

//login user 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({message: "User not found", success: false});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.json({message: "Invalid credentials", success: false});
        }

        const token = createToken(user._id);
        res.json({message: "Logged in successfully", success: true, token});

    } catch (error) {
        res.json({message: "Internal server error", success: false});
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

export { loginUser, registerUser }

const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
    // Destructuring the data 
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        };

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exist.."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName, lastName, email, password: hashedPassword
        });

        const token = jwt.sign({
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        }, process.env.JWT_SECRET ,{ expiresIn: "1d" })

        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User Registered Successfully..",
            token, 
            newUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal Server error ${error}`
        });
    }
}

const login = async (req, res) => {
    const {email, password} = req.body; 
    try{
        if(!email || !password)
            return res.status(400).json({
        sucess: false,
    message: "All fields are required"
});
const user = await User.findOne({'email': email});
if(!user){
    return res.status(400).json({
        sucess: false,
        message: "User doesnot exit"
    });
}

const checkPassword = await bcrypt.compare(password, user.password);
if(!checkPassword){
    return res.status(400).json({
        sucess: false,
        message: "Invalid Password"
    });
}
const token = jwt.sign(
    {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

return res.status(200).json({
    sucess: true, 
    message: "Login Successfully",
    token,
    user
});
    
    } catch (error){
        return res.status(500).json({
    sucess: true, 
    message: `Error while login is ${error}`,
        });

    }

}

const getProfile = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findById(id);
        if (!user){
            return res.status(400).json({
                success:false,
                message: "User doesnot exit"
            });
        }
         return res.status(200).json({
                success: true,
                message: "Profile fetch successfully",
                user
            });

    } catch(error) {
         return res.status(500).json({
                success:false,
                message: `Error while getting profile is ${error}`
            });

    }
}

module.exports = {
    register,
    login, 
    getProfile
}

//MERN

// M = mongoDB (NO SQL Databas)
const User = require("../models/users.model.js")
const jwt =require("jsonwebtoken")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ email });

    if (!user) return res.status(404).send({ message: "email/password incorrect" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).send({ message: "email/password incorrect" });

    const token = jwt.sign(
        {   
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        },
        process.env.JWT_SECRET
    );

    const userInfo = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        likes: user.likes,

    };

    res.send({
        token,
        user: userInfo
    });
}

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            ...req.body,
            password: hashedPassword,
        });
    
        user.save();
        
        res.status(201).json({ 
            message: "User registered successfully", 
            user: user
        });
        } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
        }
}

const verify = (_, res)=>{
    res.send("Verified")
}

module.exports = {login, register, verify}
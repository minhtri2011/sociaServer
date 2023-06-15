import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import argon2 from 'argon2'

// register
export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    // picturePath,
    friends,
    location,
    occupation,
  } = req.body;
  try {

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // find duplicates email
    const findUser = await User.findOne({ email: email });
    if (findUser)
      return res
        .status(400)
        .json({ message: "Email have already been registered" });

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    // const isMatch = await argon2.verify(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

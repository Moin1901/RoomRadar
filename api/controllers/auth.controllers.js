import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import nodemailer from "nodemailer";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mdmoinuddin1901@gmail.com",
        pass: "sppf fxvi nqtg ksal",
      },
    });
    const info = await transporter.sendMail({
      from: '"Moin 👻" <mdmoinuddin1901@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: `Welcome to Room Radar, ${req.body.username}! 🌟`, // Subject line
      text: `Hello ${req.body.username}!\n\nWelcome to Room Radar. We are thrilled to have you on board. Our team of experienced agents is here to assist you with all your real estate needs. Whether you're looking to buy, sell, or rent a property, we're dedicated to making your experience smooth and enjoyable.\n\nFeel free to explore our website and discover the perfect place for you!\n\nBest regards,\nThe Room Radar Team`,
      html: `<p><b>Hello ${req.body.username}!</b></p>
      <p>Welcome to Room Radar. We are thrilled to have you on board. Our team of experienced agents is here to assist you with all your real estate needs. Whether you're looking to buy, sell, or rent a property, we're dedicated to making your experience smooth and enjoyable.</p>
      <p>Feel free to explore our website and discover the perfect place for you!</p>
      <p><b>Best regards,<br/>The Room Radar Team</b></p>`, // html body
    });
    await newUser.save();
    res.status(201).json("User created succesfuly");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = JWT.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mdmoinuddin1901@gmail.com",
          pass: "sppf fxvi nqtg ksal",
        },
      });
      const info = await transporter.sendMail({
        from: '"Moin 👻" <mdmoinuddin1901@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: `Welcome to Room Radar, ${req.body.name}! 🌟`, // Subject line
        text: `Hello ${req.body.name}!\n\nWelcome to Room Radar. We are thrilled to have you on board. Our team of experienced agents is here to assist you with all your real estate needs. Whether you're looking to buy, sell, or rent a property, we're dedicated to making your experience smooth and enjoyable.\n\nFeel free to explore our website and discover the perfect place for you!\n\nBest regards,\nThe Room Radar Team`,
        html: `<p><b>Hello ${req.body.name}!</b></p>
          <p>Welcome to Room Radar. We are thrilled to have you on board. Our team of experienced agents is here to assist you with all your real estate needs. Whether you're looking to buy, sell, or rent a property, we're dedicated to making your experience smooth and enjoyable.</p>
          <p>Feel free to explore our website and discover the perfect place for you!</p>
          <p><b>Best regards,<br/>The Room Radar Team</b></p>`, // html body
      });
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

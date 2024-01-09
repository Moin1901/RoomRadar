import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    const { username, email, password, avatar } = req.body;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        ...(hashedPassword && { password: hashedPassword }),
        avatar,
      },
      { new: true }
    );

    const { password: excludedPassword, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json("User not found");
    }

    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).json("You are not authorized to view this user's listings");
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

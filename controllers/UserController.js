import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user._doc);
  } catch (error) {
    res.status(500).json({
      message: "Unreachable",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Email or password is incorrect",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(404).json({
        message: "Email or password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "18yhunjokai9uf82",
      {
        expiresIn: "30d",
      }
    );
    res.json({ ...user._doc, token });
  } catch (error) {
    res.status(500).json({
      message: "Login error",
    });
  }
};

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      nickname: req.body.nickname,
      image: req.body.image,
      passwordHash,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "18yhunjokai9uf82",
      {
        expiresIn: "30d",
      }
    );

    res.json({ ...user._doc, token });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

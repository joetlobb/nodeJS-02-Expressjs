import bcrypt from "bcryptjs";
import User from "../models/user.ts";
import type { IRequestHandler } from "../types/requestHandler.ts";

export const getLogin: IRequestHandler = (req, res, next) => {
  // Pull the array out of flash
  const messages = req.flash("error");

  // Extract the first string if it exists, otherwise null
  const message = messages.length > 0 ? messages : null;

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message, // Now this is definitely a string or null
  });
};

export const postLogin: IRequestHandler = (req, res, next) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }
      return bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedin = true;
            req.session.user = user._id.toString();
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSignup: IRequestHandler = (req, res, next) => {
  // Pull the array out of flash
  const messages = req.flash("error");

  // Extract the first string if it exists, otherwise null
  const message = messages.length > 0 ? messages : null;

  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

export const postSignup: IRequestHandler = (req, res, next) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const confirmPassword: string = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userData) => {
      if (userData) {
        req.flash("error", "Email already existed");
        res.redirect("/signup");
        return;
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })

    .catch((err) => {
      console.log(err);
    });
};

export const postLogout: IRequestHandler = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

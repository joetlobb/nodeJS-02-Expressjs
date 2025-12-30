import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendgrid from "@sendgrid/mail";
import User from "../models/user.ts";
import type { IRequestHandler } from "../types/requestHandler.ts";
import { SENDGRID_API } from "../app.ts";
import { validationResult } from "express-validator";

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("postSignup()", errors.array());
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0]?.msg,
    }); // Error code for validation failed
  }
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
          if (!SENDGRID_API) {
            req.flash("error", "Email verification function disabled");
            res.redirect("/signup");
            return;
          }
          sendgrid.setApiKey(SENDGRID_API);
          const message = {
            to: email,
            from: "joetlobb@gmail.com",
            subject: "Signup Successfully!",
            html: "<h1>Sign up successfully!</h1>",
          };
          return sendgrid
            .send(message)
            .then((info) => {
              console.log("Sent", info);
              res.redirect("/login");
            })
            .catch((err) => {
              console.log(err);
            });
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

export const getReset: IRequestHandler = (req, res, next) => {
  const messages = req.flash("error");
  const message = messages.length > 0 ? messages : null;

  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message, // Now this is definitely a string or null
  });
};

export const postReset: IRequestHandler = (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    const email = req.body.email;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        req.flash("error", "No account with that email");
        return req.session.save((err) => {
          res.redirect("/reset");
        });
      }

      user.resetToken = token;
      user.resetTokenExpiration = new Date(Date.now() + 3600000);
      await user.save();
      res.redirect("/login");

      if (SENDGRID_API) {
        sendgrid.setApiKey(SENDGRID_API);
        await sendgrid.send({
          to: email,
          from: "joetlobb@gmail.com",
          subject: "Password Reset",
          html: `<p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to reset.</p>`,
        });
      }
    } catch {
      console.log(err);
      res.redirect("/reset");
    }
  });
};

export const getNewPassword: IRequestHandler = (req, res, next) => {
  const token = req.params.token as string;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "Password reset link is invalid or has expired.");
        return req.session.save(() => {
          res.redirect("/reset"); // Redirect to reset page, not itself
        });
      }
      const messages = req.flash("error");
      const message = messages.length > 0 ? messages : null;

      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        userId: user?._id,
        passwordToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/login");
    });
};

export const postNewPassword: IRequestHandler = (req, res, next) => {
  const userId = req.body.userId;
  const password = req.body.password;
  const token = req.body.passwordToken;
  let resetUser: any;

  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: new Date() },
    _id: userId,
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "No account found");
        res.redirect("/login");
        return;
      }
      resetUser = user;
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          resetUser.password = hashedPassword;
          resetUser.resetToken = null;
          resetUser.resetTokenExpiration = null;
          return resetUser.save();
        })
        .then((result) => {
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

const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = app => {
  app.post("/api/account/register", (req, res, next) => {
    const { body } = req;
    const { username, password } = body;
    let { email } = body;

    if (!username) {
      return res.send({
        success: false,
        message: "Error: Username cannot be blank."
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }

    email = email.toLowerCase();

    // Steps:
    // 1. Verify email doesn't exist already
    // 2. Save

    User.find(
      {
        email: email
      },
      (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        // Save the new user
        const newUser = new User();

        newUser.email = email;
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error"
            });
          }
          return res.send({
            success: true,
            message: "Registered"
          });
        });
      }
    );
  });

  app.post("/api/account/login", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if (!username) {
      return res.send({
        success: false,
        message: "Error: Username cannot be blank."
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }
    email = email.toLowerCase();

    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        }

        const user = users[0];
        if (!user.validPassword(password)) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        }

        // Otherwise correct user
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error"
            });
          }
          return res.send({
            success: true,
            message: "Valid login",
            token: doc._id
          });
        });
      }
    );
  });

  app.get("/api/account/verify", (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = req;
    // ?token=test
    // Verify token is one of a kind and is not Deleted

    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          return res.send({
            success: true,
            message: "Good"
          });
        }
      }
    );
  });

  app.get("api/account/logout", (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeletd: false
      },
      {
        $set: {
          isDeleted: true
        }
      },
      null,
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        return res.send({
          success: true,
          message: "Good"
        });
      }
    );
  });
};

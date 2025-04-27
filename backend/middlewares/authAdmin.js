import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const decode = jwt.verify(atoken, process.env.JWT_SECRET_KEY);

    if (decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Invalid token" });
    }

    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Login Auth server error" });
  }
};

export default authAdmin;

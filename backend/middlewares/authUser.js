import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = decode.id;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "User Login Auth server error" });
  }
};

export default authUser;

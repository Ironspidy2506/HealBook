import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const decode = jwt.verify(dtoken, process.env.JWT_SECRET_KEY);
    req.body.docId = decode.id;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Login Auth server error" });
  }
};

export default authDoctor;

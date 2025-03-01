export const isUser = (req, res, next) => {
  if (req.user._id !== req.params.id && !req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Authentication Error: Unauthorized user" });
  }
  return next();
};

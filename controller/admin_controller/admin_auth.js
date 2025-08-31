//defult admin login
export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ succsuss: false, messagea: "Empty credintials" });
  }
  try {
    if (username === "admin" && password === "1234") {
      return res
        .status(200)
        .json({ succsuss: true, messagea: "succsussfuly login" });
    } else {
      return res
        .status(400)
        .json({ succsuss: false, messagea: "invalid credintials" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ succsuss: false, messagea: "Internal server error" });
  }
};

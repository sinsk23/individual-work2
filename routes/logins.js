const express = require("express");
const router = express.Router();

const {User} = require("../models");
// const authMiddleware = require("../middlewares/auth-middleware");

const jwt = require("jsonwebtoken");

// //test
// router.get("/logins",(req,res)=>{
//   res.send("logins page");
// });

//로그인 일치 test 후 성공 하면 토큰 발급
router.post("/logins", async (req, res) => {
try{
  const { nickname, password } = req.body;

  const user = await User.findOne({ where : {nickname,password}});

  if (!user) {
    res.status(400).send({
      errorMessage: "ID or PW 가 틀렸습니다.",
    });
    return;
  }
  const token=jwt.sign({ userId: user.userId }, "codud4fkd@");
  res.send({
    token,
  });
  return;

}catch (err) {
  console.log(err);
res.status(400).send({
  errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
});
}
});

//로그인 데이터 읽기
router.get("/logins", async (req, res) => {
  const { userId } = res.locals;
  res.send({
    userId,
  });
});





module.exports = router;
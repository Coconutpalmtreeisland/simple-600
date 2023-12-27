// 필요한 모듈 가져오기
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Express 애플리케이션 생성
const app = express();
// 배포할 때
const port = process.env.PORT || 5050;
const config = require("./server/config/key.js");

// 정적 파일 제공 및 JSON 및 URL 인코딩 처리를 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, "./client/build")));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express router
app.use("/api/post", require("./server/router/post.js"));
app.use("/api/user", require("./server/router/user.js"));
app.use("/api/reple", require("./server/router/reple.js"));

// 서버 시작 및 MongoDB 연결
app.listen(port, () => {
    mongoose
        .connect(config.mongoURI)
        .then(() => {
            console.log("listening  --> " + port);
            console.log("mongoose --> connecting");
        })
        .catch((err) => {
            console.log(err)
        })
})

// 루트 경로에 대한 요청 처리
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})
// 모든 다른 경로에 대한 요청도 마찬가지로 index.html을 제공
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
const mongoose = require("mongoose");

const countSchema = new mongoose.Schema(
    {
        name: String,
        postNum: Number,
        userNum: Number,
    },
    { collection: "counter" }   // 필드 이름 설정
);

const Counter = mongoose.model("Counter", countSchema);

module.exports = { Counter };
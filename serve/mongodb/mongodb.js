const mongoose = require("mongoose");
const mongodbURI = require("../secret/mongodbURI").mongodbURI;

mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Mongodb 服务器开启成功`);
})
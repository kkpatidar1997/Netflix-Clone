require('dotenv').config()

const username = process.env.USER_NAME;
const password = process.env.PASS_WORD;
module.exports = {
    mongoDBUrl: `mongodb+srv://ksem1997:ksem1997@cluster0.4t3krlt.mongodb.net/yourDatabaseName?retryWrites=true&w=majority`

}



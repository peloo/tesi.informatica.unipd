const AWS = require("aws-sdk");
const prepareQuery = require("../utils/prepareQuery");

var instance;
class dataBaseUtils {
    constructor() {
        AWS.config.update({
            region: "eu-west-1",
            endpoint: "https://dynamodb.eu-west-1.amazonaws.com"
        });
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    static getInstance() {
        if (instance === undefined) {
            instance = new dataBaseUtils();
        }
        return instance;
    }

    runQuery(params) {
        return new Promise((resolve, reject) => {
            this.docClient.query(params, function (err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data);
            })
        })
    }

    runScan(params) { }
    runPut(params) { }
    static async chekEmployee(nome_dipendete) { }
}
module.exports = dataBaseUtils;
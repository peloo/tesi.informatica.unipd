const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/xxxxxxxxxxxxx/xxxxxxxxxxxxx';
const TOKEN = "xoxb-117197354337-xxxxxxxxxxxxx-12OEClhwYXKKaj5ulGEo3vCh";
const request = require('request');
const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

class slacknotifyUtils {
    static sendNotify(channel, message) { }
    static async sendDirectlyNotify(member,MESSAGE){ }
    static async addTag(toTag) { }

    static async listMembersApl(intent) {
        let data = await membersList();
        let json_members = JSON.parse(data);
        let members_list = json_members.members.filter(member => !member.is_bot && member.real_name != undefined && member.profile.email != undefined);

        if (members_list) {
            console.log("[slacknotifyUtils.membersList]: membersList return the list of employee");
            /* Ordinamento alfabetico dell'array */
            members_list.sort(function (a, b) {
                if (a.real_name < b.real_name)
                    return -1;
                if (a.real_name > b.real_name)
                    return 1;
                if (a.real_name === undefined)
                    return 1;
                if (b.real_name === undefined)
                    return -1;
                return 0;
            })

            /* Creazione di un array di oggetti per l'APL */
            const array_employee_apl_obj = members_list.map(member => {
                if (member.real_name != undefined) {
                    return {
                        "type": "TouchWrapper",
                        "paddingTop": "40",
                        "item": {
                            "type": "Text",
                            "text": "- " + member.real_name.toUpperCase(),
                            "fontSize": 25,
                            "color": "black"
                        },
                        "onPress": [{
                            "type": "SendEvent",
                            "arguments": [
                                member.real_name,
                                "<@" + member.id + ">",
                                intent,
                                member.profile.email
                            ]
                        }]
                    }
                }
            })
            array_employee_apl_obj[array_employee_apl_obj.length] = {
                "type": "TouchWrapper",
                "paddingTop": "40",
                "item": {
                    "type": "Text",
                    "text": "- " + "Persona non trovata".toUpperCase(),
                    "fontSize": 25,
                    "color": "black"
                },
                "onPress": [{
                    "type": "SendEvent",
                    "arguments": [
                        "not found",
                        "matteo.pellanda@crispybacon.it",
                        intent,
                        "matteo.pellanda@crispybacon.it"
                    ]
                }]
            }
            /* Concatenzazione del APL apl-touchwrapper-list-members con l'array creato sopra */
            let apl_touchwrapper_list = require("../apl-template/apl-touchwrapper-list-members.json");
            if (!apl_touchwrapper_list) {
                console.log("[slacknotifyUtils.listMembersApl]: impossible to require, missing file apl-touchwrapper-list-members.json");
                return require('../apl-template/apl-touchwrapper-error');
            } else
                apl_touchwrapper_list.mainTemplate.items[1].items[2].items[0].items = array_employee_apl_obj;

            return apl_touchwrapper_list;
        } else {
            console.log("[slacknotifyUtils.listMembersApl]: membersList of list employee is undefined");
            return require('../apl-template/apl-touchwrapper-error');
        }
    }
}
async function getIdMember(toTag) { }
function membersList() { }
module.exports = slacknotifyUtils;
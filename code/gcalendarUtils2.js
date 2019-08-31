const {google} = require('googleapis');
const googleCredentialToken = require('../googleAuthTokenCredential.json');
const googleCredentials = require('../credentials.json');

class gcalendarUtils{
    static async listEvents(idCalendar) { } 

    /* Pre: checkEvent riceve in ingresso un elenco di eventi, 
            il nome della visitatore e l'orario del evento. */
    static checkEvent(events, email_dipendente, nome_visitatore, orarioEvento){ 
        if (events.length){   
            const array_nome_vis = nome_visitatore.split(' ');

            /* Scorro l'oggeto contente gli eventi come se fosse un map. 
                * Altrimenti l'oggetto event viene considerato vuoto. */
            const out_event = events.find(event => {
                let bools_check_nome_cognome = [false, false];      
                let bool_check_dip = false;                  
                let array_event_summary = event.summary.split(' ');
                
                /* Scorro l'arry dal i=0 a i<n per verificare la presenza 
                    * del nome e cognome del visitatore. */
                for(let i=0; i<array_event_summary.length && (bools_check_nome_cognome[0] === false || bools_check_nome_cognome[1] === false); ++i){
                    if(array_event_summary[i].toLowerCase() === array_nome_vis[0].toLowerCase())
                        bools_check_nome_cognome[0] = true;
                    
                    if(array_event_summary[i].toLowerCase() === array_nome_vis[1].toLowerCase())
                        bools_check_nome_cognome[1] = true;
                }

                if(event.attendees){
                    const out = event.attendees.find(attendee => { return attendee.email === email_dipendente;})
                    if(out)
                        bool_check_dip = true;
                }

                return bools_check_nome_cognome[0] && bools_check_nome_cognome[1] && bool_check_dip;
            });

                // Se non ho nessuna corrispondenza nome cognome orario
                if(!out_event)
                    return false;
                // Se ho corrispondenza nome cognome orario
                const startEvent = out_event.start.dateTime.slice(11, 16);  
                if(startEvent === orarioEvento){
                    console.log(`[gcalendarUtils.checkEvent]: ${startEvent} - ${out_event.summary}`);
                    return true;
                }
                // Se ho corrispondenza nome cognome 
                else
                    return startEvent;
            }
            else
                return false;
        }
    /* Post: ritornera' false se nessun vento e' presente in calendario, 
             ritornera' 1 se il visitatore indica l'orario corretto, 
             ritornera' 0 se il visitatore indica un orario errato ma comunque l'evento a lui associato esite. */
}
function generateOAuth2Client () { };
module.exports = gcalendarUtils;


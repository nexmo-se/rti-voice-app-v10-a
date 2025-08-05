'use strict'

//-------------

require('dotenv').config();

//--

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs');

const axios = require('axios');

//--- Vonage API ---

const { Auth } = require('@vonage/auth');
const appId = process.env.APP_ID;

const credentials = new Auth({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: appId,
  privateKey: './.private.key'    // private key file name with a leading dot 
});

const apiRegion = process.env.API_REGION;
const dc = apiRegion.substring(4, 8);

const apiBaseUrl = "https://" + apiRegion;

const options = {
  apiHost: apiBaseUrl
};

const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage(credentials, options);

const privateKey = fs.readFileSync('./.private.key');

const { tokenGenerate } = require('@vonage/jwt');

//-- List of allowable client SDK (WebRTC client) users --

const clientList = process.env.CLIENT_SDK_USERS.toLowerCase().split(/\s*,+\s*/);

let clients = new Set();

for (let client in clientList){
  clients.add(clientList[client]);
};

console.log('List of allowable clients:', clients);

//------ phone number matching -- compare last digits -------

const lastDigits = 9;

//------ for trade shows and external parties self started demos ------

const maxCallDuration = 180000; // 3 min
const maxCallsPerDay = 6;
const ttsCustom1Duration = 15000; // 15 sec, approximate TTS duration + margin

const limitCalls = (process.env.LIMITCALLS === "true") || false;  // set to true for self-serve demos 

// phone numbers that will not be limited in number of calls per day
const whiteListedNumbers = require('./whitelisted-numbers.cjs');


//---- CORS policy - Update this section as needed ----

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

//-------

app.use(bodyParser.json());

//-------

const servicePhoneNumber = process.env.SERVICE_PHONE_NUMBER;

// for forwarded call demos
const calleeType = process.env.CALLEE_TYPE;
const calleeLanguage = process.env.CALLEE_LANGUAGE;
const calleeDest = process.env.CALLEE_DEST;

//------------

// Server hosting the connector code
const connectorServer = process.env.CONNECTOR_SERVER;

//-------------

const langSetting = require('./lang_setting.cjs');

const { confInfo, addToConfInfo, deleteUuidFromConfInfo, deleteConfIdFromConfInfo } = require('./conf-info.cjs');

//-------------------------------------------------------------

const confAndPhoneNumbers = require('./conf-and-phone-numbers.cjs');

//-------------------------------------------------------------

function sixDigitRandomNumber() {

  const randomNumber = Math.floor(Math.random() * (999999 - 100000) + 100000);

  return (randomNumber);
}

//-------------------------------------------------------------

console.log("Service phone number:", servicePhoneNumber);



console.log("Callee info for forwarded calls:", calleeType, calleeDest, calleeLanguage);

//-------------------------------------------------------------

let placedCalls = {}; // track number of calls to a given number

//--

function addToPlacedCalls(phoneNumber) {

  if (placedCalls[phoneNumber] == undefined) {
    placedCalls[phoneNumber] = 0;
  };

  let incrementCalls = true;

  for (const number of whiteListedNumbers) {
    if (number == phoneNumber) {
      console.log(">>> this is a whitelisted number:", phoneNumber);
      incrementCalls = false;
    }
  }

  if (incrementCalls) {
    placedCalls[phoneNumber]++;  // increase the count
  }

  console.log (">>> placedCalls dictionary:", placedCalls); 
}

//-------------------------------------------------------------

let callLegsInConf = {};  // store all call legs uuid for each active conference

//--

function addToCallLegsInConf(confName, uuid) {

  if (callLegsInConf[confName] == undefined) {
    callLegsInConf[confName] = new Set();
  };

  callLegsInConf[confName].add(uuid);

  console.log (">>> callLegsInConf dictionary:", callLegsInConf); 
}

//--

function removeFromCallLegsInConf(confName, uuid) {

  callLegsInConf[confName].delete(uuid);
  console.log (">>> callLegsInConf dictionary:", callLegsInConf);

  if (callLegsInConf[confName].size == 0) { // check Set size
    delete callLegsInConf[confName];
    console.log (">>> callLegsInConf dictionary:", callLegsInConf);
  }

}

//---------------------------------------------------------

let uuids = {}; // map uuid to caller number, for incoming calls

function addToUuids(uuid, number) {

  uuids[uuid] = {};
  uuids[uuid]['number'] = number;
  console.log ("uuids dictionary:", uuids); 

}

function removeFromUuids(uuid) {

  delete uuids[uuid];
  console.log (">>> uuids dictionary:", uuids); 

}

//===========================================================

app.get('/langlist', (req, res) => {

  // return list of available language locales to a client application 

  let langList = {};

  for(const key in langSetting){
    langList[key] = langSetting[key]["commonName"];
    // langList.push({key: langSetting[key]["commonName"]});
  }

  res.status(200).json(langList);

});

//-----------

app.get('/simplelanglist', (req, res) => {

  // return list of available language locales to a client application 

  let simpleLangList = {};
  let i = 1;

  for(const key in langSetting){
    simpleLangList[i++] = langSetting[key]["commonName"];
  }


  res.status(200).json(simpleLangList);

});

//--- set up conference and corresponding phone number and language locale pairs ------------

// app.post('/conferencenumber', (req, res) => {

//   const conferenceName = req.body.conferenceName;
//   const userId = req.body.userId;
//   const number = req.body.number;
//   const languageCode = req.body.languageCode;
//   const userName = req.body.userName;
//   const announcement = req.body.announcement;

//   // TBD: check if new conferenceName already exists --> if yes, return error code, and ask to submit new registration

//   for (const existingConfName in confAndPhoneNumbers) {
//     for (const existingUserId in confAndPhoneNumbers[existingConfName]) {
//         if (confAndPhoneNumbers[existingConfName][existingUserId]['number'] == number) {
//           deleteUserIdFromConfAndPhoneNumbers(existingConfName, existingUserId);  // a given number can exist only in one named conference
                                                            
//           // TBD, delete confName entry if empty
//           if (Object.keys(confAndPhoneNumbers[existingConfName]).length === 0) {
//             deleteFromConfAndPhoneNumbers(existingConfName); // remove confName from dictionary if there are no associated numbers
//           }

//         };
//     }
//   }; 

//   // --

//   let newConfNumberCreated = true;

//   do {
//     confNumber = sixDigitRandomNumber();

//     for (const existingConfNumber in confAndPhoneNumbers) {    
//       if (existingConfNumber == confNumber) { newConfNumberCreated = false };
//     };

//   } while (!newConfNumberCreated)

//   //----------------------------------------

//   addToConfAndPhoneNumbers([conferenceName, userId, number, languageCode, userName, announcement]); // add new entry to dictionary of conference numbers

//   console.log ("Conference numbers:", confAndPhoneNumbers);

//   res.status(200).send('Ok');

  // TBD
  // res.status(200).send('Conference name already exists');

// });


//--- Testing by making calls from a local request (/makecall web path) ------

let makecalls = require('./make-calls.cjs');
makecalls(app);

// //-----------------

app.post('/placecall', (req, res) => {

  res.status(200).send('Ok');

  console.log("in /placecall ....");

  const hostName = req.hostname;

  console.log("hostName:", hostName);

  const languageCode = req.body.languageCode;
  const userId = req.body.userId;
  const userName = req.body.userName;
  const conferenceName = req.body.conferenceName;
  const conferencePin = req.body.conferencePin;  // future usage
  const announcement = req.body.announcement;
  const numberToCall = req.body.number;

  let xCustomFields = [];
  let customQueryParams = '';

  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    if (`${key}`.substring(0, 2) == 'x_') {
      xCustomFields.push(`${key}=${value}`);
    }
  }

  if (xCustomFields.length != 0) {
    customQueryParams = "&" + xCustomFields.join("&");
  };

  console.log('>>> custom query parameters in placecall:', customQueryParams);

  if (limitCalls) {

    addToPlacedCalls(numberToCall);
    // to do: create logic to block other call in the pair
  };  


  if ((placedCalls[numberToCall] > maxCallsPerDay) && limitCalls) {

    // no call is made

    if (vids) { // display notice message in VIDS

      const chunkUuid = uuidv4();

      let errormsg1 = {
        'vapiUuid': 0, // does not matter
        'chunkUuid': chunkUuid, 
        'transcript': "You have reached the max allowed number of calls for today.",
        'sourceLanguageCode': languageCode, // does not matter
        'userName': userName, // does not matter
        'userId': userId, // does not matter
        'confName': conferenceName
      };

      errormsg1["timestamp"] = Date.now();
      console.log('>>> posted info:', errormsg1)

      // here, post to front end GUI if any

      //-

      let errormsg2 = {
        'vapiUuid': 0, // does not matter
        'chunkUuid': chunkUuid,
        'translation': "You have reached the max allowed number of calls for today.",
        'targetLanguageCode': languageCode, // does not matter
        'userName': userName, // does not matter
        'userId': userId, // does not matter
        'confName': conferenceName
      };

      errormsg2["timestamp"] = Date.now();
      console.log('>>> posted info:', errormsg2)

      // here, post to front end GUI if any

    };

  } else {

    switch(req.body.type){

      case "phone":

        vonage.voice.createOutboundCall({
          to: [{
            type: 'phone',
            number: numberToCall
          }],
          from: {
           type: 'phone',
           number: servicePhoneNumber
          },
          answer_url: ['https://' + hostName + '/answer_lang?language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&conference_pin=' + conferencePin + '&announcement=' + announcement + customQueryParams],
          answer_method: 'GET',
          event_url: ['https://' + hostName + '/event_lang?language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&conference_pin=' + conferencePin + '&announcement=' + announcement + customQueryParams],
          event_method: 'POST'
          })
          .then(res => console.log(">>> outgoing PSTN call status:", res))
          .catch(err => console.error(">>> outgoing PSTN call error:", err));

      break;

      // other call types will be added

      default:
        console.log("Unsupported call type:", type);
    }

  };

});

//-------

app.get('/answer_lang', (req, res) => {

  const hostName = req.hostname;

  const languageCode = req.query.language_code;
  const userId = req.query.user_id;
  const userName = req.query.user_name;
  const conferenceName = req.query.conference_name;
  const conferencePin = req.query.conference_pin;  // future usage

  // TBD set text in relevant message for announcement

  let nccoResponse = [
      // {
      //   "action":"talk",
      //   "text": ....,
      //   "style": ...,
      // },
      {
        "action": "conversation",
        "name": "conf_" + req.query.conference_name,
        "startOnEnter": true,
        "endOnExit": true // valid ONLY for 1-to-1 case (not for multi-party), so it ends any websockets still up and other leg
      }
    ];

  console.log('>>> PSTN leg - Answer webhook reply:', req.query.uuid, nccoResponse);

  res.status(200).json(nccoResponse);
});


//-------

app.post('/event_lang', (req, res) => {

  const hostName = req.hostname;

  const uuid = req.body.uuid;
  const languageCode = req.query.language_code;
  const userId = req.query.user_id;
  const userName = req.query.user_name;
  const conferenceName = req.query.conference_name;
  const conferencePin = req.query.conference_pin;  // future usage
  const announcement = req.query.announcement;

  // test
  console.log('conferenceName:', req.query.conference_name);

  let xCustomFields = [];
  let customQueryParams = '';

  for (const queryParameter in req.query){    
    if (`${queryParameter}`.substring(0, 2) == 'x_') {
      xCustomFields.push(`${queryParameter}=${req.query[`${queryParameter}`]}`);
    }
  }

  // console.log('in event_lang xCustomFields:', xCustomFields);

  if (xCustomFields.length != 0) {
    customQueryParams = "&" + xCustomFields.join("&");
  };

  // console.log('in event_lang customQueryParams:', customQueryParams);

  //--

  if (req.body.type == 'transfer'){

    addToCallLegsInConf(conferenceName, uuid);

    console.log('>>> event_lang');

    // Future enhancement - Actual URI will be set depending on language code BCP-47
    // Create a table mapping language code with corresponding WS URI
    // const wsUri = 'wss://' + connectorServer + '/socket?peer_uuid=' + req.body.uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&webhook_url=https://' + hostName + '/results' + customQueryParams; 
    
    // Deepgram
    // const wsUri = 'wss://' + dgConnector + '/socketdgrt?tier=' + 'base' + '&model=' + 'phonecall' + '&version=' + 'latest' + '&language=' + 'en-US' + '&punctuate=' + 'true' + '&callback=https://' + hostName + '/transcript'; 
    
    // Testing Immersitech on WebSocket server
    // const wsUri = 'wss://' + connectorServer + '/socketgcpacadl?peer_uuid=' + req.body.uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&webhook_url=https://' + hostName + '/results' + customQueryParams; 
  
    // Standard connection to connector server
    const wsUri = 'wss://' + connectorServer + '/socket?peer_uuid=' + req.body.uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&webhook_url=https://' + hostName + '/results' + customQueryParams; 


    console.log('>>> websocket URI:', wsUri);

    // create corresponding websocket
    vonage.voice.createOutboundCall({
       to: [{
         type: 'websocket',
         uri: wsUri,
         'content-type': 'audio/l16;rate=16000',  // NEVER change the content-type parameter argument
         headers: {}
        }],
       from: {
         type: 'phone',
         number: 19999999999 // cannot use a longer than 15-digit string (e.g. not call_uuid)
       },
       answer_url: ['https://' + hostName + '/ws_answer?peer_uuid=' + req.body.uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName],
       event_url: ['https://' + hostName + '/ws_event?peer_uuid=' + req.body.uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&announcement=' + announcement]
      })
          .then(res => console.log(">>> outgoing WebSocket call status:", res))
          .catch(err => console.error(">>> outgoing WebSocket call error:", err));
  };  

  //--

  if (req.body.status == 'completed'){

    for (const existingConfName in callLegsInConf) {
      for (const callUuid of callLegsInConf[existingConfName]) {
          if (callUuid == uuid) {
            console.log('callUuid:', callUuid);
            removeFromCallLegsInConf(existingConfName, uuid);
          };
      }
    }; 

    //---

    removeFromUuids(uuid);

    //--

    console.log('>>> PSTN call terminated:', uuid);
  
  };

  //---- limit call duration if flag is set

  if ((req.body.status == 'answered') && limitCalls) {

    // in the future, maybe not limit duration of whitelisted numbers?
    // need to pass/receive called number in the received query parameters

    setTimeout(() => {

      vonage.voice.playTTS(uuid,  
        {
        text: langSetting['en-US']['custom1'],
        language: 'en-US', 
        style: langSetting['en-US']['vapiTtsStyle0']
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));

    }, maxCallDuration);    

    setTimeout(() => {

      // tbd, check if call is still up first, optimization not essential

      vonage.voice.hangupCall(uuid)  // then terminate second call leg
        .then(res => console.log('>>> Call ' + uuid + ' reached max duration - Stopped!'))
        .catch(err => {
          console.error('>>> Call ' + uuid + ' reached max duration tear down error', err)
          // you may see error 400 bad request if second leg is already terminated, that's not a problem
        });

    }, maxCallDuration + ttsCustom1Duration);  // could use RTC webhooks instead of ttsCustom1Duration

  };

  //--

  res.status(200).json({});
});


//-------

app.get('/answer', (req, res) => {

    //- sample list of languages -
    //- the list of languages here must match the handling list in /dtmf route -
    //-- TBD - this list of languages and voice prompts will be generated in a separate code file --
    const nccoResponse = [
      {
        "action": "talk",
        "text": "Presione 1 para español",
        "bargeIn": true,
        // "language": "es-MX",
        "language": "es-ES",
        "style": 0
      },
      {
        "action": "talk",
        "text": "Press 2 for English",
        "bargeIn": true,
        "language": "en-US",
        "style": 0
      },
      {
        "action": "input",
        "eventUrl": [`https://${req.hostname}/dtmf?count=1`],
        "eventMethod": "POST",  
        "type": ["dtmf"],
        "dtmf": {
          "maxDigits": 1
        },
        timeout: 7
      }
    ];

  res.status(200).json(nccoResponse);

});

//--------

app.post('/event', (req, res) => {

  const hostName = req.hostname;

  const uuid = req.body.uuid;

  //---  

  if (req.body.type == 'transfer'){
    
    const uuid = req.body.uuid;

    console.log ("Conferences info:\n", JSON.stringify(confInfo, null, 2));

    const conferenceName = confInfo[uuid]["confName"];  // will be used as conference name suffix
    const languageCode = confInfo[uuid]["uuidInfo"][uuid]["language"]; // language code BCP-47
    const announcement = confInfo[uuid]["uuidInfo"][uuid]["announcement"];

    const userId = confInfo[uuid]["uuidInfo"][uuid]["participant"]; // placeholder value, you may set your own
    const userName = confInfo[uuid]["uuidInfo"][uuid]["participant"]; // placeholder value, you may set your own   

    addToCallLegsInConf(conferenceName, uuid); 
    
    // Future enhancement - Actual URI will be set depending on language code BCP-47
    // Create a table mapping language code with corresponding WS URI
    const wsUri = 'wss://' + connectorServer + '/socket?peer_uuid=' + uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&webhook_url=https://' + hostName + '/results'; 

    console.log('>>> websocket URI:', wsUri);

    // create corresponding websocket
    vonage.voice.createOutboundCall({
       to: [{
         type: 'websocket',
         uri: wsUri,
         'content-type': 'audio/l16;rate=16000',  // NEVER change the content-type parameter argument
         headers: {}
        }],
       from: {
         type: 'phone',
         number: 19999999999 // cannot use a longer than 15-digit string (e.g. not call_uuid)
       },
       answer_url: ['https://' + hostName + '/ws_answer?peer_uuid=' + req.body.uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName],
       event_url: ['https://' + hostName + '/ws_event?peer_uuid=' + req.body.uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&announcement=' + announcement]
      })
      .then(res => console.log(">>> WebSocket create status:", res))
      .catch(err => console.error(">>> WebSocket create error:", err));


    //-- forward call ? --  
    if (confInfo[uuid]["uuidInfo"][uuid]["callflow"] == 'inboundoutbound') {

      //- place outbound call -
      const fwdConferenceName = confInfo[uuid]["confName"];
      const fwdType = confInfo[uuid]["uuidInfo"][uuid]["fwdtype"] || calleeType;
      const fwdTo = confInfo[uuid]["uuidInfo"][uuid]["fwddest"] || calleeDest;
      const fwdLanguage = confInfo[uuid]["uuidInfo"][uuid]["fwdlanguage"] || calleeLanguage;
      const fwdAnnouncement = confInfo[uuid]["uuidInfo"][uuid]["fwdannouncement"] || 'shortGreeting';
      const fwdUserId = fwdTo; // placeholder value, you may set your own
      const fwdUserName = fwdTo; // placeholder value, you may set your own

      if (fwdType && fwdTo && fwdLanguage) {  // make sure we have all 3 values

        switch (fwdType) {

          case 'phone':

            vonage.voice.createOutboundCall({
              to: [{
                type: 'phone',
                number: fwdTo
              }],
              from: {
               type: 'phone',
               number: servicePhoneNumber
              },
              answer_url: ['https://' + hostName + '/answer_fwd?conf_id=' + uuid + '&language_code=' + fwdLanguage + '&user_id=' + fwdUserId + '&user_name=' + fwdUserName + '&conference_name=' + fwdConferenceName + '&announcement=' + fwdAnnouncement],
              answer_method: 'GET',
              event_url: ['https://' + hostName + '/event_fwd?conf_id=' + uuid + '&language_code=' + fwdLanguage + '&user_id=' + fwdUserId + '&user_name=' + fwdUserName + '&conference_name=' + fwdConferenceName + '&announcement=' + fwdAnnouncement],
              event_method: 'POST'
              })
              .then(res => console.log(">>> outgoing PSTN call status:", res))
              .catch(err => console.error(">>> outgoing PSTN call error:", err));

            break; 

          case 'inapp':

            // TBD

            break; 

          case 'sip':

            // TBD

            break; 

          default:
          
            console.log(">>> Unsupported endpoint type:", fwdType);  
        }

      } else {

        console.log(">>> Check callee endpoint type, phone number/client SDK name/SIP URI, and language code");

      }

    } 

  } 

  //---

  if (req.body.status == 'completed'){

    for (const existingConfName in callLegsInConf) {
      for (const callUuid of callLegsInConf[existingConfName]) {
          if (callUuid == uuid) {
            console.log('callUuid:', callUuid);
            removeFromCallLegsInConf(existingConfName, uuid);
          };
      }
    }; 

    //---

    removeFromUuids(uuid);

    deleteUuidFromConfInfo(uuid, uuid);

    //--

    console.log('>>> PSTN call terminated:', uuid);

  } 

  //---

  res.status(200).send('Ok');

});

//-----------------------------------------

app.post('/dtmf', (req, res) => {

  let nccoResponse;

  const uuid = req.body.uuid;

  if (req.body.dtmf.timed_out == true) {

    // this commented section is not working as expected at the moment 

    // console.log('>>> req.query.count:', Number(req.query.count));

    // const cycles = Number(req.query.count) + 1;

    // console.log('>>> cycles:', cycles);

    // if (cycles <= 3) {  // ask 3 times at most

    //   //-- TBD - this list of languages and voice prompts will be generated in a separate code file --
    //   nccoResponse = [
    //     {
    //       "action": "talk",
    //       "text": "Presione 1 para español",
    //       "bargeIn": true,
    //       "language": "es-MX",
    //       "style": 0  // TBD, check for best style value
    //     },
    //     {
    //       "action": "talk",
    //       "text": "Press 2 for English",
    //       "bargeIn": true,
    //       "language": "en-US",
    //       "style": 0
    //     },

    //     {
    //       "action": "input",
    //       "eventUrl": [`https://${req.hostname}/dtmf?count=${cycles}`],
    //       "eventMethod": "POST",  
    //       "type": ["dtmf"],
    //       "dtmf": {
    //         "maxDigits": 1
    //       },
    //       timeout: 7
    //     }
    //   ];

    // } else {  // user did not press any digit 3 times in a row

      nccoResponse = [
        {
          "action": "talk",
          "text": "No presionaste ninguna tecla, adiós",
          // "language": "es-MX",
          "language": "es-ES",
          "style": 0
        },
        {
          "action": "talk",
          "text": "You did not press any key, good bye",
          "language": "en-US",
          "style": 0
        }
      ];

    // }  

  } else {

    //- TBD - the following section will be refactored -

    let continueCall = true;

    switch(req.body.dtmf.digits) {
      case '1':
        // languageCode = 'es-MX';
        // addToConfInfo(uuid, uuid, uuid, 'es-MX', req.body.from, 'phone', 'shortGreeting', 'inboundoutbound');
        addToConfInfo(uuid, uuid, uuid, 'es-ES', req.body.from, 'phone', 'shortGreeting', 'inboundoutbound');
        break;

      case '2':
        // languageCode = 'en-US';
        addToConfInfo(uuid, uuid, uuid, 'en-US', req.body.from, 'phone', 'shortGreeting', 'inboundoutbound');
        break;        

      default:   
        nccoResponse = [
          {
            "action": "talk",
            "text": "Presionaste una opción no válida. Adiós.",
            "language": "en-US",
            "style": 0    
          },
          {
            "action": "talk",
            "text": "You pressed an invalid option. Good bye",
            "language": "en-US",
            "style": 0    
          }
        ];

        res.status(200).json(nccoResponse);
        continueCall = false;

    }

    if (continueCall) {

      nccoResponse = [
        {
          "action": "conversation",
          "name": "conf_" + uuid,
          "startOnEnter": true,
          "endOnExit": true   // do not set this parameter for > 2 participants calls
        }
      ];

      res.status(200).json(nccoResponse);

    }

  }

});

//-----------------------------------------

app.get('/ws_answer', (req, res) => {

  const originalUuid = req.query.peer_uuid;
  const conferenceName = req.query.conference_name;
  
  // This stores the uuid be used to tear down this websocket (as conference leg does not have endOnExit true, i.e. multi-party use case)
  // also change app.set to an object
  // app.set('ws_uuid_' + originalUuid , req.query.uuid)

  let nccoResponse = [
    {
      "action": "conversation",
      "canHear": [originalUuid],
      "name": "conf_" + conferenceName  // to handle multiple separate conf calls with VIDS Live Translation demo
      // TBD: handle PSTN/WebRTC/SIP incoming calls - outside of VIDS demos
      // "name": "conf_" + originalUuid  // to handle multiple separate conf calls with RT translations
    }
  ];

  console.log('>>> WebSocket leg - Answer webhook reply:', req.query.uuid, nccoResponse);

  res.status(200).json(nccoResponse);
});

//-----------------------------------------

app.post('/ws_event', (req, res) => {

  //---  for tests only  ---

  if (req.body.status == 'completed'){

    console.log('>>> Websocket leg terminated:', req.body.uuid);

  }

  //-----

  if (req.body.status == "answered") {
    
    console.log("Websocket uuid:", req.body.uuid);

    const originalUuid = req.query.peer_uuid;

    const ttsLanguageCode = req.query.language_code;
    console.log('TTS language code:', ttsLanguageCode);

    const announcement = req.query.announcement;
    console.log('Announcement type:', announcement);
    

    // when user is called, this greeting is played
    const ttsText = langSetting[ttsLanguageCode][announcement];
    const ttsStyle = langSetting[ttsLanguageCode]['vapiTtsStyle0'];

    console.log('>>> Greeting text:', ttsText);
    console.log('>>> VAPI language code:', ttsLanguageCode);
    console.log('>>> VAPI TTS style:', ttsStyle);

    vonage.voice.playTTS(originalUuid,  
      {
        text: ttsText,
        language: ttsLanguageCode, 
        style: ttsStyle
      })
        .then(res => {
           console.log('PlayTTS ', originalUuid, 'status: ', res);
           // app.set('greeting_tts_' + originalUuid, res.uuid);
           // console.log('greeting_tts_' + originalUuid, app.get('greeting_tts_' + originalUuid));           
        })
        .catch(err => console.error('PlayTTS', originalUuid, 'error:', err));

  //   setTimeout(() => {
  //     vonage.calls.talk.start(originalUuid, {text: announcement, voiceName: 'Emma', loop: 1}, (err, res) => {
  //       if (err) { console.error('>>> TTS to associated party ' + req.body.uuid + 'error:', err); }
  //       else {console.log ('>>> TTS to associated party ' + req.body.uuid + ' ok!')}
  //     });
  //   }, 4000);  

  };

  res.status(200).end();

  // TBD
  // send request for translation in additional languages to connector server

});

//-------

app.get('/answer_fwd', (req, res) => {

  const confId = req.query.conf_id;
  const conferenceName = confInfo[confId]["confName"];  // conference name suffix

  const nccoResponse = [
    {
      "action": "conversation",
      "name": "conf_" + conferenceName,
      "startOnEnter": true,
      "endOnExit": true   // do not set this parameter for > 2 participants calls
    }
  ];

  res.status(200).json(nccoResponse);

});

//-------

app.post('/event_fwd', (req, res) => {

  res.status(200).send('Ok');

  const hostName = req.hostname;
  const uuid = req.body.uuid;

  const confId = req.query.conf_id;
  const languageCode = req.query.language_code;
  const userId = req.query.user_id;
  const userName = req.query.user_name;
  const conferenceName = req.query.conference_name;
  // const conferencePin = req.query.conference_pin;  // future usage
  const announcement = req.query.announcement;

  // console.log('conferenceName:', req.query.conference_name);

  let xCustomFields = [];
  let customQueryParams = '';

  for (const queryParameter in req.query){    
    if (`${queryParameter}`.substring(0, 2) == 'x_') {
      xCustomFields.push(`${queryParameter}=${req.query[`${queryParameter}`]}`);
    }
  }

  // console.log('in event_lang xCustomFields:', xCustomFields);

  if (xCustomFields.length != 0) {
    customQueryParams = "&" + xCustomFields.join("&");
  };

  // console.log('in event_lang customQueryParams:', customQueryParams);

  //--

  if (req.body.type == 'transfer'){

    addToCallLegsInConf(conferenceName, uuid);

    console.log('>>> event_fwd');

    // Future enhancement - Actual URI will be set depending on language code BCP-47
    // Create a table mapping language code with corresponding WS URI
    // const wsUri = 'wss://' + connectorServer + '/socket?peer_uuid=' + req.body.uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&webhook_url=https://' + hostName + '/results' + customQueryParams; 
    
    // Deepgram
    // const wsUri = 'wss://' + dgConnector + '/socketdgrt?tier=' + 'base' + '&model=' + 'phonecall' + '&version=' + 'latest' + '&language=' + 'en-US' + '&punctuate=' + 'true' + '&callback=https://' + hostName + '/transcript'; 
    
    // Testing Immersitech on WebSocket server
    // const wsUri = 'wss://' + connectorServer + '/socketgcpacadl?peer_uuid=' + req.body.uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&webhook_url=https://' + hostName + '/results' + customQueryParams; 
  
    // Standard connection to connector server
    const wsUri = 'wss://' + connectorServer + '/socket?peer_uuid=' + uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&webhook_url=https://' + hostName + '/results' + customQueryParams; 


    console.log('>>> websocket URI:', wsUri);

    // create corresponding websocket
    vonage.voice.createOutboundCall({
       to: [{
         type: 'websocket',
         uri: wsUri,
         'content-type': 'audio/l16;rate=16000',  // NEVER change the content-type parameter argument
         headers: {}
        }],
       from: {
         type: 'phone',
         number: 19999999999 // cannot use a longer than 15-digit string (e.g. not call_uuid)
       },
       answer_url: ['https://' + hostName + '/ws_answer_fwd?peer_uuid=' + uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName],
       event_url: ['https://' + hostName + '/ws_event_fwd?peer_uuid=' + uuid + '&language_code=' + languageCode + '&user_id=' + userId + '&user_name=' + userName + '&conference_name=' + conferenceName + '&announcement=' + announcement]
      })
          .then(res => console.log(">>> outgoing WebSocket call status:", res))
          .catch(err => console.error(">>> outgoing WebSocket call error:", err));
  };  

  //--

  if (req.body.status == 'completed'){

    for (const existingConfName in callLegsInConf) {
      for (const callUuid of callLegsInConf[existingConfName]) {
          if (callUuid == uuid) {
            console.log('callUuid:', callUuid);
            removeFromCallLegsInConf(existingConfName, uuid);
          };
      }
    }; 

    //---

    removeFromUuids(uuid);

    if (confInfo[confId][uuid]) {
      deleteUuidFromConfInfo(confId, uuid);
    }

    //--

    console.log('>>> PSTN call terminated:', uuid);
  
  };

});

//-----------------------------------------

app.get('/ws_answer_fwd', (req, res) => {

  const originalUuid = req.query.peer_uuid;
  const conferenceName = req.query.conference_name;
  
  // This stores the uuid be used to tear down this websocket (as conference leg does not have endOnExit true, i.e. multi-party use case)
  // also change app.set to an object
  // app.set('ws_uuid_' + originalUuid , req.query.uuid)

  let nccoResponse = [
    {
      "action": "conversation",
      "canHear": [originalUuid],
      "name": "conf_" + conferenceName  // to handle multiple separate conf calls with VIDS Live Translation demo
      // TBD: handle PSTN/WebRTC/SIP incoming calls - outside of VIDS demos
      // "name": "conf_" + originalUuid  // to handle multiple separate conf calls with RT translations
    }
  ];

  console.log('>>> WebSocket leg - Answer webhook reply:', req.query.uuid, nccoResponse);

  res.status(200).json(nccoResponse);
});

//-----------------------------------------

app.post('/ws_event_fwd', (req, res) => {

  //---  for tests only  ---

  if (req.body.status == 'completed'){

    console.log('>>> Websocket leg terminated:', req.body.uuid);

  }

  //-----

  if (req.body.status == "answered") {
    
    console.log("Websocket uuid:", req.body.uuid);

    const originalUuid = req.query.peer_uuid;

    const ttsLanguageCode = req.query.language_code;
    console.log('TTS language code:', ttsLanguageCode);

    const announcement = req.query.announcement;
    console.log('Announcement type:', announcement);
    

    // when user is called, this greeting is played
    const ttsText = langSetting[ttsLanguageCode][announcement];
    const ttsStyle = langSetting[ttsLanguageCode]['vapiTtsStyle0'];

    console.log('>>> Greeting text:', ttsText);
    console.log('>>> VAPI language code:', ttsLanguageCode);
    console.log('>>> VAPI TTS style:', ttsStyle);

    vonage.voice.playTTS(originalUuid,  
      {
        text: ttsText,
        language: ttsLanguageCode, 
        style: ttsStyle  
      })
        .then(res => {
           console.log('PlayTTS ', originalUuid, 'status: ', res);
           // app.set('greeting_tts_' + originalUuid, res.uuid);
           // console.log('greeting_tts_' + originalUuid, app.get('greeting_tts_' + originalUuid));           
        })
        .catch(err => console.error('PlayTTS', originalUuid, 'error:', err));

  //   setTimeout(() => {
  //     vonage.calls.talk.start(originalUuid, {text: announcement, voiceName: 'Emma', loop: 1}, (err, res) => {
  //       if (err) { console.error('>>> TTS to associated party ' + req.body.uuid + 'error:', err); }
  //       else {console.log ('>>> TTS to associated party ' + req.body.uuid + ' ok!')}
  //     });
  //   }, 4000);  

  };

  res.status(200).end();

  // TBD
  // send request for translation in additional languages to connector server

});  

//--------

//---------

app.post('/rtc', (req, res) => {

  res.status(200).send('Ok');

});

//---------

app.post('/transcript', (req, res) => {

  res.status(200).send('Ok');

});

//---------

app.post('/results', (req, res) => {

  res.status(200).send('Ok');

  const timeNow = Date.now();
  console.log('>>>', timeNow.toString());
  console.log(req.body);

  if (req.body.hasOwnProperty('translation')) {

    const targetLanguageCode = req.body.targetLanguageCode;
    const translation = req.body.translation;

    if (translation != "") {

      // console.log(">>> TTS to be played - translation:", req.body.translation);
      console.log(">>> uuids of conference:", callLegsInConf[req.body.confName]);

      callLegsInConf[req.body.confName].forEach( uuid => {

        // Play translation TTS to call legs of the conference uuid

        const ttsStyle = langSetting[targetLanguageCode]['vapiTtsStyle0'];

        console.log('>>> Translation text:', req.body.translation);
        console.log('>>> VAPI language code:', targetLanguageCode);
        console.log('>>> VAPI TTS style:', ttsStyle);

        vonage.voice.playTTS(uuid,   
          {
          text: translation,
          language: targetLanguageCode, 
          style: ttsStyle  
          })
          .then(res => console.log('playTTS ', uuid, 'status: ', res))
          .catch(err => console.error('playTTS ', uuid, 'error: ', err));

      });

    }  

  }

});

//================= Services for the WebRTC client (Vonage client SDK) ===================

app.post('/login', async (req, res) => {

    const user = req.body.user; // web page should have already made the name to lower case

    // check if user is in the list of allowable users
    if (!clients.has(user)) {
      return res.status(401).json({ name: user, message: ">>> Unknown user" });
    }

    console.log("Creating user: " + user);
    // either get or create this user (if not yet existing)
    const userId = await getUser(user);
    
    console.log("Generating JWT for user: " + user);
    const jwt = await generateJWT(user);
        
    return res.status(200).json({ name: user, userId: userId, token: jwt, dc: dc, phone: servicePhoneNumber });
})

//--------

async function getUser(name) {
    
  const accessToken = tokenGenerate(appId, privateKey, {});
  
  return new Promise(async (resolve, reject) => {
    
    let results;
    
    try {
      results = await axios.get('https://api.nexmo.com/v0.3/users?name=' + name,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });

      //-- debug
      // console.log(">>> results.data:", results.data);

      console.log("User Retrieval results: ", results.data._embedded.users[0].id);
      
      // If user already exists, just use it!
      resolve(results.data._embedded.users[0].id);
      return;
    } 
    catch (err) {

        console.log(">>> err.response:", err.response);
        // console.log("User retrieval error: ", err.response.data)
    }
    
    // Here - user does NOT exist, create it
    try {
        let body = {
            name: name,
            display_name: name
        }
        results = await axios.post('https://api.nexmo.com/v0.3/users', body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
        console.log("User creation results: ", results.data);
        
        // New user created, pass back the id
        resolve(results.data.id);
        
        return;
    } 
    catch (err) {
        console.log(">>> User creation error:", err);
        console.log("User creation error: ", err.response?.statusText)
        
        resolve(null);
    }
  })

}

//--------

app.post('/logout', async (req, res) => {
    
    let user = req.body.user;
    let session = req.body.session;
    
    console.log("Deleting session: " + session);
    await delSession(session);

    return res.status(200).end();
})

//--------

async function generateJWT(sub) {
    
    // Generate a JWT with the appropriate ACL
    let jwtExpiration = Math.round(new Date().getTime() / 1000) + 2592000; //30 days
    
    const aclPaths = {
        "paths": {
            "/*/users/**": {},
            "/*/conversations/**": {},
            "/*/sessions/**": {},
            "/*/devices/**": {},
            "/*/image/**": {},
            "/*/media/**": {},
            "/*/applications/**": {},
            "/*/push/**": {},
            "/*/knocking/**": {},
            "/*/legs/**": {}
        }
    }
    let claims = {
        exp: jwtExpiration,
        //ttl: 86400,
        acl: aclPaths,
    }
    
    // ONLY Client JWTs use a "sub", so don't add one if it is already passed in
    if (sub != null) {
        claims.sub = sub
    }
    
    console.log(appId, privateKey, claims);
    
    const jwt = tokenGenerate(appId, privateKey, claims)
    
    console.log("Jwt: ", jwt)
    
    return (jwt);
}

//--------

async function delSession(session) {

  const accessToken = tokenGenerate(appId, privateKey, {});
  
  return new Promise(async (resolve, reject) => {

    let results;

    try {
      results = await axios.delete('https://api.nexmo.com/v0.3/sessions/' + session,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }
        });
      console.log("User session deletion results: ", results.data);
      resolve(results.data);
      return;
    } 
    catch (err) {
      console.log("User session deletion error: ", err)
    }
  })

}

//=== If this application is hosted on VCR (Vonage Cloud Runtime) serverless infrastructure ===

app.get('/_/health', async (req, res) => {
    res.sendStatus(200);
});

//========== Static HTTP server ===========

//-- To serve WebRTC client web page --
app.use ('/', express.static(__dirname + '/public')); // static web server

//=========================================

const port = process.env.VCR_PORT || process.env.PORT || 8000;

app.listen(port, () => console.log(`\nReal-Time Interpreting - Voice API application server code running on port ${port}.`));

//------------

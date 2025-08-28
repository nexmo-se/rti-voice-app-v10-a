module.exports = function(app) {

    const axios = require('axios');

    //-----------------

    app.get('/makecall', async(req, res) => {

        res.status(200).send('Ok');

        console.log("in /makecall ...");

        hostName = req.hostname;

        const webhookUrl = "https://" + hostName + "/placecall";

        //-- call 1 ---

        const callInfo1 = {
        'type': 'phone',
        'number': '12995550101', // one of the parties to call
        'languageCode': 'es-MX', // should be a different language from call 2 below (except for auto)
        'userId': 'abcde', // sample value
        'userName': 'myVBC', // sample value
        'conferenceName': '22334697', // unique for each conference call
        'conferencePin': '', // must be all digits, future usage
        'announcement': 'shortGreeting', // 'standardGreeting', 'shortGreeting', 'speakNow', 'enterNumber', 'wait', 'none', 'selectLang', 'custom1', 'custom2'
        // 'announcement': 'standardGreeting', // 'standardGreeting', 'shortGreeting', 'speakNow', 'enterNumber', 'wait', 'none', 'selectLang', 'custom1', 'custom2'
        'x_param_1': 'foo1',
        'x_param_2': 'foo2'
        };

        console.log("call 1 info:", callInfo1);

        try {
          const status = await axios.post(webhookUrl, JSON.stringify(callInfo1),
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            });
          // console.log("HTTP POST status:", status);
        } 
        catch (err) {
          console.log("HTTP POST /placecall error: ", err);
        }

        //-- call 2 ---

        const callInfo2 = {
        'type': 'phone',
        'number': '12995551212', // other party to call
        'languageCode': 'en-US', // must be a different language from call 1 above
        'userId': 'fghijk', // sample value
        'userName': 'myCell', // sample value
        'conferenceName': '22334697', // unique for each conference call (but same as for call 1)
        'conferencePin': '', // must be all digits, future usage
        'announcement': 'shortGreeting', // 'standardGreeting', 'shortGreeting', 'speakNow', 'enterNumber', 'wait', 'none', 'selectLang', 'custom1', 'custom2'
        // 'announcement': 'standardGreeting', // 'standardGreeting', 'shortGreeting', 'speakNow', 'enterNumber', 'wait', 'none', 'selectLang', 'custom1', 'custom2'
        'x_param_3': 'bar1',
        'x_param_4': 'bar2'
        };

        console.log("call 2 info:", JSON.stringify(callInfo2));

        try {
          const status = await axios.post(webhookUrl, JSON.stringify(callInfo2),
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            });
          // console.log("HTTP POST status:", status);
        } 
        catch (err) {
          console.log("HTTP POST /placecall error: ", err);
        }

    });

};
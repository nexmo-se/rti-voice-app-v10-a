let confInfo = {};

//--

function addToConfInfo(confId, confName, uuid, language, participant, type, announcement, callflow, fwd_dest, fwd_type, fwd_language, fwd_announcement) {

  confInfo[confId] = confInfo[confId] ?? {};
  confInfo[confId]["confName"] = confName;
    
  if (uuid) {
    confInfo[confId]["uuidInfo"] = confInfo[confId]["uuidInfo"] ?? {};
    confInfo[confId]["uuidInfo"][uuid] = confInfo[confId]["uuidInfo"][uuid] ?? {};
    confInfo[confId]["uuidInfo"][uuid]["language"] = language;   
    confInfo[confId]["uuidInfo"][uuid]["participant"] = participant; 
    confInfo[confId]["uuidInfo"][uuid]["type"] = type; 
    confInfo[confId]["uuidInfo"][uuid]["announcement"] = announcement;
    confInfo[confId]["uuidInfo"][uuid]["callflow"] = callflow; // 'inboundoutbound', 'inboundonly', 'outboundonly'
    confInfo[confId]["uuidInfo"][uuid]["fwddest"] = fwd_dest;  // valid only for 'inboundoutbound' call flow
    confInfo[confId]["uuidInfo"][uuid]["fwdtype"] = fwd_type;  // valid only for 'inboundoutbound' call flow
    confInfo[confId]["uuidInfo"][uuid]["fwdlanguage"] = fwd_language;  // valid only for 'inboundoutbound' call flow
    confInfo[confId]["uuidInfo"][uuid]["fwdannouncement"] = fwd_language;  // valid only for 'inboundoutbound' call flow
  }

  console.log ("Conferences info:\n", JSON.stringify(confInfo, null, 2));
}

//--

function deleteUuidFromConfInfo(confId, uuid) {

  delete confInfo[confId]["uuidInfo"][uuid];

  if (Object.keys(confInfo[confId]["uuidInfo"]).length == 0) {
    delete confInfo[confId];
  }

  console.log ("Conferences info:\n", JSON.stringify(confInfo, null, 2));

}

//--

function deleteConfIdFromConfInfo(confId) {

  delete confInfo[confId];

  console.log ("Conferences info:\n", JSON.stringify(confInfo, null, 2));

}

//-- test --

// addToConfInfo ('123');

// addToConfInfo ('456', 'abc', '678_abc', 'en-US', 12995550101, 'phone');
// addToConfInfo ('456', 'abc', '477_aef', 'fr-FR', "melissa", 'inapp');

// addToConfInfo ('789', 'cde', '901_ef0', 'en-US', 12995551212, 'phone');
// addToConfInfo ('789', 'cde', '3ab_54e', 'es-MX', "sip:jennifer@mysipserver.mydomain.com", 'sip');

// deleteUuidFromConfInfo('456', '678_abc');
// deleteUuidFromConfInfo('456', '477_aef');

// deleteUuidFromConfInfo('789', '901_ef0');
// deleteUuidFromConfInfo('789', '3ab_54e');

// deleteConfIdFromConfInfo('123');

//-- end test

// Export the confInfo object and functions
module.exports = {
  confInfo,
  addToConfInfo,
  deleteUuidFromConfInfo,
  deleteConfIdFromConfInfo
};



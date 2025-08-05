let confAndPhoneNumbers = {};

function addToConfAndPhoneNumbers (info) {
  if (confAndPhoneNumbers[info[0]] == undefined) {
    confAndPhoneNumbers[info[0]] = {};  // dictionary, info[0] is the conference name, e.g. "1_1640658883"
  }
  confAndPhoneNumbers[info[0]][info[1]] = {};  // 2nd level dictionary, info [1] is participant's user ID
  confAndPhoneNumbers[info[0]][info[1]]["number"] = info[2];  // participant's E.164 phone number or Client SDK user name
  confAndPhoneNumbers[info[0]][info[1]]["locale"] = info[3];  // participant's language locale
  confAndPhoneNumbers[info[0]][info[1]]["userName"] = info[4];  // participant's user name or role
  confAndPhoneNumbers[info[0]][info[1]]["announcement"] = info[5]; // participant's type of announcement
  confAndPhoneNumbers[info[0]][info[1]]["callUuid"] = ''; // participant's Voice API call leg uuid
}

function deleteUserIdFromConfAndPhoneNumbers (confName, userId) {
  // TBD, check here that both uuids fields are empty before deleting confNumber entry from dictionary

  delete confAndPhoneNumbers[confName][userId];

  // return success or error code if cannot delete
}

function deleteFromConfAndPhoneNumbers (confName) {

  delete confAndPhoneNumbers[confName];

}

//-- test

const confNumA1 = ['1_1640658881', '1', '12995550101', 'en-US', 'Customer', 'shortGreeting'];
const confNumA2 = ['1_1640658881', '2', '12995550202', 'es-MX', 'Agent', 'standardGreeting'];

const confNumB1 = ['1_1640658882', '1', '129995550303', 'fr-FR', 'Customer', 'shortGreeting'];
const confNumB2 = ['1_1640658882', '2', '129995550304', 'it-IT', 'Agent', 'standardGreeting'];

// -- following names must be in environment variable CLIENT_SDK_USERS (in .env file) --
const confNumD1 = ['1_1640658884', '1', 'ella', 'de-DE', 'Customer', 'shortGreeting'];
const confNumD2 = ['1_1640658884', '2', 'olivia', 'en-US', 'Agent', 'shortGreeting'];

const confNumE1 = ['1_1640658885', '1', 'lars', 'nl-NL', 'Customer', 'shortGreeting'];
const confNumE2 = ['1_1640658885', '2', 'amelia', 'en-US', 'Agent', 'shortGreeting'];

const confNumF1 = ['1_1640658886', '1', 'maurice', 'fr-FR', 'Customer', 'shortGreeting'];
const confNumF2 = ['1_1640658886', '2', 'jack', 'en-US', 'Agent', 'shortGreeting'];

const confNumG1 = ['1_1640658887', '1', 'maria', 'es-ES', 'Customer', 'shortGreeting'];
const confNumG2 = ['1_1640658887', '2', 'steve', 'en-US', 'Agent', 'shortGreeting'];

addToConfAndPhoneNumbers(confNumA1);
addToConfAndPhoneNumbers(confNumA2);
addToConfAndPhoneNumbers(confNumB1);
addToConfAndPhoneNumbers(confNumB2);

addToConfAndPhoneNumbers(confNumD1);
addToConfAndPhoneNumbers(confNumD2);
addToConfAndPhoneNumbers(confNumE1);
addToConfAndPhoneNumbers(confNumE2);
addToConfAndPhoneNumbers(confNumF1);
addToConfAndPhoneNumbers(confNumF2);
addToConfAndPhoneNumbers(confNumG1);
addToConfAndPhoneNumbers(confNumG2);

console.log ("Conference numbers:", confAndPhoneNumbers);

//-- end test

module.exports = confAndPhoneNumbers;
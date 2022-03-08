// Assignment Code
var generateBtn = document.querySelector("#generate");

// defines available characters.  Puts them in arrays to pull from later.
const bucketLowerCase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 
const bucketUpperCase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']; 
const bucketSymbol = ['!', '^', '&', '#', '*', '%', '@', '$']; // This list is what LastPass uses. That seems like an appropriate set to include for this generator. (i.e. I am sure their list provides sufficient complexity as well as compatibility with most site password rules.)
const bucketNumber = ['0','1','2','3','4','5','6','7','8','9']; 
const numberWords = {     // This object contains strings associated with each acceptable number input.  It is used to convert a typed number into an acceptable input at the prompt.
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  'twenty one': 21,
  'twenty two': 22,
  'twenty three': 23,
  'twenty four': 24,
  'twenty five': 25,
  'twenty six': 26,
  'twenty seven': 27,
  'twenty eight': 28,
  'twenty nine': 29,
  thirty: 30,
  'thirty one': 31,
  'thirty two': 32,
  'thirty three': 33,
  'thirty four': 34,
  'thirty five': 35,
  'thirty six': 36,
  'thirty seven': 37,
  'thirty eight': 38,
  'thirty nine': 39,
  forty: 40,
  'forty one': 41,
  'forty two': 42,
  'forty three': 43,
  'forty four': 44,
  'forty five': 45,
  'forty six': 46,
  'forty seven': 47,
  'forty eight': 48,
  'forty nine': 49,
  fifty: 50,
  'fifty one': 51,
  'fifty two': 52,
  'fifty three': 53,
  'fifty four': 54,
  'fifty five': 55,
  'fifty six': 56,
  'fifty seven': 57,
  'fifty eight': 58,
  'fifty nine': 59,
  sixty: 60,
  'sixty one': 61,
  'sixty two': 62,
  'sixty three': 63,
  'sixty four': 64,
  'sixty five': 65,
  'sixty six': 66,
  'sixty seven': 67,
  'sixty eight': 68,
  'sixty nine': 69,
  seventy: 70,
  'seventy one': 71,
  'seventy two': 72,
  'seventy three': 73,
  'seventy four': 74,
  'seventy five': 75,
  'seventy six': 76,
  'seventy seven': 77,
  'seventy eight': 78,
  'seventy nine': 79,
  eighty: 80,
  'eighty one': 81,
  'eighty two': 82,
  'eighty three': 83,
  'eighty four': 84,
  'eighty five': 85,
  'eighty six': 86,
  'eighty seven': 87,
  'eighty eight': 88,
  'eighty nine': 89,
  ninety: 90,
  'ninety one': 91,
  'ninety two': 92,
  'ninety three': 93,
  'ninety four': 94,
  'ninety five': 95,
  'ninety six': 96,
  'ninety seven': 97,
  'ninety eight': 98,
  'ninety nine': 99,
  'one hundred': 100,
  'one hundred one': 101,
  'one hundred two': 102,
  'one hundred three': 103,
  'one hundred four': 104,
  'one hundred five': 105,
  'one hundred six': 106,
  'one hundred seven': 107,
  'one hundred eight': 108,
  'one hundred nine': 109,
  'one hundred ten': 110,
  'one hundred eleven': 111,
  'one hundred twelve': 112,
  'one hundred thirteen': 113,
  'one hundred fourteen': 114,
  'one hundred fifteen': 115,
  'one hundred sixteen': 116,
  'one hundred seventeen': 117,
  'one hundred eighteen': 118,
  'one hundred nineteen': 119,
  'one hundred twenty': 120,
  'one hundred twenty one': 121,
  'one hundred twenty two': 122,
  'one hundred twenty three': 123,
  'one hundred twenty four': 124,
  'one hundred twenty five': 125,
  'one hundred twenty six': 126,
  'one hundred twenty seven': 127,
  'one hundred twenty eight': 128,
} 

//defines global variables
var passwordLengthInput;    // string response to the user prompt for their desired password length
var bucketLowerCaseInput;   // bool response to the user confrim for lowercase char selection 
var bucketUpperCaseInput;   // bool response to the user confrim for uppercase char selection
var bucketSymbolInput;      // bool response to the user confirm for symbol char selection
var bucketNumberInput;      // bool resposne to the user confirm for number char selection
var passwordLengthNumber;   // stores passwordLengthInput as a number, will receive NaN value if a text string is input.
var passwordBuild;          // string of characters that stores the password as the loop runs
var addedChar;              // selected character to add to the password
var builderArray;           // initially empty array. concatenates arrays based on user confirms to provide acceptable characters to the password build loop
var containsLower;          // bool used to check if the built password contains lowercase characters
var containsUpper;          // bool used to check if the built password contains uppercase characters
var containsSymbol;         // bool used to check if the built password contains symbol characters
var containsNumber;         // bool used to check if the built password contains number characters

// this function is called to reinitialize the input variables so that the while loops function correctly if the "Generate Password" button is pressed a second time
const reinitializeVariables = () => {
  passwordLengthInput = null;
  bucketLowerCaseInput = null;
  bucketUpperCaseInput = null;
  bucketSymbolInput = null;
  bucketNumberInput = null;
  passwordLengthNumber = null;
  passwordBuild = '';
  addedChar = '';
  builderArray = [];
  containsLower = false;
  containsUpper = false;
  containsSymbol = false;
  containsNumber = false;
}

// Defines the generatePassword function
const generatePassword = () => {
  reinitializeVariables(); // first step runs the variable reinitializer.  This prevents values from "sticking" when the button is pressed without refreshing the page.

  // This block prompts for a password length and then converts the string that is returned to a number it checks that the input is a number between 8 and 128, and reprompts the user if it is not.
  while (!passwordLengthNumber || passwordLengthNumber < 8 || passwordLengthNumber > 128) {
    passwordLengthInput = prompt ('Please enter your desired password length (between 8 and 128 characters)');
    passwordLengthNumber = Number(passwordLengthInput);
  // The following if statement checks the input against the acceptable password length parameters.  must be a number between 8 and 128.  If the input does not match those criteria, it alerts the user and reprompts for an input.  If the user clicks the cancel button, it provides a message to the user and terminates the function.
    if (passwordLengthInput === null) {
      console.log('cancel was pressed for the password length prompt')
      alert ('Password generation canceled, please press the "Generate Password" button to start again.')
      return;
    } else if (passwordLengthNumber < 8 || passwordLengthNumber > 128 ){ //  || !passwordLengthNumber) {
      alert ('The password length must be a number between 8 and 128.  Please try again with a valid entry.')
    } else if (!passwordLengthNumber) {
      console.log('typed a word')
      passwordLengthInput = passwordLengthInput.toLowerCase();
      console.log(passwordLengthInput)
      passwordLengthNumber=numberWords[passwordLengthInput];
      console.log(passwordLengthNumber);
        if (passwordLengthNumber == undefined){
          alert ('The password length must be a number between 8 and 128.  Please try again with a valid entry.')
        }
    }
  }
let whileCounter = 0;
// This block asks the user to confirm which types of characters they want included in their password
  while (!bucketLowerCaseInput == true && !bucketUpperCaseInput == true && !bucketSymbolInput == true && !bucketNumberInput == true) {
    bucketLowerCaseInput = confirm ('Press OK to confirm that you would like to include lowercase letters.  Pressing "Cancel" will exclude lowercase letters from the password.');
    bucketUpperCaseInput = confirm ('Press OK to confirm that you would like to include UPPERCASE letters.  Pressing "Cancel" will exclude UPPERCASE letters from the password.');
    bucketSymbolInput = confirm ('Press OK to confirm that you would like to include special characters (!, @, #, *, etc.).  Pressing "Cancel" will exclude special characters from the password.');
    bucketNumberInput = confirm ('Press OK to confirm that you would like to include numbers.  Pressing "Cancel" will exclude numbers from the password.');
    
    // The following if statement checks to make sure that the user has selected at least one type of character for their password.  If the user did not confirm at least one type of character, it alerts the user and reprompts the character selection.
    if (bucketLowerCaseInput === false && bucketUpperCaseInput === false && bucketSymbolInput === false && bucketNumberInput === false) {
      // The following if statement is used to determine if the user has not selected any character sets a second time.  If no character sets were selected twice, an alert is sent to the user, and the program is aborted.
      if (whileCounter == 1) {
        alert ('Password Generation cancelled.  Please press the button again to generate a new password.  At least one type of character is required.');
        return;
      }
      alert ('At least one character type needs to be confirmed.  Please start over, and confirm at least one character set.');
      whileCounter++;
    }
  }
  
// the next four if statements add the required characters to the builderArray.
  if (bucketLowerCaseInput === true) {
    builderArray = builderArray.concat(bucketLowerCase)
  }
  if (bucketUpperCaseInput === true) {
    builderArray = builderArray.concat(bucketUpperCase)
  }
  if (bucketSymbolInput === true) {
    builderArray = builderArray.concat(bucketSymbol)
  }
  if (bucketNumberInput === true) {
    builderArray = builderArray.concat(bucketNumber)
  }

  // the while loop here looks for the password to contain a character from each user requested bucket.  If the password does not contain the requested character type, it reinitializes the password and builds a new one.  It will do this until a valid password is generated.
while (!(containsLower === bucketLowerCaseInput) || !(containsUpper === bucketUpperCaseInput) || !(containsSymbol === bucketSymbolInput) || !(containsNumber === bucketNumberInput)) {
  //reinitialize the passwordBuild and addedChar and contains/type/ variables every loop.  If these are not reinitialized here, on a second loop, the password would be continue building on the previous one.  The contains/type/ variables need to be reset so that they are checked correctly again.
  passwordBuild = '';
  addedChar = '';
  containsLower = false;
  containsUpper = false;
  containsSymbol = false;
  containsNumber = false;

// this for loop iterates to generate characters based on the user input for desired password length  
  for (let i = 0; i < passwordLengthNumber; i++) {
    randIndex = Math.floor(Math.random()*(builderArray.length));
    addedChar = builderArray[randIndex];
    passwordBuild = passwordBuild + addedChar;
  }

  console.log(`Generated password is ${passwordBuild}.`);
  console.log(`The password is ${passwordBuild.length} characters long.  Based on user input, the password should be ${passwordLengthNumber} characters long.`);  

//section to validate that the generated password contains at least one of each requested character type
  if(bucketLowerCaseInput === true) {                     // checks if character type is required
    for (let j = 0; j < passwordBuild.length && containsLower !== true; j++) {      // for loop to iterate across passwordBuild string characters
      for (let i = 0; i < bucketLowerCase.length; i++) {  // for loop to iterate across bucket array elements
        if (passwordBuild[j] == bucketLowerCase[i]) {     // checks that string character [j] matches [i]
          containsLower = true;                           // confirms that at least one match is found
          break
        }
      }
    }
  }
  if(bucketUpperCaseInput === true) {                     // checks if character type is required
    for (let j = 0; j < passwordBuild.length && containsUpper !== true; j++) {      // for loop to iterate across passwordBuild string characters
      for (let i = 0; i < bucketUpperCase.length; i++) {  // for loop to iterate across bucket array elements
        if (passwordBuild[j] == bucketUpperCase[i]) {     // checks that string character [j] matches [i]
          containsUpper = true;                           // confirms that at least one match is found
          break
        }
      }
    }
  }
  if(bucketSymbolInput === true) {                        // checks if character type is required
    for (let j = 0; j < passwordBuild.length && containsSymbol !== true; j++) {      // for loop to iterate across passwordBuild string characters
      for (let i = 0; i < bucketSymbol.length; i++) {     // for loop to iterate across bucket array elements
        if (passwordBuild[j] == bucketSymbol[i]) {        // checks that string character [j] matches [i]
          containsSymbol = true;                          // confirms that at least one match is found
          break
        }
      }
    }
  }
  if(bucketNumberInput === true) {                      // checks if character type is required
    for (let j = 0; j < passwordBuild.length && containsNumber !== true; j++) {    // for loop to iterate across passwordBuild string characters
      for (let i = 0; i < bucketNumber.length; i++) {   // for loop to iterate across bucket array elements
        if (passwordBuild[j] == bucketNumber[i]) {      // checks that string character [j] matches [i]
          containsNumber = true;                        // confirms that at least one match is found
          break
        }
      }
    }
  }

  // the next four if statments print to the log if the required characters are included, or non-required are not included.  '/type/ checked' indicates that the password meets the criteria.
  if (containsLower === bucketLowerCaseInput) {
    console.log('Lower checked')
  }
  if (containsUpper === bucketUpperCaseInput) {
    console.log('Upper checked')
  }
  if (containsSymbol === bucketSymbolInput) {
    console.log('Symbol checked')
  }
  if (containsNumber === bucketNumberInput) {
    console.log('Number checked')
  }

} //closes password building while loop.

return passwordBuild; //ends function and sends passwordBuild back to the writePassword function.

}; //close generatePassword


// Write password to the #password input
function writePassword() {
  var password = generatePassword();    
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

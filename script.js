// Assignment Code
var generateBtn = document.querySelector("#generate");

// defines available characters.  Puts them in arrays to pull from later.
const bucketLowerCase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 
const bucketUpperCase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']; 
const bucketSymbol = ['!', '^', '&', '#', '*', '%', '@', '$']; // This list is what LastPass uses... if it is good enough for them, I think it is good enough for this too. (i.e. I am sure theirs is really, really good.)
const bucketNumber = ['0','1','2','3','4','5','6','7','8','9']; 

//defines global variables
var passwordLengthInput;
var bucketLowerCaseInput;
var bucketUpperCaseInput;
var bucketSymbolInput;
var bucketNumberInput;
var passwordLengthNumber;
var passwordBuild;
var addedChar;
var builderArray;
var containsLower;
var containsUpper;
var containsSymbol;
var containsNumber;

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
    } else if (passwordLengthNumber < 8 || passwordLengthNumber > 128 || !passwordLengthNumber) {
      alert ('The password must be a number between 8 and 128 characters in length.  Please try again with a valid entry.')
    }
  }

// This block asks the user to confirm which types of characters they want included in their password
  while (!bucketLowerCaseInput == true && !bucketUpperCaseInput == true && !bucketSymbolInput == true && !bucketNumberInput == true) {
    bucketLowerCaseInput = confirm ('Press OK to confirm that you would like to include lowercase letters.  Pressing "Cancel" will exclude lowercase letters from the password.');
    bucketUpperCaseInput = confirm ('Press OK to confirm that you would like to include UPPERCASE letters.  Pressing "Cancel" will exclude UPPERCASE letters from the password.');
    bucketSymbolInput = confirm ('Press OK to confirm that you would like to include special characters (!, @, #, *, etc.).  Pressing "Cancel" will exclude special characters from the password.');
    bucketNumberInput = confirm ('Press OK to confirm that you would like to include numbers.  Pressing "Cancel" will exclude numbers from the password.');
    
    // The following if statement checks to make sure that the user has selected at least one type of character for their password.  If the user did not confirm at least one type of character, it alerts the user and reprompts the character selection.
    if (bucketLowerCaseInput === false && bucketUpperCaseInput === false && bucketSymbolInput === false && bucketNumberInput === false) {
      alert ('At least one character type needs to be confirmed.  Please start over, and confirm at least one character set.');
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

  console.log(passwordBuild);
  console.log(passwordBuild.length);  

//section to validate that the generated password contains at least one of each requested character type
  if(bucketLowerCaseInput === true) {                     // checks if character type is required
    for (let j = 0; j < passwordBuild.length; j++) {      // for loop to iterate across passwordBuild string characters
      for (let i = 0; i < bucketLowerCase.length; i++) {  // for loop to iterate across bucket array elements
        if (passwordBuild[j] == bucketLowerCase[i]) {     // checks that string character [j] matches [i]
          containsLower = true;                           // confirms that at least one match is found
        }
      }
    }
  }
  if(bucketUpperCaseInput === true) {                     // checks if character type is required
    for (let j = 0; j < passwordBuild.length; j++) {      // for loop to iterate across passwordBuild string characters
      for (let i = 0; i < bucketUpperCase.length; i++) {  // for loop to iterate across bucket array elements
        if (passwordBuild[j] == bucketUpperCase[i]) {     // checks that string character [j] matches [i]
          containsUpper = true;                           // confirms that at least one match is found
        }
      }
    }
  }
  if(bucketSymbolInput === true) {                        // checks if character type is required
    for (let j = 0; j < passwordBuild.length; j++) {      // for loop to iterate across passwordBuild string characters
      for (let i = 0; i < bucketSymbol.length; i++) {     // for loop to iterate across bucket array elements
        if (passwordBuild[j] == bucketSymbol[i]) {        // checks that string character [j] matches [i]
          containsSymbol = true;                          // confirms that at least one match is found
        }
      }
    }
  }
  if(bucketNumberInput === true) {                      // checks if character type is required
    for (let j = 0; j < passwordBuild.length; j++) {    // for loop to iterate across passwordBuild string characters
      for (let i = 0; i < bucketNumber.length; i++) {   // for loop to iterate across bucket array elements
        if (passwordBuild[j] == bucketNumber[i]) {      // checks that string character [j] matches [i]
          containsNumber = true;                        // confirms that at least one match is found
        }
      }
    }
  }

  // the next four if statments print to the log if the required characters are included, or non-required are not included.  '/type/ checked' indicates that the password meets the criteria.
  if (containsLower === bucketLowerCaseInput) {
    console.log('lower checked')
  }
  if (containsUpper === bucketUpperCaseInput) {
    console.log('Upper checked')
  }
  if (containsSymbol === bucketSymbolInput) {
    console.log('Symbol checked')
  }
  if (containsNumber === bucketNumberInput) {
    console.log('number checked')
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

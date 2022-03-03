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

// the four functions below pick a random element out of their respective arrays using a random index generator.  These functions will be called in the generatePassword function in order to pick the characters for the password.
const pickRandomLowerCase = () => {
  var randIndex = Math.floor(Math.random()*(bucketLowerCase.length));
  console.log(bucketLowerCase[randIndex]);
  return bucketLowerCase[randIndex];
};
const pickRandomUpperCase = () => {
  var randIndex = Math.floor(Math.random()*(bucketUpperCase.length));
  console.log(bucketUpperCase[randIndex]);
  return bucketUpperCase[randIndex];
};
const pickRandomSymbol = () => {
  var randIndex = Math.floor(Math.random()*(bucketSymbol.length));
  console.log(bucketSymbol[randIndex]);
  return bucketSymbol[randIndex];
};
const pickRandomNumber = () => {
  var randIndex = Math.floor(Math.random()*(bucketNumber.length));
  console.log(bucketNumber[randIndex]);
  return bucketNumber[randIndex];
};




/* Used this block to test what symbols LastPass used.  function code taken from stackoverflow.  I want to come back to this function to analyze how it works later.
var array1 = ['!','!','#','*','^','*','*','^','^','^','@','%','#','%','!','&','&','*','@','*','&','@','%','*','%','#','!','^','$','@','*','#','!','&','%','!','!','$','%','@','*','%','&','!','#','^','&','!','*','@','*','%','^','^','!']
var array2 = ['!','$','%','*','&','$','!','@','%','*','^','&','!','&','&','@','%','$','&','!','#','#','!','!','@','@','&','*','*','!','^','!','*','#','%','%','#','@','!','#','&','*','&','!','!','$','#','*','^','*','@','$','!','#','&']
var array3 = ['!','^','&','&','#','*','#','%','%','%','!','%','@','@','^','*','#','*','$','$','@','%','&','$','*','@','*','^','@','$','@','^','*','@','%','$','%','#','#','!','*','$','%','#','#','@','#','^','*','^','%','$','!','@','&']
function remove_duplicates_safe(arr) {
  var seen = {};
  var ret_arr = [];
  for (var i = 0; i < arr.length; i++) {
      if (!(arr[i] in seen)) {
          ret_arr.push(arr[i]);
          seen[arr[i]] = true;
      }
  }
  console.log(ret_arr)
  return ret_arr;

}
remove_duplicates_safe(array1);
remove_duplicates_safe(array2);
remove_duplicates_safe(array3);
*/

// Defines the generatePassword function
const generatePassword = () => {

// This block prompts for a password length and then converts the string that is returned to a number
  // passwordLengthInput = 10; // setting password length to ten for testing.
  passwordLengthInput = prompt ('Please enter your desired password length (between 8 and 128 characters)');
  passwordLengthNumber = Number(passwordLengthInput);
  // console.log(passwordLengthInput) // used this to verify prompt worked as expected during development.
  // console.log(typeof passwordLengthInput); // used this to verify prompt worked as expected during development.
  console.log(passwordLengthNumber); // used this to verify prompt worked as expected during development.
  console.log(typeof passwordLengthNumber); // used this to verify prompt worked as expected during development.
// The following if statement checks the input against the acceptable password length parameters.  must be a number between 8 and 128.  If the input does not match those criteria, it alerts the user and aborts the function.
  if (passwordLengthNumber < 8 || passwordLengthNumber > 128 || isNaN(passwordLengthNumber)) {
    alert ('The password must be a number between 8 and 128 characters in length.  Please try again with a valid entry.')
    return; //This aborts the function 
  }
 
// This block asks the user to confirm which types of characters they want included in their password
  bucketLowerCaseInput = confirm ('Press OK to confirm that you would like to include lowercase letters.  Pressing "Cancel" will exclude lowercase letters from the password.');
  bucketUpperCaseInput = confirm ('Press OK to confirm that you would like to include UPPERCASE letters.  Pressing "Cancel" will exclude UPPERCASE letters from the password.');
  bucketSymbolInput = confirm ('Press OK to confirm that you would like to include special characters (!, @, #, *, etc.).  Pressing "Cancel" will exclude special characters from the password.');
  bucketNumberInput = confirm ('Press OK to confirm that you would like to include numbers.  Pressing "Cancel" will exclude numbers from the password.');
  
  // console.log(bucketLowerCaseInput) // used this to verify prompt worked as expected during development.
  // console.log(bucketUpperCaseInput) // used this to verify prompt worked as expected during development.
  // console.log(bucketSymbolInput) // used this to verify prompt worked as expected during development.
  // console.log(bucketNumberInput) // used this to verify prompt worked as expected during development.

  // The following if statement checks to make sure that the user has selected at least one type of character for their password.  If the user did not confirm at least one type of character, it alerts the user and aborts the function.
  if (bucketLowerCaseInput === false && bucketUpperCaseInput === false && bucketSymbolInput === false && bucketNumberInput === false) {
    alert ('Come on guy, you need to have some sort of character for a password to be a thing.  Please start over, and confirm at least one character set this time.');
    return; // this aborts the function if the alert occurs
  }



  

  // pickRandomLowerCase();
  // pickRandomUpperCase();
  // pickRandomSymbol();
  // pickRandomNumber();
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();    
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

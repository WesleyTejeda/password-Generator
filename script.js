// Assignment Code
var generateBtn = document.querySelector("#generate");
var wouldLikeLC = false;
var wouldLikeUP = false;
var wouldLikeNumb = false;
var wouldLikeSpecChar = false;
//Arrays for our password criteria
var lowerCaseAlpha=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var upperCaseAlpha=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var numbers=["0","1","2","3","4","5","6","7","8","9"];
var specialChar=["@","%","+","\\","/","\'","!","#","$","^","?",":",",",")","(","}","{","]","[","~","-","_","."];
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if(password !== false){
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
  }
}
//Generates a password
function generatePassword() {
  //Keeps track of different types user wants, resets each time this function is called
  var cases=0;
  //Asks user for password length
  var passLength = prompt("How many characters would you like the password to have? Our generator can create between 8 and 129 characters.");
  //If the password length does not meet criteria function will stop
  if(passLength > 129 || passLength < 8){
    alert("Sorry, please choose between 8 and 129 characters. Click generate again.");
    return false;
  }
  //As long as run = true the loop will run, exits loops if user chooses or if criteria met to create password
  var run = true;
  while(run){
    //Calls userChoice function for user input, cases will increase by 1 if user wants this type
    cases = userChoice(wouldLikeLC,"lowercase", cases);
    cases = userChoice(wouldLikeUP,"uppercase", cases);
    cases = userChoice(wouldLikeNumb,"number", cases);
    cases = userChoice(wouldLikeSpecChar,"special", cases);
    //If password criteria is met cases > 0 and while loop will end
    if(cases > 0){
      alert("Please wait a moment while we generate your password");
      run = false;
    }
    //If password criteria is not met then user will be alerted and will have the chance to either run input loop again or exit
    else {
      var stayInLoop= confirm("Sorry we cannot make a password without any characters. Please choose at least one character type. Would you like to run this one more time with the same length provided?");
      if(stayInLoop === false){
      alert("No further input required.");
      run = false;
      return false;
      }
    }
  }

}
//This function is a condensed version of input for the wouldLike variables
function userChoice(arg1,arg2, arg3){
  arg1 = confirm("Would you like "+ arg2 + " characters in your password?");
  if(arg1){
    //Our cases variable is hard coded to this function. If user wants this type of char cases will increase by 1
    arg3++;
    console.log("Cases: " + arg3);
    console.log(arg1);
  }
  return arg3;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword)
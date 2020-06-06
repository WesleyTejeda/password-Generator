// Assignment Code
var generateBtn = document.querySelector("#generate");
var wouldLikeLC = false;
var wouldLikeUP = false;
var wouldLikeNumb = false;
var wouldLikeSpecChar = false;
//Strings for our password criteria
var lowerCaseAlpha="abcdefghijklmnopqrstuvwxyz";
var upperCaseAlpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers="0123456789";
//23 special characters
var specialChar="@%+\\/\'!#$^?:,)(}{][~-_.";
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  console.log(password);
  if(password !== false){
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
  }
}
//Generates a password
function generatePassword() {
  //Keeps track of different types user wants, resets each time this function is called
  var cases=0;
  //Temporary variable while we generate password, we will return this variable at the end of the function
  var tempPass= "";
  //Asks user for password length
  var passLength = prompt("How many characters would you like the password to have? Our generator can create between 8 and 129 characters.");
  //If the password length does not meet criteria function will stop
  if(passLength > 129 || passLength < 8){
    alert("Sorry, please choose between 8 and 129 characters. Click generate again.");
    return false;
  }
  //As long as run === true the loop will run, exits loops if user chooses to leave or if criteria met to create password
  var run = true;
  while(run){
    //Calls userChoice function for user input, cases will increase by 1 if user wants this type
    cases = userChoice(wouldLikeLC,"lowercase", cases);
    cases = userChoice(wouldLikeUP,"uppercase", cases);
    cases = userChoice(wouldLikeNumb,"number", cases);
    cases = userChoice(wouldLikeSpecChar,"special", cases);
    //If password criteria is met cases > 0 and while loop will end
    if(cases > 0){
      alert("Click ok to generate your password");
      run = false;
    }
    //If criteria is not met then user will be alerted and will have the chance to either run input loop again or exit
    else {
      var stayInLoop= confirm("Sorry we cannot make a password without any characters. Please choose at least one character type. Would you like to run this one more time with the same length provided?");
      if(stayInLoop === false){
      alert("No further input required.");
      run = false;
      return false;
      }
    }
  }
  //For loop to generate password
  for(var x=0; x < passLength; x++){
    tempPass += getChar(lowerCaseAlpha,upperCaseAlpha,numbers,specialChar,wouldLikeLC,wouldLikeUP,wouldLikeNumb,wouldLikeSpecChar);
  }
  return tempPass;
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
  //cases variable is returned to be reassigned to new value if increased, since the variable isn't defined in this function we must return it in order for cases variable to be accurate
  return arg3;
}
function getChar(arg1, arg2, arg3, arg4, choice1, choice2, choice3, choice4){
  var tempChar = "2";
  var run = true;
  //while(run){
    //Generates a number between 0-3 to decide which type to pick for next character to add to password
    //If the user did not select that type it will not be included
    var rand = (Math.floor(Math.random() * 4));
    console.log("rand::"+rand);
    if((rand == 0)){
      tempChar = arg1.charAt(Math.floor(Math.random() * arg1.length));
      console.log(tempChar);
      run = false;
    } else if((rand == 1)){
      tempChar = arg2.charAt(Math.floor(Math.random() * arg2.length));
      console.log(tempChar);
      run = false;
    } else if((rand == 2)){
      tempChar = arg3.charAt(Math.floor(Math.random() * arg3.length));
      console.log(tempChar);
      run = false;
    } else if((rand == 3)){
      tempChar = arg4.charAt(Math.floor(Math.random() * arg4.length));
      console.log(tempChar);
      run = false;
    }
    else
      console.log("not found running loop again");
      run = false;
  //}
  return tempChar;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword)
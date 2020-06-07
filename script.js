// Assignment Code
var generateBtn = document.querySelector("#generate");
//Strings for our password criteria, they must be seperate in order to distinguish types user wants later in our functions
var lowerCaseAlpha="abcdefghijklmnopqrstuvwxyz";
var upperCaseAlpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers="0123456789";
var specialChar="@%+\\/\'!#$^?:,)(}{][~-_.";
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  //Won't run the next lines in function to avoid textbox change if exit
  if(password !== false){
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
  }
}
//Generates a password
function generatePassword() {
  //Keeps track of what types user wants
  var wouldLikeLC = false;
  var wouldLikeUP = false;
  var wouldLikeNumb = false;
  var wouldLikeSpecChar = false;
  //Temporary variable while we generate password, we will return this variable at the end of the function
  var tempPass= "";
  //Asks user for password length
  var passLength = prompt("How many characters would you like the password to have? Our generator can create between 8 and 129 characters.");
  //If the password length does not meet criteria function will stop
  if(passLength > 129 || passLength < 8){
    alert("Sorry, please choose between 8 and 129 characters. Click generate again.");
    return false;
  }
  //As long as run is true the loop will run, exits loops if user chooses to leave or if criteria met to create password
  var run = true;
  while(run){
    //Calls userChoice function for user input, wouldLike vars will be set to true if user wants this type
    wouldLikeLC = userChoice(wouldLikeLC,"lowercase");
    wouldLikeUP = userChoice(wouldLikeUP,"uppercase");
    wouldLikeNumb = userChoice(wouldLikeNumb,"number");
    wouldLikeSpecChar = userChoice(wouldLikeSpecChar,"special");
    console.log("Lowercase: " + wouldLikeLC + "| Uppercase: " + wouldLikeUP + "| Numbers: " + wouldLikeNumb + "| Special Characters: " + wouldLikeSpecChar);
    //If password criteria is met of at least one type then while loop will end
    if(wouldLikeLC || wouldLikeUP|| wouldLikeNumb|| wouldLikeSpecChar){
      alert("Click ok to generate your password");
      run = false;
    }
    //If criteria not met then user will have the chance to either run input loop with same length again or exit
    else {
      var stayInLoop= confirm("Sorry we cannot make a password without any characters. Please choose at least one character type. Would you like to run this one more time with the same length provided?");
      if(stayInLoop === false){
      alert("You've decided to exit. No further input required.");
      run = false;
      return false;
      }
    }
  }
  //For loop to generate password
  for(var x=0; x < passLength; x++){
    //Builds a string one character at a time for each iteration
    tempPass += getChar(lowerCaseAlpha,upperCaseAlpha,numbers,specialChar,wouldLikeLC,wouldLikeUP,wouldLikeNumb,wouldLikeSpecChar);
  }
  return tempPass;
}
//This function is a condensed version of input for the wouldLike variables
function userChoice(arg1,arg2){
  //Asks user if they would like type
  arg1 = confirm("Would you like "+ arg2 + " characters in your password?");
  //wouldLike variable is returned to be reassigned to new value
  return arg1;
}
//Retrieves the char to build to tempChar in generate function
function getChar(arg1, arg2, arg3, arg4, choice1, choice2, choice3, choice4){
  var tempChar = "";
  var run = true;
  while(run){
    //Generates a number between 0-3 to decide which type to pick for next character to add to password
    //If the user did not select that type it will not be included
    //If random number lands on type not included, goes to top of while and generates a new number until found
    var rand = (Math.floor(Math.random() * 4));
    if(rand == 0 && choice1 == true){
      tempChar = arg1.charAt(Math.floor(Math.random() * arg1.length));
      run = false;
    } else if(rand == 1 && choice2 == true){
      tempChar = arg2.charAt(Math.floor(Math.random() * arg2.length));
      run = false;
    } else if(rand == 2 && choice3 == true){
      tempChar = arg3.charAt(Math.floor(Math.random() * arg3.length));
      run = false;
    } else if(rand == 3 && choice4 == true){
      tempChar = arg4.charAt(Math.floor(Math.random() * arg4.length));
      run = false;
    }
  }
  return tempChar;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword)
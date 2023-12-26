/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Your code here
  str = str.toLowerCase();
  constvowelsArray = [];

  vowelsArray = str.split("").filter((e) => {
    //console.log(e);
    if (e == "a" || e == "e" || e == "i" || e == "o" || e == "u") {
      return true;
    } else {
      return false;
    }
  });
  return vowelsArray.length;
}

module.exports = countVowels;

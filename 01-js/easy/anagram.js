/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  if (str1.length == 0 && str2.length == 0) {
    return true;
  }
  if (str1.length != str2.length) {
    return false;
  }
  let flag = false;
  for (let j = 0; j < str1.length; j++) {
    flag = false;
    for (let i = 0; i < str2.length; i++) {
      if (str1[j] == str2[i]) {
        flag = true;
      }
    }
    if (flag == false) {
      break;
    }
  }
  return flag;
}

module.exports = isAnagram;

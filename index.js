var n = [], s, str, last ,regx1 = /[-|/|+|*]/;

//for manupulating calc display
var txt = document.querySelector("#text");

//cancel button functionality
document.getElementById("cancelbtn").addEventListener("click", del);

// adding event listeners to calc buttons
var bts = document.getElementsByTagName("button");
bts[0].addEventListener("click", function () {
  btnclk(7);
});
bts[1].addEventListener("click", function () {
  btnclk(8);
});
bts[2].addEventListener("click", function () {
  btnclk(9);
});
bts[3].addEventListener("click", function () {
  btnclk("/");
});
bts[4].addEventListener("click", function () {
  btnclk(4);
});
bts[5].addEventListener("click", function () {
  btnclk(5);
});
bts[6].addEventListener("click", function () {
  btnclk(6);
});
bts[7].addEventListener("click", function () {
  btnclk("*");
});
bts[8].addEventListener("click", function () {
  btnclk(1);
});
bts[9].addEventListener("click", function () {
  btnclk(2);
});
bts[10].addEventListener("click", function () {
  btnclk(3);
});
bts[11].addEventListener("click", function () {
  btnclk("-");
});
bts[12].addEventListener("click", function () {
  btnclk(0);
});
bts[13].addEventListener("click", function () {
  btnclk(".");
});
bts[14].addEventListener("click", function () {
  btnclk("=");
});
bts[15].addEventListener("click", function () {
  btnclk("+");
});

//function for calc button clicks
function btnclk(i) {
  switch (i) {

    case 7:
    case 8:
    case 9:
    case 4:
    case 5:
    case 6:
    case 1:
    case 2:
    case 3:
      textdisp(i);
      //checkb(i); not required as its function is performed during = enter
      break;
    case ".":
      if (checkdot(i)) {
        textdisp(i);
      }
      break;

    case 0:
      // if (s == '/') {
      //   alert("Invalid Operation !\nCannot divide by 0 ");
      // }
      // else {
      //   textdisp(i);
      // }               // not required as this functionality is performed during = enter
      textdisp(i);
      break;

    case "+":
    case "/":
    case "-":
    case "*":
      if (checko(i)) {
        insarr1(i);
        textdisp(i);
      }
      break;

    case "=":
      if (checke(i)) {
        insarr2();  //inserts 2nd operand to array
        dispresult(); // displays final result
      }
      break;
  }
}

//function to reset calc display
function del() {
  txt.innerHTML = "";
  txt.style.color = 'blanchedalmond';
  n[0] = ""; n[1] = ""; s = ""; str = ""; str3=""; //required.clears all global arrays
}

//function to display entered content on dispscreen 
//which takes input , converts current innerhtml and input to string
//appends input to current innerhtml n displays it
function textdisp(i) {

  if (txt.style.color == 'rgb(8, 236, 46)') //clears arrays n dispscreen if it has last result displayd .
  { del(); }
  var num1 = i.toString();
  var num2 = txt.innerHTML.toString();
  var fnum = num2.concat(num1);
  txt.innerHTML = fnum;
  return;

}
function checkdot(i) {
   return true;

}
//function to check conditions before entering operator to innerhtml n array
//Returns false if innerhtml  already  contains operator or operator entered at last or
//operator is entered at 1st ,else return true
function checko(i) {

  str = txt.innerHTML.toString();
 

  if (txt.style.color == 'rgb(8, 236, 46)') //clears arrays n display if it has last result displayd .
  { del(); }
  if (str.charAt(0) == "") {
    alert("Invalid Expresssion !  \nCannot enter " + i + " at start ");
    return false;
  }
  if (regx1.test(str)) {
    alert("Invalid Expresssion !  \nCannot have more than 1 operator in a single expression");
    return false;
  }
  else return true;
}

//function to check conditions before entering equals operator
//Returns false if last entered value is an operator or . and if /by0 error is found else return true.
function checke(i) {
  var regx2 = /[/]/, num;
  var str2 = [];
  str = txt.innerHTML.toString();
  str3 = str2.toString();
  last = str.charAt(str.length - 1);

  //serches for / in str when found , collects string frm next index till last index
  //parses this new string to num n checks if its 0 , if yes returns false.(/by0 error check)
  for (var i = 0; i < str.length; i++) {
    if (regx2.test(str[i])) {
      while (i < str.length - 1) {
        str3 = str3.concat(str[++i]);
      }
      num = parseFloat(str3).toFixed(4);
      if (num == 0.0000) {
        alert("Invalid Expression !\nCannot divide by 0");
        return false;
      }
    }
  }
  if (
    last == "+" ||
    last == "-" ||
    last == "/" ||
    last == "*" ||
    last == "=" ||
    last == "."
  ) {
    alert("Invalid Expresssion !  \nCannot enter " + s + " at end");
    return false;
  }

  else return true;

}

//function to insert 1st operand to array and operator to s
function insarr1(i) {

  n[0] = parseFloat(txt.innerHTML).toFixed(4);
  s = i;
  return;
}

////////////////////////////////////////////////////////////////////
// function checkb(i) {
//   var txt = document.querySelector("#text").innerHTML;
//   str = txt.toString();
//   last = str.charAt(str.length - 1);
//   if (
//     last == "+" ||
//     last == "-" ||
//     last == "/" ||
//     last == "*" ||
//     last == "=" ||
//     last == "."
//   ) {
//     n[1] = i;
//     return;
//   } else return;
// }
//////////////////////////////////////////////////////////////////////////

//function to insert 2nd operand to array on preesing =
//This find index at which operator occurs and 
//enters whole string between that operator and end of string to array 
//and then stores this string as an int in array n. 
function insarr2() {
  var str2 = [];
  str = txt.innerHTML.toString();
  str3 = str2.toString();
  for (var i = 0; i < str.length; i++) {
    if (regx1.test(str[i])) {
      while (i < str.length - 1) {
        str3 = str3.concat(str[++i]);
      }
      n[1] = parseFloat(str3).toFixed(4);
      return;
    }
  }
}

//function to output final result depending on operator
function dispresult() {
  var result;
  txt.style.color = 'rgb(8, 236, 46)';
  switch (s) {
    case '+':
      result = n[0] + n[1];
      txt.innerHTML = n[0] + "+" + n[1] + "=" + result.toFixed(4);
      break;
    case '-':
      result = n[0] - n[1];
      txt.innerHTML = n[0] + "-" + n[1] + "=" + result.toFixed(4);
      break;
    case '/':
      result = n[0] / n[1];
      txt.innerHTML = n[0] + "/" + n[1] + "=" + result.toFixed(4);
      break;
    case '*':
      result = n[0] * n[1];
      txt.innerHTML = n[0] + "*" + n[1] + "=" + result.toFixed(4);
      break;
  }
}

///ignore ..test command////
// document.getElementById("cancelbtn").style.backgroundColor='red';
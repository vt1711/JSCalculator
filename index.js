var n = ["", ""], s, str, last, regx1 = /[-|/|+|*]/;

//for manupulating calc display
var txt = document.querySelector("#dispscreen");

//cancel button functionality
document.getElementById("cancelbtn").addEventListener("click", del);

// adding event listeners to calc buttons [sction1]
document.getElementById("n1").addEventListener("click", function () {
  btnclk(1);
});
document.getElementById("n2").addEventListener("click", function () {
  btnclk(2);
});
document.getElementById("n3").addEventListener("click", function () {
  btnclk(3);
});
document.getElementById("n4").addEventListener("click", function () {
  btnclk(4);
});
document.getElementById("n5").addEventListener("click", function () {
  btnclk(5);
});
document.getElementById("n6").addEventListener("click", function () {
  btnclk(6);
});
document.getElementById("n7").addEventListener("click", function () {
  btnclk(7);
});
document.getElementById("n8").addEventListener("click", function () {
  btnclk(8);
});
document.getElementById("n9").addEventListener("click", function () {
  btnclk(9);
});
document.getElementById("n0").addEventListener("click", function () {
  btnclk(0);
});
document.getElementById("dot").addEventListener("click", function () {
  btnclk('.');
});
document.getElementById("add").addEventListener("click", function () {
  btnclk('+');
});
document.getElementById("sub").addEventListener("click", function () {
  btnclk('-');
});
document.getElementById("mult").addEventListener("click", function () {
  btnclk('*');
});
document.getElementById("divide").addEventListener("click", function () {
  btnclk('/');
});
document.getElementById("eqlbtn").addEventListener("click", function () {
  btnclk('=');
});


//function for calc button clicks
function btnclk(v) {
  switch (v) {
    case 7:
    case 8:
    case 9:
    case 4:
    case 5:
    case 6:
    case 1:
    case 2:
    case 3:
    case 0:
      textdisp(v);
      //checkb(v); not required as its function is performed during = enter
      break;

    case ".":
      if (checkdot(v)) {
        textdisp(v);
      }
      break;

    case "+":
    case "/":
    case "-":
    case "*":
      if (checko(v)) {
        insarr1(v);
        textdisp(v);
      }
      break;

    case "=":
      if (checke(v)) {
        insarr2();  //inserts 2nd operand to array
        dispresult(); // displays final result
      }
      break;
  }
}

//function to reset calc display
function del() {
  txt.value = "";
  txt.style.color = 'blanchedalmond';
  n[0] = ""; n[1] = ""; s = ""; str = ""; str3 = ""; //required.clears all global arrays
}

//function to display entered content on dispscreen 
//which takes input , converts current value and input to string
//appends input to current value n displays it
function textdisp(v) {

  if (txt.style.color == 'rgb(8, 236, 46)') //clears arrays n dispscreen if it has last result displayd .
  { del(); }
  var num1 = v.toString();
  var num2 = txt.value.toString();
  var fnum = num2.concat(num1);
  txt.value = fnum;
  return;

}

function checkdot(v) {

  if (txt.style.color == 'rgb(8, 236, 46)') //clears arrays n display if it has last result displayd .
  { del(); }
  if (txt.value == "") {
    alert("Invalid Expression !\nCannot enter . at start");
    return false;
  }
  if (n[0] == "") //n[0]==empty means 1st entering 1st operand thus check for . in innerhtml if found ,false  
  {
    var regx2 = /[.]/;
    str = txt.value.toString();
    if (regx2.test(str)) {
      alert("Invalid Expression !\nCannot enter more than 1 decimal point in an operand");
      return false;
    }
    return true;
  }
  //n[0] !empty means entering 2nd operand thus search for operand in value and once found
  //trace str frm next to last index for . if found return false
  else if (
    !(n[0] == "")
  ) {
    var regx2 = /[.]/;
    var str2 = [];
    str = txt.value.toString();
    str3 = str2.toString();

    //searches for operator in str , when found , collects string frm next index till last index
    //checks for .  in this new string if yes returns false.
    for (var i = 0; i < str.length; i++) {
      if (regx1.test(str[i])) {
        while (i < str.length - 1) {
          str3 = str3.concat(str[++i]);
        }
        if (regx2.test(str3)) {
          alert("Invalid Expression !\nCannot enter more than 1 decimal point in an operand");
          return false;
        }
        else return true;
      }
    }
  }
  else return true

}
//function to check conditions before entering operator to value n array
//Returns false if value  already  contains operator or operator entered at last or
//operator is entered at 1st ,else return true
function checko(v) {

  str = txt.value.toString();
  if (txt.style.color == 'rgb(8, 236, 46)') //clears arrays n display if it has last result displayd .
  { del(); }
  if (str.charAt(0) == "") {
    alert("Invalid Expresssion !  \nCannot enter " + v + " at start ");
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
function checke(v) {
  var regx2 = /[/]/, num;
  var str2 = [];
  str = txt.value.toString();
  str3 = str2.toString();
  last = str.charAt(str.length - 1);

  //serches for / in str when found , collects string frm next index till last index
  //parses this new string to num n checks if its 0 , if yes returns false.(/by0 error check)
  for (var i = 0; i < str.length; i++) {
    if (regx2.test(str[i])) {
      while (i < str.length - 1) {
        str3 = str3.concat(str[++i]);
      }
      num = Number(str3);
      if (num == 0) {
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
function insarr1(v) {
  n[0] = Number(txt.value);
  s = v;
  return;
}


//function to insert 2nd operand to array on preesing =
//This find index at which operator occurs and 
//enters whole string between that operator and end of string to array 
//and then stores this string as an int in array n. 
function insarr2() {
  var str2 = [];
  str = txt.value.toString();
  str3 = str2.toString();
  for (var i = 0; i < str.length; i++) {
    if (regx1.test(str[i])) {
      while (i < str.length - 1) {
        str3 = str3.concat(str[++i]);
      }
      n[1] = Number(str3);
      return;
    }
  }
}

//function to output final result depending on operator
function dispresult() {
  var n1 = Number(n[0]), n2 = Number(n[1]);
  txt.style.color = 'rgb(8, 236, 46)';
  switch (s) {
    case '+':
      txt.value = n[0] + '+' + n[1] + '=' + (n1 + n2);
      break;
    case '-':
      txt.value = n[0] + '-' + n[1] + '=' + (n1 - n2);
      break;
    case '/':
      txt.value = n[0] + '/' + n[1] + '=' + (n1 / n2);
      break;
    case '*':
      txt.value = n[0] + '*' + n[1] + '=' + (n1 * n2);
      break;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////
/////// Deleted or replaced code sections  //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///ignore ..test command////
// document.getElementById("cancelbtn").style.backgroundColor='red';

//Below code was used earlier but replaced with [section1] code as it ws 
//interchanging button funcionalities if order of buttons changed
///////////////////////////////////////////////////////////////////////
// var bts = document.getElementsByTagName("button");
// bts[0].addEventListener("click", function () {
//   btnclk(7);
// });
// bts[1].addEventListener("click", function () {
//   btnclk(8);
// });
// bts[2].addEventListener("click", function () {
//   btnclk(9);
// });
// bts[3].addEventListener("click", function () {
//   btnclk("/");
// });
// bts[4].addEventListener("click", function () {
//   btnclk(4);
// });
// bts[5].addEventListener("click", function () {
//   btnclk(5);
// });
// bts[6].addEventListener("click", function () {
//   btnclk(6);
// });
// bts[7].addEventListener("click", function () {
//   btnclk("*");
// });
// bts[8].addEventListener("click", function () {
//   btnclk(1);
// });
// bts[9].addEventListener("click", function () {
//   btnclk(2);
// });
// bts[10].addEventListener("click", function () {
//   btnclk(3);
// });
// bts[11].addEventListener("click", function () {
//   btnclk("-");
// });
// bts[12].addEventListener("click", function () {
//   btnclk(0);
// });
// bts[13].addEventListener("click", function () {
//   btnclk(".");
// });
// bts[14].addEventListener("click", function () {
//   btnclk("=");
// });
// bts[15].addEventListener("click", function () {
//   btnclk("+");
// });
////////////////////////////////////////////////////////////////////////////////

//Below code deleted as its function performed during = enter
////////////////////////////////////////////////////////////////////////////////
// function checkb(v) {
//   var txt = document.querySelector("#text").value;
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
//     n[1] = v;
//     return;
//   } else return;
// }
/////////////////////////////////////////////////////////////////////////////////

// Code for detecting which key is pressed
//////////////////////////////////////////////////////////////////////////////
// function keypressidentify(){
//   alert("working");
//   window.addEventListener( "keydown", function(event) 
//   {   MyFunction(event.key);          }   ) 
    
//   function MyFunction (the_Key) 
//   { console.log("Key pressed is: "+the_Key);   }
// }

// also add attribute => onload="keypressidentify()" to call this function when page loads
////////////////////////////////////////////////////////////////////////////////
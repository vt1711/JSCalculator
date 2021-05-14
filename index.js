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
    case 0:
      textdisp(i);
      break;
    case "+":
    case "-":
    case "/":
    case "*":
    case "=":
    case ".":
      if (check(i)) textdisp(i);
      break;
  }
}
function textdisp(i) {
  var num1 = i.toString();
  var a = document.querySelector("#text").innerHTML;
  var num2 = a.toString();
  var fnum = num2.concat(num1);
  var b = (document.querySelector("#text").innerHTML = fnum);
  return;
}
function check(i) {
  var a = document.querySelector("#text").innerHTML;
  var str = a.toString();
  var last = str.charAt(str.length - 1);
 
  if (
    last == "+" ||
    last == "-" ||
    last == "/" ||
    last == "*" ||
    last == "=" ||
    last == "."
  ) {
    alert("Invalid ! Cannot enter " + i + " after " + last);
    return false;
  } 
  if(str.charAt(0)=='')
  {
    alert("Invalid ! Cannot enter " + i + " at start ");
    return false;
  }
  else return true;
}

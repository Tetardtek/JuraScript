
function faire(x){
document.getElementById(".").disabled=false;
OpClicked=true;
SelectedOp=x;
a=document.getElementById("label").value;
}

function calculer(){
var b=document.getElementById("label").value;
switch (SelectedOp) {
case '+': document.getElementById("label").value=parseFloat(a)+parseFloat(b); break;
case '-': document.getElementById("label").value=parseFloat(a)-parseFloat(b); break;
case '*': document.getElementById("label").value=parseFloat(a)*parseFloat(b); break;
case '/': if (b!=0) document.getElementById("label").value=parseFloat(a)/parseFloat(b);
else document.getElementById("label").value="impossible sur 0 !";
break;
}
SelectedOp="";
}
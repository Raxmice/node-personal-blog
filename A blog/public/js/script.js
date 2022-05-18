function compose(){
    var title=document.getElementById("ptitle").value;
    var text=document.getElementById("ptext").value;
    if(title == ""){
        document.getElementById("ptitle").style.border = "3px solid red";
    }
    if(text == ""){
        document.getElementById("ptext").style.border = "3px solid red";
    }
    if(title !== ""){
        document.getElementById("ptitle").style.border = "none";
    }
    if(text !== ""){
        document.getElementById("ptext").style.border = "none";
    }
    
}
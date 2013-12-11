﻿#pragma strict

var write : GUIText;
var prompt : GUIText;
var control: GUIText;
var displayText : boolean;

function Start () {
	Time.timeScale = 1;
	write.text ="Ragnarok";
	control.text = "Use arrows to control ship press space to fire and P to pause";
	flashLabel();
	
}
function Update(){

	if(Input.GetKeyDown(KeyCode.UpArrow)){
		Application.LoadLevel(1);
	}
}
function flashLabel(){
	while(1){
	yield WaitForSeconds(.5);
	displayText = true;
	showText();
	yield WaitForSeconds(.5);
	displayText = false;
	showText();
	}
}
function showText(){
	if(displayText == true){
		prompt.text = "Press UP to play";
	}else{
		prompt.text = "";
	}
}
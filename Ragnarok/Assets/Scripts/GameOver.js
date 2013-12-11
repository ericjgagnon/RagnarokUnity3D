#pragma strict

var gOverText : GUIText;
var promptText : GUIText;

function Start () {
	gOverText.text = "Game Over!";
	promptText.text = "Press UP to try again or ESC to quit";

}

function Update () {

	if(Input.GetKeyDown(KeyCode.UpArrow)){
		Application.LoadLevel(2);
	}
	if(Input.GetKeyDown(KeyCode.Escape)){
		Application.LoadLevel(0);
	}
}
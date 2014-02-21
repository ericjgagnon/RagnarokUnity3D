#pragma strict

var currentLevel : int = Application.loadedLevel;
var victoryText : GUIText;

function Awake(){

OnLevelWasLoaded(currentLevel);

}

function Update () {

DontDestroyOnLoad(gameObject);


}
function OnLevelWasLoaded(level : int){

	if(level == 3){
		victoryText.text = "";
	}
}
	
#pragma strict

var story : GUIText;
var start : GUIText;
var showText : boolean;

function Start () {
	Time.timeScale = 1;
	story.text = "In the year 4665, the human race has left Earth in\n"
				+ "search of habitable panet to live on. While searching\n"
				+ "for a new home the fleet of ships encountered a\n"
				+ "hostile alien race called the Drood. During a firefight\n"
				+ "with the Drood all ships were lost except for a lone\n"
				+ "survivor who was knocked unconscious when his ship\n"
				+ "was hit causing him to crash land on a nearby rock floating\n"
				+ "through space. Our hero awakens to space junk crashing\n"
				+ "into the rock and realizes that it is the remains of\n"
				+ "his fleet. With a heavy heart he rebuilds his ship with\n"
				+ "the parts he scavenges from the debris and prepares\n"
				+ "to avenge his fallen people...";
				flashText();

}

function Update () {

	if(Input.GetKeyDown(KeyCode.UpArrow)){
		Application.LoadLevel(2);
	}
}

function flashText(){
	while(1){
	yield WaitForSeconds(.5);
	showText = true;
	showIt();
	yield WaitForSeconds(.5);
	showText = false;
	showIt();
	}
}
function showIt(){
		if(showText == true){
		start.text = "Press UP to play";
	}else{
		start.text = "";
	}
}
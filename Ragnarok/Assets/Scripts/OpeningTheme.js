#pragma strict

var themeMusic : AudioClip;

function Awake(){
	DontDestroyOnLoad(gameObject);
}
function Start(){
	audio.PlayOneShot(themeMusic);
}
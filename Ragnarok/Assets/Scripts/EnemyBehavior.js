#pragma strict

var myTransform : Transform;
var ragnarok : PlayerController;
var drood : EnemyBehavior;
var target : Transform;
var playerPos : Vector3;
var eBullet : Rigidbody;
var enemyRespawnPoint : Transform;
var eSpawnPoint : Transform;
var scoreText : GUIText;
var winText : GUIText;
var lSound : AudioClip;
var boom : AudioClip;
private var eHP : int;
private var score : int;
var speed : float;
var delay : int;
private var killed : int;
var shoot : boolean;
var move : boolean;

function Start () {
	myTransform = transform;
	eHP = 8;
	killed = 0;
	score = 0;
	scoreText.text = "";
	enemyStat();
	winText.text = "";
	yield WaitForSeconds(1.5);
	shoot = true;
	move = true;
}

function Update () {
	
	playerPos = target.position;
	myTransform.position += myTransform.forward * speed * Time.deltaTime; 
	var lookDirection : Vector3 = target.position - myTransform.position; 
	var lookRot : Quaternion = Quaternion.LookRotation(lookDirection);
	if(move){
	myTransform.rotation = lookRot;

	move = false;
	lockOn();
	}
	if(shoot){
	var eLaser : Rigidbody = Instantiate(eBullet, eSpawnPoint.position, lookRot);
	eLaser.rigidbody.AddForce(playerPos * 100);
	audio.PlayOneShot(lSound);
	shoot = false;
	shootAgain();
	}
}
function shootAgain(){
	yield WaitForSeconds(delay);
	shoot = true;
}
function OnTriggerEnter(other : Collider){
	if(other.gameObject.tag == "Bullet"){
		other.gameObject.SetActive(false);
		eHP = eHP - 1;
		score = score + 5;
		enemyStat();
	}
}
function enemyStat(){
	scoreText.text = "Score: "+ score;
	if(eHP == 0){
		gameObject.SetActive(false);
		AudioSource.PlayClipAtPoint(boom, myTransform.position);
		killed++;
		respawn();
	}if(killed == 2){
		winText.text = "Victory!!!\n"
	 						+"Press UP to go to the title screen";
	 	ragnarok.done = true;
	 	}
}
function lockOn(){
	yield WaitForSeconds(.1);
	move = true;
}
function respawn(){
	gameObject.transform.position = enemyRespawnPoint.position;
	gameObject.SetActive(true);
	
}
	
		
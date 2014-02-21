#pragma strict

var myTransform : Transform;
var ragnarok : PlayerController;
var boomFX : GameObject;
var eBullet : Rigidbody;
var eSpawnPoint : Transform;
var hpPowerUp : Rigidbody;
var speedPUP : Rigidbody;
var scoreText : GUIText;
var winText : GUIText;
var lSound : AudioClip;
var boom : AudioClip;
var eHP : int;
private var score : int;
var enemyNum : int;
var delay : float; 
var killed : int;
var shoot : boolean;

function Start () {
	myTransform = transform;
	eHP = 8;
	killed = 0;
	score = 0;
	enemyNum = 2;
	scoreText.text = "";
	enemyStat();
	winText.text = "";
	yield WaitForSeconds(1.5);
	shoot = true;
}

function Update () {
	
	myTransform.position.z -= 0.025;

	if(shoot){
	fire();
	shootAgain();
	}
}
function fire(){
	var eLaser : Rigidbody = Instantiate(eBullet, eSpawnPoint.position, eSpawnPoint.rotation);
	eLaser.rigidbody.AddForce(transform.forward * 1000);
	audio.PlayOneShot(lSound);
	shoot = false;
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
	var pUPChooser = Random.Range(1, 6);
	
	scoreText.text = "Score: "+ score;
	
	if(eHP == 0 && killed != enemyNum){
		Destroy(gameObject);
		AudioSource.PlayClipAtPoint(boom, myTransform.position);
		Instantiate(boomFX, transform.position, transform.rotation);
		if(pUPChooser == 1){
		var hpUP : Rigidbody = Instantiate(hpPowerUp, eSpawnPoint.position, eSpawnPoint.rotation);
		hpUP.AddForce(-Vector3.forward * 500);
		}else if(pUPChooser == 2){
		var spdUP : Rigidbody = Instantiate(speedPUP, eSpawnPoint.position, eSpawnPoint.rotation);
		spdUP.AddForce(-Vector3.forward * 500);
		}
		
		killed++;
		
	}if(killed == enemyNum){
		winText.text = "VICTORY!!!\n"
	 						+"Press UP to go to the title screen\nor DOWN to play again";
	 	ragnarok.done = true;
	 	}
}

	
		
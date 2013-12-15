#pragma strict

var drood : EnemyBehavior;
var speed : float;
var bulletPrefab : Rigidbody;
var spawnPoint : Transform;
var startPosition : Vector3;
var startRotation : Quaternion;
var fireSound : AudioClip;
var explode : AudioClip;
var explodeFX : GameObject;
var hpText : GUIText;
var livesText : GUIText;
var escText : GUIText;
var done : boolean;
private var hp : int;
private var lives : int;
var isPaused : boolean;
var rotationSpeed : float =  1000f;

function Start () {
	startPosition = transform.position;
	startRotation = transform.rotation;
	Time.timeScale = 1;
	hp = 5;
	lives = 3;
	escText.text = "";
	done = false;
	isPaused = false;
	SetStatus();
}

function Update(){
	var rotation : float = Input.GetAxis("Horizontal") * rotationSpeed * .25;
	 
	transform.Rotate(0, 0, rotation);

	if(Input.GetKey(KeyCode.RightArrow)){
		gameObject.rigidbody.transform.position.x += 0.005 * speed;
		
	}
	if(Input.GetKey(KeyCode.LeftArrow)){
		gameObject.rigidbody.transform.position.x -= 0.005 * speed;
		
	}
	if(Input.GetKeyDown(KeyCode.Space)){
		var bullet : Rigidbody = Instantiate(bulletPrefab,spawnPoint.position, spawnPoint.rotation);
		bullet.rigidbody.AddForce(-bullet.transform.up * 1000);
		audio.PlayOneShot(fireSound);
	}
	if(done && Input.GetKeyDown(KeyCode.UpArrow)){
		Application.LoadLevel(0);
	}
	if(done && Input.GetKeyDown(KeyCode.DownArrow)){
		Application.LoadLevel(2);
	}
	if(Input.GetKeyDown(KeyCode.P)){
		pause();
		isPaused = !isPaused;
	}
	if(isPaused == true && Input.GetKeyDown(KeyCode.Escape)){
		Application.LoadLevel(0);
	}
	
}
function OnTriggerEnter(other : Collider){
	if(other.gameObject.tag == ("eBullet")){
		Destroy(other.gameObject);
		hp = hp - 1;
		SetStatus();
	}
	if(other.gameObject.tag == ("HPup")){
		Destroy(other.gameObject);
		if(drood.killed != drood.enemyNum){
		drood.winText.text = "HP + 1";
		yield WaitForSeconds(.5);
		drood.winText.text = "";
		}
		hp = hp + 1;
		SetStatus();
	}
	if(other.gameObject.tag == ("Spdup")){
		Destroy(other.gameObject);
		if(drood.killed != drood.enemyNum){
		drood.winText.text = "Speed Up";
		yield WaitForSeconds(.5);
		drood.winText.text = "";
		}
		speed = speed + 10;
	}
	if(other.gameObject.tag == ("Enemy")){
		hp = 0;
	}
	if(hp == 0){
	AudioSource.PlayClipAtPoint(explode, transform.position);
	Instantiate(explodeFX, transform.position, transform.rotation);
	lives = lives - 1;
	SetStatus();
		if(lives > -1){
			Respawn();
		}else{
		Destroy(gameObject);
		Application.LoadLevel(3);
		}
	}
}
function SetStatus(){
	hpText.text = "HP: " + hp;
	livesText.text = "Lives: " + lives;

}
function pause(){
	if(!isPaused){
		Time.timeScale = 0;
		drood.winText.text = "PAUSED";
		escText.text = "Press ESC to quit";
	}else{
		Time.timeScale = 1;
		drood.winText.text = "";
		escText.text = "";
	}
}
function Respawn(){
	transform.position = startPosition;
	transform.rotation = startRotation;
	hp = 5;
	SetStatus();
}

	
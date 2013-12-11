#pragma strict

var drood : EnemyBehavior;
var speed : float;
var bulletPrefab : Rigidbody;
var spawnPoint : Transform;
var fireSound : AudioClip;
var hpText : GUIText;
var escText : GUIText;
var done : boolean;
private var hp : int;
var isPaused : boolean;

function Start () {
	Time.timeScale = 1;
	hp = 5;
	escText.text = "";
	done = false;
	isPaused = false;
	SetStatus();
}

function Update(){
	

	if(Input.GetKey(KeyCode.RightArrow)){
		gameObject.rigidbody.transform.position.x += 0.005 * speed;
		
	}
	if(Input.GetKey(KeyCode.LeftArrow)){
		gameObject.rigidbody.transform.position.x -= 0.005 * speed;
		
	}
	if(Input.GetKeyDown(KeyCode.Space)){
		var bullet : Rigidbody = Instantiate(bulletPrefab,spawnPoint.position, spawnPoint.rotation);
		bullet.rigidbody.AddForce(Vector3.forward * 1000);
		audio.PlayOneShot(fireSound);
	}
	if(done && Input.GetKeyDown(KeyCode.UpArrow)){
		Application.LoadLevel(0);
	}
	if(Input.GetKeyDown(KeyCode.P)){
		pause();
		isPaused = !isPaused;
	}
	if(isPaused == true && Input.GetKeyDown(KeyCode.Escape)){
		Application.LoadLevel(0);
	}
	if(Input.GetKeyDown(KeyCode.X)){
	
	}
	if(Input.GetKeyDown(KeyCode.C)){
	
	}
}
function OnTriggerEnter(other : Collider){
	if(other.gameObject.tag == ("eBullet")){
		Destroy(other.gameObject);
		hp = hp - 1;
		SetStatus();
	}
	if(hp == 0){
	Destroy(gameObject);
	Application.LoadLevel(3);
	}
}
function SetStatus(){
	hpText.text = "HP: " + hp;

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

	
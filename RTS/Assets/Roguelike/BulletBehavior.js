#pragma strict

var madeByPlayer = false;
var vel = Vector2();
var speed = 0.0;

function Start ()
{
	
}

function Update ()
{
	vel = Vector2.ClampMagnitude(vel, speed);
	transform.position += vel;
	if (madeByPlayer && Vector2.Distance(transform.position, GameObject.Find("Human Peasant").transform.position) >= GameObject.Find("Human Peasant").GetComponent(PlayerBehavior).range)
		Destroy(gameObject);
}

function OnTriggerEnter (other : Collider)
{
	if (madeByPlayer && other.gameObject.tag == "Enemy")
	{
		other.gameObject.GetComponent(EnemyBehavior).hp --;
		if (other.gameObject.GetComponent(EnemyBehavior).hp <= 0)
			GameObject.Find("Human Peasant").GetComponent(PlayerBehavior).score += other.gameObject.GetComponent(EnemyBehavior).xp;
		Destroy(gameObject);
	}
	else if (!madeByPlayer && other.gameObject.name == "Human Peasant")
	{
		other.gameObject.GetComponent(PlayerBehavior).hp --;
		Destroy(gameObject);
	}
	else if (other.gameObject.tag == "Block")
		Destroy(gameObject);
}
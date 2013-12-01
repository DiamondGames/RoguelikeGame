#pragma strict

var gos2 = new ArrayList();
var block : GameObject;
var enemy : GameObject;
var enemyB : GameObject;
var enemyC : GameObject;
var BLOCK_CHANCE = 7;
var BLOCK_CHANCE_2 = 2;
var SIZEX = 10;
var SIZEY = 10;
var sizeLeft = 0;
var sizeDown = 0;
var numOfEnemiesCurrent : int;
var NUM_OF_ENEMIES_FINAL = 1;
var ENEMY_CHANCE = 100;
var randomVariation = 2;
//var TOTAL_BLOCK_NUM = 75;
var SPREAD_INFLUENCE_MIN = 3;
var SPREAD_INFLUENCE_MAX = 5;
var gos : GameObject[];
var startTime = 0.0;

function Start ()
{
	SIZEX = 100;
	SIZEY = 100;
	sizeLeft = SIZEX;
	sizeDown = SIZEY;
	numOfEnemiesCurrent = 0;
	gos = GameObject.FindGameObjectsWithTag("Block");
	for (var go : GameObject in gos)
		Destroy(go);
	gos = GameObject.FindGameObjectsWithTag("Bullet");
	for (var go : GameObject in gos)
		Destroy(go);
	gos = GameObject.FindGameObjectsWithTag("Enemy");
	for (var go : GameObject in gos)
		Destroy(go);
	for (var x2 = -SIZEX; x2 <= SIZEX; x2 ++)
		for (var y2 = -SIZEY; y2 <= SIZEY; y2 ++)
		{
			var b = false;
			if (Mathf.RoundToInt(Random.Range(1, ENEMY_CHANCE)) == 1)
			{
				b = true;
				gos2.Add(GameObject.Instantiate(enemy, Vector2(x2, y2), Quaternion.identity));
				numOfEnemiesCurrent ++;
				break;
			}
			if (Mathf.RoundToInt(Random.Range(1, ENEMY_CHANCE)) == 1)
			{
				b = true;
				if (b)
					Destroy(gos2[gos2.Count - 1]);
				gos2.Add(GameObject.Instantiate(enemyC, Vector2(x2, y2), Quaternion.identity));
				numOfEnemiesCurrent ++;
				break;
			}
			if (Mathf.RoundToInt(Random.Range(1, ENEMY_CHANCE * 2)) == 1)
			{
				if (b)
					Destroy(gos2[gos2.Count - 1]);
				gos2.Add(GameObject.Instantiate(enemyB, Vector2(x2, y2), Quaternion.identity));
				numOfEnemiesCurrent ++;
				break;
			}
		}
	if (randomVariation == 1)
	{
		gos = GameObject.FindGameObjectsWithTag("Enemy");
		for (var x = -SIZEX; x <= SIZEX; x ++)
			for (var y = -SIZEY; y <= SIZEY; y ++)
				if (Mathf.RoundToInt(Random.Range(1, BLOCK_CHANCE)) == 1 && Vector2.Distance(Vector2(x, y), Vector2(GameObject.Find("Human Peasant").transform.position.x, GameObject.Find("Human Peasant").transform.position.y)) > 10)
				{
					gos2.Add(GameObject.Instantiate(block, Vector2(x, y), Quaternion.identity));
					for (var go : GameObject in gos)
						if (Vector2.Distance(Vector2(x, y), Vector2(go.transform.position.x, go.transform.position.y)) == 0)
							Destroy(gos2[gos2.Count - 1]);
				}
	}
	else if (randomVariation == 2)
	{
		gos2.Add(GameObject.Instantiate(block, Vector2(0, -2), Quaternion.identity));
		var cycles = 2L;
		for (var blockNum = 0; blockNum <= cycles; blockNum += 0.1)
		{
			cycles += blockNum;
			if (Mathf.RoundToInt(Random.Range(1, BLOCK_CHANCE_2)) == 1 + BLOCK_CHANCE_2)
			{
				var go4 : GameObject;
				go4 = gos2[gos2.Count - 1];
				var r = Mathf.RoundToInt(Random.Range(1, 4));
				if (r == 1)
					gos2.Add(GameObject.Instantiate(block, Vector2(go4.transform.position.x, go4.transform.position.y + 1), Quaternion.identity));
				else if (r == 2)
					gos2.Add(GameObject.Instantiate(block, Vector2(go4.transform.position.x + 1, go4.transform.position.y), Quaternion.identity));
				else if (r == 3)
					gos2.Add(GameObject.Instantiate(block, Vector2(go4.transform.position.x , go4.transform.position.y - 1), Quaternion.identity));
				else if (r == 4)
					gos2.Add(GameObject.Instantiate(block, Vector2(go4.transform.position.x - 1, go4.transform.position.y), Quaternion.identity));
				var alive = true;
				go4 = gos2[gos2.Count - 1];
				gos = GameObject.FindGameObjectsWithTag("Enemy");
				for (var go : GameObject in gos)
					if (Vector2.Distance(Vector2(go4.transform.position.x, go4.transform.position.y), Vector2(go.transform.position.x, go.transform.position.y)) == 0)
					{
						Destroy(gos2[gos2.Count - 1]);
						alive = false;
					}
				gos = GameObject.FindGameObjectsWithTag("Block");
				for (var go : GameObject in gos)
					if (go != gos2[gos2.Count - 1] && Vector2.Distance(Vector2(go4.transform.position.x, go4.transform.position.y), Vector2(go.transform.position.x, go.transform.position.y)) == 00)
					{
						Destroy(gos2[gos2.Count - 1]);
						alive = false;
					}
				if ((go4.transform.position.x < -SIZEX || go4.transform.position.x > SIZEX || go4.transform.position.y < -SIZEY || go4.transform.position.y > SIZEY) || Vector2.Distance(Vector2(go4.transform.position.x, go4.transform.position.y), Vector2(GameObject.Find("Human Peasant").transform.position.x, GameObject.Find("Human Peasant").transform.position.y)) < 3)
				{
					Destroy(gos2[gos2.Count - 1]);
					alive = false;
				}
				if (alive)
					blockNum ++;
			}
			else
			{
				var go5 : GameObject;
				var createLoc = Vector2(Mathf.RoundToInt(Random.Range(-SIZEX, SIZEX)), Mathf.RoundToInt(Random.Range(-SIZEY, SIZEY)));
				gos2.Add(GameObject.Instantiate(block, Vector2(createLoc.x, createLoc.y + 1), Quaternion.identity));
				var alive2 = true;
				gos = GameObject.FindGameObjectsWithTag("Enemy");
				for (var i2 = 0; i2 < gos2.Count; i2 ++)
				{
					go5 = gos2[i2];
					for (var go : GameObject in gos)
						if (Vector2.Distance(Vector2(go5.transform.position.x, go5.transform.position.y), Vector2(go.transform.position.x, go.transform.position.y)) == 0)
						{
							Destroy(gos2[gos2.Count - 1]);
							alive2 = false;
						}
					gos = GameObject.FindGameObjectsWithTag("Block");
					for (var go : GameObject in gos)
						if (go != gos2[gos2.Count - 1] && Vector2.Distance(Vector2(go5.transform.position.x, go5.transform.position.y), Vector2(go.transform.position.x, go.transform.position.y)) < SPREAD_INFLUENCE_MIN || Vector2.Distance(Vector2(go5.transform.position.x, go5.transform.position.y), Vector2(go.transform.position.x, go.transform.position.y)) > SPREAD_INFLUENCE_MAX)
						{
							Destroy(gos2[gos2.Count - 1]);
							alive2 = false;
						}
					go5 = gos2[gos2.Count - 1];
					if (Vector2.Distance(Vector2(go5.transform.position.x, go5.transform.position.y), Vector2(GameObject.Find("Human Peasant").transform.position.x, GameObject.Find("Human Peasant").transform.position.y)) < 3)
					{
						Destroy(gos2[gos2.Count - 1]);
						alive2 = false;
					}
				}
				if (alive2)
					blockNum ++;
			}
			if (cycles >= (SIZEX * 2 + 1) * (SIZEY * 2 + 1) * 1 || blockNum >= (SIZEX * 2 + 1) * (SIZEY * 2 + 1) / 10)
				cycles = 0;
		}
		Debug.Log("Blocks: " + blockNum);
		Debug.Log("Blocks & spaces:" + ((SIZEX * 2 + 1) * (SIZEY * 2 + 1)));
		Debug.Log("Ideal num of blocks: " + ((SIZEX * 2 + 1) * (SIZEY * 2 + 1) / 10));
	}
	startTime = Time.time;
}

function Update ()
{
	if (GameObject.Find("Human Peasant").transform.position.x > SIZEX - 50)
	{
		for (var y5 = -sizeDown; y5 <= SIZEY; y5 ++)
		{
			var b2 = false;
			if (Mathf.RoundToInt(Random.Range(1, ENEMY_CHANCE)) == 1)
			{
				b2 = true;
				gos2.Add(GameObject.Instantiate(enemy, Vector2(SIZEX + 1, y5), Quaternion.identity));
				numOfEnemiesCurrent ++;
				break;
			}
			if (Mathf.RoundToInt(Random.Range(1, ENEMY_CHANCE * 2)) == 1)
			{
				if (b2)
					Destroy(gos2[gos2.Count - 1]);
				gos2.Add(GameObject.Instantiate(enemyB, Vector2(-sizeLeft - 1, y5), Quaternion.identity));
				numOfEnemiesCurrent ++;
				break;
			}
		}
		if (randomVariation == 1)
		{
			gos = GameObject.FindGameObjectsWithTag("Enemy");
			for (var y6 = -SIZEY; y6 <= SIZEY; y6 ++)
				if (Mathf.RoundToInt(Random.Range(1, BLOCK_CHANCE)) == 1)
				{
					gos2.Add(GameObject.Instantiate(block, Vector2(SIZEX + 1, y6), Quaternion.identity));
					for (var go : GameObject in gos)
						if (Vector2.Distance(Vector2(SIZEX + 1, y6), Vector2(go.transform.position.x, go.transform.position.y)) == 0)
							Destroy(gos2[gos2.Count - 1]);
				}
			SIZEX ++;
		}
	}
	else if (GameObject.Find("Human Peasant").transform.position.x < -sizeLeft + 50)
	{
		for (var y3 = -sizeDown; y3 <= SIZEY; y3 ++)
		{
			var b3 = false;
			if (Mathf.RoundToInt(Random.Range(1, ENEMY_CHANCE)) == 1)
			{
				b3 = true;
				gos2.Add(GameObject.Instantiate(enemy, Vector2(-sizeLeft - 1, y3), Quaternion.identity));
				numOfEnemiesCurrent ++;
				break;
			}
			if (Mathf.RoundToInt(Random.Range(1, ENEMY_CHANCE * 2)) == 1)
			{
				if (b3)
					Destroy(gos2[gos2.Count - 1]);
				gos2.Add(GameObject.Instantiate(enemyB, Vector2(-sizeLeft - 1, y3), Quaternion.identity));
				numOfEnemiesCurrent ++;
				break;
			}
		}
		if (randomVariation == 1)
		{
			gos = GameObject.FindGameObjectsWithTag("Enemy");
			for (var y4 = -SIZEY; y4 <= SIZEY; y4 ++)
				if (Mathf.RoundToInt(Random.Range(1, BLOCK_CHANCE)) == 1)
				{
					gos2.Add(GameObject.Instantiate(block, Vector2(-sizeLeft - 1, y4), Quaternion.identity));
					for (var go : GameObject in gos)
						if (Vector2.Distance(Vector2(-sizeLeft - 1, y4), Vector2(go.transform.position.x, go.transform.position.y)) == 0)
							Destroy(gos2[gos2.Count - 1]);
				}
			sizeLeft ++;
		}
	}
	else if (GameObject.Find("Human Peasant").transform.position.y > SIZEY - 50)
	{
		for (var x5 = -sizeLeft; x5 <= SIZEX; x5 ++)
		{
			var b4 = false;
			if (Mathf.RoundToInt(Random.Range(1, ENEMY_CHANCE)) == 1)
			{
				b4 = true;
				gos2.Add(GameObject.Instantiate(enemy, Vector2(x5, SIZEY + 1), Quaternion.identity));
				numOfEnemiesCurrent ++;
				break;
			}
			if (Mathf.RoundToInt(Random.Range(1, ENEMY_CHANCE * 2)) == 1)
			{
				if (b4)
					Destroy(gos2[gos2.Count - 1]);
				gos2.Add(GameObject.Instantiate(enemyB, Vector2(x5, SIZEY + 1), Quaternion.identity));
				numOfEnemiesCurrent ++;
				break;
			}
		}
		if (randomVariation == 1)
		{
			gos = GameObject.FindGameObjectsWithTag("Enemy");
			for (var x6 = -sizeLeft; x6 <= SIZEX; x6 ++)
				if (Mathf.RoundToInt(Random.Range(1, BLOCK_CHANCE)) == 1)
				{
					gos2.Add(GameObject.Instantiate(block, Vector2(x6, SIZEY + 1), Quaternion.identity));
					for (var go : GameObject in gos)
						if (Vector2.Distance(Vector2(x6, SIZEY + 1), Vector2(go.transform.position.x, go.transform.position.y)) == 0)
							Destroy(gos2[gos2.Count - 1]);
				}
			SIZEY ++;
		}
	}
	else if (GameObject.Find("Human Peasant").transform.position.y < -sizeDown + 50)
	{
		for (var x7 = -sizeLeft; x7 <= SIZEX; x7 ++)
		{
			var b5 = false;
			if (Mathf.RoundToInt(Random.Range(1, ENEMY_CHANCE)) == 1)
			{
				b5 = true;
				gos2.Add(GameObject.Instantiate(enemy, Vector2(x7, -sizeDown - 1), Quaternion.identity));
				numOfEnemiesCurrent ++;
				break;
			}
			if (Mathf.RoundToInt(Random.Range(1, ENEMY_CHANCE * 2)) == 1)
			{
				if (b5)
					Destroy(gos2[gos2.Count - 1]);
				gos2.Add(GameObject.Instantiate(enemyB, Vector2(x7, -sizeDown - 1), Quaternion.identity));
				numOfEnemiesCurrent ++;
				break;
			}
		}
		if (randomVariation == 1)
		{
			gos = GameObject.FindGameObjectsWithTag("Enemy");
			for (var x8 = -sizeLeft; x8 <= SIZEX; x8 ++)
				if (Mathf.RoundToInt(Random.Range(1, BLOCK_CHANCE)) == 1)
				{
					gos2.Add(GameObject.Instantiate(block, Vector2(x8, -sizeDown - 1), Quaternion.identity));
					for (var go : GameObject in gos)
						if (Vector2.Distance(Vector2(x8, SIZEY + 1), Vector2(go.transform.position.x, go.transform.position.y)) == 0)
							Destroy(gos2[gos2.Count - 1]);
				}
			sizeDown ++;
		}
	}
	if (Time.time - startTime % 10 == 0 && ENEMY_CHANCE > 2)
		ENEMY_CHANCE --;
}

function OnGUI ()
{
	GUI.Label (Rect (10, 30, 100, 20), "" + (Time.time - startTime));
}
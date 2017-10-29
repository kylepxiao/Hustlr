
/**
Use this method

Pass the latitude-longitude pairs as an array of length 2 arrays (pointList)
center is a length 2 array representing the coordinates the user has selected
Keep tries anywhere from 5-10 and times from 500-2000
*/
function preprocessData (pointList, center, tries, times) {
	var midX = 0;
	var midY = 0;

	for (i = 0; i < pointList.length; i++) {
		midX += pointList[i][0];
		midY += pointList[i][1];
	}

	midX /= pointList.length;
	midY /= pointList.length;

	var processedPointList = [];

	for (i = 0; i < pointList.length; i++) {
		var temp = [(pointList[i][0] - midX) * 69, (pointList[i][1] - midY) * 69];
		processedPointList.push(temp);
	}

	newCenter = [(center[0] - midX) * 69, (center[1] - midY) * 69]

	var returnValues = findOptimalPoint(processedPointList, newCenter, tries, times);

	returnLong = returnValues[0] / 69.0 + midX;
	returnLat = returnValues[1] / 69.0 + midY;

	return [returnLong, returnLat];
}

function preprocessDataAlt (pointList, center, tries, times) {
	var processedPointList = [];

	for (i = 0; i < pointList.length; i++) {
		var temp = [(pointList[i][0] - center[0]) * 69, (pointList[i][1] - center[1]) * 69];
		processedPointList.push(temp);
	}

	newCenter = [0, 0]

	var returnValues = findOptimalPoint(processedPointList, newCenter, tries, times);

	returnLong = returnValues[0] / 69.0 + center[0];
	returnLat = returnValues[1] / 69.0 + center[1];

	return [returnLong, returnLat];
}

function findOptimalPoint (pointList, center, tries, times) {
	var bestVM = 1000000;
	var bestPos = [0,0];

	for (i = -10; i < 10; i+=0.01) {
		for (j = -10; j < 10; j+=0.01) {
			var validityMeasure = 0;

			for (p = 0; p < pointList.length; p++) {
				var x = pointList[p][0] - j;
				var y = pointList[p][1] - i;

				validityMeasure += (x*x + y*y);
			}

			if (validityMeasure < bestVM) {
				bestVM = validityMeasure;
				bestPos = [i,j];
			}
		}
	}

	return bestPos;
}


function findOptimalPoint2 (pointList, center, tries, times) {
	var bestLong = 0;
	var bestLat = 0;
	var posMeasure = 1000000;

	//Number of points to be tested
	for (i = 0; i < tries; i++) {
		var pointLong = center[0] + 12*Math.random() - 6;
		var pointLat = center[1] + 12*Math.random() - 6;

		var newMeasure = 0;

		var forceX = 0;
		var forceY = 0;

		for (t = 0; t < times; t++) {
			for (p = 0; p < pointList.length; p++) {
				disX = pointList[p][0] - pointLong;
				disY = pointList[p][1] - pointLat;
				if (Math.sqrt(disX*disX + disY*disY) < 10) {
					forceX -= 0.03/(disX*disX + disY*disY + 0.0001) * disX;
					forceY -= 0.03/(disX*disX + disY*disY + 0.0001) * disX;
				}

				if (t == times - 1) {
					posMeasure += 1 / (Math.abs(disX) + Math.abs(disY));
				}
			}

			cdisX = pointLong - center[0];
			cdisY = pointLat - center[0];

			center_distance = Math.sqrt(cdisX*cdisX + cdisY*cdisY);

			//10 miles bound distance = 1/7 of a degree
			bound_distance = 10 - center_distance;

			if (center_distance > 5) {
				forceX -= 1/(center_distance * bound_distance + 0.0001) * cdisX;
				forceY -= 1/(center_distance * bound_distance + 0.0001) * cdisY;
			}

			pointLong += forceX;
			pointLat += forceY;
		}

		if(newMeasure < posMeasure) {
			posMeasure = newMeasure;
			bestLat = pointLat;
			bestLong = pointLong;
		}
	}

	return [bestLong, bestLat, posMeasure];
}


data = []

for (i = -10; i < 10; i++) {
	data.push([i,i]);
}

center = [0, 0];

results = preprocessData(data, center, 10, 500);
results2 = preprocessData(data, center, 10, 500);

console.log(results);
console.log(results2);

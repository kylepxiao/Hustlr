
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
		var temp = [(pointList[i][0] - midX) * 70, (pointList[i][1] - midY) * 70];
		processedPointList.push(temp);
	}

	newCenter = [(center[0] - midX) * 70, (center[1] - midY) * 70]

	var returnValues = findOptimalPoint(processedPointList, newCenter, tries, times);

	returnLong = returnValues[0] / 69.0 + midX;
	returnLat = returnValues[1] / 69.0 + midY;

	return [returnLong, returnLat];
}

function findOptimalPoint (pointList, center, tries, times) {
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
					forceX -= 0.01/(disX*disX + disY*disY + 0.0001) * disX;
					forceY -= 0.01/(disX*disX + disY*disY + 0.0001) * disX;
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
				forceX -= 1/(center_distance * bound_distance + 0.0001) * pointLong;
				forceY -= 1/(center_distance * bound_distance + 0.0001) * pointLat;
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




data1 = [30.14, 30];
data2 = [29.86, 30];
data3 = [30, 29.86];
data4 = [29.86, 30.14];
data5 = [30.14, 30.14];

data = [data1, data2, data3, data4, data5];
center = [30, 30];

results = preprocessData(data, center, 5, 500);

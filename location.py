import numpy as np
from matplotlib import pyplot as plot


point_num = 50

points = [20 * np.random.rand(2) - 10 for i in range(point_num)]


new_points = 16 * np.random.rand(10,2) - 8

x2 = np.zeros(0)
y2 = np.zeros(0)

for p in range(10):
    for t in range(1000):
        #print(new_points[p])
        force = np.zeros(2)


        for i in range(point_num):
            dis = (points[i] - new_points[p])
            if(dis[0]**2 + dis[1]**2 < 15):
                force -= (0.1/(pow(dis[0]**2 + dis[1]**2, 1) + 1e-6)) * dis

        center_distance = np.sqrt(new_points[p][0]**2 + new_points[p][1]**2)
        bound_distance = 10 - center_distance

        if(center_distance > 9):
            force -= (1/(center_distance * bound_distance + 1e-6)) * new_points[p]

        new_points[p] += force


    #print(new_points[p])

    x2 = np.append(x2, new_points[p][0])
    y2 = np.append(y2, new_points[p][1])




x = np.zeros(0)
y = np.zeros(0)

for i in range(point_num):
    x = np.append(x, np.array(points[i][0]))
    y = np.append(y, np.array(points[i][1]))


plot.scatter(x,y,s=1000,color='blue')
plot.scatter(x2,y2,s=1000,color='red')
plot.show()

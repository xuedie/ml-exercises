/* Class definitions */

/* A Point has a position defined by x, y and a centroid that it can be assigned to.
  When no centroid is assigned, the following is true: this.centroid === undefined
  Points are created when data is loaded. You shouldn't need to call new Point(...).
*/
function Point(x, y, centroid) {
  this.x = x;
  this.y = y;
  this.centroid = centroid;
}

/* A Centroid has a position defined by x,y.
  Centroids are created and removed by clicking on the Add Centroid and Remove Centroid buttons.
  You shouldn't need to call new Centroid(...).
  The id field is needed so that the same color is always used when displaying the centroid. Ignore this field.
*/ 
function Centroid(x, y, id) {
  this.x = x;
  this.y = y;
  this.id = id;
}

/* App variables */

//centroids is a list of the current centroids. It starts empty until you click on add centroid.
var centroids = [];

//points is a list of currently displayed points.
var points = [];


/* IMPLEMENT THE FUNCTIONS BELOW
--------------------------------
*/

/* For each point, assign it to the cluster represented by the closest centroid */
function assignCentroids() {
  var i, j;
  var lenp = points.length;
  var lenc = centroids.length;
  for(i = 0; i < lenp; ++i) {
    var mindis = -1;
    var ind = 0;
    for (j = 0; j < lenc; ++j) {
      var dis = (points[i].x - centroids[j].x)*(points[i].x - centroids[j].x)+(points[i].y - centroids[j].y)*(points[i].y - centroids[j].y);
      if (mindis < 0 || mindis > dis) {
        ind = j;
        mindis = dis;
      }
    }
    points[i].centroid = centroids[ind];
  }
}

/* Update the position of each centroid based on the points assigned to it. 
  The new position should be the mean of the positions of the points assigned to it.
*/
function updateCentroids() {
  var i, j;
  var lenp = points.length;
  var lenc = centroids.length;
  for (i = 0; i < lenc; ++i) {
    var minX = -1;
    var minY = -1;
    var maxX = -1;
    var maxY = -1;
    for (j = 0; j < lenp; ++j) {
      if (points[j].centroid.id == centroids[i].id) {
        if (minX < 0 || minX > points[j].x) {
          minX = points[j].x;
        }
        if (maxX < 0 || maxX < points[j].x) {
          maxX = points[j].x;
        }
        if (minY < 0 || minY > points[j].y) {
          minY = points[j].y;
        }
        if (maxY < 0 || maxY < points[j].y) {
          maxY = points[j].y;
        }
      }
    }
    centroids[i].x = (minX + maxX)/2.0;
    centroids[i].y = (minY + maxY)/2.0;
  }
}

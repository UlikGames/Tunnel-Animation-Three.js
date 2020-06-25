// Get window size
var ww = window.innerWidth,
    wh = window.innerHeight;

// Create a WebGL renderer
var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas")
});
renderer.setSize(ww, wh);

// Create an empty scene
var scene = new THREE.Scene();

// Create a perpsective camera
var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000);
camera.position.z = 100;

// Array of points
var points = [
  [18.1, 58.2],
  [93.6, 8.6],
  [145.3, 89.5],
  [75.9, 148],
  [81.7, 90.2],
  [18.1, 58.2]
];

// Convert the array of points into vertices
for (var i = 0; i < points.length; i++) {
  var x = points[i][0];
  var y = 0;
  var z = points[i][1];
  points[i] = new THREE.Vector3(x, y, z);
}

// Create a smooth 3d spline curve from the points
var path = new THREE.CatmullRomCurve3(points);


// Create the tube geometry from the path
// 1st param is the path
// 2nd param is the amount of segments we want to make the tube
// 3rd param is the radius of the tube
// 4th param is the amount of segment along the radius
// 5th param specify if we want the tube to be closed or not
var geometry = new THREE.TubeGeometry( path, 1, 2, 20, true);

// Set colors
var colors = [0x8664d4,0x4dc2cc,0x4d86cc];
// Loop through all those colors
for(var i=0;i<colors.length;i++){
  // Create a new geometry with a different radius
  var geometry = new THREE.TubeBufferGeometry( path, 100, (i*2)+4, 10, true );
  // Set a new material with a new color and a different opacity
  var material = new THREE.MeshBasicMaterial({
    color:colors[i],
    transparent:true,
    wireframe:true, //Display tube as a wireframe
    opacity : ((1- i/5)*0.5 + 0.1)
  });
  // Create a mesh
  var tube = new THREE.Mesh( geometry, material );
  // Push the mesh into the scene
  scene.add( tube );
}

// Create a mesh
var tube = new THREE.Mesh( geometry, material );
// Add tube into the scene
scene.add( tube );

// Start the percentage at 0
var percentage = 0;
function render(){
  percentage += 0.0010;
  var p1 = path.getPointAt(percentage%1);
  // Get another point along the path but further
  var p2 = path.getPointAt((percentage + 0.01)%1);
  camera.position.set(p1.x,p1.y,p1.z);
  // Rotate the camera into the orientation of the second point
  camera.lookAt(p2);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
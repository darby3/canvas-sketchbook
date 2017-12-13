(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin using threejs as well");

    var renderer = null;
    var scene = null;
    var camera = null;
    var cube = null;
    var lightCube = null;

    var duration = 5000; // ms
    var currentTime = Date.now();

    var lightAngle = 0;

    function animate() {
      // Animate the cube
      // var now = Date.now();
      // var deltat = now - currentTime;
      // currentTime = now;
      // var fract = deltat / duration;
      // var angle = Math.PI * 2 * fract;
      // cube.rotation.x += angle;
      // cube.rotation.y += angle;
      // cube.rotation.z += angle;

      // Animate the light
      var lightX = Math.sin(lightAngle) * 2;
      light.position.set(lightX, 1, -2);

      lightCube.position.set(lightX, 1, -3);
      lightCubeAlt.position.set(lightX, -1, -3);

      lightAngle += 0.01;
    }

    function run() {
      requestAnimationFrame(run);

      // Render the scene
      renderer.render( scene, camera );

      // Spin the cube for next frame
      animate();
    }


    var canvas = document.getElementById('canvas');

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    scene.add(camera);

    // Add a directional light to show off the object
    var light = new THREE.PointLight(0xffffff, 1, 100);

    // Position the light out from the scene, pointing at the origin
    light.position.set(0, 0, 0);
    scene.add( light );

    // Now, create a Phong material to show shading
    var material = new THREE.MeshPhongMaterial({ 
      color: 0xff0000
    });

    var materialAlt = new THREE.MeshPhongMaterial({ 
      color: 0x00ff00
    });

    // Create the cube geometry
    var geometry = new THREE.CubeGeometry(4, 2, 2);

    // And put the geometry and material together into a mesh
    cube = new THREE.Mesh(geometry, material);

    // Move the mesh back from the camera and tilt it toward the viewer
    cube.position.z = -8;
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;

    // Finally, add the mesh to our scene
    scene.add( cube );

    // Light point mesh
    var lightGeometry = new THREE.CubeGeometry(0.1, 0.1, 0.1);
    lightCube = new THREE.Mesh(lightGeometry, materialAlt);
    lightCube.position.z = -4;

    lightCubeAlt = new THREE.Mesh(lightGeometry, materialAlt);
    lightCubeAlt.position.z = -4;

    scene.add(lightCube);
    scene.add(lightCubeAlt);


    // Run the run loop
    run();




    // // Common
    // var canvas = document.getElementById('canvas');
    // var ctx = canvas.getContext('2d');

    // var mouse = utils.captureMouse(canvas);

    // // Other code

    // // Draw loop
    // function drawFrame() {
    //   requestAnimationFrame(drawFrame, ctx);
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);

    //   // code
    // }

    // drawFrame();

  });
}());

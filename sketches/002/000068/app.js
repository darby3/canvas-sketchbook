(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin using threejs as well");

    var renderer = null;
    var scene = null;
    var camera = null;
    var cube = null;
    var lightCube = null;
    var lightCubeAlt = null;
    var lightCubeSwoop = null;

    var duration = 10000; // ms
    var currentTime = Date.now();

    var lightAngleX = 0;
    var lightAngleY = 0;

    var otherLightAngleX = Math.PI;
    var otherLightAngleY = Math.PI;

    var scaleAngle = 0;

    function animate() {
      // Animate the cube
      // var now = Date.now();
      // var deltat = now - currentTime;
      // currentTime = now;
      // var fract = deltat / duration;
      // var angle = Math.PI * 2 * fract;
      // cube.rotation.x += angle;
      // // cube.rotation.y += angle;
      // cube.rotation.z += angle;

      // var scaleFactor = (Math.sin(scaleAngle) + 1.1) * 0.5;
      // cube.scale.x = scaleFactor;
      // cube.scale.y = scaleFactor;
      // cube.scale.z = scaleFactor;
      // scaleAngle += 0.025;


      // Animate the light
      var lightX = Math.sin(lightAngleX) * 4;
      var lightY = Math.sin(lightAngleY) * 2;

      var otherLightX = Math.sin(otherLightAngleX) * 4;
      var otherLightY = Math.sin(otherLightAngleY) * 2;

      light.position.set(lightX, lightY, -5);
      otherLight.position.set(otherLightX, otherLightY, -5);

      // lightCube.position.set(lightX, 1, -3);
      // lightCubeAlt.position.set(lightX, -1, -3);
      // lightCubeSwoop.position.set(lightX, lightY, -3);

      lightAngleX += 0.01;
      lightAngleY += 0.03;
      otherLightAngleX += 0.005;
      otherLightAngleY += 0.03;
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
    var light = new THREE.PointLight(0x00ff00, 1, 2);

    // Position the light out from the scene, pointing at the origin
    light.position.set(0, 0, 0);
    scene.add( light );

    // Add a directional light to show off the object
    var otherLight = new THREE.PointLight(0x0000ff, 1, 2);

    // Position the light out from the scene, pointing at the origin
    otherLight.position.set(0, 0, 0);
    scene.add( otherLight );

    // Now, create a Phong material to show shading
    var material = new THREE.MeshPhongMaterial({ 
      color: 0xffffff
    });

    var materialAlt = new THREE.MeshPhongMaterial({ 
      color: 0x00ff00
    });

    var materialSwoop = new THREE.MeshPhongMaterial({ 
      color: 0xffffff
    });

    // Create the cube geometry
    var geometry = new THREE.CubeGeometry(1, 1, 1);

    // Create a grid of x/y coords and create a bunch of cubes that land on
    // those coords.

    var simpleGrid = new GridDimensional(7, 12, [-3.25, 1.75], [3.25, -1.75]);

    var setOfCubes = [];

    for (var r = 0; r < simpleGrid.gridMatrix.length; r++) {
      for (var c = 0; c < simpleGrid.gridMatrix[r].length; c++) {
        var coolCube = new THREE.Mesh(geometry, material); 
        coolCube.position.z = -5;
        coolCube.position.x = simpleGrid.gridMatrix[r][c][0];
        coolCube.position.y = simpleGrid.gridMatrix[r][c][1];

        coolCube.scale.x = 0.375;
        coolCube.scale.y = 0.375;
        coolCube.scale.z = 0.375;

        setOfCubes.push(coolCube);
      }
    }

    console.log(
      "setOfCubes.length -- " + 
       setOfCubes.length
    );

    setOfCubes.forEach(function(element) {
      scene.add(element);
    });

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

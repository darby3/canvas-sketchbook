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
      var now = Date.now();
      var deltat = now - currentTime;
      currentTime = now;
      var fract = deltat / duration;
      var angle = Math.PI * 2 * fract;
      cube.rotation.x += angle;
      // cube.rotation.y += angle;
      cube.rotation.z += angle;

      var scaleFactor = (Math.sin(scaleAngle) + 1.1) * 0.5;
      cube.scale.x = scaleFactor;
      cube.scale.y = scaleFactor;
      cube.scale.z = scaleFactor;
      scaleAngle += 0.025;


      // Animate the light
      var lightX = Math.sin(lightAngleX) * 2;
      var lightY = Math.sin(lightAngleY);

      var otherLightX = Math.sin(otherLightAngleX) * 2;
      var otherLightY = Math.sin(otherLightAngleY);

      light.position.set(lightX, lightY, 4);
      otherLight.position.set(otherLightX, otherLightY, 4);

      // lightCube.position.set(lightX, 1, -3);
      // lightCubeAlt.position.set(lightX, -1, -3);
      // lightCubeSwoop.position.set(lightX, lightY, -3);

      lightAngleX += 0.01;
      lightAngleY += 0.03;
      otherLightAngleX += 0.01;
      otherLightAngleY += 0.06;
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
    var light = new THREE.PointLight(0x00ff00, 2, 100);

    // Position the light out from the scene, pointing at the origin
    light.position.set(0, 0, 0);
    scene.add( light );

    // Add a directional light to show off the object
    var otherLight = new THREE.PointLight(0x0000ff, 2, 100);

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
    var geometry = new THREE.CubeGeometry(16, 16, 16);

    // And put the geometry and material together into a mesh
    cube = new THREE.Mesh(geometry, material);

    // Move the mesh back from the camera and tilt it toward the viewer
    cube.position.z = -16;
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;

    // Finally, add the mesh to our scene
    scene.add( cube );

    // Light point mesh
    // var lightGeometry = new THREE.CubeGeometry(0.1, 0.1, 0.1);
    // lightCube = new THREE.Mesh(lightGeometry, materialAlt);
    // lightCube.position.z = -4;

    // lightCubeAlt = new THREE.Mesh(lightGeometry, materialAlt);
    // lightCubeAlt.position.z = -4;

    // var lightSwoopGeometry = new THREE.CubeGeometry(0.05, 0.05, 0.05);
    // lightCubeSwoop = new THREE.Mesh(lightSwoopGeometry, materialSwoop);
    // lightCubeSwoop.position.z = -4;

    // scene.add(lightCube);
    // scene.add(lightCubeAlt);
    // scene.add(lightCubeSwoop);

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

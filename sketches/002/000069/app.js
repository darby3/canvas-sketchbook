(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin using threejs as well");

    var renderer = null;
    var scene = null;
    var camera = null;
    var cube = null;

    var lightAngleX = 0;
    var lightAngleY = 0;
    var scaleAngle = 0;

    function animate() {
      var scaleFactor = (Math.sin(scaleAngle) + 1.1) * 0.25;
      setOfCubes.forEach(function(el) {
        el.scale.x = scaleFactor;
        el.scale.y = scaleFactor;
        el.scale.z = scaleFactor;
      });
      scaleAngle += 0.025;

      var lightX = Math.sin(lightAngleX) * 4;
      var lightY = Math.sin(lightAngleY) * 2;

      light.position.set(lightX, lightY, -1);

      lightAngleX += 0.01;
      lightAngleY += 0.03;
      otherLightAngleX += 0.005;
      otherLightAngleY += 0.03;
    }

    function run() {
      requestAnimationFrame(run);
      renderer.render( scene, camera );
      animate();
    }

    var canvas = document.getElementById('canvas');

    // Three.js set-up
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer.setSize(canvas.width, canvas.height);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );

    scene.add(camera);

    // Lighting
    var light = new THREE.PointLight(0xffffff, 2, 10);
    light.position.set(0, 0, 0);
    scene.add( light );

    // Material + geometry = object
    var material = new THREE.MeshPhongMaterial({
      color: 0x008888
    });

    var geometry = new THREE.CubeGeometry(1, 1, 1);

    // Create a grid of x/y coords.
    var simpleGrid = new GridDimensional(7, 12, [-3.15, 1.75], [3.15, -1.75]);

    // Create a bunch of cubes.
    var setOfCubes = [];

    for (var r = 0; r < simpleGrid.gridMatrix.length; r++) {
      for (var c = 0; c < simpleGrid.gridMatrix[r].length; c++) {
        var coolCube = new THREE.Mesh(geometry, material);

        coolCube.position.z = -5;
        coolCube.position.x = simpleGrid.gridMatrix[r][c][0];
        coolCube.position.y = simpleGrid.gridMatrix[r][c][1];

        coolCube.scale.x = 0.25;
        coolCube.scale.y = 0.25;
        coolCube.scale.z = 0.25;

        setOfCubes.push(coolCube);
      }
    }

    setOfCubes.forEach(function(el) {
      scene.add(el);
    });

    // Run the run loop
    run();
  });
}());

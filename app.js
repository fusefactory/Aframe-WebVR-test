(function(scope){
  // var cylinder = document.createElement('a-cylinder');
  // cylinder.setAttribute('color', '#FF9500');
  // cylinder.setAttribute('height', '2');
  // cylinder.setAttribute('radius', '0.75');
  // cylinder.setAttribute('position', '3 1 0');
  //
  // var scene = document.querySelector('a-scene');
  // scene.appendChild(cylinder);
  //
  // var t = 0;
  // function render() {
  //   t += 0.01;
  //   requestAnimationFrame(render);
  //   cylinder.setAttribute('position', '3 '+(Math.sin(t*2)+1)+' 0');
  // }
  //
  // render();

  function llrToWorld(longit, latit, rad){
    // default (0,0) position, is straight in front (negative Z)
    var vec3 = new THREE.Vector3(0, 0, -rad);
    // longit should provide a radian value for clockwise rotation around the y-axis
    vec3.applyAxisAngle(new THREE.Vector3(0,-1,0), longit);
    // latit should provide a radian value for rotation around the x-axis (0 = no rotation, 1/2PI = straight up)
    vec3.applyAxisAngle(new THREE.Vector3(1,0,0), latit);
    return {x: vec3.x, y: vec3.y, z: vec3.z};

    // x = Math.sin(longit) * Math.cos(latit);
    // y = (1.0 - Math.abs(Math.sin(longit))) * Math.sin(latit);
    // z = -Math.cos(longit) * Math.cos(latit);
    // return {x: x*rad, y:y*rad, z:z*rad};
  }

  function createTarget(lon, lat, rad){
    // <a-circle color="#FF5555" radius="0.5" position="0 0 -10"></a-circle>
    var entity = document.createElement('a-circle');
    entity.setAttribute('color', '#FF5555');
    entity.setAttribute('radius', '0.5');
    entity.setAttribute('position', AFRAME.utils.coordinates.stringify(llrToWorld(lon, lat, rad)));
    entity.setAttribute('look-at', '[camera]'); //'0 0 0');
    // console.log('pos:', AFRAME.utils.coordinates.stringify(llrToWorld(lon, lat, rad)));
    // add to scene
    document.querySelector('a-scene').appendChild(entity);
  }

  function loadTargets(){
    var targets = document.querySelectorAll('a-target');
    Array.prototype.forEach.call(targets, function (target) {
      var coordinates = target.getAttribute('lonlatdist');
      var coordinates = AFRAME.utils.coordinates.parse(coordinates);
      var factor = Math.PI / 180.0; // degrees-to-radians
      // console.log('Create target: ', coordinates.x * factor, coordinates.y * factor, coordinates.z);
      createTarget(coordinates.x * factor, coordinates.y * factor, coordinates.z);
    });
  }

  loadTargets();

})(this);

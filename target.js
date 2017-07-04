(function(scope){

    // console.log('register target component');
    AFRAME.registerComponent('target', {
        init: function(){
            // console.log('target init');
            this._convertLlrToPos();
        },

        _convertLlrToPos: function(){
            // get longitude/lattitude/distance attribute
            var coords = this.el.getAttribute('lonlatdist');
            // console.log('attr: ', coords);

            // convert to position attribute
            var coords = AFRAME.utils.coordinates.parse(coords);
            var factor = Math.PI / 180.0; // degrees-to-radians
            // console.log('Create target: ', coordinates.x * factor, coordinates.y * factor, coordinates.z);
            var coords = AFRAME.utils.coordinates.stringify(this._llrToWorld(coords.x * factor, coords.y * factor, coords.z));
            // console.log('pos: ', coords);

            // update our element
            this.el.setAttribute('position', coords);
        },

        /// calculates vec3 (x,y,z) position based on longitude, lattitude and distance values
        _llrToWorld: function(longit, latit, rad){
          // default (0,0) position, is straight in front (negative Z)
          var vec3 = new THREE.Vector3(0, 0, -rad);
          // longit should provide a radian value for clockwise rotation around the y-axis
          vec3.applyAxisAngle(new THREE.Vector3(0,-1,0), longit);
          // latit should provide a radian value for rotation around the x-axis (0 = no rotation, 1/2PI = straight up)
          vec3.applyAxisAngle(new THREE.Vector3(1,0,0), latit);
          return {x: vec3.x, y: vec3.y, z: vec3.z};
        }
    });

})(this);

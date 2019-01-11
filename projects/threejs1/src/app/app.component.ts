import { Component, AfterViewInit } from '@angular/core';
import DragControls from 'three-dragcontrols';
import TrackballControls from 'three-trackballcontrols';
import TransformControls from 'three-transformcontrols'
import * as THREE from 'three';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'threejs1';
  ngAfterViewInit() {
    // this.test();
    // var scene = new THREE.Scene();
    // console.log(scene)
    // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    // var renderer = new THREE.WebGLRenderer();
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );

    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // scene.add(camera);
    // camera.position.z = 10;
    // camera.lookAt(0,0,10)
    // let positions = [1,1,1];
    // cube.addEventListener('dragestart', (ev)=>{
    //     console.log(ev)
    // });
    // cube.addEventListener('click', () => {
    //   console.log('click')
    // });
    // var controls = new TrackballControls( camera );
    // var dragControls = new DragControls( [cube], camera, renderer.domElement );
    // var transformControls = new TransformControls(camera, renderer.domElement);
    // scene.add(transformControls);
    // console.log(dragControls);

    // dragControls.addEventListener('hoveron', function (event) {
    //   // 让变换控件对象和选中的对象绑定
    //   console.log('ddd');
    //   transformControls.attach(event.object);
    // });
    // dragControls.addEventListener( 'dragstart', function ( event ) { 
    //   controls.enabled = false; 
    //   console.log('ddd')
    // } );
    // dragControls.addEventListener( 'dragend', function ( event ) { 
    //   controls.enabled = true;
    // } );
    // console.log(dragControls);
    // this.drage(camera, renderer, scene);
    // renderer.domElement
    // renderer.render( scene, camera );
    // var animate = function () {
    //   // requestAnimationFrame( animate );
    //   for(let i = 0; i < positions.length; i++) {
    //     if(positions[i] < 3 && positions[i] > 0) {
    //       positions[i] +=0.01;
    //     }
    //   }
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;

    //   cube.position.set(positions[0], positions[1], positions[1]);
    //   renderer.render( scene, camera );
    // };

    // animate();    
  }
  drage(camera, renderer, scene) {
    var controls = new TrackballControls( camera );
    var transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);
 
    // 过滤不是 Mesh 的物体,例如辅助网格对象
    var objects = [];
    for (let i = 0; i < scene.children.length; i++) {
        if (scene.children[i].isMesh) {
            objects.push(scene.children[i]);
        }
    }
    // 初始化拖拽控件
    var dragControls = new DragControls(objects, camera, renderer.domElement);
 
    // 鼠标略过事件
    dragControls.addEventListener('hoveron', function (event) {
        // 让变换控件对象和选中的对象绑定
        transformControls.attach(event.object);
    });
    // 开始拖拽
    dragControls.addEventListener('dragstart', function (event) {
        controls.enabled = false;
    });
    // 拖拽结束
    dragControls.addEventListener('dragend', function (event) {
        controls.enabled = true;
    });
  }
  test() {


			var container, stats;
			var camera, controls, scene, renderer;
			var objects = [];

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
				camera.position.z = 1000;

				controls = new TrackballControls( camera );
				controls.rotateSpeed = 1.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.noZoom = false;
				controls.noPan = false;
				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );

				scene.add( new THREE.AmbientLight( 0x505050 ) );

				var light = new THREE.SpotLight( 0xffffff, 1.5 );
				light.position.set( 0, 500, 2000 );
				light.angle = Math.PI / 9;

				light.castShadow = true;
				light.shadow.camera.near = 1000;
				light.shadow.camera.far = 4000;
				light.shadow.mapSize.width = 1024;
				light.shadow.mapSize.height = 1024;

				scene.add( light );

				var geometry = new THREE.BoxBufferGeometry( 40, 40, 40 );

				for ( var i = 0; i < 200; i ++ ) {

					var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

					object.position.x = Math.random() * 1000 - 500;
					object.position.y = Math.random() * 600 - 300;
					object.position.z = Math.random() * 800 - 400;

					object.rotation.x = Math.random() * 2 * Math.PI;
					object.rotation.y = Math.random() * 2 * Math.PI;
					object.rotation.z = Math.random() * 2 * Math.PI;

					object.scale.x = Math.random() * 2 + 1;
					object.scale.y = Math.random() * 2 + 1;
					object.scale.z = Math.random() * 2 + 1;

					object.castShadow = true;
					object.receiveShadow = true;

					scene.add( object );

					objects.push( object );

				}

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				renderer.shadowMap.enabled = true;
				renderer.shadowMap.type = THREE.PCFShadowMap;

				container.appendChild( renderer.domElement );

				var dragControls = new DragControls( objects, camera, renderer.domElement );
				dragControls.addEventListener( 'dragstart', function () {

					controls.enabled = false;

				} );
				dragControls.addEventListener( 'dragend', function () {

					controls.enabled = true;

				} );

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - draggable cubes';
				container.appendChild( info );

				// stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				controls.update();

				renderer.render( scene, camera );

			}
  }
}

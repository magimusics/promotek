import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import {Vector3, PerspectiveCamera, Scene, Object3D, Color, Matrix4} from './molecule/build/three.module.js';

import {TrackballControls} from './molecule/jsm/controls/TrackballControls.js';
import {PDBLoader} from './molecule/jsm/loaders/PDBLoader.js';
import {CSS3DRenderer, CSS3DObject, CSS3DSprite} from './molecule/jsm/renderers/CSS3DRenderer.js';

var camera, scene, renderer;
var controls;
var root;

var objects = [];
var tmpVec1 = new Vector3();
var tmpVec2 = new Vector3();
var tmpVec3 = new Vector3();
var tmpVec4 = new Vector3();
var offset = new Vector3();

var visualizationType = 2;

var MOLECULES = {
    "Ethanol": "ethanol.pdb",
    "Aspirin": "aspirin.pdb",
    "Caffeine": "caffeine.pdb",
    "Nicotine": "nicotine.pdb",
    "LSD": "lsd.pdb",
    "Cocaine": "cocaine.pdb",
    "Cholesterol": "cholesterol.pdb",
    "Lycopene": "lycopene.pdb",
    "Glucose": "glucose.pdb",
    "Aluminium oxide": "Al2O3.pdb",
    "Cubane": "cubane.pdb",
    "Copper": "cu.pdb",
    "Fluorite": "caf2.pdb",
    "Salt": "nacl.pdb",
    "YBCO superconductor": "ybco.pdb",
    "Buckyball": "buckyball.pdb",
    //"Diamond": "diamond.pdb",
    "Graphite": "graphite.pdb"
};




//
//
//



//
//
//




ReactDOM.render(<App/>, document.getElementById("root"));

var loader = new PDBLoader();
var colorSpriteMap = {};
var baseSprite = document.createElement('img');
var time = 1;
var menu = document.getElementById("menu");

init();
animate();

function init() {

    camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 1000;

    scene = new Scene();

    root = new Object3D();
    scene.add(root);

    //

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    //

    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;

    //

    baseSprite.onload = function () {

        loadMolecule("models/pdb/caffeine.pdb");
        createMenu();

    };

    baseSprite.src = 'textures/sprites/ball.png';

    //

    window.addEventListener('resize', onWindowResize, false);

}

//

function generateButtonCallback(url) {

    return function () {

        loadMolecule(url);

    };

}

function createMenu() {

    for (var m in MOLECULES) {

        var button = document.createElement('button');
        button.innerHTML = m;
        menu.appendChild(button);

        var url = "models/pdb/" + MOLECULES[m];

        button.addEventListener('click', generateButtonCallback(url), false);

    }

    var b_a = document.getElementById("b_a");
    var b_b = document.getElementById("b_b");
    var b_ab = document.getElementById("b_ab");

    b_a.addEventListener('click', function () {

        visualizationType = 0;
        showAtoms();

    });
    b_b.addEventListener('click', function () {

        visualizationType = 1;
        showBonds();

    });
    b_ab.addEventListener('click', function () {

        visualizationType = 2;
        showAtomsBonds();

    });

}

//

function showAtoms() {

    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];

        if (object instanceof CSS3DSprite) {

            object.element.style.display = "";
            object.visible = true;

        } else {

            object.element.style.display = "none";
            object.visible = false;

        }

    }

}

function showBonds() {

    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];

        if (object instanceof CSS3DSprite) {

            object.element.style.display = "none";
            object.visible = false;

        } else {

            object.element.style.display = "";
            object.element.style.height = object.userData.bondLengthFull;
            object.visible = true;

        }

    }

}

function showAtomsBonds() {

    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];

        object.element.style.display = "";
        object.visible = true;

        if (!(object instanceof CSS3DSprite)) {

            object.element.style.height = object.userData.bondLengthShort;

        }

    }

}

//

function colorify(ctx, width, height, color) {

    var r = color.r, g = color.g, b = color.b;

    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;

    for (var i = 0, l = data.length; i < l; i += 4) {

        data[i + 0] *= r;
        data[i + 1] *= g;
        data[i + 2] *= b;

    }

    ctx.putImageData(imageData, 0, 0);

}

function imageToCanvas(image) {

    var width = image.width;
    var height = image.height;

    var canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);

    return canvas;

}

//

function loadMolecule(url) {

    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];
        object.parent.remove(object);

    }

    objects = [];

    loader.load(url, function (pdb) {

        var geometryAtoms = pdb.geometryAtoms;
        var geometryBonds = pdb.geometryBonds;
        var json = pdb.json;

        geometryAtoms.computeBoundingBox();
        geometryAtoms.boundingBox.getCenter(offset).negate();

        geometryAtoms.translate(offset.x, offset.y, offset.z);
        geometryBonds.translate(offset.x, offset.y, offset.z);

        var positions = geometryAtoms.getAttribute('position');
        var colors = geometryAtoms.getAttribute('color');

        var position = new Vector3();
        var color = new Color();

        for (var i = 0; i < positions.count; i++) {

            position.x = positions.getX(i);
            position.y = positions.getY(i);
            position.z = positions.getZ(i);

            color.r = colors.getX(i);
            color.g = colors.getY(i);
            color.b = colors.getZ(i);

            var atom = json.atoms[i];
            var element = atom[4];

            if (!colorSpriteMap[element]) {

                var canvas = imageToCanvas(baseSprite);
                var context = canvas.getContext('2d');

                colorify(context, canvas.width, canvas.height, color);

                var dataUrl = canvas.toDataURL();

                colorSpriteMap[element] = dataUrl;

            }

            var colorSprite = colorSpriteMap[element];

            var atom = document.createElement('img');
            atom.src = colorSprite;

            var object = new CSS3DSprite(atom);
            object.position.copy(position);
            object.position.multiplyScalar(75);

            object.matrixAutoUpdate = false;
            object.updateMatrix();

            root.add(object);

            objects.push(object);

        }

        positions = geometryBonds.getAttribute('position');

        var start = new Vector3();
        var end = new Vector3();

        for (var i = 0; i < positions.count; i += 2) {

            start.x = positions.getX(i);
            start.y = positions.getY(i);
            start.z = positions.getZ(i);

            end.x = positions.getX(i + 1);
            end.y = positions.getY(i + 1);
            end.z = positions.getZ(i + 1);

            start.multiplyScalar(75);
            end.multiplyScalar(75);

            tmpVec1.subVectors(end, start);
            var bondLength = tmpVec1.length() - 50;

            //

            var bond = document.createElement('div');
            bond.className = "bond";
            bond.style.height = bondLength + "px";

            var object = new CSS3DObject(bond);
            object.position.copy(start);
            object.position.lerp(end, 0.5);

            object.userData.bondLengthShort = bondLength + "px";
            object.userData.bondLengthFull = (bondLength + 55) + "px";

            //

            var axis = tmpVec2.set(0, 1, 0).cross(tmpVec1);
            var radians = Math.acos(tmpVec3.set(0, 1, 0).dot(tmpVec4.copy(tmpVec1).normalize()));

            var objMatrix = new Matrix4().makeRotationAxis(axis.normalize(), radians);
            object.matrix = objMatrix;
            object.quaternion.setFromRotationMatrix(object.matrix);

            object.matrixAutoUpdate = false;
            object.updateMatrix();

            root.add(object);

            objects.push(object);

            //

            var bond = document.createElement('div');
            bond.className = "bond";
            bond.style.height = bondLength + "px";

            var joint = new Object3D(bond);
            joint.position.copy(start);
            joint.position.lerp(end, 0.5);

            joint.matrix.copy(objMatrix);
            joint.quaternion.setFromRotationMatrix(joint.matrix);

            joint.matrixAutoUpdate = false;
            joint.updateMatrix();

            var object = new CSS3DObject(bond);
            object.rotation.y = Math.PI / 2;

            object.matrixAutoUpdate = false;
            object.updateMatrix();

            object.userData.bondLengthShort = bondLength + "px";
            object.userData.bondLengthFull = (bondLength + 55) + "px";

            object.userData.joint = joint;

            joint.add(object);
            root.add(joint);

            objects.push(object);

        }

        //console.log( "CSS3DObjects:", objects.length );

        switch (visualizationType) {

            case 0:
                showAtoms();
                break;
            case 1:
                showBonds();
                break;
            case 2:
                showAtomsBonds();
                break;

        }

    });


}

//

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);
    controls.update();

    time = time + 0.01;

    root.rotation.x = time;
    root.rotation.y = time * 0.7;

    render();

}

function render() {

    renderer.render(scene, camera);

}
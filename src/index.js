import React from "react";
import ReactDOM from "react-dom";
import Cover from "./components/Cover.jsx";
import {Vector3, PerspectiveCamera, Scene, Object3D, Color, Matrix4} from './molecule/build/three.module.js';
import {PDBLoader} from './molecule/jsm/loaders/PDBLoader.js';
import {CSS3DRenderer, CSS3DObject, CSS3DSprite} from './molecule/jsm/renderers/CSS3DRenderer.js';

var camera, scene, renderer;
var root;

var objects = [];
var tmpVec1 = new Vector3();
var tmpVec2 = new Vector3();
var tmpVec3 = new Vector3();
var tmpVec4 = new Vector3();
var offset = new Vector3();

var visualizationType = 2;

ReactDOM.render(<Cover/>, document.getElementById("root"));

var loader = new PDBLoader();
var colorSpriteMap = {};
var baseSprite = document.createElement('img');
var time = 1;
var menu = document.getElementById("menu");

init();
animate();

function init() {

    camera = new PerspectiveCamera(0, 0, 0, 0);

    scene = new Scene();

    root = new Object3D();
    scene.add(root);

    //

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    loadMolecule("models/pdb/caffeine.pdb");

    window.addEventListener('resize', onWindowResize, false);

}

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

    var size = 50;

    var canvas = document.createElement('canvas');

    canvas.width = size;
    canvas.height = size;

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, size, size);

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

            var atom = document.createElement('div');
            atom.className = 'circle'
            // atom.src = 'data:image/png;base64,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';


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

        showAtomsBonds();

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

    time = time + 0.01;
    // time = time + 0.01 * time;

    root.rotation.x = time;
    root.rotation.y = time * 0.7;

    render();

}

function render() {

    renderer.render(scene, camera);

}
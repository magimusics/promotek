import React, {Component} from 'react';
import './styles/App.css';
import {Vector3, PerspectiveCamera, Scene, Object3D, Color, Matrix4} from '../molecule/build/three.module.js';
import {PDBLoader} from '../molecule/jsm/loaders/PDBLoader.js';
import {CSS3DRenderer, CSS3DObject, CSS3DSprite} from '../molecule/jsm/renderers/CSS3DRenderer.js';
import 'bootstrap';

global.jQuery = require('jquery');
var camera, scene, renderer, style, transform;
var root, angle = 0;
var objects = [];
var tmpVec1 = new Vector3();
var tmpVec2 = new Vector3();
var tmpVec3 = new Vector3();
var tmpVec4 = new Vector3();
var offset = new Vector3();
var loader = new PDBLoader();
var colorSpriteMap = {};
var baseSprite = document.createElement('img');
var time = 1;
var isStopped = false;

export default class Preloader extends Component {

    constructor(props) {
        super(props);
        this.viewRef = React.createRef();
    }

    componentDidMount() {
        init();
        root.rotation.y = 1.8;
        animate();
    }

    show() {
        console.log('LOADED!!!!!!!!!!!!!');
        this.viewRef.current.style.background = 'rgba(0, 0, 0, 0)';
        isStopped = true;
    }

    render() {
        return (
            <div ref={this.viewRef} className="flex-column d-flex align-items-center justify-content-center" style={{background: 'rgba(0, 0, 0, 1)', height: '100%'}}>
                <div id="container"/>
                <div className="scroll-icon">
                    <h4>
                        <span>Подождите...</span>
                    </h4>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.viewRef.current.style.opacity = 0;
    }
}

function init() {

    camera = new PerspectiveCamera(0, 0, 0, 0);
    scene = new Scene();
    root = new Object3D();
    scene.add(root);
    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    style = renderer.domElement.firstElementChild;
    renderer.setSize(300, 300);
    transform = style.style.transform
    loadMolecule();
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

function loadMolecule() {

    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];
        object.parent.remove(object);

    }

    objects = [];

    loader.load(function (pdb) {

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

            let atom = document.createElement('div');
            atom.className = 'circle'

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
            // object.rotation.y = 2;

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

function animate() {

    if (!isStopped) {
        requestAnimationFrame(animate);
        time = time + 0.05;
        if (angle === 360) {
            angle = 0;
        } else {
            angle = angle + 4;
        }
        // time = time + 0.01 * time;

        root.rotation.x = time;
        // root.rotation.y = time;
        root.rotation.z = time;
        // style.style.transform = 'rotate(' + angle + 'deg) ' + transform;

        render();
    } else {
        root.rotation.x = 0;
        root.rotation.z = 0;
        render();
    }
}

function render() {

    renderer.render(scene, camera);

}

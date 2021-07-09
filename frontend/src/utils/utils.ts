import mesh from "@babylonjs/core/Meshes/mesh.js";
import Meshes from "@babylonjs/core/Meshes/index.js";
import vertexData from "@babylonjs/core/Meshes/mesh.vertexData.js";
import buffer from "@babylonjs/core/Meshes/buffer.js";
import Textures from "@babylonjs/core/Materials/Textures/index.js";
import Materials from "@babylonjs/core/Materials/index.js";
import math from "@babylonjs/core/Maths/math.js";


const font = "bold 240px Arial";

export const filter_norms = pos => {
    return pos.y > 0;
}

export const vector_from_sun_position = (position, length) => {
    const z = Math.tan(position.altitude) * length;
    const x = Math.sin(position.azimuth) * length;
    const y = Math.cos(position.azimuth) * length;
    return [x, y, z]
}

export const centralize = (obj, scene) => {
    var vertices = obj.getVerticesData(_babylonjs_core_Meshes_buffer__WEBPACK_IMPORTED_MODULE_3__["VertexBuffer"].PositionKind);
    var center = obj.getBoundingInfo().boundingBox.center;
    var y_ext = (obj.getBoundingInfo().boundingBox.maximum.y - obj.getBoundingInfo().boundingBox.minimum.y)/2;
    var new_vertices = [];
    var t_count = 0;
    for (var i = 0; i < vertices.length; i++) {
        if(t_count == 3){ t_count = 0 };
        if(t_count == 0){ new_vertices.push(vertices[i] - center.x) };
        if(t_count == 1){ new_vertices.push(vertices[i] - center.y + y_ext) };
        if(t_count == 2){ new_vertices.push(vertices[i] - center.z) };
        t_count += 1;
    }
    var new_obj = new _babylonjs_core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__["Mesh"]("new_obj", scene);
    var indices = obj.getIndices();
    var normals = [];
    _babylonjs_core_Meshes_mesh_vertexData__WEBPACK_IMPORTED_MODULE_2__["VertexData"].ComputeNormals(new_vertices, indices, normals);
    var new_vertexData = new _babylonjs_core_Meshes_mesh_vertexData__WEBPACK_IMPORTED_MODULE_2__["VertexData"]();

    new_vertexData.positions = new_vertices;
    new_vertexData.indices = indices;
    new_vertexData.normals = normals;
    new_vertexData.applyToMesh(new_obj);
    new_obj.updateFacetData();
    scene.removeMesh(obj);

}

export const show_normals = (obj, scene) => {
    var positions = obj.getFacetLocalPositions();
    var normals = obj.getFacetLocalNormals();
    var lines = [];
    for (var i = 0; i < positions.length; i++) {
        var line = [ positions[i], positions[i].add(normals[i]) ];
        lines.push(line);
    }
    var lineSystem = _babylonjs_core_Meshes__WEBPACK_IMPORTED_MODULE_1__["MeshBuilder"].CreateLineSystem("ls", {lines: lines}, scene);
}

export const calculate_power = (
        faces_data,
        sun_vector,
        house,
        power_on_meter) => {
    var power_faces = [];
    var summ = 0;
    faces_data.forEach(function(face, i, arr) {

        var norm = face.normal;
        var dot = _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_6__["Vector3"].Dot(sun_vector, norm);
        var angle = Math.acos(dot / (sun_vector.length() * norm.length()));
        // console.log('------------------------');
        // console.log('sun: ', sun_vector);
        // console.log('index: ', face.index);
        // console.log('pos: ', face.pos);
        // console.log('norm: ', norm);
        // console.log('angle: ', angle* (180/Math.PI));
        if (angle > 0 && angle < (Math.PI/2)*(3/4) && sun_vector.y > 0){
            var power = power_on_meter * face.area * Math.cos(angle);
            power_faces.push([face.index, power]);
	    summ += power;
        }
    });
    power_faces.push(['Summ', summ]);
    return power_faces;
}

export const get_faces_data = (face_positions, obj) => {
    var result = [];
    face_positions.forEach(function(pos, i, arr) {
        var index = obj.getClosestFacetAtCoordinates(pos.x, pos.y, pos.z);
        var normal = obj.getFacetNormal(index);
        var area = calculate_area(obj, index);
        var face = {'index': index,
                     'normal': normal,
                     'area': area,
                     'pos': pos
                     }
        result.push(face);

    });
    return result;
}

export const create_numb = (pos, scene, obj) =>{
    var index = obj.getClosestFacetAtCoordinates(pos.x, pos.y, pos.z);
    var pl = _babylonjs_core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreatePlane("plane_"+index, 0.3, scene);
    pl.rotation.x = 0;
    pl.rotation.y = -Math.PI;
    pl.rotation.z = 0;
    pl.position = pos.multiplyByFloats(1.1, 1.1, 1.1);
    var textureGround = new _babylonjs_core_Materials_Textures__WEBPACK_IMPORTED_MODULE_4__["DynamicTexture"]("dyn_t_"+index, {width:512, height:256}, scene);
    var textureContext = textureGround.getContext();
    var materialGround = new _babylonjs_core_Materials__WEBPACK_IMPORTED_MODULE_5__["StandardMaterial"]("Mat_"+index, scene);
    materialGround.diffuseTexture = textureGround;
    pl.material = materialGround;
    textureGround.drawText(index, 120, 200, font, "black", "white", true, true);

}

export const calculate_area = (mesh, faceId) => {
    if(!mesh) {
        return 0.0;
    }
    var indices = mesh.getIndices();
    if(faceId < 0 || faceId > nbFaces) {
        return 0.0;
    }
    var nbFaces = indices.length / 3;
    var positions = mesh.getVerticesData(_babylonjs_core_Meshes_buffer__WEBPACK_IMPORTED_MODULE_3__["VertexBuffer"].PositionKind);
    //console.log('faceID: ',faceId);
    var v1x = 0.0;
    var v1y = 0.0;
    var v1z = 0.0;
    var v2x = 0.0;
    var v2y = 0.0;
    var v2z = 0.0;
    var crossx = 0.0;
    var crossy = 0.0;
    var crossz = 0.0;
    var ar = 0.0;
    var i1 = 0;
    var i2 = 0;
    var i3 = 0;

    i1 = indices[faceId * 3];
    i2 = indices[faceId * 3 + 1];
    i3 = indices[faceId * 3 + 2];

    v1x = positions[i1 * 3] - positions[i2 * 3];
    v1y = positions[i1 * 3 + 1] - positions[i2 * 3 + 1];
    v1z = positions[i1 * 3 + 2] - positions[i2 * 3 + 2];
    v2x = positions[i3 * 3] - positions[i2 * 3];
    v2y = positions[i3 * 3 + 1] - positions[i2 * 3 + 1];
    v2z = positions[i3 * 3 + 2] - positions[i2 * 3 + 2];
    crossx = v1y * v2z - v1z * v2y;
    crossy = v1z * v2x - v1x * v2z;
    crossz = v1x * v2y - v1y * v2x;

    return Math.sqrt(crossx * crossx + crossy * crossy + crossz * crossz) * 0.5;
}




__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "desk_total", function() { return desk_total; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "desk", function() { return desk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "panel", function() { return panel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_desk_text", function() { return update_desk_text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_desk_tot_text", function() { return update_desk_tot_text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_header_text", function() { return update_header_text; });
/* harmony import */ var _babylonjs_gui_2D_controls_stackPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/gui/2D/controls/stackPanel */ "./node_modules/@babylonjs/gui/2D/controls/stackPanel.js");
/* harmony import */ var _babylonjs_gui_2D_controls_textBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babylonjs/gui/2D/controls/textBlock */ "./node_modules/@babylonjs/gui/2D/controls/textBlock.js");



var desk = new _babylonjs_gui_2D_controls_stackPanel__WEBPACK_IMPORTED_MODULE_0__["StackPanel"]();
desk.width = "400px";
desk.top = "5px";
desk.horizontalAlignment = 1;
var desk_header = new _babylonjs_gui_2D_controls_textBlock__WEBPACK_IMPORTED_MODULE_1__["TextBlock"]();
desk_header.text = "Power";
desk_header.height = "600px";
desk_header.color = "white";
desk.addControl(desk_header);

function update_desk_text(text_faces){
    desk_header.text = 'Power:\n';
    for (var i = 0; i < text_faces.length; i++){
        desk_header.text += text_faces[i][0]+': '+text_faces[i][1]+ '\n';
    }
}

var panel = new _babylonjs_gui_2D_controls_stackPanel__WEBPACK_IMPORTED_MODULE_0__["StackPanel"]();
panel.width = "950px";
panel.top = "350px";
var header = new _babylonjs_gui_2D_controls_textBlock__WEBPACK_IMPORTED_MODULE_1__["TextBlock"]();
header.text = "hour: 0 ";
header.height = "40px";
header.color = "white";
panel.addControl(header);

function update_header_text(text){
    header.text = "hour:" + text;
}


var desk_total = new _babylonjs_gui_2D_controls_stackPanel__WEBPACK_IMPORTED_MODULE_0__["StackPanel"]();
desk.width = "500px";
desk.top = "1px";
desk.horizontalAlignment = 1;
var desk_header_tot = new _babylonjs_gui_2D_controls_textBlock__WEBPACK_IMPORTED_MODULE_1__["TextBlock"]();
desk_header_tot.text = "Total Power";
desk_header_tot.height = "60px";
desk_header_tot.color = "white";
desk.addControl(desk_header_tot);

function update_desk_tot_text(text){
    desk_header_tot.text = 'Total Power: ' + text;
}






"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDragDropChords = useDragDropChords;
var react_1 = require("react");
function useDragDropChords(initialChords) {
    var _a = (0, react_1.useState)(initialChords), chords = _a[0], setChords = _a[1];
    var onDragStart = function (id) {
        console.log("Dragging chord with id: ".concat(id));
    };
    var onDrop = function (id, newPosition) {
        setChords(function (prevChords) {
            var updatedChords = __spreadArray([], prevChords, true);
            var draggedChordIndex = updatedChords.findIndex(function (chord) { return chord.id === id; });
            var draggedChord = updatedChords.splice(draggedChordIndex, 1)[0];
            updatedChords.splice(newPosition, 0, draggedChord);
            return updatedChords;
        });
    };
    return { chords: chords, onDragStart: onDragStart, onDrop: onDrop, setChords: setChords };
}

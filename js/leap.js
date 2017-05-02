/**
 * Concatination the data on view
 * @param {*} id 
 * @param {*} data 
 */
function concatData(id, data) {
    return id + ": " + data + "<br>";
}


/**
 * Getting the name of finger
 * @param {*} fingerType 
 */
function getFingerName(fingerType) {
    switch (fingerType) {
        case 0:
            return 'Thumb';
            break;
        case 1:
            return 'Index';
            break;
        case 2:
            return 'Middle';
            break;
        case 3:
            return 'Ring';
            break;
        case 4:
            return 'Pinky';
            break;
    }
}

/**
 * Getting the concatenated joint position
 * @param {*} id 
 * @param {*} position 
 */
function concatJointPosition(id, position) {
    return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}

/**
 * Showing  output on the screen
 */
var output = document.getElementById('output');
var frameString = "", handString = "", fingerString = "";
var hand, finger;
var k = 0;
var options = { enableGestures: true };
// Main Leap Loop
Leap.loop(options, function (frame) {
    frameString = concatData("frame_id", frame.id);
    frameString += concatData("num_hands", frame.hands.length);
    frameString += concatData("num_fingers", frame.fingers.length);
    frameString += "<br>";

    for (var i = 0, len = frame.hands.length; i < len; i++) {
        hand = frame.hands[i];
        handString = concatData("hand_type", hand.type);
        handString += concatData("confidence", hand.confidence);
        handString += concatData("pinch_strength", hand.pinchStrength);
        handString += concatData("grab_strength", hand.grabStrength);
        if (hand.grabStrength == 1)
            document.getElementById("img").src = '../img/green.png';
        if (hand.grabStrength < 1)
            document.getElementById("img").src = '../img/red.png';
        handString += '<br>';

        fingerString = concatJointPosition("finger_thumb_dip", hand.thumb.dipPosition);
        for (var j = 0, len2 = hand.fingers.length; j < len2; j++) {
            finger = hand.fingers[j];
            fingerString += concatData("finger_type", finger.type) + " (" + getFingerName(finger.type) + ") <br>";
            fingerString += concatJointPosition("finger_dip", finger.dipPosition);
            fingerString += concatJointPosition("finger_pip", finger.pipPosition);
            fingerString += concatJointPosition("finger_mcp", finger.mcpPosition);
            fingerString += "<br>";

            if (hand.fingers[4].mcpPosition[0] > 0 && hand.fingers[4].mcpPosition[0] < 127 && k == 0) {
                k = 1;
            }
            if (hand.fingers[4].mcpPosition[0] < 0 && k == 1) {
                alert("Swipe DOne");
                k = 0;
            }


        }
        frameString += handString;
        frameString += fingerString;
    }
    output.innerHTML = frameString;
});
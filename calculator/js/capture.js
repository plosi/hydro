function capture(){
    const pi = Math.PI;
    var hCond = parseFloat(document.getElementById("hCond").value) * parseFloat(document.getElementById("expCond").value);
    var thickness = parseFloat(document.getElementById("thickness").value);
    var gradient = parseFloat(document.getElementById("gradient").value);
    var flowRate = parseFloat(document.getElementById("flowRate").value);
    var flow = flowRate/3600;
    
    var stagPoint = -(flow/(2 * pi * hCond * thickness * gradient)).toFixed(2);
    var captureWidth = (flow/(hCond * thickness * gradient)).toFixed(2);
    var captureWidthWell = (captureWidth/2).toFixed(2);
    
    document.getElementById("stagPoint").value = stagPoint;
    document.getElementById("captureWidth").value = captureWidth;
    document.getElementById("captureWidthWell").value = captureWidthWell;

    var captureY = 0.0, captureX = "", graph = [];
    var capW = flow/(hCond * thickness * gradient);
    
    var coords = [];
    
    while(captureY <= capW/2){
        captureX = captureY/Math.tan((1 - (2 * hCond * thickness * gradient / flow) * captureY) * Math.PI);
        storeCoordinate(captureX, captureY, coords);
        captureY += 1.0; 
    }
    draw(coords, stagPoint);
}

function storeCoordinate(xVal, yVal, array) {
    array.push(xVal);
    array.push(yVal);
}

function draw(array, x0){
    var mirror = [];
    
    for (var i = 0; i < array.length; i+=2) {
        var x = array[i];
        var y = array[i+1];
        storeCoordinate(x, -y, mirror);
    }
    var canvas = document.getElementById("capture_zone");

    if (canvas.getContext){
        var ctx = canvas.getContext("2d");
        //center the drawing:
        ctx.translate(canvas.width/5, canvas.height/2);
        //ctx.canvas.width = window.innerWidth;
        //ctx.canvas.height = window.innerHeight; 
        
        //ctx.moveTo(x0, 0);
        ctx.curve(array);
        ctx.curve(mirror);
        ctx.stroke();
    }
}

function SoilType(){
    var hCond = parseFloat(document.getElementById("hCond").value) * parseFloat(document.getElementById("expCond").value);
    
    if (hCond >= 0.01){
        document.getElementById("soilType").innerHTML = "ghiaia"; // gravel
    }
    if (hCond < 0.01 && hCond >= 0.0001){
        document.getElementById("soilType").innerHTML = "sabbia e ghiaia";  // sand and gravel
    }
    if (hCond < 0.0001 && hCond >= 0.000001){
        document.getElementById("soilType").innerHTML = "sabbia fine";  // fine sand
    }
    if (hCond < 0.000001 && hCond >= 0.00000001){
        document.getElementById("soilType").innerHTML = "limo"; // silt
    }
    if (hCond < 0.00000001){
        document.getElementById("soilType").innerHTML = "argilla";  // clay
    }
}

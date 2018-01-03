function gac_water(){
    var EBCT =  (parseFloat(document.getElementById("h").value) / parseFloat(document.getElementById("velocity").innerHTML)) * 60;
    var qe = Math.pow(parseFloat(document.getElementById("ppm_in").innerHTML), parseFloat(document.getElementById("l/n").innerHTML)) * parseFloat(document.getElementById("K").innerHTML);
    var efficiency =  qe  / 10;
    var CUR = ((parseFloat(document.getElementById("ppm_in").innerHTML) - parseFloat(document.getElementById("ppm_out").innerHTML)) / qe) * parseFloat(document.getElementById("q").value);
    var volumeGAC = EBCT * parseFloat(document.getElementById("lpm").innerHTML);
    var mass = volumeGAC * parseFloat(document.getElementById("density").value) / 1000;
    var volumeH2O = (1 / (CUR / parseFloat(document.getElementById("q").value))) * mass;
    var bedlife = volumeH2O / parseFloat(document.getElementById("q").value);
    
    document.getElementById("EBCT").value = EBCT.toFixed(2);
    document.getElementById("efficiency").value = efficiency.toFixed(2);
    document.getElementById("CUR").value = CUR.toFixed(3);
    document.getElementById("mass").value = mass.toFixed(2);
    document.getElementById("bedlife").value = bedlife;
    document.getElementById("bedlife_day").innerHTML = (bedlife / 24).toFixed(0);
}


function ppm(){
    var ppm_in = parseFloat((document.getElementById("Cin").value) / 1000);
    document.getElementById("ppm_in").innerHTML = ppm_in.toFixed(3);
    
    var ppm_out = parseFloat((document.getElementById("Cout").value) / 1000);
    document.getElementById("ppm_out").innerHTML = ppm_out.toFixed(3);
}

function lpm(){
    var lpm = parseFloat((document.getElementById("q").value) * 1000/60);
    document.getElementById("lpm").innerHTML = lpm.toFixed(2);
}


function section(){
    const pi = Math.PI;
    var section = pi * Math.pow((parseFloat(document.getElementById("d").value) / 2), 2);
    var velocity = parseFloat(document.getElementById("q").value) / section;
    
    document.getElementById("section").innerHTML = section.toFixed(2);
    document.getElementById("velocity").innerHTML = velocity.toFixed(2);
}

function freundlich(){
    var freundlich = document.getElementById("compound").value;
    if (freundlich == "toluene"){
        document.getElementById("K").innerHTML = 100;
        document.getElementById("l/n").innerHTML = 0.45;
    }
    if (freundlich == "TCE"){
        document.getElementById("K").innerHTML = 28;
        document.getElementById("l/n").innerHTML = 0.62;
    }
    if (freundlich == "PCE"){
        document.getElementById("K").innerHTML = 51;
        document.getElementById("l/n").innerHTML = 0.56;
    }
    if (freundlich == "1,2-DCA"){
        document.getElementById("K").innerHTML = 3.6;
        document.getElementById("l/n").innerHTML = 0.83;
    }
    if (freundlich == "cloroformio"){
        document.getElementById("K").innerHTML = 2.6;
        document.getElementById("l/n").innerHTML = 0.73;
    }
}
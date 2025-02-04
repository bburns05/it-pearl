"use strict";
$( "#CircleForm" ).validate({

});

function CircleCalculations() {
    
    if ($("#CircleForm").valid()) {
    
        let radius; 
        let diameter;
        let radiusfp;
        let circumference;
        let area;
        radius = document.getElementById("radius").value;
        radiusfp = parseFloat(radius)
        diameter = calculateDiameter(radiusfp);
        document.getElementById("diameter").innerHTML = diameter
        circumference = calculateCircumference(radiusfp);
        document.getElementById("circumference").innerHTML = circumference
        area = calculateArea(radiusfp);
        document.getElementById("area").innerHTML = area
        let x = 1;

    }
    

}

function calculateDiameter(r) {
    return 2 * r;
}

function calculateCircumference(r) {
    return 2 * Math.PI * r
}

function calculateArea(r) {
    return Math.PI * r * r
}
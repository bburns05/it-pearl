"use strict";

function calculate() {
    document.getElementById("valueError").textContent = "";
    document.getElementById("fromUnitError").textContent = "";
    document.getElementById("toUnitError").textContent = "";
    document.getElementById("toValue").textContent = "";

    let fromValue = document.getElementById("fromValue").value.trim();
    let fromUnit = document.querySelector('input[name="fromUnit"]:checked');
    let toUnit = document.querySelector('input[name="toUnit"]:checked');

    let isValid = true;

    if (fromValue === "" || isNaN(fromValue)) {
        document.getElementById("valueError").textContent = "Value is Required";
        isValid = false;
    }

    if (!fromUnit) {
        document.getElementById("fromUnitError").textContent = "From Unit is Required";
        isValid = false;
    }

    if (!toUnit) {
        document.getElementById("toUnitError").textContent = "To Unit is Required";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    let xhr = new XMLHttpRequest();
    let url = "https://brucebauer.info/assets/ITEC3650/unitsconversion.php" +
              "?FromValue=" + encodeURIComponent(fromValue) +
              "&FromUnit=" + encodeURIComponent(fromUnit.value) +
              "&ToUnit=" + encodeURIComponent(toUnit.value);

    xhr.open("GET", url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById("toValue").textContent = xhr.responseText;
        } else {
            document.getElementById("toValue").textContent = "Error: " + xhr.status;
        }
    };

    xhr.onerror = function() {
        document.getElementById("toValue").textContent = "Request error.";
    };

    xhr.send();
}

function clearForm() {
    document.getElementById("convertForm").reset();
    document.getElementById("valueError").textContent = "";
    document.getElementById("fromUnitError").textContent = "";
    document.getElementById("toUnitError").textContent = "";
    document.getElementById("toValue").textContent = "";
}

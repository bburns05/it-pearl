function calculate() {
    "use strict";

    if ($("#myform").valid()) {

        let operand1 = document.getElementById("Operand1").value;
        let operand2 = document.getElementById("Operand2").value;

        let operand1fp = parseFloat(operand1);
        let operand2fp = parseFloat(operand2);

    let operator;
        if (document.getElementById("AddOperator").checked) {
            operator = document.getElementById("AddOperator").value;
        }
        if (document.getElementById("SubtractOperator").checked) {
            operator = document.getElementById("SubtractOperator").value;
        }
        if (document.getElementById("MultiplyOperator").checked) {
            operator = document.getElementById("MultiplyOperator").value;
        }
        if (document.getElementById("DivideOperator").checked) {
            operator = document.getElementById("DivideOperator").value;
        }

        let result;

        if (operator == "+") {
            result = operand1fp + operand2fp;
        }
        if (operator == "-") {
            result = operand1fp - operand2fp;
        }
        if (operator == "*") {
            result = operand1fp * operand2fp;
        }
        if (operator == "/") {
            if (operand2fp == 0) {
                result = "Error: Cannot divide by zero";
            } else {
                result = operand1fp / operand2fp;
            }
        }

        document.getElementById("Result").innerHTML = result.toString();
    }
}

function clearform() {
    document.getElementById("Operand1").value = "";
    document.getElementById("Operand2").value = "";

    document.getElementById("Operand1Error").innerHTML = "";
    document.getElementById("Operand2Error").innerHTML = "";
    document.getElementById("OperatorError").innerHTML = "";
    document.getElementById("Result").innerHTML = "";

    document.getElementById("AddOperator").checked = false;
    document.getElementById("SubtractOperator").checked = false;
    document.getElementById("MultiplyOperator").checked = false;
    document.getElementById("DivideOperator").checked = false;
}

$("#myform").validate({

});

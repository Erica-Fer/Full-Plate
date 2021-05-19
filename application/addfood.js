
/* Javascript */

// get the php values as defined the beginning of the file
// lets us set food already in the database as chips data
window.onload = function () {
    document.getElementById("submit").onclick = saveMood;
};

function getFood(formNum) {
    // Default to a null value so that if there is nothing, return is not empty
    var result = '';

    // Begin the string to be used for parsing input
    // This is what allows for each input food to have individual chip
    // The format of string should be the following:
    //'[' + '{ "tag": "' + foodTest[0] + '" }' + ',' + '{ "tag": "' + foodTest[2] + '" }' + ']';
    var food = '[';

    switch (formNum) {
        case 0: // breakfast
            result = <? php echo json_encode($breakfastFood, JSON_HEX_TAG) ?>; // ?
            console.log("breakfast: " + result[0]);
            for (var i = 0; i < result.length; i++) {
                food += '{ "tag": "' + result[i] + '" }';
                if (i < result.length - 1) {
                    food += ',';
                }
            }
            break;
        case 1: // lunch
            result = <? php echo json_encode($lunchFood, JSON_HEX_TAG) ?>; // ?
            for (var i = 0; i < result.length; i++) {
                food += '{ "tag": "' + result[i] + '" }';
                if (i < result.length - 1) {
                    food += ',';
                }
            }
            break;
        case 2: // dinner
            result = <? php echo json_encode($dinnerFood, JSON_HEX_TAG) ?>; // ?
            for (var i = 0; i < result.length; i++) {
                food += '{ "tag": "' + result[i] + '" }';
                if (i < result.length - 1) {
                    food += ',';
                }
            }
            break;
    }

    if (result == null || result.length < 1) {
        return 0;
    }

    // Close off the string and return the parsed food info to be used in the event listener
    food += ']';
    return JSON.parse(food);
}

function saveMood() {
    //alert("i'm here");
    var mood = document.getElementById("askDay").value;
    console.log("value is " + mood);
    //this isn't quite right
    //$date
    //console.log(<?php echo json_encode($date) ?>);
    var date = "&date=" + <? php echo json_encode($date) ?>;
    console.log(date);
    //var date = "&date=2021-04-21";

    // make call to PHP file to handle giving tags info to be put in database
    // should let the user add information without ever pressing a "save" button
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText; // ? do i need this?
        }
    };
    xhttp.open("POST", "../database/postmoods.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // ? is this correct?
    console.log("made it here");
    xhttp.send("dayQuality" + "=" + mood + date); // should send something in the form of "breakfast=cheese", or other input
    console.log("hello");
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("going in here");
    /* CODE FOR DAY QUALITY */
    var elemsSelect = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elemsSelect, {
    });
    console.log(elemsSelect.value);

    // var askForm = document.querySelector('askDay');
    // askForm.addEventListener('change', function() {
    //     alert('changed form!!');
    // });
    //for(int i = 0; i <elemsSelect.length; i++){
    //  console.log("elemsSelect" + elemsSelect[i];
    // }

    console.log("instances" + instances.toString());


    /* CODE FOR CHIPS(tags) */
    // array of all chips forms
    // add as needed, just use '.chips<name>' for the querySelector
    // ONLY USE FOR CHIP ELEMENTS
    var elemChips = [document.querySelectorAll('.chipsbreakfast'), document.querySelectorAll('.chipslunch'), document.querySelectorAll('.chipsdinner')];

    // set values for each element
    // should let each user form keep unique elements, and elements featured in other forms
    for (i = 0; i < elemChips.length; i++) {
        var prevFood = getFood(i);

        var instances = M.Chips.init(elemChips[i], {
            autocompleteOptions: {
                data: {
                    'Apple': null,
                    'Rice': null,
                    'Custard': null,
                    'Chocolate': null
                },
                limit: Infinity,
                minLength: 1
            },
            placeholder: 'Enter a tag',
            secondaryPlaceholder: 'Enter a tag',
            data: prevFood,
            onChipAdd: (event) => {
                var formId = event[0].id; // the form that was being added to; like lunch/dinner/breakfast/etc.
                var formData = '.chips' + formId;
                var chipsData = M.Chips.getInstance($(formData)).chipsData;

                var newestTag = chipsData[chipsData.length - 1].tag;
                var date = "&date=" + <? php echo json_encode($date) ?>;

                // make call to PHP file to handle giving tags info to be put in database
                // should let the user add information without ever pressing a "save" button
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        document.getElementById("demo").innerHTML = this.responseText; // ? do i need this?
                    }
                };
                xhttp.open("POST", "../database/post.php", true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // ? is this correct?
                xhttp.send(formId + "=" + newestTag + date); // should send something in the form of "breakfast=cheese", or other input
            }
        });
    }
});

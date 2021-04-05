"use strict";

(function() {

    var increaseMonth = 0;
    var increaseYear = 0;

    //runs once the user loads the page
    window.onload = function() {
        //stores element that allows users to get next/prev month  
        var next = document.getElementById("next");
        var prev = document.getElementById("prev");

        //sets them to the current month & year
        updateDate();

        next.onclick = addOne;
        prev.onclick = minusOne;
        
        //if they click on the month -- gets them the current month (likely will change later)
        var current = document.getElementById("current-month");
        current.onclick = updateDate;
    }; 
    
    //returns the number of days in a month
    function numDaysInMonth(month, year) {
        return 32 - new Date(year, month, 32).getDate();
    }
    
    //creates the calendar days based on month & year
    function createCalendar(month, year){
        //finds what day a month starts on
        var starting_day = (new Date(year, month)).getDay();

        //populates the calendar with dates
        var cal = document.getElementById("calendar-days");
        cal.innerHTML = ""; //clear old content

        //holds the current date
        var curr_day = dayjs().date();
        var curr_month = dayjs().month();
        var curr_year = dayjs().year();

        //holds previous month's information
        var last_month = month - 1;
        var last_month_yr = year;
        if(last_month < 0)
        {
            last_month = 11;
            last_month_yr--;
        }
        var backtrack = starting_day - 1; //figures how many previous days to include
        var last_month_days = numDaysInMonth(last_month, last_month_yr); //gets number of days from last month
        var counter = last_month_days - backtrack; //calculates where to start counting from
        
        //holds a counter for next month's days        
        var next_month_days = 1;

        //stores what date we're currently on
        var temp_date = 1;

        for (let i = 0; i < 6; i++) {
            //creates a table row
            var temp_row = document.createElement("tr");
            
            //creating individual cells
            for (let j = 0; j < 7; j++) {
                //if it's before the current month starts
                if (i === 0 && j < starting_day) {
                    //creates a new cell & add the number
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(counter);
                    counter++;
                    //make the cell inactive
                    cell.classList.add("inactive");
                    //append everything together
                    cell.appendChild(cellText);
                    temp_row.appendChild(cell);
                }
                //if we've run out of days but the row isn't finished
                else if (temp_date > numDaysInMonth(month, year)) {
                    //create new cell & add the number
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(next_month_days);
                    next_month_days++;
                    //make it inactive
                    cell.classList.add("inactive");
                    //append everything together
                    cell.appendChild(cellText);
                    temp_row.appendChild(cell);  
                }
                else {
                    //create new cell & add the number 
                    var cell = document.createElement("td");
                    //var circle = document.createElement("div");
                    if(temp_date < 10) {
                        var cellText = document.createTextNode("0" + temp_date);
                    }
                    else {
                        var cellText = document.createTextNode(temp_date);
                    }

                    //if it's today's date
                    if(temp_date === curr_day && month === curr_month && year === curr_year) {
                        var circle = document.createElement("div");
                        circle.classList.add("active");
                        circle.appendChild(cellText);
                        cell.appendChild(circle);
                        //circle.classList.add("active");
                        //cell.classList.add("active");
                    }
                    else{
                        cell.appendChild(cellText);
                    }
                    temp_row.appendChild(cell);
                    temp_date++;
                }
            }
            cal.appendChild(temp_row); // appending each row into calendar body
            if(temp_date > numDaysInMonth(month, year))
            {
                break;
            }

        }
    }

    //updates the month & year
    function updateDate(getCurrent = true) {
        //alert(increase);
        if(getCurrent){
            //alert("is get current");
            var month = dayjs().month();
            increaseMonth = month;
            var year = dayjs().year();
            increaseYear = year;
            createCalendar(month, year);
        }
        else{
            var month = increaseMonth;
            var year = increaseYear;
            createCalendar(month, year);
        }
        var current = document.getElementById("current-month");

        switch(month) {
            case 0: //january
                current.innerText = "January " + year;
                break;
            case 1: //february
                current.innerText = "February " + year;
                break;
            case 2: //march
                current.innerText = "March " + year;
                break;
            case 3: //april
                current.innerText = "April " + year;
                break;
            case 4: //may
                current.innerText = "May " + year;
                break;
            case 5: //june
                current.innerText = "June " + year;
                break;
            case 6: //july
                current.innerText = "July " + year;
                break;
            case 7: //august
                current.innerText = "August " + year;
                break;
            case 8: //september
                current.innerText = "September " + year;
                break;
            case 9: //october
                current.innerText = "October " + year;
                break;
            case 10: //november
                current.innerText = "November " + year;
                break;
            default: //december
                current.innerText = "December " + year;

        }

    }

    //increments the month/year counter
    function addOne() {
        //alert("nice");
        increaseMonth++; 
        if(increaseMonth > 11)
        {
            increaseMonth = 0;
            increaseYear++;
        }
        updateDate(false);
    }

    //decrements the month/year counter
    function minusOne(){
        //alert("also nice");
        increaseMonth--;
        if(increaseMonth < 0)
        {
            increaseMonth = 11;
            increaseYear--;
        }
        updateDate(false);
    }
    
})();

/*
this code is how we got the circle around the number 
    var cell = document.createElement("td");
    var circle = document.createElement("div");
    circle.classList.add("hello");
    var temp_val = counter;
    var cellText = document.createTextNode(temp_val);
    cell.classList.add("inactive");
    circle.appendChild(cellText);
    cell.appendChild(circle);
    temp_row.appendChild(cell);
*/
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  $(document).ready(function() {
    const currentDayElement = $('#currentDay');
    const currentTime = dayjs().format('dddd, MMMM D, YYYY h:mm A');
    currentDayElement.text(currentTime);
    const workingHours = 8; // Number of working hours
    const startHour = 9;    // Start at 9 AM
    const $calendar = $('#calendar');
    const currentDay = dayjs(); // Get the current day

    // Generate time slots
    for (let i = 0; i < workingHours; i++) {
        const hour = startHour + i;
        const timeSlot = dayjs().hour(hour).minute(0);
        const $row = $('<div class="row">');
        const $timeColumn = $('<div class="hour col-md-2">').text(timeSlot.format('h A'));
        const $eventColumn = $('<div class="event col-md-10">');
        const eventKey = `event-${hour}`;

        // Retrieve stored events from local storage
        const storedEvent = localStorage.getItem(eventKey);
        if (storedEvent) {
            $eventColumn.text(storedEvent);
        }

        // Create an input for new events
        const $eventInput = $('<input type="text" class="form-control">');
        $eventInput.val(storedEvent);

        // Create a button to save the event
        const $saveButton = $('<button class="btn btn-primary col-md-2">Save</button>');
        $saveButton.on('click', function() {
            const newEvent = $eventInput.val();
            localStorage.setItem(eventKey, newEvent);
        });

        // Determine if the hour is in the past, present, or future
        if (timeSlot.isBefore(currentDay, 'hour')) {
            $row.addClass('past');
        } else if (timeSlot.isSame(currentDay, 'hour')) {
            $row.addClass('present');
        } else {
            $row.addClass('future');
        }

        $eventColumn.append($eventInput, $saveButton);
        $row.append($timeColumn, $eventColumn);
        $calendar.append($row);
    };
});



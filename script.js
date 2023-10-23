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
  $(document).ready(function () {
		const currentDayElement = $("#currentDay");
		const currentTime = dayjs().format("dddd, MMMM D, YYYY h:mm:ss A");
		const workingHours = 9; // Number of working hours
		const startHour = 9; // Start at 9 AM
		const $calendar = $("#calendar");
		const currentDay = dayjs(); // Get the current day
		const $clearEventsModal = $("#clearEventsModal");
		const $clearEventsButton = $("#clearEventsButton");
		const businessHoursStart = dayjs().set("hour", 9).set("minute", 0);
		const businessHoursEnd = dayjs().set("hour", 18).set("minute", 0);
		const $message = $("#message"); // Select the message element
		const $message2 = $("#message2"); // Select the message2 element
		const $message3 = $("#message3"); // Select the message3 element
		const currentTime2 = dayjs();
		//display current date and time
		currentDayElement.text(currentTime);
		//update time function
		function updateCurrentTime() {
			const currentTime = dayjs().format("dddd, MMMM D, YYYY h:mm:ss A");
			currentDayElement.text(currentTime);
		}

		// Initial call to set the current date and time
		updateCurrentTime();
		// update the current date and time every second
		setInterval(updateCurrentTime, 1000);
		// Check if the current time is outside business hours
		//display message if outside of business hours
		checkBusinessHours();
		function checkBusinessHours() {
			const currentTime = dayjs(); // Get the current time as a dayjs object
			if (
				currentTime.isBefore(businessHoursStart) ||
				currentTime.isAfter(businessHoursEnd)
			) {
				$message3.show();
				console.log("Message3 shown");//check to see if working (works)
			} else {
				$message3.hide();
				console.log("Message3 hidden");//check to see if working (works)
			}
		}
		// Function to clear events from local storage
		function clearEvents() {
			for (let i = 0; i < workingHours; i++) {
				const hour = startHour + i;
				const eventKey = `event-${hour}`;
				localStorage.removeItem(eventKey);
			}
			// Clear the event text in the event columns
			$(".event").text("");
			// Show the message when events are cleared
			$message.text("Events have been cleared from local storage.");
			$message.show();
			// Hide the message after a brief delay (e.g., 3 seconds)
			setTimeout(function () {
				$message.hide();
			}, 3000);
		}
		// Generate time slots anad events
		for (let i = 0; i < workingHours; i++) {
			const hour = startHour + i;
			const timeSlot = dayjs().hour(hour).minute(0);
			const $row = $('<div class="row">');
			const $timeColumn = $('<div class="hour col-md-2">').text(
				timeSlot.format("h A")
			);
			const $eventColumn = $('<div class="event col-md-10">');
			const eventKey = `event-${hour}`;
			// Retrieve stored events from local storage
			const storedEvent = localStorage.getItem(eventKey);
			if (storedEvent) {
				$eventColumn.text(storedEvent);
			}
			// Create an input for new events
			const $eventInput = $(
				'<input type="text" class="form-control form-control-lg">'
			);
			$eventInput.val(storedEvent);
			// Create a button to save the event to local storage
			const $saveButton = $(
				'<button class="btn btn-primary col-md-.5" id="save-btn"><i class="fas fa-save fa-lg"></i></button>'
			);
			//listen for click to save to local storage
			$saveButton.on("click", function () {
				const newEvent = $eventInput.val();
				localStorage.setItem(eventKey, newEvent);
				// Show the message when the event is saved
				$message.show();
				// Hide the message after a brief delay (e.g., 3 seconds)
				setTimeout(function () {
					$message.hide();
				}, 3000);
			});
			// Determine if the hour is in the past, present, or future, this connects with .css
			if (timeSlot.isBefore(currentDay, "hour")) {
				$row.addClass("past");
			} else if (timeSlot.isSame(currentDay, "hour")) {
				$row.addClass("present");
			} else {
				$row.addClass("future");
			}
			//append time slot with save button and event
			$eventColumn.append($eventInput, $saveButton);
			$row.append($timeColumn, $eventColumn);
			$calendar.append($row);
		}
		// Handle the click event for clearing events
		$clearEventsButton.on("click", function () {
			$clearEventsModal.modal("show");
		});
		// Handle the click event for clearing events inside the modal
		$("#clearEventsButton2").on("click", function () {
			// Clear the event locally
			localStorage.clear();
			// Close the modal
			$clearEventsModal.modal("hide");
			// Show the message within the modal
			$message2.text("Local storage has been cleared.");
			$message2.show();
			// Hide the message after a brief delay
			setTimeout(function () {
				$message2.hide();
				setTimeout(function () {
					location.reload();
					// Reload Page to show cleared events
				}, 1000);
			}, 2000);
		});
	});
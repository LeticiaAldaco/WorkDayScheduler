// Add current date
var currentDay = moment().format("MMM Do YY");
$("#currentDay").text(currentDay);
var currentHour = moment().format("HH");
// Create Array that contains the times needed
var workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
function displayBlock() {
  // Add time blocks

  /*
   <!-- <div class="row time-block">
      <div class="col-1 hour"> 9am</div>
      <textarea class="col-10 description"></textarea>
      <button class="col-1 saveBtn">
        <i class="fas fa-save"></i>
      </button>

    </div>
*/
  // Create a for loop, loops thorugh length of Work Hours and dynamically create time blocks
  for (var i = 0; i < workHours.length; i++) {
    var d1 = $("<div>");
    d1.attr("class", "row time-block");

    var d2 = $("<div>");
    d2.attr("class", "col-1 hour");
    if (workHours[i] < 12) {
      d2.text(workHours[i] + "am");
    }
    if (workHours[i] === 12) {
      d2.text(workHours[i] + "pm");
    }
    if (workHours[i] > 12) {
      d2.text(workHours[i] - 12 + "pm");
    }

    var textarea = $("<textarea>");
    textarea.attr("class", "col-10 description");

    if (workHours[i] == currentHour) {
      textarea.attr("class", "col-10 description present");
    }
    if (workHours[i] < currentHour) {
      textarea.attr("class", "col-10 description past");
    }

    if (workHours[i] > currentHour) {
      textarea.attr("class", "col-10 description future");
    }
    textarea.attr("id", "hour-" + workHours[i]);

    var button = $("<button>");
    button.attr("class", "col-1 saveBtn");

    button.attr("id", workHours[i]);

    var icon = $("<i>");
    icon.attr("class", "fas fa-save");

    button.append(icon);
    d1.append(d2);
    d1.append(textarea);
    d1.append(button);

    $(".container").append(d1);

    // On click save button capture text area value and button id

    $(`#${workHours[i]}`).click(function (event) {
      var data = $(`#hour-${event.target.id}`).val();
      localStorage.setItem(event.target.id, data);
      console.log(data);
    });
  }
}

// Create funtion to save tasks (set item)
function saveStorage() {
  let userInput = $(this).siblings(".textarea").val();
  var localStorageKey = $(this).siblings("workHours").text();
  localStorage.setItem(localStorageKey, userInput);
  console.log(localStorageKey, userInput);
}

// Create function to grab tasks from local storage (get item)
function displayStorage() {
  for (var i = 0; i < workHours.length; i++) {
    var data = localStorage.getItem(workHours[i]);
    var hourTextArea = $(`#hour-${workHours[i]}`);
    hourTextArea.val(data);
    console.log(hourTextArea, data);
  }
}
displayBlock();
displayStorage();
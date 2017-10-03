(function() {

  // Global variables
  let $employees = [];
  let $htmlOutput = "<ul>";
  let $overlayOutput;
  let $active;

  // Add information about employees to the main screen
  function createEmployee(index) {

    // HTML string with employee information
    $htmlOutput += "<div class='employee' data-index=" + index + ">" +
    "<img src=" + $employees[index].img + ">" +
    "<div class='name'>" + $employees[index].name + "</div>" +
    "<div class='email'>" + $employees[index].email + "</div>" +
    "<div class='city'>" + $employees[index].city + "</div>";
    $htmlOutput += "</div>";
  }

  // Add additional information about employees to the modal window
  function createModalEmployee(index) {

    // Keep track of the current employee
    $active = index;

    // HTML string with employee information
    $overlayOutput = "<img src=" + $employees[index].img + ">" +
    "<div class='name'>" + $employees[index].name + "</div>" +
    "<div class='username'>" + $employees[index].username + "</div></br>" +
    "<div class='email'>" + $employees[index].email + "</div>" +
    "<div class='city'>" + $employees[index].city + "</div></br>" +
    "</br><div class='phone'>" + $employees[index].phone + "</div>" +
    "<div class='street'>" + $employees[index].street + "</div>" +
    "<div class='state'>" + $employees[index].state + "</div>" +
    "<div class='country'>" + $employees[index].country + "</div>" +
    "<div class='postcode'>" + $employees[index].postcode + "</div></br>" +
    "<div class='birthdate'>" + $employees[index].birthdate + "</div>";

    // Append the HTML string
    $("#modalWindow").append($overlayOutput);

    $htmlOutput = "<ul>";

    // Show/hide buttons depending on which employee is being shown
    if (index == ($employees.length - 1)) {
      $("#next").hide();
      $("#prev").show();
    } else if (index == 0) {
      $("#next").show();
      $("#prev").hide();
    } else {
      $("#next").show();
      $("#prev").show();
    }
  }

  // Close the modal window
  $("#close").click(function() {
    $("#overlay").css("display", "none");
    $("#modalWindow").html("");
  });

  // Show the next modal window employee
  $("#next").click(function() {
    $("#modalWindow").html("");
    $("#overlay").css("display", "block");
    createModalEmployee($active+1);
  });

  // Show the previous modal window employee
  $("#prev").click(function() {
    $("#modalWindow").html("");
    $("#overlay").css("display", "block");
    createModalEmployee($active-1);
  });

  // Search for employee based on name and username
  $("#submitButton").click(function(event) {
    event.preventDefault();

    let $searchText = $("#searchText").val().toLowerCase();

    $searchText = $searchText.replace(/ /g,'');

    $(".employee").hide();

    for (let i = 0; i < $employees.length; i++) {
      if ($employees[i].name.indexOf($searchText) !== -1) {
        $(".employee[data-index=" + i + "]").show();
      } else if ($employees[i].username.indexOf($searchText) !== -1)
        $(".employee[data-index=" + i + "]").show();
    }

  });

  // AJAX call
  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=gb',
    dataType: 'json',
    success: function(data) {

      // Create an object for each employee
      for (let i = 0; i < data.results.length; i++) {
        let $employee = {};

        $employee.img = data.results[i].picture.large;
        $employee.name = data.results[i].name.first + " ";
        $employee.name += data.results[i].name.last;
        $employee.username = data.results[i].login.username;
        $employee.email = data.results[i].email;
        $employee.phone = data.results[i].phone;
        $employee.street = data.results[i].location.street;
        $employee.city = data.results[i].location.city;
        $employee.state = data.results[i].location.state;
        $employee.postcode = data.results[i].location.postcode;
        $employee.country = data.results[i].nat;
        $employee.birthdate = data.results[i].dob;

        // Adds the employee object to the end of the global employees array
        $employees.push($employee);

      }

      // Create the html for all the employees
      for (let i = 0; i < $employees.length; i++) {

        createEmployee(i);

      }

      $htmlOutput += "</ul>";

      // Show the employees
      $("#employees").html($htmlOutput);

      // Open the overlay/modal window
      $(".employee").click(function(event) {
        $("#overlay").css("display", "block");

        createModalEmployee(parseInt(event.currentTarget.dataset.index));

      });



    }
  });

}());

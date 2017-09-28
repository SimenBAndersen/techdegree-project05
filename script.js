(function() {

  let $employees = [];
  let $htmlOutput = "<ul>";
  let $overlayOutput;
  let $active;

  function createEmployee(index) {

    $htmlOutput += "<div class='employee' data-index=" + index + ">" +
    "<img src=" + $employees[index].img + ">" +
    "<div class='name'>" + $employees[index].name + "</div>" +
    "<div class='email'>" + $employees[index].email + "</div>" +
    "<div class='city'>" + $employees[index].city + "</div>";
    $htmlOutput += "</div>";
  }

  function createModalEmployee(index) {
    $active = index;
    console.log($active);

    $overlayOutput = "<img src=" + $employees[index].img + ">" +
    "<div class='name'>" + $employees[index].name + "</div>" +
    "<div class='username'>" + $employees[index].username + "</div></br>" +
    "<div class='email'>" + $employees[index].email + "</div>" +
    "<div class='city'>" + $employees[index].city + "</div></br>" +
    "</br><div class='phone'>" + $employees[index].phone + "</div>" +
    "<div class='street'>" + $employees[index].street + "</div>" +
    "<div class='state'>" + $employees[index].state + "</div>" +
    "<div class='postcode'>" + $employees[index].postcode + "</div></br>" +
    "<div class='birthdate'>" + $employees[index].birthdate + "</div>";

    $("#modalWindow").append($overlayOutput);

    $htmlOutput = "<ul>";

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

  $("#close").click(function() {
    $("#overlay").css("display", "none");
    $("#modalWindow").html("");
  });

  $("#next").click(function() {
    $("#modalWindow").html("");
    $("#overlay").css("display", "block");
    createModalEmployee($active+1);
  });

  $("#prev").click(function() {
    $("#modalWindow").html("");
    $("#overlay").css("display", "block");
    createModalEmployee($active-1);
  });

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

  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=gb',
    dataType: 'json',
    success: function(data) {

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

        $employees.push($employee);

      }

      for (let i = 0; i < $employees.length; i++) {

        createEmployee(i);

      }

      $htmlOutput += "</ul>";

      $("#employees").html($htmlOutput);

      $(".employee").click(function(event) {
        $("#overlay").css("display", "block");

        createModalEmployee(parseInt(event.currentTarget.dataset.index));

      });



    }
  });

}());

(function() {

  let employees = [];
  let htmlOutput = "<ul>";
  let overlayOutput;
  let button = "<button type='button' id='close'>X</button>";

  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=gb',
    dataType: 'json',
    success: function(data) {

      for (let i = 0; i < data.results.length; i++) {
        let employee = {};

        employee.img = data.results[i].picture.large;
        employee.firstname = data.results[i].name.first;
        employee.lastname = data.results[i].name.last;
        employee.username = data.results[i].login.username;
        employee.email = data.results[i].email;
        employee.phone = data.results[i].phone;
        employee.street = data.results[i].location.street;
        employee.city = data.results[i].location.city;
        employee.state = data.results[i].location.state;
        employee.postcode = data.results[i].location.postcode;
        employee.country = data.results[i].nat;
        employee.birthdate = data.results[i].dob;

        employees.push(employee);

      }

      for (let i = 0; i < employees.length; i++) {

        htmlOutput += "<div class='employee' data-index=" + i + ">" +
        "<img src=" + employees[i].img + ">" +
        "<div class='name'>" + employees[i].firstname + " " +
        employees[i].lastname + "</div>" +
        "<div class='email'>" + employees[i].email + "</div>" +
        "<div class='city'>" + employees[i].city + "</div>";
        htmlOutput += "</div>";
      }

      htmlOutput += "</ul>";

      $("#employees").html(htmlOutput);

      $(".employee").click(function(event) {
        $("#overlay").css("display", "block");

        let index = event.currentTarget.dataset.index;

        overlayOutput = "<img src=" + employees[index].img + ">" +
        "<div class='name'>" + employees[index].firstname + " " +
        employees[index].lastname + "</div>" +
        "<div class='username'>" + employees[index].username + "</div></br>" +
        "<div class='email'>" + employees[index].email + "</div>" +
        "<div class='city'>" + employees[index].city + "</div></br>" +
        "</br><div class='phone'>" + employees[index].phone + "</div>" +
        "<div class='street'>" + employees[index].street + "</div>" +
        "<div class='state'>" + employees[index].state + "</div>" +
        "<div class='postcode'>" + employees[index].postcode + "</div></br>" +
        "<div class='birthdate'>" + employees[index].birthdate + "</div>";

        $("#modalWindow").append(overlayOutput);

      });

      $("#close").click(function() {
        $("#overlay").css("display", "none");
        $("#modalWindow").html("");
      });

    }
  });

}());

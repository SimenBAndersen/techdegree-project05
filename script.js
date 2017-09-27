(function() {

  let employees = [];
  let htmlOutput = "<ul>";

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

        htmlOutput += "<div class='employee'>" +
        "<img src=" + employees[i].img + ">" +
        "<div class='name'>" + employees[i].firstname + " " +
        employees[i].lastname + "</div>" +
        "<div class='email'>" + employees[i].email + "</div>" +
        "<div class='city'>" + employees[i].city + "</div>";
        htmlOutput += "</div>";
      }

      htmlOutput += "</ul>";

      $("#employees").html(htmlOutput);

    }
  });

}());

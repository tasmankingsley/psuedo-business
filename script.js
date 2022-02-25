// Displays cars object in homepage divs
function displayCars(cars) {
  const tIdArray = ['#t1', '#t2', '#t3', '#t4', '#t5', '#t6', '#t7', '#t8', '#t9', '#t10'];
  const pIdArray = ['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8', '#p9', '#p10'];

  for (let i = 0; i < 10; i++) {
    $(`${tIdArray[i]}`).html(`${cars.car[i].Brand} ${cars.car[i].Model} ${cars.car[i]['Model year']}`);

    $(`${pIdArray[i]}`).html(`
      <b>Category:</b> ${cars.car[i].Category}<br>
      <b>Mileage:</b> ${cars.car[i].Mileage}<br>
      <b>Fuel type:</b> ${cars.car[i]['Fuel type']}<br>
      <b>Seats:</b> ${cars.car[i].Seats}<br>
      <b>Price per day:</b> ${cars.car[i]['Price per day']}<br>
      <b>Availability:</b> ${cars.car[i].Availability}<br><br>
      <b>Description:</b> ${cars.car[i].Description}<br><br>
      `);
  }
}

// Get json file for displaying cars
$(document).ready(() => {
  $.ajax({
    url: 'cars.json',
    method: 'GET',
    dataType: 'json',
    cache: false,
    success(response) {
      /* global cars */
      cars = response;
      displayCars(cars);
    },
  });
});

// Filters
$('#sedanFilter').click(() => {
  $('#div4, #div7, #div8, #div9').toggle();
  $('#sedanFilter').toggleClass('liveFilter');
});

$('#suvFilter').click(() => {
  $('#div1, #div2, #div3, #div5, #div6, #div8, #div9, #div10').toggle();
  $('#suvFilter').toggleClass('liveFilter');
});

$('#hatchFilter').click(() => {
  $('#div1, #div2, #div3, #div4 , #div5, #div6, #div7, #div10').toggle();
  $('#hatchFilter').toggleClass('liveFilter');
});

// Checks availability and sets a session item corresponding to car object item
function addRes(buttonID) {
  const bIdArray = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'];
  const tempID = bIdArray.indexOf(buttonID);

  if (cars.car[tempID].Availability === true) {
    sessionStorage.setItem(buttonID, tempID);
    alert('Succesfully added to your reservation!');
  } else {
    alert('Sorry, the car is not available now. Please try other cars');
  }
}

// Called upon adding to cart in displayRes(), clearing items, or updating day-input.
function calculateTotal() {
  $(document).ready(() => {
    let num = 0;
    let days = 0;
    let subTotal = 0;
    let sum = 0;
    $('.cartPrice').each(function getFloat() {
      num = parseFloat($(this).text().replace(/[^0-9.-]+/g, ''));
      days = $(this).next().find('input.days')
        .val();

      subTotal = num * days;

      // Validates days and outputs Subtotal in table
      if (days > 0) {
        $(this).next('td').next('td').html(`$${subTotal}`);
      } else {
        alert('Please enter a value > 0.');
      }

      num = 0;
      days = 0;
      subTotal = 0;
    });

    // Sums all Subtotals and outputs total in table
    $('.subTotal').each(function getFloat() {
      sum += parseFloat($(this).text().replace(/[^0-9.-]+/g, ''));
      $('#total').html(`$${sum}`);
      sessionStorage.setItem('total', sum);
    });
  });
}

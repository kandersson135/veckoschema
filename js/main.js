$(document).ready(function(){
	// Declare variables
	var d = new Date();
	var day = d.getDay();

	// Get current day of week
	/*
	if (day == 0) {
		$('<img src="http://papunet.net/sites/papunet.net/files/kuvapankki/20130503/today.png" class="table-card is-round">').appendTo("td.table-sunday");
	} else if (day == 1) {
		$('<img src="http://papunet.net/sites/papunet.net/files/kuvapankki/20130503/today.png" class="table-card is-round">').appendTo("td.table-monday");
	} else if (day == 2) {
		$('<img src="http://papunet.net/sites/papunet.net/files/kuvapankki/20130503/today.png" class="table-card is-round">').appendTo("td.table-tuesday");
	} else if (day == 3) {
		$('<img src="http://papunet.net/sites/papunet.net/files/kuvapankki/20130503/today.png" class="table-card is-round">').appendTo("td.table-wednesday");
	} else if (day == 4) {
		$('<img src="http://papunet.net/sites/papunet.net/files/kuvapankki/20130503/today.png" class="table-card is-round">').appendTo("td.table-thursday");
	} else if (day == 5) {
		$('<img src="http://papunet.net/sites/papunet.net/files/kuvapankki/20130503/today.png" class="table-card is-round">').appendTo("td.table-friday");
	} else if (day == 6) {
		$('<img src="http://papunet.net/sites/papunet.net/files/kuvapankki/20130503/today.png" class="table-card is-round">').appendTo("td.table-saturday");
	}
	*/

	// Add button click
	$('#add-btn').click(function() {
    $('<img src="img/pictogram/promenad.png" class="table-card is-round">').appendTo("td.table-monday");
  });
  // Print button click
	$('#print-btn').click(function() {
    window.print();

    /*
		const filename  = 'veckoschema.pdf';

		html2canvas(document.querySelector('.table'), {scale: 4}).then(canvas => {
				//let pdf = new jsPDF('l', 'mm', 'a4');
				//pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 10, 10, 278, 191);

				var pdf = new jsPDF("l", "mm", "a4");
				var imgData = canvas.toDataURL('image/jpeg', 1.0);
				pdf.addImage(imgData, 'JPEG', 10, 10, 278, 191);
				pdf.save(filename);
		});
		*/
  });

  // Settings button click
	var wrapper = document.createElement('div');
	var itemValue = localStorage.getItem("option");

	// Check radio button value
	if (itemValue !== null) {
		if (itemValue === "1") {
			wrapper.innerHTML = '<p>Ange vilka dagar som ska visas</p><input type="radio" onclick="localStorage.setItem(`option`, `1`);" name="days" id="opt1" value="1" checked="checked"> <label for="opt1">Mån-Sön</label> &nbsp;&nbsp;&nbsp; <input type="radio" onclick="localStorage.setItem(`option`, `2`);" name="days" id="opt2" value="2"> <label for="opt2">Mån-Fre</label>';
		} else {
			$(".table-saturday, .table-sunday").hide();
			wrapper.innerHTML = '<p>Ange vilka dagar som ska visas</p><input type="radio" onclick="localStorage.setItem(`option`, `1`);" name="days" id="opt1" value="1"> <label for="opt1">Mån-Sön</label> &nbsp;&nbsp;&nbsp; <input type="radio" onclick="localStorage.setItem(`option`, `2`);" name="days" id="opt2" value="2"  checked="checked"> <label for="opt2">Mån-Fre</label>';
		}
	} else {
		wrapper.innerHTML = '<p>Ange vilka dagar som ska visas</p><input type="radio" onclick="localStorage.setItem(`option`, `1`);" name="days" id="opt1" value="1" checked="checked"> <label for="opt1">Mån-Sön</label> &nbsp;&nbsp;&nbsp; <input type="radio" onclick="localStorage.setItem(`option`, `2`);" name="days" id="opt2" value="2"> <label for="opt2">Mån-Fre</label>';
	}

	$('#settings-btn').click(function() {
		swal({
    	title: "Inställningar",
      content: wrapper
    })
    .then((willReload) => {
      if (willReload) {
        location.reload();
      }
    });
  });

  // Clear button click
	$('#clear-btn').click(function() {
		swal({
    	title: "Rensa schemat?",
      text: "Vill du verkligen rensa veckoschemat? Alla bilder kommer att försvinna.",
      buttons: ["Avbryt", "OK"],
    })
    .then((willClear) => {
      if (willClear) {
        $(".table-card").fadeOut('slow');
      }
    });
  });

  // Help button click
  var wrapper2 = document.createElement('div');
	wrapper2.innerHTML = '<p>Bilder är hämtade från <a href="https://www.pictogram.se/" target="_blank">Pictogram.se</a>.<br><br>Denna webbapp är mitt privata projekt och är inte på något sätt anknutet till Pictogram.se.<br><br>Utvecklad av Kim Andersson.<br><a href="mailto:info@anderssonwebb.se?subject=Veckoschema%20webbapp">info@anderssonwebb.se</a></p>';

	$('#help-btn').click(function() {
    swal({
		  title: 'Om webbappen',
		  content: wrapper2
		});
  });

  // Card click
  $(".table").on('click', 'img', function() {
  	$(this).fadeOut('slow');
  });

  // Monday column click
  $("td.table-monday").click(function(e) {
    if ($(e.target).is('td.table-monday')) {
    	swal("Lägg till en aktivitet för måndag:", {
			  content: "input",
			})
			.then((value) => {
				var image_url = `img/pictogram/${value.toLowerCase()}.png`;

				if (!value == "") {
					$.get(image_url)
			    .done(function() {
			      $(`<img src="${image_url}" class="table-card is-round">`).appendTo("td.table-monday");

			    }).fail(function() {
						swal("Oops!", "Ingen bild som matchade söksträngen kunde hittas.");
			    });
				}
			});
    }
  });

  // Tuesday column click
  $("td.table-tuesday").click(function(e) {
    if ($(e.target).is('td.table-tuesday')) {
    	swal("Lägg till en aktivitet för tisdag:", {
			  content: "input",
			})
			.then((value) => {
				var image_url = `img/pictogram/${value.toLowerCase()}.png`;

				if (!value == "") {
					$.get(image_url)
			    .done(function() {
			      $(`<img src="${image_url}" class="table-card is-round">`).appendTo("td.table-tuesday");

			    }).fail(function() {
						swal("Oops!", "Ingen bild som matchade söksträngen kunde hittas.");
			    });
				}
			});
    }
  });

  // Wednesday column click
  $("td.table-wednesday").click(function(e) {
    if ($(e.target).is('td.table-wednesday')) {
    	swal("Lägg till en aktivitet för onsdag:", {
			  content: "input",
			})
			.then((value) => {
				var image_url = `img/pictogram/${value.toLowerCase()}.png`;

				if (!value == "") {
					$.get(image_url)
			    .done(function() {
			      $(`<img src="${image_url}" class="table-card is-round">`).appendTo("td.table-wednesday");

			    }).fail(function() {
						swal("Oops!", "Ingen bild som matchade söksträngen kunde hittas.");
			    });
				}
			});
    }
  });

  // Thursday column click
  $("td.table-thursday").click(function(e) {
    if ($(e.target).is('td.table-thursday')) {
    	swal("Lägg till en aktivitet för torsdag:", {
			  content: "input",
			})
			.then((value) => {
				var image_url = `img/pictogram/${value.toLowerCase()}.png`;

				if (!value == "") {
					$.get(image_url)
			    .done(function() {
			      $(`<img src="${image_url}" class="table-card is-round">`).appendTo("td.table-thursday");

			    }).fail(function() {
						swal("Oops!", "Ingen bild som matchade söksträngen kunde hittas.");
			    });
				}
			});
    }
  });

  // Friday column click
  $("td.table-friday").click(function(e) {
    if ($(e.target).is('td.table-friday')) {
    	swal("Lägg till en aktivitet för fredag:", {
			  content: "input",
			})
			.then((value) => {
				var image_url = `img/pictogram/${value.toLowerCase()}.png`;

				if (!value == "") {
					$.get(image_url)
			    .done(function() {
			      $(`<img src="${image_url}" class="table-card is-round">`).appendTo("td.table-friday");

			    }).fail(function() {
						swal("Oops!", "Ingen bild som matchade söksträngen kunde hittas.");
			    });
				}
			});
    }
  });

  // Saturday column click
  $("td.table-saturday").click(function(e) {
    if ($(e.target).is('td.table-saturday')) {
    	swal("Lägg till en aktivitet för lördag:", {
			  content: "input",
			})
			.then((value) => {
				var image_url = `img/pictogram/${value.toLowerCase()}.png`;

				if (!value == "") {
					$.get(image_url)
			    .done(function() {
			      $(`<img src="${image_url}" class="table-card is-round">`).appendTo("td.table-saturday");

			    }).fail(function() {
						swal("Oops!", "Ingen bild som matchade söksträngen kunde hittas.");
			    });
				}
			});
    }
  });

  // Sunday column click
  $("td.table-sunday").click(function(e) {
    if ($(e.target).is('td.table-sunday')) {
    	swal("Lägg till en aktivitet för söndag:", {
			  content: "input",
			})
			.then((value) => {
				var image_url = `img/pictogram/${value.toLowerCase()}.png`;

				if (!value == "") {
					$.get(image_url)
			    .done(function() {
			      $(`<img src="${image_url}" class="table-card is-round">`).appendTo("td.table-sunday");

			    }).fail(function() {
						swal("Oops!", "Ingen bild som matchade söksträngen kunde hittas.");
			    });
				}
			});
    }
  });
});

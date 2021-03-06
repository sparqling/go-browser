function init() {
    show_selected_genomes();
}

$(function() {
  $(document).on('click', '.add_genome', function() {
	  var this_row = $(this).closest('tr');
	  // Selected item
	  var codename = this_row.find('td:nth-child(3)').text();
	  var orgname = this_row.find('td:nth-child(7)').text();

	  if (localStorage.getItem(codename)) { 
	    // Delete the item
	    localStorage.removeItem(codename);
	  } else {         
	    // Add the item
	    localStorage.setItem(codename, orgname);
	  }

	  show_selected_genomes();
  });

  $(document).on('click', '.add_genome_all', function() {
	  // Swith the icon
    let selected = $(this).prop('checked');
    for (var i=0; i<$('.add_genome').length; i++) {
	    var each_icon = $('.add_genome').eq(i);
	    var each_row = each_icon.closest('tr');
	    // Eech item
	    var codename = each_row.find('td:nth-child(3)').text();
	    var orgname = each_row.find('td:nth-child(7)').text();
      
      if (selected) {
		    // Add the item
        if (!localStorage.getItem(codename)) {
 		      localStorage.setItem(codename, orgname);
		    }
      } else {
		    // Delete the item
        if (localStorage.getItem(codename)) {
		      localStorage.removeItem(codename);
		    }
      }
	  }

	  show_selected_genomes();
  });
});

function show_selected_genomes() {

  var total = 0;
  let html = '<thead><tr>' +
    '<th align="center"><input type="checkbox" class="add_genome_all" checked title="Select all"></th>' +
	'<th>Ref</th>' +
	// '<th>Rep</th>' +
	'<th>Proteome ID</th>' +
	'<th>Genome ID</th>' +
	'<th>Tax ID</th>' +
	'<th>Species Name</th>' +
	'<th>Genes</th>' +
	'<th>Isoforms</th>' +
	'<th>CPD <a href="https://uniprot.org/help/assessing_proteomes" target="_blank">*</a></th>' +
	'<th>BUSCO</th>' +
	'<th class="thin">single</th>' +
	'<th class="thin">dupli.</th>' +
	'<th class="thin">frag.</th>' +
	'<th class="thin">miss.</th>' +
	'</tr></thead>';
  // var html = '<thead><tr>' +
  //   '<th align="center"><button type="button" class="add_genome_all" title="Select all">' +
  //   '<img src="img/minus.png" border="0" height="15" width="15"></button></th>' +
  //   '<th>ID</th>' +
  //   '<th>Name</th>' +
  //   '</tr><thead>';

  for (var i=0; i<localStorage.length; i++) {
	  var key = localStorage.key(i);
    if (key.startsWith('UP0')) {
	    var val = localStorage.getItem(key);
      html += '<tr>' + val + '</tr>';
	    total++;
    }
  }
  html += '';
  
  $('#details').html(html)
  $("#counter_div").html('<font size="2"><br>You selected <b>' + total + '</b> proteomes <br><br></font>');

  for (var i = 0; i < $('.add_genome').length; i++) {
    var each_checkbox = $('.add_genome').eq(i);
    each_checkbox.prop("checked", true);
  }


	$(function() {
	  $.tablesorter.addParser({
		  id: "fancyNumber",
		  is: function(s) {
		    return /^[0-9]?[0-9,\.]*$/.test(s);
		  },
		  format: function(s) {
		    return $.tablesorter.formatFloat(s.replace(/,/g, ''));
		  },
		  type: "numeric"
	  });
	  $('#details').tablesorter(
		  {
		    headers: {
			    0: {sorter:false},
			    7: {sorter:'fancyNumber'},
			    8: {sorter:'fancyNumber'},
		    }
		  }
	  );
	});
}

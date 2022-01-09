$(document).ready(function() {

    function Borrow() {
        const id_book = $(this).attr("value");
        var this_object = $(this);

        // AJAX request
        $.ajax({
            method: "PUT",
            url: "/api/borrow",
            data: { id: id_book },
            statusCode: {
                500: function() {
                  alert( "Error, try again." );
                }
              }
          })
            .done(function( msg ) {
                // Change text and disable/enable the button
                this_object.closest("tr").find("td:eq(1)").text("Indisponible");
                this_object.prop('disabled', true);
                this_object.closest("tr").find('.return').prop('disabled', false);
            });
    }

    function Return() {
        const id_book = $(this).attr("value");
        var this_object = $(this);

        // AJAX request
        $.ajax({
            method: "PUT",
            url: "/api/return",
            data: { id: id_book },
            statusCode: {
                500: function() {
                  alert( "Error, try again." );
                }
              }
          })
            .done(function( msg ) {
                // Change text and disable/enable the button
                this_object.closest("tr").find("td:eq(1)").text("Disponible");
                this_object.prop('disabled', true);
                this_object.closest("tr").find('.borrow').prop('disabled', false);
            });
    }

    function init(){
        // For each row of the table, disable a button according to status
        $('table tr').each(function(index) {
            if($(this).find("td:eq(1)").text() == "Disponible"){
                $(this).find('.return').prop('disabled', true);
            }
            else if ($(this).find("td:eq(1)").text() == "Indisponible") {
                $(this).find('.borrow').prop('disabled', true);
            }
        });
    }

    //If user clicks on a button
    $(".borrow").click(Borrow);
    $(".return").click(Return);

    init();

});
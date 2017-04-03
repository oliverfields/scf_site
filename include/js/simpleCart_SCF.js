$(document).ready(function(){

  $("#nav").find("ul").append("<li><a class=\"button shopping_cart_button\" href=\"file:///home/oliver/Documents/Personal/projects/pagegen/scf_site/site/test/checkout.html\">Handlekurv (<span class=\"simpleCart_quantity\"></span>)</a></li>");

  // Check mandatory fields not empty
  $('#ordered_by_name').on('input', function() {
    is_empty($(this));
  });

  $('#delivery_date').on('input', function() {
    is_empty($(this));
  });

  $('#customer_name').on('input', function() {
    is_empty($(this));
  });

  $('#customer_phone').on('input', function() {
    is_empty($(this));
  });

  $('#customer_email').on('input', function() {
    is_empty($(this));
  });

  // After Form Submitted Validation
  $("a.simpleCart_checkout").click(function(event){
    var no_errors = true;
    $("#order_details :input").each(function(){
      if($(this).hasClass("mandatory")) {
        if(is_empty($(this))) {
          no_errors = false;
        }
      }
    });
    return false;
    return no_errors;
  });

});

function is_empty(input) {
  var error_element=$("span", input.parent());
  if(input.val().length > 0){
    input.removeClass("form_invalid").addClass("form_valid");
    error_element.removeClass("form_error_show").addClass("form_error");
    return false;
  }
  else{
    input.removeClass("form_valid").addClass("form_invalid");
    error_element.removeClass("form_error").addClass("form_error_show");
    return true;
  }
}

simpleCart({
  cartStyle: "table",
  taxRate: 0.25,
  cartColumns: [
    { attr: "name", label: "Navn"},
    { view: "currency", attr: "price", label: "Pris"},
    { view: "decrement", label: false},
    { attr: "quantity", label: "Antall brett*"},
    { view: "increment", label: false},
    { view: "remove", text: "Fjern", label: false},
    { view: "currency", attr: "total", label: "Pris" }
  ],
  checkout: {
    type: "SendForm",
    url: "http://southcoastfarms.no/order.php",
    method: "POST",
    success: "/success.html",
    cancel: "/cancel.html",
    extra_data: {
      ordered_by_name: document.getElementById("ordered_by_name").value,
      customer_name: document.getElementById("customer_name").value,
      customer_phone: document.getElementById("customer_phone").value,
      customer_email: document.getElementById("customer_email").value,
      customer_address: document.getElementById("customer_address").value,
      ship_order: document.getElementById("ship_order").value,
      delivery_date: document.getElementById("delivery_date").value
    }
  }
});

simpleCart.bind( 'beforeCheckout' , function( data ){
  data.ordered_by_name = document.getElementById("ordered_by_name").value;
  data.customer_name = document.getElementById("customer_name").value;
  data.customer_phone = document.getElementById("customer_phone").value;
  data.customer_email = document.getElementById("customer_email").value;
  data.customer_address = document.getElementById("customer_address").value;
  data.ship_order = document.getElementById("ship_order").value;
  data.delivery_date = document.getElementById("delivery_date").value;
});

simpleCart.currency({
  code: "NOK" ,
  name: "Norwegian Krone" ,
  symbol: "kr" ,
  delimiter: " " , 
  decimal: "," , 
  after: true ,
  accuracy: 0
});

simpleCart.shipping(function(){
  var total = 0;
  if ($('#ship_order').is(':checked')) {
      simpleCart.each( function( item ){
      total+= item.quantity() * 15;
    });
  }
  else {
    total = 0;
  }
  return total;
});

function toggle_address_mandatory() {
  var error_element=$("span", $("#customer_address").parent());
  if ($('#ship_order').is(':checked')) {
    $("#customer_address_label").text("Adresse*");
    $("#customer_address").addClass("mandatory");
    $('#customer_address').on('input', function() {
      if(is_empty($(this))) {
        error_element.removeClass("form_error").addClass("form_error_show");
      }
      else {
        error_element.removeClass("form_error_show").addClass("form_error");
      }
    });
  }
  else {
    $("#customer_address_label").text("Adresse");
    $("#customer_address").removeClass("mandatory");
    $("#customer_address").removeClass("form_invalid");
    error_element.removeClass("form_error_show").addClass("form_error");
    // Remove form validation function
    $('#customer_address').unbind();
  }
}
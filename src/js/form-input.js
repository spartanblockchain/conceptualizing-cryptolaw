function ConvertFormToJSON(form){
  var array = jQuery(form).serializeArray();
  var json = {};
  
  jQuery.each(array, function() {
      json[this.name] = this.value || '';
  });
  
  return json;
}

function onFormSubmit(){
  
    var formData = ConvertFormToJSON($("#contact"));

    // $.ajax({
    //     type: "POST",
    //     url: "input.php",
    //     data: formData,
    //     dataType: "json"
    // });
    
    $.ajax({
        type: "POST",
        url: "input.html",
        data: formData,
        success: function(){},
        dataType: "json",
        contentType : "application/json"
      });

      console.log(formData);
};

$(document).ready(function(e){
    console.log("Document Ready");

    $("#contact").submit(function(e){
        console.log("Submit");
        e.preventDefault();
        onFormSubmit();
    })
})

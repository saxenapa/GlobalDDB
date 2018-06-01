$(document).ready(function(){

   var getPoster = function(){

        var key = $('#ddbkey').val();

         if(key == ''){

            $('#fetchresponse').html("<H1 class='loading'>Ha! We haven't forgotten to validate the form! Please enter something.</H1>");

         } else {

            $('#fetchresponse').html("<h3 class='loading'>Searching .... </h3>");

            $.getJSON("https://globalapp.saxparul.us/v1/GetDDB/?key="+key, function(json) {
              if (json.status=200){
               if (json.errorType != "KeyError"){
                 var region = json[1];
                 var propertyName = 'aws:rep:updateregion';
                 var obj = json[0];
                 var updator = obj[propertyName];
                     $('#fetchresponse').html('<h3 class="loading"> Value: ' + json[0].Value+ ' is fetched from region '+ region +' .</h3><h3 class="loading">Last updator region: '+ updator +'</h3>');
                  } else {
                     $('#fetchresponse').html('<h3 class="loading"> Key ' + key + ' does not exist in your Global Table.</h3>');
                  }
                }
                else {
                  $('#fetchresponse').html('<h3 class="loading"> Unable to connect to your Global Table.</h3>');
                }
             });

          }

        return false;
   }

   var updatevalue = function(){

        var key = $('#setddbkey').val();
        var value = $('#setddbvalue').val();

         if(key == '' || value == ''){

            $('#updateresponse').html("<h3 class='loading'>Ha! We haven't forgotten to validate the form! Please enter something.</h3>");

         } else {

            $('#updateresponse').html("<h3 class='loading'>Searching .... </h3>");

            $.getJSON("https://globalapp.saxparul.us/v1/SetDDB/?key="+ key + "&value=" + value , function(json) {
               if (json[0].ResponseMetadata.HTTPStatusCode=200){
                     $('#updateresponse').html('<h3 class="loading"> Value Updated successfully in region ' + json[1]+' of the Global Table. </h3>');
                  } else {
                     $('#updateresponse').html('<h3 class="loading"> Failed to updated value "' + value +'" to the Global Table . </h3>');
                  }
             });

          }

        return false;
   }

   $('#search').click(getPoster);
   $('#updatevalue').click(updatevalue);


});

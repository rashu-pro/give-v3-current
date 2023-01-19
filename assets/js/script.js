/**
 * Created by Rashu on 22-04-21.
 */

$(function () {
    let otherAmount = $('#other-amount'),
        btnAmount = $('.btn-amount-box-js'),
        chosenAmount = $('#chosen-amount');

    if($('.form-control').length>0){
        $('.form-control').each(function (i, element) {
            if($(element).val()){
                $(element).closest('.form-group').find('.field-label').addClass('focused');
            }
        });

        $(document).on('focus','.form-control',function () {
            var self = $(this);
            self.prev().addClass('focused');
        });

        $(document).on('blur','.form-control',function () {
            var self = $(this);
            if(self.val()===''){
                self.prev().removeClass('focused');
            }
        });
    }


    $('.checkbox-recurring').on('change',function () {
        var self = $(this);
        if(self.prop('checked') == true){
            $('.recurring-period').slideDown('slow');
        }else{
            $('.recurring-period').slideUp('slow');
        }
    });

    if($('.recurring-type').length>0){
        if($('.recurring-type').val()==0){
            $('.recurring-duration').hide();
        }
    }
    $('.recurring-type').on('change',function () {
        var self = $(this);
        if(self.val()==3){
            $('.recurring-duration').hide();
        }else{
            $('.recurring-duration').show();
        }
    });

    if($('.donation-wrapper').length>0){
        // $('.donation-wrapper').css('margin-top',$('header').height());
    }

    // format phone number
    // Phone formatting: (555) 555-5555
    $(".format-phone").on("keyup paste", function(event) {
        // console.log('typed');

        // Don't run for backspace key entry, otherwise it bugs out
        if(event.which != 8){

            // Remove invalid chars from the input
            var input = this.value.replace(/[^0-9\(\)\s\-]/g, "");
            var inputlen = input.length;
            // Get just the numbers in the input
            var numbers = this.value.replace(/\D/g,'');
            var numberslen = numbers.length;
            // Value to store the masked input
            var newval = "";

            // Loop through the existing numbers and apply the mask
            for(var i=0;i<numberslen;i++){
                if(i==0) newval="("+numbers[i];
                else if(i==2) newval+=numbers[i]+") ";
                else if(i==6) newval+="-"+numbers[i];
                else newval+=numbers[i];
            }

            // Re-add the non-digit characters to the end of the input that the user entered and that match the mask.
            if(inputlen>=1&&numberslen==0&&input[0]=="(") newval="(";
            else if(inputlen>=6&&numberslen==3&&input[4]==")"&&input[5]==" ") newval+=") ";
            else if(inputlen>=5&&numberslen==3&&input[4]==")") newval+=" ";
            else if(inputlen>=6&&numberslen==3&&input[5]==" ") newval+=" ";
            else if(inputlen>=10&&numberslen==6&&input[9]=="-") newval+="-";

            $(this).val(newval.substring(0,14));

        }
    });

    $(".format-cvv").on("keyup paste", function(event) {
        // console.log('typed');

        // Don't run for backspace key entry, otherwise it bugs out
        if(event.which != 8){

            // Remove invalid chars from the input
            var input = this.value.replace(/[^0-9\(\)\s\-]/g, "");
            var inputlen = input.length;
            // Get just the numbers in the input
            var numbers = this.value.replace(/\D/g,'');
            var numberslen = numbers.length;
            // Value to store the masked input
            var newval = "";

            // Loop through the existing numbers and apply the mask
            for(var i=0;i<numberslen;i++){
               newval+=numbers[i];
            }

            $(this).val(newval.substring(0,5));

        }
    });

    $(".format-expiry").on("keyup paste", function(event) {
        // console.log('typed');

        // Don't run for backspace key entry, otherwise it bugs out
        if(event.which != 8){

            // Remove invalid chars from the input
            var input = this.value.replace(/[^0-9\(\)\s\-]/g, "");
            var inputlen = input.length;
            // Get just the numbers in the input
            var numbers = this.value.replace(/\D/g,'');
            var numberslen = numbers.length;
            // Value to store the masked input
            var newval = "";

            // Loop through the existing numbers and apply the mask
            for(var i=0;i<numberslen;i++){
                if(i==0) newval = numbers[i];
                else if(i==1) newval+=numbers[i]+"/";
                else newval+=numbers[i];
            }

            // Re-add the non-digit characters to the end of the input that the user entered and that match the mask.
            if(inputlen>=1&&numberslen==0&&input[0]=="(") newval="(";
            else if(inputlen>=6&&numberslen==3&&input[4]==")"&&input[5]==" ") newval+=") ";
            else if(inputlen>=5&&numberslen==3&&input[4]==")") newval+=" ";
            else if(inputlen>=6&&numberslen==3&&input[5]==" ") newval+=" ";
            else if(inputlen>=10&&numberslen==6&&input[9]=="-") newval+="-";

            $(this).val(newval.substring(0,5));

        }
    });

    $(".format-card-number").on("keyup paste", function(event) {
        // console.log('typed');

        // Don't run for backspace key entry, otherwise it bugs out
        if(event.which != 8){

            // Remove invalid chars from the input
            var input = this.value.replace(/[^0-9\(\)\s\-]/g, "");
            var inputlen = input.length;
            // Get just the numbers in the input
            var numbers = this.value.replace(/\D/g,'');
            var numberslen = numbers.length;
            // Value to store the masked input
            var newval = "";

            // Loop through the existing numbers and apply the mask
            for(var i=0;i<numberslen;i++){
                if(i==0) newval = numbers[i];
                else if(i==3) newval+=numbers[i]+" ";
                else if(i==7) newval+=numbers[i]+" ";
                else if(i==11) newval+=numbers[i]+" ";
                // else if(i==6) newval+="-"+numbers[i];
                else newval+=numbers[i];
            }

            // Re-add the non-digit characters to the end of the input that the user entered and that match the mask.
            if(inputlen>=1&&numberslen==0&&input[0]=="(") newval="(";
            else if(inputlen>=6&&numberslen==3&&input[4]==")"&&input[5]==" ") newval+=") ";
            else if(inputlen>=5&&numberslen==3&&input[4]==")") newval+=" ";
            else if(inputlen>=6&&numberslen==3&&input[5]==" ") newval+=" ";
            else if(inputlen>=10&&numberslen==6&&input[9]=="-") newval+="-";

            $(this).val(newval.substring(0,19));

        }
    });


    // Run jQuery.cardcheck on the input
    $('.card-holder input').cardcheck({
        callback: function(result) {

            var status = (result.validLen && result.validLuhn) ? 'valid' : 'invalid',
                message = '',
                types = '';

            // Get the names of all accepted card types to use in the status message.
            for (i in result.opts.types) {
                types += result.opts.types[i].name + ", ";
            }
            types = types.substring(0, types.length-2);

            // Set status message
            if (result.len < 1) {
                message = 'Please provide a credit card number.';
            } else if (!result.cardClass) {
                message = 'We accept the following types of cards: ' + types + '.';
            } else if (!result.validLen) {
                message = 'Please check that this number matches your ' + result.cardName + ' (it appears to be the wrong number of digits.)';
            } else if (!result.validLuhn) {
                message = 'Please check that this number matches your ' + result.cardName + ' (did you mistype a digit?)';
            } else {
                message = 'Great, looks like a valid ' + result.cardName + '.';
            }

            // Show credit card icon
            $('.card-images .card_icon').removeClass().addClass('card_icon ' + result.cardClass);

            // Show status message
            $('.card .status').removeClass('invalid valid').addClass(status).children('.status_message').text(message);
        }
    });

    if($('.recurring-type').length>0){

    }

    $('.btn-register').click(function (e) {
        console.log('clicked');
        e.preventDefault();
        $('#confirm-modal').modal('show');
    });

    let headHeight = $('header').height(),
        footHeight = $('footer').height(),
        headFootHeight = headHeight + footHeight + 20;
    $('.content-body').css('min-height','calc(100vh - '+headFootHeight+'px)');

    $(document).on('click','.btn-next-js',function (e) {
        e.preventDefault();
        let self = $(this);

        let fieldRequired = $('.donation-initial-info .field-required'),
            totalFieldRequired = fieldRequired.length,
            fieldValidated = $('.field-required.field-valid'),
            totalFieldValidated = fieldValidated.length;

        if(chosenAmount.val()<1){
            let warningMessage = chosenAmount.closest('.field-group').data('warning-message');
            let warningHtml = `
            <p class="warning-message text-danger">${warningMessage}</p>
            `;
            $('html, body').animate({
                scrollTop: chosenAmount.closest('.field-group').offset().top-30
            });
            setTimeout(function () {
                chosenAmount.closest('.field-group').css({
                    'border':'2px solid #DC3545',
                });
            },400);
            chosenAmount.closest('.field-group').find('.warning-message').remove();
            chosenAmount.closest('.field-group').append(warningHtml);
            // chosenAmount.closest('.field-group').find('.field-group-title').css('color','#DC3545');
            setTimeout(function (e) {
                chosenAmount.closest('.field-group').css({
                    'border':'1px solid #000',
                });
            },800);

            return;
        }

        if(totalFieldRequired === totalFieldValidated){
            $('.loader-div').addClass('active');
            setTimeout(function(){
                self.closest('.content-body').hide();
                $('.loader-div').removeClass('active');
                self.closest('.content-body').next().show();
            },1000);
        }else{
            $('.donation-initial-info .field-required:not(.field-valid)').first().focus();
            $('.donation-initial-info .field-required:not(.field-valid)').first().css('border','2px solid #DC3545');
            setTimeout(function (e) {
                $('.donation-initial-info .field-required:not(.field-valid)').first().css('border','1px solid #8b8b8b94');
            },400)
        }
    });

    $(document).on('click', '.swipe-animation', function (e) {
        e.preventDefault();
        $('body').addClass('card-swiped');
        $('.loader-div .loader-div-inner').append('<h2 class="h2">Payment is being processing ...</h2>');
        $('.loader-div').addClass('active');
        setTimeout(function (e) {
            //=== PREVIOUS PAGE CAN BE ACCESSED
            window.location.href = "thank_you.html";

            //=== REMOVE THE HISTORY OF PREVIOUS PAGE FROM BROWSER, MEANS PREVIOUS PAGE CANT BE ACCESSED ANYMORE!
            // window.location.replace("thank_you.html");
        },2000);
    });

    $(document).on('change','.is-email-js',function (e) {
        let self = $(this);
        is_email(self);
    });

    $(document).on('click', '.btn-amount-box-js', function (e) {
        let self = $(this),
            amount = self.data('amount');
        self.closest('.field-group').find('.warning-message').remove();
        $('.other-amount').removeClass('active');
        otherAmount.val('');
        btnAmount.removeClass('active');
        self.addClass('active');
        amount_update(self, amount);
    });

    $(document).on('keyup click', '#other-amount', function (e) {
        let self = $(this),
            amount = self.val();
        btnAmount.removeClass('active');
        $('.other-amount').addClass('active');
        self.closest('.field-group').find('.warning-message').remove();
        if(self.val().length>0){
            amount_update(self, amount);
        }
    });

    if(chosenAmount.length>0 && parseInt(chosenAmount.val())>0){
        let preDefinedAmount = false;
        btnAmount.each(function (i, element) {
            console.log(chosenAmount.val());
            if(parseInt($(element).data('amount')) === parseInt(chosenAmount.val())){
                preDefinedAmount = true;
                $(element).addClass('active');
            }
        });

        if(!preDefinedAmount){
            otherAmount.val(chosenAmount.val());
            $('.other-amount').addClass('active');
        }
    }


    is_email($('.is-email-js'));
    function is_email(self) {
        if(self.prop('checked')==true){
            console.log(true);
                // emailLabel = self.data('email-label'),
            let emailLabel = self.closest('.check-container').data('email-label'),
                emailName = self.closest('.check-container').data('email-name');
            console.log(emailLabel);
            let emailGroupHtml = `<div class="form-group email-group-js">
            <label for="email" class="field-label"> <span class="lable-text">${emailLabel}</span> <span class="required-mark text-danger">*</span></label>
            <input id="email" type="email" class="form-control field-normal field-required" name="${emailName}" data-warning-message="Invalid Email" data-validation="email">
            </div>`;
            self.closest('.email-shower').append(emailGroupHtml);
        }else{
            $('.email-group-js').remove();
        }
    }

    function amount_update(self, amount){
        $('#chosen-amount').val(parseInt(amount));
    }

    //=====FORM VALIDATION=====//
    function field_validation(self) {
        warningText = self.data('warning-message'),
            warningHtml = `
            <span class="warning-message text-danger card-number-validation">
                ${warningText}
            </span>
            `;
        if(self.data('validation')==='plain'){
            if(self.val()!== ''){
                self.removeClass('field-invalid');
                self.addClass('field-valid');
                self.closest('.form-group').find('.warning-message').remove();
            }else{
                self.removeClass('field-valid');
                self.addClass('field-invalid');
                self.closest('.form-group').find('.warning-message').remove();
                self.closest('.form-group').append(warningHtml);
            }
        }

        if(self.data('validation')==='email'){
            if(!validateMail(self.closest('.form-group'))){
                self.removeClass('field-invalid');
                self.addClass('field-valid');
                self.closest('.form-group').find('.warning-message').remove();
            }else{
                self.removeClass('field-valid');
                self.addClass('field-invalid');
                self.closest('.form-group').find('.warning-message').remove();
                self.closest('.form-group').append(warningHtml);
            }
        }
    }

    $(document).on('blur', '.field-required', function () {
        let self = $(this);
        field_validation(self);
    });

    $(document).on('keyup', '.field-required', function () {
        let self = $(this);
        if(self.val().length>0){
            field_validation(self);
        }
    });

    $(document).on('change', '.field-required', function () {
        let self = $(this),
            warningText = self.data('warning-message'),
            warningHtml = `
            <span class="warning-message text-danger card-number-validation">
                ${warningText}
            </span>
            `;
        if(self.val()!== ''){
            self.removeClass('field-invalid');
            self.addClass('field-valid');
            if(self.closest('.form-group').find('.warning-message').length>0){
                self.closest('.form-group').find('.warning-message').remove();
            }
        }else{
            self.removeClass('field-valid');
            self.addClass('field-invalid');
            self.closest('.form-group').find('.warning-message').remove();
            self.closest('.form-group').append(warningHtml);
        }


    });

    //======= EMAIL VALIDATION
    function validateMail(formGroup) {
        let pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
            email = formGroup.find('.form-control').val();
        if (!pattern.test(email)) {
            return true;
        } else {
            return false;
        }
    }
});


//=== form validation [client-side]
let inputFieldSelector = '.form-control';
let inputFieldRequiredSelector = '.form-group.required-group .input-validation';
let inputInvalidSelector = '.input-validation.invalid';
let formGroupSelector = '.form-group';
let invalidClassName = 'field-invalid';
let validClassName = 'field-validated';
let errorMessageClassName = 'error-message';
let errorMessage = 'this field is required!';
let donateAmountButtonSelector = '.btn-amount-donate-js';

//=== on submit button click
$(document).on('click', '#btnCharge', function (e){
    e.preventDefault();
    $(inputFieldRequiredSelector).each(function (i, element){
        singleValidation($(element), $(element).closest(formGroupSelector), invalidClassName, validClassName, errorMessageClassName, errorMessage);
    });
    if($(inputInvalidSelector).length>0) {
        $(inputInvalidSelector).first().focus();
        return;
    }
    //=== submit the form
    submitForm();
});

//=== on field keyup event
$(document).on('keyup change', inputFieldRequiredSelector, function (e) {
    let self = $(this);
    if(self.val().length>0){
        self.removeClass('invalid');
        self.removeClass('field-invalid');
        self.closest('.form-group').find('.error-message').remove();
    }
});

//=== on field blur event
$(document).on('blur', inputFieldRequiredSelector, function (e){
    singleValidation($(this), $(this).closest(formGroupSelector), invalidClassName, validClassName, errorMessageClassName, errorMessage);
});

//=== allow only number and -
$(document).on('keypress', '.input-phone-number', function (e){
    if(e.which===45) return;
    if(e.which<48 || e.which>58) e.preventDefault();
});

//=== allow only number
$(document).on('keypress', '.input-number', function (e){
    if(e.which<48 || e.which>58) e.preventDefault();
});

//=== on donateamount button click
$(document).on('click', '.btn-amount-donate-js', function (e){
    e.preventDefault();
    let self = $(this);
    let donateAmount = self.attr('data-value');
    $(donateAmountButtonSelector).removeClass('active');
    self.addClass('active');
    $('#other-amount').val('');
    $('#txtAmount').val(donateAmount);
    $('#txtAmount').attr('data-solid', donateAmount);

    if(!self.closest('.form-group').hasClass('required-group')) return;
    donateAmountValidation(self);
});

$(document).on('keyup change focus', '#other-amount', function (){
    let self = $(this);
    if(self.val()<=0) return;
    $(donateAmountButtonSelector).removeClass('active');

    if(!self.closest('.form-group').hasClass('required-group')) return;
    donateAmountValidation(self);
});

function donateAmountValidation(self){
    self.closest('.form-group').find('.input-validation').removeClass('invalid');
    self.closest('.form-group').find('.input-validation').removeClass('field-invalid');
    self.closest(formGroupSelector).find('.'+errorMessageClassName).remove();
}

//=== select 2 initialization
if($('.select2').length>0){
    $('.select2').select2();
}

//=== country/state/city api
let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJyYXNodS5za2lmZnRlY2hAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiSkszT3NJSm85ZG05S0Y5eDNYUGM1emQwd2NXQVZrTmNhYXBZNm45T29UclhPNU9nanZUMjVuVTNRSUQtcWxDcGIwbyJ9LCJleHAiOjE2Njg3NjYzNzJ9.c-eN8CwrR_U8YkFWJd3hFX5iRxquWKbnb7PXmicj-yA";
//authToken expiry time 24 hrs
//have to generate auth token every 24 hrs
let tokenCreatedAt = Date.now();
const optionsReqHeader = {
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "api-token": "JK3OsIJo9dm9KF9x3XPc5zd0wcWAVkNcaapY6n9OoTrXO5OgjvT25nU3QID-qlCpb0o",
        "user-email": "rashu.skifftech@gmail.com"
    }
}
console.log('auth token', authToken);
authToken = false;

//generates auth token
if(!authToken){
    console.log('token expired, new token is being created...');
    fetch('https://www.universal-tutorial.com/api/getaccesstoken', optionsReqHeader)
        .then(response => response.json())
        .then(response =>{
            console.log('access token: ', response);
            authToken = response.auth_token;
            const optionsReqHeaderGetData = {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer "+response.auth_token,
                    "Accept": "application/json"
                }
            }

            //request to get all the states for United States
            let country = 'United States';
            fetch('https://www.universal-tutorial.com/api/states/'+country, optionsReqHeaderGetData)
              .then(response => response.json())
              .then(response =>{
                  let counter = 0;
                  for (let obj in response) {
                      var newOption = new Option(response[counter].state_name, response[counter].state_name, false, false);
                      $('#selector-state').append(newOption);
                      counter++;
                  }
                  $('#selector-state').closest('.select-box').find('.ajax-loader').hide();
              })
              .catch(err => console.error(err));
        })
        .catch(err => console.log.error(err));
}

$(document).on('change', '#selector-state', function (){
    let selectedState = this.value;
    selectedState = selectedState.replace(/\s/g, "");
    let url = `https://www.universal-tutorial.com/api/cities/${selectedState}`;
    $('#selector-city').closest('.select-box').find('.ajax-loader').show();

    fetch('https://www.universal-tutorial.com/api/getaccesstoken', optionsReqHeader)
      .then(response => response.json())
      .then(response =>{
          const optionsReqHeaderGetData = {
              method: 'GET',
              headers: {
                  "Authorization": "Bearer "+response.auth_token,
                  "Accept": "application/json"
              }
          }

          fetch(url, optionsReqHeaderGetData)
            .then(response => response.json())
            .then(response =>{
                $('#selector-city').empty();
                $('#selector-city').append("<option value=''>Select City</option>");
                let counter = 0;
                for (let obj in response) {
                    var newOption = new Option(response[counter].city_name, response[counter].city_name, false, false);
                    $('#selector-city').append(newOption);
                    counter++;
                }
                $('#selector-city').closest('.select-box').find('.ajax-loader').hide();
            })
            .catch(err => console.error(err));
      })
      .catch(err => console.log.error(err));
});
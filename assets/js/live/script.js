/**
 * Created by Rashu on 22-04-21.
 */

$(function (event) {

    $(document).ready(function () {
        var type = getUrlParameter('recurringType');
        var recurringDuration = getUrlParameter('recurringDuration');
        if (type == "MONTHLY" || type == "Monthly") {
            $('#IsRecurringGive').val(true);
            $('#IsRecurringGive').attr('checked', true);
            $('.checkbox-recurring').trigger('change');
            $('.recurring-period').slideDown('slow');
        }

        if (type == "DAILY" || type == "Daily") {
            $('#IsRecurringGive').val(true);
            $('#IsRecurringGive').attr('checked', true);
            $('.checkbox-recurring').trigger('change');
            $('.recurring-period').slideDown('slow');
            $('.recurring-duration').show();
        }

        if (type == "WEEKLY" || type == "Weekly") {
            $('#IsRecurringGive').val(true);
            $('#IsRecurringGive').attr('checked', true);
            $('.checkbox-recurring').trigger('change');
            $('.recurring-period').slideDown('slow');
            $('.recurring-duration').show();
        }

        if (recurringDuration > 0) {
            $('.recurring-duration').show();
        }

        var amount = getUrlParameter('amount');
        var amountAsInt = parseInt(amount);
        var isAmountBtnActive = false;
        if (amountAsInt > 0) {
            $('.donateButton').each(function (i) {
                var item = $(this);
                var donateAmount = parseInt(item.attr("data-value"));
                if (donateAmount == amountAsInt) {
                    item.addClass("active");
                    console.log('in if');
                    $('.donateButton').not(this).removeClass("active");
                    $('#other-amount').val('');
                    $('#txtAmount').val(donateAmount);
                    loadDonateAmount();
                    isAmountBtnActive = true;
                }
            });
        }

        if (amountAsInt > 0 && !isAmountBtnActive) {
            $('#other-amount').trigger('focus');
            $('#other-amount').prev().addClass('focused');
            $('#other-amount').val(amount);
            $('#txtAmount').val(amount);
            loadDonateAmount();
        }

        var product = getUrlParameter('product');
        if (product != '') {
            $('#PaymentDescription').val(product).change();
        }
    });

    if ($('.form-control').length > 0) {
        var self = $('.form-control');
        if (self.val() == '') {
            self.prev().removeClass('focused');
        }
        else {
            self.prev().addClass('focused');
        }
        $('.form-control').on('focus', function () {
            var self = $(this);
            self.prev().addClass('focused');
        });

        $('.form-control').on('blur', function () {
            var self = $(this);
            if (self.val() == '') {
                self.prev().removeClass('focused');
            }
        });
    }


    $('.checkbox-recurring').on('change', function () {
        var self = $(this);
        if (self.prop('checked') == true) {
            $('.recurring-period').slideDown('slow');
        } else {
            $('.recurring-period').slideUp('slow');
        }
    });

    if ($('.recurring-type').length > 0) {
        if ($('.recurring-type').val() == "month") {
            $('.recurring-duration').hide();
        }
    }
    $('.recurring-type').on('change', function () {
        var self = $(this);
        if (self.val() == "month") {
            $('.recurring-duration').hide();
        } else {
            $('.recurring-duration').show();
        }
    });

    if ($('.donation-wrapper').length > 0) {
        // $('.donation-wrapper').css('margin-top',$('header').height());
    }

    // format phone number
    // Phone formatting: (555) 555-5555
    $(".format-phone").on("keyup paste", function (event) {
        // console.log('typed');

        // Don't run for backspace key entry, otherwise it bugs out
        if (event.which != 8) {

            // Remove invalid chars from the input
            var input = this.value.replace(/[^0-9\(\)\s\-]/g, "");
            var inputlen = input.length;
            // Get just the numbers in the input
            var numbers = this.value.replace(/\D/g, '');
            var numberslen = numbers.length;
            // Value to store the masked input
            var newval = "";

            // Loop through the existing numbers and apply the mask
            for (var i = 0; i < numberslen; i++) {
                if (i == 0) newval = "(" + numbers[i];
                else if (i == 2) newval += numbers[i] + ") ";
                else if (i == 6) newval += "-" + numbers[i];
                else newval += numbers[i];
            }

            // Re-add the non-digit characters to the end of the input that the user entered and that match the mask.
            if (inputlen >= 1 && numberslen == 0 && input[0] == "(") newval = "(";
            else if (inputlen >= 6 && numberslen == 3 && input[4] == ")" && input[5] == " ") newval += ") ";
            else if (inputlen >= 5 && numberslen == 3 && input[4] == ")") newval += " ";
            else if (inputlen >= 6 && numberslen == 3 && input[5] == " ") newval += " ";
            else if (inputlen >= 10 && numberslen == 6 && input[9] == "-") newval += "-";

            $(this).val(newval.substring(0, 14));

        }
    });

    $(".format-cvv").on("keyup paste", function (event) {
        // console.log('typed');

        // Don't run for backspace key entry, otherwise it bugs out
        if (event.which != 8) {

            // Remove invalid chars from the input
            var input = this.value.replace(/[^0-9\(\)\s\-]/g, "");
            var inputlen = input.length;
            // Get just the numbers in the input
            var numbers = this.value.replace(/\D/g, '');
            var numberslen = numbers.length;
            // Value to store the masked input
            var newval = "";

            // Loop through the existing numbers and apply the mask
            for (var i = 0; i < numberslen; i++) {
                newval += numbers[i];
            }

            // Re-add the non-digit characters to the end of the input that the user entered and that match the mask.
            // if(inputlen>=1&&numberslen==0&&input[0]=="(")
            //     newval="(";
            // else if(inputlen>=6&&numberslen==3&&input[4]==")"&&input[5]==" ")
            //     newval+=") ";
            // else if(inputlen>=5&&numberslen==3&&input[4]==")")
            //     newval+=" ";
            // else if(inputlen>=6&&numberslen==3&&input[5]==" ")
            //     newval+=" ";
            // else if(inputlen>=10&&numberslen==6&&input[9]=="-")
            //     newval+="-";

            $(this).val(newval.substring(0, 5));

        }
    });

    $(".format-expiry").on("keyup paste", function (event) {
        // console.log('typed');

        // Don't run for backspace key entry, otherwise it bugs out
        if (event.which != 8) {

            // Remove invalid chars from the input
            var input = this.value.replace(/[^0-9\(\)\s\-]/g, "");
            var inputlen = input.length;
            // Get just the numbers in the input
            var numbers = this.value.replace(/\D/g, '');
            var numberslen = numbers.length;
            // Value to store the masked input
            var newval = "";

            // Loop through the existing numbers and apply the mask
            for (var i = 0; i < numberslen; i++) {
                if (i == 0) newval = numbers[i];
                else if (i == 1) newval += numbers[i] + "/";
                else newval += numbers[i];
            }

            // Re-add the non-digit characters to the end of the input that the user entered and that match the mask.
            if (inputlen >= 1 && numberslen == 0 && input[0] == "(") newval = "(";
            else if (inputlen >= 6 && numberslen == 3 && input[4] == ")" && input[5] == " ") newval += ") ";
            else if (inputlen >= 5 && numberslen == 3 && input[4] == ")") newval += " ";
            else if (inputlen >= 6 && numberslen == 3 && input[5] == " ") newval += " ";
            else if (inputlen >= 10 && numberslen == 6 && input[9] == "-") newval += "-";

            $(this).val(newval.substring(0, 5));

        }
    });

    $(".format-card-number").on("keyup paste", function (event) {
        // console.log('typed');

        // Don't run for backspace key entry, otherwise it bugs out
        if (event.which != 8) {

            // Remove invalid chars from the input
            var input = this.value.replace(/[^0-9\(\)\s\-]/g, "");
            var inputlen = input.length;
            // Get just the numbers in the input
            var numbers = this.value.replace(/\D/g, '');
            var numberslen = numbers.length;
            // Value to store the masked input
            var newval = "";

            // Loop through the existing numbers and apply the mask
            for (var i = 0; i < numberslen; i++) {
                if (i == 0) newval = numbers[i];
                else if (i == 3) newval += numbers[i] + " ";
                else if (i == 7) newval += numbers[i] + " ";
                else if (i == 11) newval += numbers[i] + " ";
                // else if(i==6) newval+="-"+numbers[i];
                else newval += numbers[i];
            }

            // Re-add the non-digit characters to the end of the input that the user entered and that match the mask.
            if (inputlen >= 1 && numberslen == 0 && input[0] == "(") newval = "(";
            else if (inputlen >= 6 && numberslen == 3 && input[4] == ")" && input[5] == " ") newval += ") ";
            else if (inputlen >= 5 && numberslen == 3 && input[4] == ")") newval += " ";
            else if (inputlen >= 6 && numberslen == 3 && input[5] == " ") newval += " ";
            else if (inputlen >= 10 && numberslen == 6 && input[9] == "-") newval += "-";

            $(this).val(newval.substring(0, 19));

        }
    });


    // Run jQuery.cardcheck on the input
    $('.card-holder input').cardcheck({
        callback: function (result) {

            var status = (result.validLen && result.validLuhn) ? 'valid' : 'invalid',
                message = '',
                types = '';

            // Get the names of all accepted card types to use in the status message.
            for (i in result.opts.types) {
                types += result.opts.types[i].name + ", ";
            }
            types = types.substring(0, types.length - 2);

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

    // donation wrapper min height
    if ($('.donation-wrapper').length > 0) {
        var heightMinus = $('header').height() + $('footer').height() + "px";
        console.log(heightMinus);
        var wrapperHeighth = "calc(100vh - " + heightMinus + ")";
        $('.donation-wrapper').css('min-height', wrapperHeighth);
    }

    function loadDonateAmount() {
        if ($('#donate-fee-cover').prop("checked") == true) {
            var amount = $('#txtAmount').val();
            $('#amountProcessingFee').val(0);

            var fee = amount * 0.025;

            $('#amountProcessingFee').val(fee);

            var updatedAmount = parseFloat(amount) + parseFloat(fee);
            updatedAmount = updatedAmount.toFixed(2);

            $('#donate-amount').html('$' + updatedAmount);
        }

        if ($('#donate-fee-cover').prop("checked") == false) {
            var processingFee = $('#amountProcessingFee').val();
            var amount = $('#txtAmount').val();

            var updatedAmount = $('#txtAmount').attr('data-solid')?$('#txtAmount').attr('data-solid'):0;

            $('#txtAmount').val(updatedAmount);
            $('#amountProcessingFee').val(0);
            $('#donate-amount').html('$' + updatedAmount);
        }
    }

    function setOtherAmountValue() {
        var otherAmountValue = $('#other-amount').val();

        if (isEmpty(otherAmountValue)) {
            $('#txtAmount').val(0);
            $('#txtAmount').attr('data-solid',0);
        }
        else {
            if (isNaN(otherAmountValue)) {
                $('#txtAmount').val(0);
                $('#txtAmount').attr('data-solid',0);
            }
            else {
                $('#txtAmount').val(parseFloat(otherAmountValue));
                $('#txtAmount').attr('data-solid',otherAmountValue);
            }
        }
    }

    //Donate Amount Button
    $('.donateButton').click(function (e) {
        e.preventDefault();
        var item = $(this);
        var donateAmount = item.attr("data-value");
        item.addClass("active")
        $('.donateButton').not(this).removeClass("active");
        $('#other-amount').val('');
        $('#txtAmount').val(donateAmount);
        $('#txtAmount').attr('data-solid', donateAmount);

        loadDonateAmount();
    });

    $('#other-amount').focus(function (e) {
        $('.donateButton').removeClass("active");
        $('#txtAmount').val('0');

        setOtherAmountValue();

        loadDonateAmount();
    });

    $('#other-amount').keyup(function (e) {
        setOtherAmountValue();
        loadDonateAmount();
    });


    $('#donate-fee-cover').click(function () {
        loadDonateAmount();
    });


    $('#IsRecurringGive').click(function () {
        if ($(this).prop("checked") == true) {
            $('#IsRecurringGive').val(true);
        }
        else if ($(this).prop("checked") == false) {
            $('#IsRecurringGive').val(false);
        }
    });

    function isEmpty(str) {
        return (!str || str.length === 0);
    }

    //for getting queryParam    
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };
});
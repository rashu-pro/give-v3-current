/**
 *
 * @param formControl
 * @param formGroup
 * @param invalidClassName
 * @param validClassName
 * @param errorMessageClassName
 * @param errorMessage
 *
 * @effects: check whether the input fields are validate
 * - or not and show warning message as needed
 */
function singleValidation(formControl, formGroup, invalidClassName, validClassName, errorMessageClassName, errorMessage) {
    //let consoleString = `self: ${formControl} | value: ${formControl.val()}`;
    errorMessage = "The field is required";
    let paramObj = {
        "formControl": formControl,
        "formGroup": formGroup,
        "invalidClassName": invalidClassName,
        "validClassName": validClassName,
        "errorMessageClassName": errorMessageClassName,
        "errorMessage": errorMessage
    };

    //=== IF FORM GROUP HAS DISPLAY NONE PROPERTIES
    if(formGroup.css('display')==='none') return;

    if(formControl.val()==='' && formControl.attr('type')==='hidden'){
        validationFailed(paramObj);
        $(document).scrollTop(formGroup.offset().top-250);
    }

    //=== INPUT FIELD VALIDATION: EMPTY FIELD
    if(formControl.val()===''){
        validationFailed(paramObj);
        return;
    }

    //=== INPUT FIELD VALIDATION: TEXT FIELD
    if(formControl.hasClass('validation-text')){
        paramObj.errorMessage="invalid input!";
        if(formControl.attr('data-min-length') && formControl.attr('data-max-length')){
            formControl.val().length>=formControl.attr('data-min-length') && formControl.val().length<=formControl.attr('data-max-length')?validationSuccess(paramObj):validationFailed(paramObj);
            return;
        }

        if(formControl.attr('data-min-length')){
            formControl.val().length>=formControl.attr('data-min-length')?validationSuccess(paramObj):validationFailed(paramObj);
            return;
        }

        if(formControl.attr('data-max-length')){
            formControl.val().length<=formControl.attr('data-max-length')?validationSuccess(paramObj):validationFailed(paramObj);
            return;
        }
        formControl.val()!==''?validationSuccess(paramObj):validationFailed(paramObj);
    }

    //=== ONLY NUMBER VALIDATION
    if(formControl.hasClass('validation-number')){
        paramObj.errorMessage="invalid input!";
        if(formControl.attr('data-min-length') && formControl.attr('data-max-length')){
            isNumber(formControl.val()) && formControl.val().length>=formControl.attr('data-min-length') && formControl.val().length<=formControl.attr('data-max-length')?validationSuccess(paramObj):validationFailed(paramObj);
            return;
        }

        if(formControl.attr('data-min-length')){
            isNumber(formControl.val())&&formControl.val().length>=formControl.attr('data-min-length')?validationSuccess(paramObj):validationFailed(paramObj);
            return;
        }

        if(formControl.attr('data-max-length')){
            isNumber(formControl.val())&&formControl.val().length<=formControl.attr('data-max-length')?validationSuccess(paramObj):validationFailed(paramObj);
            return;
        }
        isNumber(formControl.val())?validationSuccess(paramObj):validationFailed(paramObj);
    }

    //=== SELECT DROPDOWN VALIDATION
    if(formControl.prop('tagName')==='SELECT'){
        formControl.val()!==''?validationSuccess(paramObj):validationFailed(paramObj);
    }

    //=== INPUT FIELD VALIDATION: EMAIL FIELD
    if(formControl.hasClass('validation-email')){
        paramObj.errorMessage = formControl.data('error-message');
        isEmailValid(formControl.val())?validationSuccess(paramObj):validationFailed(paramObj);
    }

    //=== INPUT FIELD VALIDATION: RADIO BOX
    if(formControl.hasClass('validation-radio')){
        formControl.val()!==''?validationSuccess(paramObj):validationFailed(paramObj);
    }

    //=== INPUT FIELD VALIDATION: RADIO BOX
    if(formControl.hasClass('validation-radio')){
        formControl.val()!==''?validationSuccess(paramObj):validationFailed(paramObj);
    }

    //=== INPUT FIELD VALIDATION: CREDIT CARD NUMBER FIELD
    if(formControl.hasClass('validation-cc-number')){
        paramObj.errorMessage = "Invalid card number!";
        cardValidation()?validationSuccess(paramObj):validationFailed(paramObj);
    }
}

/**
 *
 * @param paramObj
 */
function validationFailed(paramObj) {
    paramObj.formGroup.removeClass(paramObj.validClassName);
    paramObj.formControl.addClass(paramObj.invalidClassName);
    paramObj.formControl.removeClass('valid');
    paramObj.formControl.addClass('invalid');

    notifyError(paramObj);
}

/**
 *
 * @param paramObj
 */
function validationSuccess(paramObj){
    paramObj.formControl.removeClass(paramObj.invalidClassName);
    paramObj.formControl.removeClass('invalid');
    paramObj.formControl.addClass('valid');
    paramObj.formGroup.addClass(paramObj.validClassName);
    paramObj.formGroup.find('.'+paramObj.errorMessageClassName).remove();
}

/**
 *
 * This function checks whether a given
 * - string is number or not
 *
 * @param string
 * @return {boolean}
 */
function isNumber(string){
    return /^\d+$/.test(string);
}

/**
 *
 * This function checks whether the given value is valid email or not
 * @param email
 * @return {boolean}
 */
function isEmailValid(email){
    return /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(email);
}

/**
 *
 * @param paramObj [an oject containg all the parametes]
 * @effects shows error message for invalid field
 */
function notifyError(paramObj) {
    paramObj.formGroup.find('.'+paramObj.errorMessageClassName).remove();
    paramObj.formGroup.append('<p class="'+paramObj.errorMessageClassName+' text-danger">'+paramObj.errorMessage+'</p>');
    paramObj.formControl.closest('.form-group').find('.check-group').addClass('focused');
    setTimeout(()=>{
        paramObj.formControl.closest('.form-group').find('.check-group').removeClass('focused');
    },300);
}
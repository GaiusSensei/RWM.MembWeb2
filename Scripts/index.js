/**
 * Created with RWM.MembWeb2.
 * User: GaiusSensei
 * Date: 2014-01-22
 * Time: 03:40 AM
 */
head.js("bower_components/bootstrap/dist/css/bootstrap.min.css", "Content/index.css", "bower_components/jquery/jquery.min.js", "bower_components/bootstrap/dist/js/bootstrap.min.js", "bower_components/jstorage/jstorage.min.js", "https://phoenix.rwmanila.com/Scripts/rwmapi-1.0.4.min.js", "bower_components/pickadate/lib/compressed/themes/default.css", "bower_components/pickadate/lib/compressed/themes/default.date.css", "bower_components/pickadate/lib/compressed/picker.js", "bower_components/pickadate/lib/compressed/picker.date.js");
head.ready(function readyF() {
    // Initialize Styles
    $("#txtYear").text(new Date().getFullYear());
    $('.datepicker').pickadate({
        selectYears: 120,
        selectMonths: true,
        max: true,
        onOpen: function onIptDoBClickF() {
            $("#iptDoB").popover("hide");
        }
    });
    $("#iptFirstName").popover({
        html: true,
        trigger: 'manual',
        content: '<span style="color:#f00;" onclick="$(\'#iptFirstName\').popover(\'hide\')">A first name is required.</span>'
    });
    $("#iptLastName").popover({
        html: true,
        trigger: 'manual',
        content: '<span style="color:#f00;" onclick="$(\'#iptLastName\').popover(\'hide\')">A last name is required.</span>'
    });
    $("#iptDoB").popover({
        html: true,
        trigger: 'manual',
        content: '<span style="color:#f00;" onclick="$(\'#iptDoB\').popover(\'hide\')">Date of birth required.</span>'
    });
    $("#iptNatId").popover({
        html: true,
        trigger: 'manual',
        content: '<span style="color:#f00;" onclick="$(\'#iptNatId\').popover(\'hide\')">A unique id is required.</span>'
    });
    $("#iptEmailAdd").popover({
        html: true,
        trigger: 'manual',
        content: '<span style="color:#f00;" onclick="$(\'#iptEmailAdd\').popover(\'hide\')">Email address required.</span>'
    });
    $("#iptMobileNo").popover({
        html: true,
        trigger: 'manual',
        content: '<span style="color:#f00;" onclick="$(\'#iptMobileNo\').popover(\'hide\')">Mobile no. required.</span>'
    });
    // Set Default Variables to Local Storage 
    $.jStorage.set("PHXUserId", "rwmweb2");
    $.jStorage.set("PHXApiKey", "a2dbf3754934d6713d84c35d075f206a4f196b97");
    $.jStorage.set("PROG", "MEMBERSHIP ONLINE");
    $.jStorage.set("CNSP", "NA");
    $.jStorage.set("CTC", "4");
    // Check if Guest
    if(getURLParameter("guest") === "0") {
        changeState("login");
        $("#loading").hide();
        $("#everything").show();
    } else if(getURLParameter("u") !== null) {
        PHX("$members", "auth", {
            'employeeNo': getURLParameter("u"),
            'password': getURLParameter("p")
        }, function loginF(data) {
            var d = JSON.parse(data);
            if(d.exitCode === 0) {
                changeState("login");
                $("#loading").hide();
                $("#everything").show();
                alert(JSON.stringify(d.response['error']));
            } else {
                //alert(JSON.stringify(d, undefined, 2));
                $.jStorage.set("PHXUserId", d.response['userId']);
                $.jStorage.set("PHXApiKey", d.response['apiKey']);
                $.jStorage.set("PROG", d.response['PROG']);
                $.jStorage.set("CNSP", d.response['CNSP']);
                $("#txtUser").text(d.response['employeeName']);
                changeState("1");
                $("#loading").hide();
                $("#everything").show();
            }
        });
    } else {
        // If Guest, Load Skin (if needed) and GoTo Step 1
        if(getURLParameter("igrab") === "1") {
            $.jStorage.set("PROG", "iGRAB ONLINE");
            changeSkin("igrab");
        } else if(getURLParameter("tfc") === "1") {
            $.jStorage.set("PROG", "CANADA ONLINE");
            changeSkin("tfc");
        } else if(getURLParameter("keyrose") === "1") {
            $.jStorage.set("PROG", "KEYROSE ONLINE");
            changeSkin("keyrose");
        } else {
            changeSkin();
        }
        changeState("1");
        $("#loading").hide();
        $("#everything").show();
    }
    // Hook Triggers
    $("#iptMr").change(function onIptMrChangeF() {
        $("#iptMale").prop("checked", true);
    });
    $("#iptMs").change(function onIptMsChangeF() {
        $("#iptFemale").prop("checked", true);
    });
    $("#iptMrs").change(function onIptMrsChangeF() {
        $("#iptFemale").prop("checked", true);
    });
    $("#iptMale").change(function onIptMaleChangeF() {
        $("#iptMr").prop("checked", true);
    });
    $("#iptFemale").change(function onIptFemaleChangeF() {
        $("#iptMs").prop("checked", true);
    });
    $("#iptFirstName").keyup(function onIptFirstNameKeyUpF() {
        $("#iptFirstName").popover("hide");
    });
    $("#iptLastName").keyup(function onIptLastNameKeyUpF() {
        $("#iptLastName").popover("hide");
    });
    $("#btnStep1Next").click(function onBtnStep1NextClickF() {
        var goToNext = true;
        if($("#iptFirstName").val().length < 1) {
            $("#iptFirstName").popover("show");
            goToNext = false;
        }
        if($("#iptLastName").val().length < 1) {
            $("#iptLastName").popover("show");
            goToNext = false;
        }
        if(goToNext) {
            $("#iptFirstName").popover("hide");
            $("#iptLastName").popover("hide");
            changeState("2");
        }
    });
    $("#iptNatId").keyup(function onIptNatIdKeyUpF() {
        $("#iptNatId").popover("hide");
    });
    $("#btnStep2Next").click(function onBtnStep2NextClickF() {
        var goToNext = true;
        if($("#iptDoB").val().length < 1) {
            $("#iptDoB").popover("show");
            goToNext = false;
        }
        if($("#iptNatId").val().length < 1) {
            $("#iptNatId").popover("show");
            goToNext = false;
        }
        if(goToNext) {
            $("#iptDoB").popover("hide");
            $("#iptNatId").popover("hide");
            changeState("3");
        }
    });
    $("#btnStep2Back").click(function onBtnStep2BackClickF() {
        $("#iptDoB").popover("hide");
        $("#iptNatId").popover("hide");
        changeState("1");
    });
    $("#btnStep3Back").click(function onBtnStep3BackClickF() {
        $("#iptEmailAdd").popover("hide");
        $("#iptMobileNo").popover("hide");
        changeState("2");
    });
    $("#iptEmailAdd").keyup(function onIptEmailAddKeyUpF() {
        $("#iptEmailAdd").popover("hide");
    });
    $("#iptMobileNo").keyup(function onIptMobileNoKeyUpF() {
        $("#iptMobileNo").popover("hide");
    });
    $("#btnRegister").click(function onBtnRegisterClickF() {
        var goToNext = true;
        if($("#iptEmailAdd").val().length < 1) {
            $("#iptEmailAdd").popover("show");
            goToNext = false;
        }
        if($("#iptMobileNo").val().length < 1) {
            $("#iptMobileNo").popover("show");
            goToNext = false;
        }
        if(goToNext) {
            $("#iptEmailAdd").popover("hide");
            $("#iptMobileNo").popover("hide");
            changeState("4");
            PHX("$members", "register", getParams(), function callbackF(data) {
                var d = JSON.parse(data);
                if(d.exitCode === 0) {
                    //alert(JSON.stringify(d.response['error']));
                    changeState("1");
                    $("#txtStep1Error").text(JSON.stringify(d.response['error']));
                    $("#step1content2").show();
                } else {
                    //alert(JSON.stringify(d, undefined, 2));
                    //alert();
                    resetForms();
                    $("#txtCID").text(d.response['cid']);
                    changeState("5");
                    if(getURLParameter("u") !== null) {
                        $("#btnReset").show();
                    } else {
                        $("#btnReset").hide();
                    }
                }
            });
        }
    });
    $("#btnCancel").click(function onBtnResetClick() {
        changeState("1");
        $("#txtStep1Error").text("Communication with RWM Servers interrupted.");
        $("#step1content2").show();
    });
    $("#btnReset").click(function onBtnResetClick() {
        resetForms();
        changeState("1");
    });
});
// Helper Functions
var changeState = function changeStateF(state) {
    if(state === "1") {
        $(".stepcontent").hide();
        $(".stepheader").hide();
        $("#step1header").show();
        $("#step1content").show();
    } else if(state === "2") {
        $(".stepcontent").hide();
        $(".stepheader").hide();
        $("#step2header").show();
        $("#step2content").show();
    } else if(state === "3") {
        $(".stepcontent").hide();
        $(".stepheader").hide();
        $("#step3header").show();
        $("#step3content").show();
        $("#step3content2").show();
    } else if(state === "4") {
        $(".stepcontent").hide();
        $(".stepheader").hide();
        $("#step4content").show();
    } else if(state === "5") {
        $(".stepcontent").hide();
        $(".stepheader").hide();
        $("#step5content").show();
    } else if(state === "login") {
        // Login
        $(".stepcontent").hide();
        $(".stepheader").hide();
    } else if(state === "admin") {
        // Admin
        $(".stepcontent").hide();
        $(".stepheader").hide();
    } else {
        // Error
        $(".stepcontent").hide();
        $(".stepheader").hide();
    }
};
var changeSkin = function changeSkinF(skin) {
    if(skin === "tfc") {
        head.load("Content/tfc.css");
    } else if(skin === "igrab") {
        head.load("Content/igrab.css");
    } else if(skin === "keyrose") {
        head.load("Content/keyrose.css");
    } else {
        head.load("Content/guest.css");
    }
};
var resetForms = function resetFormsF() {
    $("#iptMr").prop("checked", true);
    $("#iptFirstName").val("");
    $("#iptMiddleName").val("");
    $("#iptLastName").val("");
    $("#iptMale").prop("checked", true);
    $("#iptDoB").val("");
    $("#iptEmailAdd").val("");
    $("#iptMobileNo").val("");
    $("#iptNatId").val("");
};
var getURLParameter = function getURLParameterF(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
};
var PHX = function PHXF(cgrp, cmnd, prms, callback) {
    phoenix.userId = $.jStorage.get("PHXUserId");
    phoenix.apiKey = $.jStorage.get("PHXApiKey");
    phoenix.send({
        'cgrp': cgrp,
        'cmnd': cmnd,
        'prms': prms
    }, callback);
};
var getTitle = function getTitleF() {
    if($("#iptMr").prop("checked")) {
        return 'MR';
    } else if($("#iptMs").prop("checked")) {
        return 'MS';
    } else if($("#iptMrs").prop("checked")) {
        return 'MRS';
    } else {
        return null;
    }
};
var getGender = function getGenderF() {
    if($("#iptMale").prop("checked")) {
        return "M";
    } else if($("#iptFemale").prop("checked")) {
        return "F";
    } else {
        return null;
    }
};
var getParams = function getParamsF() {
    var params = {
        'title': getTitle(),
        'nameFirst': $("#iptFirstName").val(),
        'nameMiddle': $("#iptMiddleName").val(),
        'nameLast': $("#iptLastName").val(),
        'gender': getGender(),
        'dateOfBirth': $("#iptDoB").val(),
        'prefLang': 'EN',
        'emailAdd': $("#iptEmailAdd").val(),
        'mobileNo': $("#iptMobileNo").val(),
        'documentNumber': $("#iptNatId").val(),
        'ctc': $.jStorage.get("CTC"),
        'PF_CNSP': $.jStorage.get("CNSP"),
        'PF_PROG': $.jStorage.get("PROG")
    };
    if(getURLParameter("u") !== null) {
        params.options = 'DontGeneratePIN:true';
    }
    return params;
};
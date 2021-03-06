﻿// Returns true if input is an integer, false if input is a non-integer number or NaN
function isInt(num) {
    if (Array.isArray(num) == true) {
        for (a = 0; a < num.length; a++) {
            if (Number.isInteger(parseNum(num[a])) == false) {
                return false;
            }
        }
        return true;
    }
    else
        return Number.isInteger(parseNum(num));
}

// Returns true if input is a number with a decimal point in it, false otherwise (integer inputs or NaN)
function isFloat(num) {
    if (Array.isArray(num) == true) {
        for (a = 0; a < num.length; a++) {
            if (Number.isInteger(parseNum(num[a])) == true || Number.isNaN(num[a]) == true) {
                return false;
            }
        }
        return true;
    }
    else
        return !(Number.isInteger(parseNum(num)) || Number.isNaN(parseNum(num)));
}


// Returns true if input is a number >= 1, false otherwise (numbers between 0 and 1, zero, negative number, or NaN)
function isGTEOne(num) {
    if (Array.isArray(num) == true) {
        for (a = 0; a < num.length; a++) {
            if (Number.isNaN(parseNum(num[a])) == true)
                return false;
            else if (num[a] < 1)
                return false;
        }
        return true;
    }
    else {
        if (Number.isNaN(parseNum(num)) == true)
            return false;
        else if (num >= 1)
            return true;
        else {
            return false;
        }
    }
}


// Returns true if input is a number > 0, false otherwise (zero, negative number, or NaN)
function isPositive(num) {
    if (Array.isArray(num) == true) {
        for (a = 0; a < num.length; a++) {
            if (Number.isNaN(parseNum(num[a])) == true)
                return false;
            else if (num[a] <= 0)
                return false;
        }
        return true;
    }
    else {
        if (Number.isNaN(parseNum(num)) == true)
            return false;
        else if (num > 0)
            return true;
        else {
            return false;
        }
    }
}

// Returns true if input is a number >= 0, false otherwise (negative number or NaN)
function isNonNegative(num) {
    if (Array.isArray(num) == true) {
        for (a = 0; a < num.length; a++) {
            if (Number.isNaN(parseNum(num[a])) == true)
                return false;
            else if (num[a] < 0)
                return false;
        }
        return true;
    }
    else {
        if (Number.isNaN(parseNum(num)) == true)
            return false;
        else if (num >= 0)
            return true;
        else {
            return false;
        }
    }
}


// Returns false if input is NaN
function isNum(num) {
    if (Array.isArray(num) == true) {
        for (a = 0; a < num.length; a++) {
            if (Number.isNaN(parseNum(num[a])) == true) { return false; }
            else { continue; }
        }
        return true;
    }
    else {
        return !Number.isNaN(parseNum(num));
    }
}


// Converts string to floating point if it has a decimal point, or integer if there is no decimal point. Also strips commas and spaces, and optionally applies absolute value.
// Cannot handle inputs with negative signs in the wrong position.
function parseNum(str) {
    if (typeof str === "string") {
        str = str.replace(/[^0-9\. ]/g, ''); // Apply absolute value
        // str = str.replace(/[^0-9\. -]/g, ''); // Allow negative numbers
        
        // Return NaN if...
        if (str == '' // input is blank
            || str.indexOf('.') != str.lastIndexOf('.') // input contains multiple decimal places
            || str.indexOf('-') != str.lastIndexOf('-') // input contains multiple minus signs
            || (str.indexOf('-') != -1 && str.indexOf('-') != 0)) { // input contains a minus sign in a position other than the first character
            
            return NaN;
        }

        else {
            if (str.indexOf('.') == -1)
                return parseInt(str);
            else {
                return parseFloat(str);
            }
        }
    }
    else if (Number.isNaN(str))
        return NaN;
    else if (typeof str === "number") {
        return str;
    }
}

function a_or_an(num) {
    if (isNum(num) === false) {
        return NaN;
    }

    num = parseNum(num);

    numstr = num.toString();
    intdigits = numstr.length;
    if (isFloat(num) == true) {
        intdigits = Math.floor(num).toString().length;
    }

    if (intdigits == 1) {
        if (num == 8) {
            return 'an';
        }
    }
    else if (numstr.substring(0, 1) == '8' || ((numstr.substring(0, 2) == '11' || numstr.substring(0, 2) == '18') && (intdigits == 4 || intdigits % 3 == 2))) {
        return 'an';
    }

    return 'a';
}


function GCD(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) { var temp = a; a = b; b = temp; }
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}

global_katexOptions = {
    throwOnError: false,
    displayMode: true, 
    strict: false,
    //trust: true,
    minRuleThickness: 0.06,
    macros: {
        '\\afrac': '\\dfrac{\\raisebox{-0.1em}{#1}}{\\raisebox{-0.1em}{#2}}', // Aligned fraction
        '\\mfrac': '\\dfrac{\\raisebox{-0.1em}{$#1$}}{\\raisebox{-0.1em}{$#2$}}', // Same as afrac, but auto math mode arguments
        '\\Sin': '\\sin \\left( #1 \\right)', // Trig functions with scaling parentheses attached
        '\\Cos': '\\cos \\left( #1 \\right)',
        '\\Tan': '\\tan \\left( #1 \\right)',
        '\\Arcsin': '\\sin ^{-1} \\left( #1 \\right)',
        '\\Arccos': '\\cos ^{-1} \\left( #1 \\right)',
        '\\Arctan': '\\tan ^{-1} \\left( #1 \\right)',
        '\\ratio': '\\raisebox{0.1em}{:}',
        //'\\micro': '\\includegraphics[width=0.55em]{..\\assets\\CMUmu.svg}'
    }
};

/* katex.oldRender = katex.render;
katex.render = function (expression, baseNode, options) {
    katex.oldRender(expression, baseNode, options);
    baseNode.innerHTML = baseNode.innerHTML.replaceAll('<span class="mord">µ</span>', '<span class="mord" style="font-family:Latin Modern Serif">µ</span>');
} */


function activateMatchmaker() {
    if ($('#Sidebar_DDC').hasClass('selected') || $('#Sidebar_Matchmaker').hasClass('selected')) {
        //console.log('activateMatchmaker() triggered');
        if ($('#matchmaker_button').length > 0) { $('#matchmaker_button').css('display', 'none'); }
        if ($('#eq_height_section').length > 0) { $('#eq_height_section').css('display', 'flex'); }

        if ($('#selectArea').length > 0)    { $('#selectArea').css('display', 'none'); }
        if ($('#selectTotalPx').length > 0) { $('#selectTotalPx').css('display', 'none'); }
        if ($('#selectPxPitch').length > 0) { $('#selectPxPitch').css('display', 'none'); }

        //$('#Sidebar_DDC').removeClass('selected');
        //$('#Sidebar_DDC').attr('onclick', 'deactivateMatchmaker();');

        //$('#Sidebar_Matchmaker').addClass('selected');
        //$('#Sidebar_Matchmaker').attr('onclick', '');

        if (window.location.href.indexOf('#matchmaker') === -1) { history.replaceState(null, null, window.location.href + '#matchmaker'); }
        updateDDC();
    }
}

function deactivateMatchmaker() {
    if ($('#Sidebar_DDC').hasClass('selected') || $('#Sidebar_Matchmaker').hasClass('selected')) {
        //console.log('deactivateMatchmaker() triggered');
        if ($('#matchmaker_button').length > 0) { $('#matchmaker_button').css('display', 'flex'); }
        if ($('#eq_height_section').length > 0) { $('#eq_height_section').css('display', 'none'); }

        if ($('#selectArea').length > 0)    { $('#selectArea').css('display', 'table-row'); }
        if ($('#selectTotalPx').length > 0) { $('#selectTotalPx').css('display', 'table-row'); }
        if ($('#selectPxPitch').length > 0) { $('#selectPxPitch').css('display', 'table-row'); }
        
        //$('#Sidebar_Matchmaker').removeClass('selected');
        //$('#Sidebar_Matchmaker').attr('onclick', 'activateMatchmaker();');

        //$('#Sidebar_DDC').addClass('selected');
        //$('#Sidebar_DDC').attr('onclick', '');

        if (window.location.href.indexOf('#matchmaker') !== -1) { history.replaceState(null, null, window.location.href.replace('#matchmaker', '')); }
        updateDDC();
    }
}

function activatePage(sidebarID) {
    global_selectedPage = ($('#' + sidebarID).data('dir'));
    var children = document.getElementById('Sidebar').children;
    var oldChild = null;
    for (var i = 0; i < children.length; i++) {
        oldChild = children[i];
        if (oldChild.classList.contains('selected')) {
            $(oldChild).removeClass('selected');
            $(oldChild).attr('onclick', 'activatePage(this.id)');
            break;
        }
    }
    $('#' + sidebarID).addClass('selected');
    $('#' + sidebarID).attr('onclick', '');

    if (sidebarID === 'Sidebar_DDC' && oldChild.id === 'Sidebar_Matchmaker' && $('#Sidebar_DDC').data('pageCache') !== '') { deactivateMatchmaker(); $('#Sidebar_DDC').data('onLoad'); }
    else if (sidebarID === 'Sidebar_Matchmaker' && oldChild.id === 'Sidebar_DDC' && $('#Sidebar_DDC').data('pageCache') !== '') { activateMatchmaker(); $('#Sidebar_DDC').data('onLoad'); }
    else {
        if      (sidebarID === 'Sidebar_DDC') { frameLoadPage(sidebarID, $('#' + sidebarID).data('dir'), ''); }
        else if (sidebarID === 'Sidebar_Matchmaker') { frameLoadPage('Sidebar_DDC', $('#' + sidebarID).data('dir'), '#matchmaker'); }
        else if (sidebarID === 'Sidebar_Res') { frameLoadPage(sidebarID, $('#' + sidebarID).data('dir')); }
        else {
            DEBUG('activatePage was called with an unknown ID.');
        }
    }
}

var global_selectedPage = '';
var global_selectedElement = '';
var global_DescriptionFunction = function() { return; };

function selectRow(el, callback) {
    previousEl = global_selectedElement;
    if (previousEl !== '') { deselectRow(); } // Deselect currently selected row first
    if (previousEl !== el) {
        el.classList.add('selected');
        global_selectedElement = el;
        loadDescription(el, callback); // Callback may be undefined, it will be handled in loadDescription()
    }
}

function deselectRow() {
    global_selectedElement = global_selectedElement || '';
    if (global_selectedElement != '') {
        global_selectedElement.classList.remove('selected');
        global_selectedElement = '';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.keyCode === 27) { deselectRow(); $('#description').html(''); }
});

var loadDescription = function (el, callback) {
    //console.log('Load Description for ID ' + el.id);
    if ($(el).data('descriptionCache') === undefined) {
        //console.log('Description loading from URL: ' + global_selectedPage + '/' + global_DescriptionRegistry[el.id]);
        $('#description').load(global_selectedPage + '/' + global_DescriptionRegistry[el.id], function() {
            //console.log('Finished loading page');
            $(el).data('descriptionCache', $('#description').html());
            $(el).data('descriptionScript', global_DescriptionFunction);
            if (callback !== undefined) {
                //console.log('Executing callback function');
                callback();
            }
        });
    }
    else {
        //console.log('Description loading from cache');
        $('#description').html($(el).data('descriptionCache'));
        if ($(el).data('descriptionScript') !== undefined) {
            global_DescriptionFunction = $(el).data('descriptionScript');
        }
        else {
            //console.log('Description script was undefined, setting blank function')
            global_DescriptionFunction = function () { return; }
        }
        if (callback !== undefined) {
            //console.log('Executing callback function');
            callback();
        }
    }
}

function clearDescription() {
    if (global_selectedElement == '') {
        $('#description').html('');
        global_DescriptionFunction = function() { return; };
    }
}


window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

function pageLoadFunction () { return; };

window.onload = function () {
    // Set CSS properties for setting page height
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--truevh', `${vh}px`);

    // On page load, assign empty data objects to each sidebar item. These will cache the HTML of the page and a JS function to be executed when the page is loaded.
    // Initially these are empty, but will be filled on the first time each page is loaded, and thereafter will be used as a cache
    var sidebarItems = document.getElementById('Sidebar').children;
    for (var i = 0; i < sidebarItems.length; i++) {
        $(sidebarItems[i]).data('onLoad', function () { return; });
        $(sidebarItems[i]).data('pageCache', '');
    }

    // Retrieve the directory and query string from session storage. These will contain data about which page to load if this page was loaded via redirect
    // If this page was loaded directly, then the values will be null, and in that case a default value is assigned.
    var sidebarID = sessionStorage.getItem('sidebarID');
    var queryString = sessionStorage.getItem('queryString');
    var directoryName = $('#' + sidebarID).data('dir');
    //console.log('window.onload: queryString =', queryString);
    if (sidebarID === null) { sidebarID = 'Sidebar_DDC'; }
    if (directoryName === null) { directoryName = 'ddc'; }
    if (queryString === null) { queryString = ''; }

    // Use History API to replace URL with the selected page
    var pathName = window.location.pathname.replace('frame.html', directoryName);
    //console.log('window.onload: href =', window.location.href);
    try {
        history.replaceState(null, '', pathName + queryString);
        //console.log('history.replaceState:', window.location.href);
    }
    catch (DOMException) {
        DEBUG('URL change skipped due to DOMException.');
    }

    // Load the selected page
    //console.log('frame.html onload: sidebarID =', sidebarID);
    activatePage(sidebarID);
};



window.onresize = function () {
    // Set CSS properties for setting page height
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--truevh', `${vh}px`);

    if ($('#Sidebar_Res').hasClass('selected')) {
        updateRes();
    }
}
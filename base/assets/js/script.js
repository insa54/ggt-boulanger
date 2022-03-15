
function getXhr() {
    var xhr = null;
    if (window.XMLHttpRequest) // Firefox et autres
        xhr = new XMLHttpRequest();
    else if (window.ActiveXObject) { // Internet Explorer
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    } else { // XMLHttpRequest non supporté par le navigateur
        alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
        xhr = false;
    }
    return xhr
}

function traiteUrl(url) {
    var caractere = url.substr((url.length - 3), 3);
    var d = new Date();
    var maj = d.getYear() + "ie" + d.getMonth() + "t" + d.getDate() + "r" + d.getHours() + "i" + d.getMinutes() + "c" + d.getSeconds() + "k" + d.getMilliseconds();
    if (caractere == "php")
        url += "?maj=" + maj;
    else
        url += "&maj=" + maj;
    return url;
}

function loadDocument(url, cadreCible, reload, loader, datepickerreload = "", concat = "", notifyMe = false, wizard = false, right = "") {
    var xhr = getXhr()
    // On défini ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function () {
        // On ne fait quelque chose que si on a tout reçu et que le serveur est ok
        if (xhr.readyState == 4) {
            resultat = xhr.responseText;
            if (reload == 'oui') {
                window.location.reload(true);
            }
            if (reload == 'redirect') {
                var url = window.location.href;
                var array_url = url.split('?');
                $(location).attr("href", array_url[0]);
            }
            if (reload == 'redirectto') {
                $(location).attr("href", $('[data-url-to-go-for-redirect]').data('url-to-go-for-redirect'));
            }
            if (cadreCible != '') {
                if (concat == 'append') {
                    $("#" + cadreCible).append(resultat); //Ajoute à la fin
                } else if (concat == 'appendto') {
                    $(resultat).appendTo("#" + cadreCible); //Apres l'id
                } else if (concat == 'insertbefore') {
                    $(resultat).insertBefore("#" + cadreCible); //Avant l'id
                } else {
                    document.getElementById(cadreCible).innerHTML = resultat;
                }
                if (wizard === true) {
                    KTWizard2.init();
                }
                if (right == "applyrights") {
                    ___applyingrights(); // Ceci permet d'appliquer les droits de lecture ecriture sur les champs affaires.
                }
                if (datepickerreload == 'oui') {
                    $(".datetime-francais-reload").datetimepicker({
                        format: 'dd-mm-yyyy',
                        minView: 2,
                        maxView: 4,
                        language: 'fr',
                        autoclose: true,
                        ignoreReadonly: true,
                        toolbarPlacement: 'top',
                        showClose: true,
                        showClear: true,
                        showTodayButton: true,
                        icons: {
                            time: 'glyphicon glyphicon-time',
                            clear: 'glyphicon glyphicon-trash',
                            close: 'glyphicon glyphicon-remove',
                            up: 'glyphicon glyphicon-chevron-up',
                            date: 'glyphicon glyphicon-calendar',
                            today: 'glyphicon glyphicon-screenshot',
                            down: 'glyphicon glyphicon-chevron-down',
                            next: 'glyphicon glyphicon-chevron-right',
                            previous: 'glyphicon glyphicon-chevron-left'
                        }
                    });
                }
            }
            if (notifyMe) {
                var back = JSON.parse(resultat);
                notify3(back[1], (back[0] == 1 ? 'success' : 'error'));
            }
        }
    }

    if (loader == 'oui') {
        document.getElementById("ajax-loader").className = 'affdiv';
    }
    //contre le cache
    url = traiteUrl(url);
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function addVente(http_path) {
    loadDocument(http_path, "modal_vente", "", "");
    $('#model_add_vente').modal('show');

}

function finaliser(path) {
    loadDocument('/vente/finaliser?fuck=you', 'modal_vente', '', '');
    $('#model_add_vente').modal('show');
}

function delFormPagnet(index) {
    loadDocument('/vente/delFromPagnet?index=' + index, 'modal_vente', '', '');
}

function addQte(qte) {
    var currentQte = document.getElementById("qte").value;
    var prixU = document.getElementById("prixU").value;
    var total = prixU;
    if (qte == "+") {
        document.getElementById("qte").value = parseInt(currentQte) + 1;
    } else if (currentQte < 1) {
        document.getElementById("qte").value = 0;
    } else {
        document.getElementById("qte").value = parseInt(currentQte) - 1;
    }

    total = parseInt(prixU) * parseInt(document.getElementById("qte").value);
    document.getElementById("prixT").value = total;
    document.getElementById("prixTSp").innerText = total + " XOF";
}

function formatMoney(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

function calculMonaie(val) {
    var total = document.getElementById("allprod").value;
    var monaie = val - total;
    if (monaie < 0) {
        document.getElementById("monaieR").value = "Somme recue inférieur au prix total";
    } else {
        document.getElementById("monaieR").value = formatMoney(monaie, 0, ',', ' ');
    }
}

$(document).ready(function () {
    if (document.getElementById("errorMsg")) {
        $('#errorMsg').show();
    }
    if (document.getElementById("successMsg")) {
        $('#successMsg').show();
    }
});

function closeToast(id) {
    $('#' + id).hide();
}

function export2csv(theTable) {
    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j = 0;
    tab = document.getElementById(theTable); // id of table

    for (j = 0; j < tab.rows.length; j++) {
        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
    }
    else //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    return (sa);
}
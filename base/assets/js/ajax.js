/* fonctions utilisées. */

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

/**
 *Cette fonction charge un document dans une div, si cadreCible est renseigné.
 */
function loadDataTable(url, classTable, classTbody) {
    var xhr = getXhr()
    // On défini ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function () {
        // On ne fait quelque chose que si on a tout reçu et que le serveur est ok
        if (xhr.readyState == 4) {
            resultat = xhr.responseText;
            $("." + classTable).dataTable();
            $("." + classTbody).html(resultat);
        }
    };
    //contre le cache
    url = traiteUrl(url);
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function loadDataTableWithForm(url, classTable, classTbody, idForm, avider) {

    var xhr = getXhr()
    // On défini ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function () {
        // On ne fait quelque chose que si on a tout reçu et que le serveur est ok
        if (xhr.readyState == 4) {
            resultat = xhr.responseText;
            if (resultat != -2) {
                $('.' + classTable).dataTable();
                $('.' + classTbody).html(resultat);
                if (avider != '') {
                    $('#' + avider).find("input").val("");
                    $('#' + avider).find("select").val("");
                    $('#' + avider).find("textarea").val("");
                }
            } else {
                alert("Cet enregistrement existe déjà.");
            }
        }
    };
    var chainePost = "";
    var nbElts = -1;
    if (document.getElementById(idForm)) {
        elts = document.getElementById(idForm).elements;
        nbElts = elts.length;
    }
    for (var i = 0; i < nbElts; i++) {
        var identifiant = elts[i].id;
        var nom = elts[i].name;
        var valeur = encodeURIComponent(elts[i].value);
        //pour remplacer ' en \'
        valeur = valeur.replace(/\'/g, "\\\'");
        //pour remplacer " en \"
        valeur = valeur.replace(/\"/g, "\\\"");
        //if ((identifiant) && (valeur != "")) {
        if (identifiant) {
            if (chainePost != "")
                chainePost += "&" + nom + "=" + valeur;
            else
                chainePost += nom + "=" + valeur;
        }
    }
    //contre le cache
    url = traiteUrl(url);
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(chainePost);
}

var ___applyingrights = ((action = get['action']) => {
    if ($.inArray(action, ["modification", "ajout", "ajax"]) >= 0) {
        let unwritable = $(document).find('[data-field--readonly-bien="true"]');
        if (unwritable.length > 0) {
            $.each(unwritable, (i, v) => {
                $(v).attr("disabled", true);
                $(v).prop("disabled", true);
                $(v).removeAttr("required", true);
            });
        }
    }
});

/**
 *Cette fonction charge un document dans une div, si cadreCible est renseigné.
 */
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
                KTSelect2.init();
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


function loadDataFromRcs(url, raison_sociale = '', cp = '', address = '', codeNAF = '', enseigne = '') {
    var xhr = getXhr()
    // On défini ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function () {
        // On ne fait quelque chose que si on a tout reçu et que le serveur est ok
        if ((xhr.readyState == 4) && (xhr.responseText != "[]")) {
            resultat = JSON.parse(xhr.responseText);
            if (raison_sociale != '') {
                if (document.getElementById(raison_sociale)) {
                    document.getElementById(raison_sociale).value = (resultat.enseigne.denomination != "") ? resultat.enseigne.denomination : "";
                }
            }
            if (cp != '') {
                if (document.getElementById(cp)) {
                    document.getElementById(cp).value = (resultat.address.codePostal != null) ? resultat.address.codePostal : "";
                    document.getElementById(cp).onkeyup();
                }
            }
            if (address != '') {
                if (document.getElementById(address)) {
                    document.getElementById(address).value = (resultat.address.lignes != null) ? resultat.address.lignes : "";
                    if (document.getElementById('coord_geographique')) {
                        setTimeout(function () {
                            getGeocode(document.getElementById(address).value);
                        }, 500)
                    }
                }
            }

            if ((codeNAF != '') && (resultat.activite.codeNAF != '')) {
                if (document.getElementById(codeNAF)) {
                    document.getElementById(codeNAF).value = (resultat.activite.codeNAF != null) ? resultat.activite.codeNAF : "";
                }
            }

            if (enseigne != '') {
                if (document.getElementById(enseigne)) {
                    document.getElementById(enseigne).value = (resultat.enseigne.enseigne != null) ? resultat.enseigne.enseigne : "";
                }
            }

            if (siret != '') {
                if (document.getElementById(siret)) {
                    document.getElementById(siret).value = (resultat.siren != null) ? resultat.siren : "";
                }
            }
        }
    }
    //contre le cache
    url = traiteUrl(url);
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

/**
 *Cette fonction charge un document dans un input, si cadreCible est renseigné.
 */
function loadDocumentValue(url, cadreCible, anotherCB = "") {
    var xhr = getXhr()
    // On défini ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function () {
        // On ne fait quelque chose que si on a tout reçu et que le serveur est ok
        if (xhr.readyState == 4) {
            resultat = xhr.responseText;
            if (cadreCible != '') {
                document.getElementById(cadreCible).value = resultat;
            }
            if (anotherCB != '') {
                document.getElementById(anotherCB).value = resultat;
            }
        }
    }

    //contre le cache
    url = traiteUrl(url);
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

/**
 * Cette fontion post le json (data) vers une url donnée
 * xhr de type Content-Type => application/json
 */
function jqueryPostTableauJson(url, nameCheckbox, cadreCible, reload = 'non') {
    var xhr = getXhr();
    // On définit ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function () {
        // On ne fait quelque chose que si on a tout reçu et que le serveur est ok
        if (xhr.readyState == 4) {
            resultat = xhr.responseText;
            if (reload == 'oui') {
                document.location.reload();
            }

            if (cadreCible != '') {
                document.getElementById(cadreCible).innerHTML = resultat;
            }
        }
    }

    var data = [];
    $.each($("input[name='" + nameCheckbox + "']:checked"), function () {
        data.push($(this).val());
    });
    var post = 'checked=' + data;
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(post);
}

function postDataJson(url, data) {
    var xhr = getXhr();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(data));
    return xhr;
}

function cocheOuDecocheTout(id) {
    $('input:checkbox').prop('checked', id.checked);
}

function cocheOuDecocheTout2(id, classe) {
    $('.' + classe + '').prop('checked', id.checked);
}

function decocherOuCocherToutCocher(element, parent, elTwin = null) {
    if (!$(element).is(':checked')) {
        $(parent).prop('checked', false);
    }
    if ($(elTwin + ':checked').length === $(elTwin).length) {
        $(parent).prop('checked', true);
    }
}

function modalClose(modal, element) {
    $(document).ready(function () {
        $(modal).is('not:visible', function () {
            return sontCoches("." + element, null, 'cb');
        });
    });
}

function sontCoches(selecteur = null, needed = null, caller = 'dt') {
    var id = [];
    $(selecteur + ':checkbox:checked').each(function (i, v) {
        if (caller === 'cb' && $(this).val() != null) {
            id.push($(this).val());
        } else
            (needed === "entireRow") ?
                id.push($(this).closest("tr")) :
                id.push($(this).closest("tr").find(".id-datatable-line-for-reference").attr("data-reference-row"));
    });
    return id;
}

function fillHiddenFromCheckbox(classe, toFill) {
    var checked = sontCoches("." + classe, null, 'cb');
    if (checked.length > 0) {
        $(toFill).val("#" + checked.join("##") + "#");
        $(toFill + "_counting").text(checked.length);
    } else {
        $(toFill).val("");
        $(toFill + "_counting").text(0);
    }
}

/* fonctions non utilisées. */

/**
 *  Cette fonction permet de faire un submit avec ajax
 *  Elle fait le meme travail que ajaxSubmit et ajaxSave
 *  Donc il faut supprimer ces deux fonctions
 *  Elle recolte tous les champs se trouvant dans le form et les envoie au
 *  controller passer au param url
 *
 */
function ajaxSubmit(url, formId, cadreCible) {
    var xhr = getXhr()
    // On défini ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function () {
        // On ne fait quelque chose que si on a tout reçu et que le serveur est ok
        if (xhr.readyState == 4) {
            resultat = xhr.responseText;
            document.getElementById(cadreCible).innerHTML = resultat;
        }
    }
    var chainePost = "";
    var nbElts = -1;
    if (document.getElementById(formId)) {
        elts = document.getElementById(formId).elements;
        nbElts = elts.length;
    }
    for (var i = 0; i < nbElts; i++) {
        var identifiant = elts[i].id;
        var nom = elts[i].name;
        var valeur = elts[i].value;
        //pour remplacer ' en \'
        valeur = valeur.replace(/\'/g, "\\\'");
        //pour remplacer " en \"
        valeur = valeur.replace(/\"/g, "\\\"");
        if ((identifiant) && (valeur != "")) {
            if (chainePost != "")
                chainePost += "&" + nom + "=" + valeur;
            else
                chainePost += nom + "=" + valeur;
        }
    }

    /*à changer si possible pour eviter de fixer le nom de l'id, utilisé seulement si on a un multiselect qui se nomme correspondance*/
    if ((document.getElementById("correspondance")) && (document.getElementById("correspondance").options.length > 1)) {
        var selectBox = document.getElementById("correspondance");
        var j = 0;
        for (var i = 0; i < selectBox.options.length; i++) {
            if ((selectBox.options[i].selected)) {
                chainePost += "&type_" + j + "=" + selectBox.options[i].value;
                j++;
            }
        }
        chainePost += "&taille=" + j;
    }

    //contre le cache
    url = traiteUrl(url);
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(chainePost);
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

function setNull(cadreCible) {
    if (document.getElementById(cadreCible)) {
        document.getElementById(cadreCible).innerHTML = null;
    }
}

function setValeur(cadreCible, valeur1, valeur2) {
    if (document.getElementById(cadreCible)) {
        if (document.getElementById(cadreCible).value == valeur1)
            document.getElementById(cadreCible).value = valeur2;
        else
            document.getElementById(cadreCible).value = valeur1;
    }
}

function changeDisplay(idcadre) {
    if (document.getElementById(idcadre).style.display === "none") {
        document.getElementById(idcadre).style.display = "block";
        return 1;
    } else {
        document.getElementById(idcadre).style.display = "none";
        return -1;
    }
}

function jQueryToggle(selector) {
    $(selector).toggle("slow");
}

function toggleEffect(selector) {
    $(selector).toggle("slow", function () {
        $(selector).effect("blind", {}, 1000);
    });
}

function sendInfoChecked(url, cadreCible, prefixe_champ, taille) {
    var xhr = getXhr();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            resultat = xhr.responseText;
            document.getElementById(cadreCible).innerHTML = resultat;
        }
    }

    var chainePost = "";
    var compteur = 0;
    for (var j = 0; j < taille; j++) {
        if (document.getElementById(prefixe_champ + j).checked == true) {
            var valeur = document.getElementById(prefixe_champ + j).value;
            if (chainePost != "")
                chainePost += "&" + prefixe_champ + compteur + "=" + valeur;
            else
                chainePost += prefixe_champ + compteur + "=" + valeur;
            compteur++;
        }
    }

    chainePost += "&taille_resultat=" + compteur + "&taille_liste=" + taille;
    //contre le cache
    url = traiteUrl(url);
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(chainePost);
}

/**
 * Redirection 
 */
function redirection(url, traite, blank = '') {
    //contre le cache
    if (traite == 1) {
        url = traiteUrl(url);
    }

    if (blank === 1) {
        window.open(url, "_blank");
    } else {
        document.location = url;
    }
}

/**
 * Redirection lors d'un click un row d'une dataGrid (verification si présence url)
 */
$('.datatableGrid, .datatableGridModal').on('click', 'tbody tr', function () {
    var url = $($(this)[0]).data('href');
    if (url) {
        window.location.href = $(this).data('href');
    }
});
/**
 * Afficher le détail_row d'un row d'une table
 */
$('.show-details-btn').on('click', function (e) {
    e.preventDefault();
    $(e.target.parentElement).closest('tr').next().toggleClass('open');
    $(e.target.parentElement).find('.zmdi').toggleClass('zmdi-long-arrow-down').toggleClass('zmdi-long-arrow-up');
});
/**
 * Supprime les valeurs dupliquer dans un array
 */
function arrayDeleteDuplicateVal(arr) {
    return arr.filter(function (item, pos) {
        return arr.indexOf(item) == pos;
    });
}

/**
 * Supprime les valeurs null et vide dans un tableau
 */
function cleanArray(arr) {
    return arr.filter(function (item, pos) {
        return (item != '' && item);
    });
}

/**
 * Retorune le nieme index d'une pattern 'pat' dans une chaine de caractère 'str'
 * @param {*} str chaine de caractere
 * @param {*} pat pattern
 * @param {*} n la nième position du pattern à rechercher
 */
function nthIndex(str, pat, n) {
    var L = str.length,
        i = 0;
    while (n > 0 && i < L) {
        n--;
        i = str.indexOf(pat, i);
        if (i < 0)
            break;
        i++;
    }
    return i;
}

/**
 * vérifie si le tableau de variables existe dans la chaine 'contenu' délimité avec 'delimiter'
 * @param contenu chaine à vérifier
 * @param variables tableau de variables à vérifier
 * @param delimiter délimiteur de variable dans la chaine contenu
 */
function checkVariablesExist(variables, contenu, delimiter) {
    var valide = true;
    variables.forEach(function (variable) {
        if (variable.value != 'liste_agence_a_vendre') { //On exclut la variable #liste_agence_a_vendre# du controle
            for (occ = 1; occ <= variable.occ; occ++) {
                if (nthIndex(contenu, delimiter + variable.value + delimiter, occ) == -1) {
                    valide = false;
                    return;
                }
            }
            if (!valide) {
                return;
            }
        }
    });
    return valide;
}

/**
 * compter le nombre d'occurrence de chaque élément d'un tableau et retourne un
 * autre tableau contenant la valeur (value) et le nombre d'occurrence (occ)
 * @param {*} arr array
 */
function compteOccurence(arr) {
    var valeurs = [];
    arr.forEach(function (item, index) {
        var _pos = -1;
        valeurs.forEach(function (val, pos) {
            if (val.value == item) {
                _pos = pos;
                return;
            }
        });
        if (_pos != -1) {
            valeurs[_pos].occ += 1;
        } else {
            valeurs.push({
                value: item,
                occ: 1
            });
        }
    });
    return valeurs;
}


/**
 * select destinataire courrier change
 */
function destinataireChange($e) {
    if (document.getElementById($e.value)) {
        document.getElementById($e.value).click();
    }
}

function emailSender(email, dequi, formID, id = '') {
    $("#input-email-courriel").val(email);
    $("#input-id-email-courriel").val(id);
    $("#dequi").val(dequi);
    $("#courrier-simple").show();
    $("#courrier-type").hide();
    $("#type_envoi").val(1);
}

function addNote(forWhich, session) {

    var note = $("#formControlTextarea").val();
    var isMaj = $("#formControlTextarea").attr('data-id');
    if (note === "") {
        alert("La note est obligatoire !");
        return;
    }

    var dataGet = 'module=' + forWhich + '&fornote&todo=addnote&session_cle=' + session + '&note=' + note;
    if (isMaj !== '') {
        dataGet = 'module=' + forWhich + '&fornote&todo=updatenote&session_cle=' + session + '&note=' + note + '&idNote=' + isMaj;
    }

    if ($("#id-to-be-modified").length) {
        dataGet += '&idAgenceOrCandidat=' + $("#id-to-be-modified").val();
    }
    $.ajax({
        url: '/backend/_ajax.php',
        type: 'GET',
        data: dataGet,
        success: function (data) { //Succès de la requête
            if (data == -1) {
                alert("La note n'a pas été enregistrée !");
                return;
            } else {
                $("#formControlTextarea").val('');
                $("#formControlTextarea").attr('data-id', '');
                if (isMaj !== '') {
                    $("#note-" + isMaj).replaceWith(data);
                    $('#commentsBoard').animate({
                        scrollTop: $("#note-" + isMaj).offset().top
                    }, 500);
                    $("#note-" + isMaj).effect("pulsate", {}, 1000);
                } else {
                    $("#list-post-it").prepend(data);
                }
            }
        }
    });
}

function actionNote(idNote, action, session) {

    if (action === 'remove') {
        if (!confirm("Vous allez définitivement supprimer cette note. Continuez ?")) {
            return;
        }
    }

    var dataGet = 'fornote&todo=' + action + 'note&session_cle=' + session + '&idNote=' + idNote;
    if ($("#id-to-be-modified").length) {
        dataGet += '&idAgenceOrCandidat=' + $("#id-to-be-modified").val();
    }

    $.ajax({
        url: '/backend/_ajax.php',
        type: 'GET',
        data: dataGet,
        success: function (data) { //Succès de la requête
            if (action === 'archive') {
                $('#note-' + idNote).addClass("--is-archived");
                $('#archivordeachiv-' + idNote).html('<a class="text-dark mr-2 h6 cursor-pointer" onclick=\'actionNote("' + idNote + '", "desarchive", "' + session + '");\' data-toggle="tooltip" data-placement="top" title="Désarchiver"><i class="zmdi zmdi-folder-outline"></i></a>');
            }

            if (action === 'desarchive') {
                $('#note-' + idNote).removeClass("--is-archived");
                $('#archivordeachiv-' + idNote).html('<a class="text-dark mr-2 h6 cursor-pointer" onclick=\'actionNote("' + idNote + '", "archive", "' + session + '");\' data-toggle="tooltip" data-placement="top" title="Archiver"><i class="zmdi zmdi-archive"></i></a>');
            }

            if (action === 'remove') {
                $('#note-' + idNote).fadeOut('slow');
            }

            if (action === 'modify') {
                var iNote = JSON.parse(data);
                $('#formControlTextarea').val(iNote[1]);
                $('#formControlTextarea').attr('data-id', iNote[0]);
            }
        }
    });
}

function scrollOn(divToScroll, divToAnimated = 'html, body') {
    $(divToAnimated).animate({
        scrollTop: $(divToScroll).offset().top
    }, 1100);
}

function scrollBottom(selector, parent) {
    $(parent).scrollTop($(selector).height());
}

function isAssocieExisted(fEmail, fEmailtemoin, session) {
    var email = $(fEmail).val();
    var eTemoin = $(fEmailtemoin).attr('data-email');
    if (email == eTemoin) {
        $(fEmailtemoin).html('');
        $(fEmailtemoin).addClass('hidden');
        return;
    }

    if (email == $('#candidat-email').val()) {
        $(fEmailtemoin).html('<b>Attention !</b> C\'est l\'adresse e-mail du candidat (<b>' + $('#candidat-email').val() + '</b>).');
        $(fEmailtemoin).removeClass('hidden');
        $(fEmail).val('');
        return;
    }

    var dataGet = 'forassocie&todo=checkifassocieexists&session_cle=' + session + '&email=' + email;
    $.ajax({
        url: '/backend/_ajax.php',
        type: 'GET',
        data: dataGet,
        success: function (data) { //Succès de la requête
            if (data == 1) {
                $(fEmailtemoin).html('<b>' + email + '</b> déjà utilisé.');
                $(fEmailtemoin).removeClass('hidden');
                $(fEmail).val('');
            } else {
                $(fEmailtemoin).html('');
                $(fEmailtemoin).addClass('hidden');
            }
        }
    });
}

//Calcul dynamique somme
function calcul_somme(tableau, groupe, cible) {
    /*alert("Le 2ième élément est "+tableau[1]);*/
    var resultat = 0;
    for (var i = 0; i < tableau.length; i++) {
        var variable = tableau[i] + "_" + groupe;
        if (document.getElementById(variable) && (isNaN(parseInt(document.getElementById(variable).value)) == false)) {
            var valeur = parseFloat(document.getElementById(variable).value);
            resultat += valeur;
        }
    }
    document.getElementById(cible + "_" + groupe).value = resultat;
    //return resultat;
}

function auth_popup(callbackPage, provider) {
    var authWindow = window.open(callbackPage + '?provider=' + provider, 'authWindow', 'width=800,height=500,scrollbars=yes');
    return false;
}

//Forcer la saisie de valeurs numeriques
function verifInt() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
        return;
    }
}

//Forcer la saisie de valeurs numeriques, accepte aussi les espaces(32),  && (event.keyCode != 44), le + (43) et les points (.)(46) utile pour les numéros de telephone
function verifIntPointSpace() {
    if ((event.keyCode != 32) && (event.keyCode != 43) && (event.keyCode != 46) && (event.keyCode < 48 || event.keyCode > 57)) {
        event.returnValue = false;
        return;
    }
}

function notify(kind, message, width = 600) {
    Swal.fire({
        icon: (kind == -1) ? 'error' : 'success',
        html: message,
        showConfirmButton: false,
        width: width,
        timer: 5000
    });
}

function showImgSwal(title, urlimg, text = "", width = 400, height = 200) {
    Swal.fire({
        title: title,
        text: text,
        imageUrl: urlimg,
        imageWidth: width,
        imageHeight: height,
        imageAlt: text,
    })
}

function popupSwal(input, inputOptions, url = "", title = "Configuration champ", placeholder = "Selectionnez un champ", errormsg = "Selectionnez obligatoirement un champ !") {

    (async () => {
        const { value: field } = await Swal.fire({
            title: title,
            input: input,
            width: 400,
            inputOptions: inputOptions,
            inputPlaceholder: placeholder,
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value !== "") {
                        resolve();
                    } else {
                        resolve(errormsg);
                    }
                });
            }
        });

        if (field) {
            if (url !== "")
                redirection(url + "?f=" + `${field}`);
            else {
                return `${field}`;
            }
        }
    })();
}

function popupSwalSel2(inputOptions, placeholder = "", url = "") {
    var select = '<select class="col-lg-12 form-control" id="my-select2">';
    select += '<option value=""></option>';
    $.each(inputOptions, function (k, v) {
        select += '<option value="' + k + '">' + v + '</option>'
    });
    select += '</select>';

    Swal.fire({
        html: select,
        width: 400,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        showLoaderOnConfirm: true,
        onOpen: () => {
            $('#my-select2').select2({
                placeholder: placeholder,
                allowClear: true,
                dropdownCssClass: "topIndex",
            });
        },
        showCancelButton: true,
        preConfirm: () => {
            if ($('#my-select2').val() != "") {
                return $('#my-select2').val();
            } else {
                Swal.fire('Veuillez choisir un champ !');
                Swal.keepOpened = true;
                return false;
            }
        }
    }).then(result => {
        if (result.value != "") {
            redirection(url + "?f=" + result.value);
        }
    });
}

function confirmed(title, message, callback, nConfirm = null) {
    return Swal.fire({
        title: title,
        //text: message,
        html: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuer !',
        cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.value) {
            callback();
        } else {
            if (nConfirm !== null)
                nConfirm();
        }
    });
}

function notify2(kind, message) {
    var notification = '<div class="floating-alert depth-10"><div class="alert alert-' + ((kind == -1) ? 'danger' : 'success') + ' fade show" role="alert">' +
        '<div class="alert-icon"><i class="' + ((kind == -1) ? 'flaticon-exclamation-1' : 'flaticon-like') + '"></i> </div>' +
        '<div class="alert-text">' + message + '</div>' +
        '<div class="alert-close"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div></div>';
    $("body").append(notification);
    window.setTimeout(function () {
        $(".floating-alert").fadeTo(5000, 0).slideUp(5000, function () {
            $(this).remove();
        });
    }, 3000);
}

function notify3(title, icon = 'success', duration = 5000) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: duration,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: title
    })
}

function scrollEffect(selector, effect = null, scrollDuration = 1000, effectDuration = 1000) {
    var elOffset = $(selector).offset().top;
    var elHeight = $(selector).height();
    var windowHeight = $(window).height();
    var offset;
    if (elHeight < windowHeight) {
        offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
    } else {
        offset = elOffset;
    }
    $('html, body').animate({ scrollTop: offset }, scrollDuration, function () {
        if (effect != null) {
            $(selector).effect(effect, effectDuration);
        }
    });
}

function confirmBox(title, message) {
    $.confirm({
        title: title,
        content: message,
        buttons: {
            confirm: function () {
                return true;
            },
            cancel: function () {
                return false;
            }
        }
    });
}

function setPopover(selecteur, content, placement = 'top', type = "danger", arrowhide = true) {
    $(selecteur).popover({
        html: true,
        content: "<span class='flaticon-warning text text-" + type + "'> &nbsp;" + content + "</span>",
        placement: placement
    }).popover('show');

    $(".popover").css({
        "border": "1px solid #D7DAE3",
        "background": "#F9F9FC",
        "max-width": "100%"
    });

    (arrowhide) ? $(".popover .arrow").css("display", "none") : null;

    $(selecteur).focus();

    $(selecteur).blur(function () {
        $(this).popover("dispose");
    });
}

function setPopover2(selecteur, content, placement = 'bottom') {
    $(selecteur).popover({
        html: true,
        content: content,
        placement: placement
    }).popover('show');
    $(selecteur).mouseout(function () {
        $(this).popover("dispose");
    });
}

function tellMeImleaving(_notification = null) {
    $(window).bind('beforeunload', function () {
        return _notification;
    });
}

function fvalidate(selector) {
    $(selector).validate({
        rules: {
            "montelephone": {
                "required": true,
                "regex": /^(\+33\.|0)[0-9]{9}$/
            },
            "email": {
                required: true,
                email: true
            },
        },
        messages: {
            email: "L'adresse e-mail saisie n'est pas correcte."
        },
    });
}

function autoExec(callback, time = 1000 * 60 * 10) {
    setInterval(callback, time);
}

function cleanform(selector, wysiwyg = '.summernote') {
    $(selector).find('input:not(:radio,:checkbox,[data-do-not-clean]), select, textarea').val(null);
    $(selector).find('input:radio, input:checkbox').prop('checked', false).removeAttr('selected');
    $(wysiwyg).summernote('reset');

    $(selector).find(".select2-multiple-tag").val(null).trigger('change');
    $(selector).find(".custom-range").val(0);
    $(document).find('[data-note-managment-liee-a-script-choosen-target="true"]').empty();
}


function isCurrent(get, tab) {
    $.get("/backend/index.php", { app: get["app"], module: get["module"], action: "ajax", tab: tab, todo: "savingCurrentTab" }).done();
}

function imprimer(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}


function tabBack(get) {
    $.get("/backend/index.php", { app: get["app"], module: get["module"], action: "ajax", todo: "tabBack" }).done(function (returned) {
        var tab = parseInt(returned);
        $('#kt_portlet_base_demo_2_' + tab + '_tab_content, #kt_portlet_base_demo_2_' + (tab + 1) + '_tab_content').toggleClass("active");
        $('a[href^="#kt_portlet_base_demo_2_' + tab + '_tab_content"], a[href^="#kt_portlet_base_demo_2_' + (tab + 1) + '_tab_content"]').toggleClass("active");
    });
}

function contentFormValue(inputId) {
    return document.getElementById(inputId).value;
}

$(document).on('click', '.password-shower', function () {
    var _isPwd = $(this).closest('div').find("input");
    $(this).children('span').find('i').toggleClass('fa-eye fa-eye-slash');
    ($(this).children('span').find('i').hasClass('fa-eye')) ?
        $(_isPwd).prop('type', 'password') : $(_isPwd).prop('type', 'text');
});

function loadAgency() {
    $(document).on('click', '.aj_loading_agency_by_super', function () {
        var id = $(this).data('id');
        var message = "Vous allez changer d'<b>agence</b>."
        confirmed('Êtes vous-sûr ?', message, function () {
            $.get("/backend/_ajax.php", { app: get["app"], module: get["module"], action: "loadAgency", id: id }).done(function (returned) {
                var data = JSON.parse(returned);
                if (data[0] == 1) {
                    window.location.reload(true);
                    return;
                } else {
                    notify3(data[1], (data[0] == 1 ? 'success' : 'error'));
                }
            });
        });
    });
}

function secureparse(param) {
    try {
        return JSON.parse(param);
    } catch (e) {
        return false;
    }
}

function blobimg(selector, more = false) {
    formdata = new FormData();
    $.each($(selector), function () {
        if ($(this).prop('files').length > 0) {
            var file = $(this).prop('files')[0];
            var filename = (more) ? $(this).attr('name') + "[]" : $(this).attr('name');
            formdata.append(filename, file);
        }
    });
    return formdata;
}

function escapeHtml(str) {
    return str.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"').replace(/'/g, "'");
}

/* Build keywords from text */
function keywordsB(text) {

    var escaped = text.replace("/<.+>/", ' ');
    var akw = [],
        awords = escaped.split(" ");

    console.log(escaped);

    $.each(awords, function (k, v) {
        if (v.length > 3) {
            akw.push(v);
        }
    });

    console.log(akw);
    return akw;
}

function localStorageControl(name, oData) {
    try {
        localStorage.setItem(name, oData); //saves to the database, "key", "value"
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            localStorage.removeItem(name);
            localStorage.setItem(name, oData); //saves to the database, "key", "value"
        }
    }
    // console.log(Object.entries(localStorage))
}

function loadForSelect2(source, target, get) {

    var _source = $(source).val();
    var _action = (typeof $(source).data("action") !== "undefined" && $(source).data("action") != "") ? $(source).data("action") : "dataBySourceData";

    if (typeof _source !== "undefined" && _source !== "" && _source !== null)
        $.get("/backend/_ajax.php", { app: get["app"], module: get["module"], action: _action, "_source": _source }).done(function (returned) {
            var data = secureparse(returned);
            if (data !== false && (parseInt(data[0]) === -1 || parseInt(data[0]) === 1)) {
                // notify(data[0], data[1]);
                notify3(data[1], (data[0] == 1 ? 'success' : 'error'));
                return;
            } else {
                $(target).html(data);
                // $('.aj-loading-select2-data-from-source-donnees').select2();
            }
        });
    else {
        $(target).html("");
    }
}

function loadForSumoSelect(source, target, get, sumo = 'select.SelectBoxUser') {

    var _source = $(source).val();
    var _action = (typeof $(source).data("action") && $(source).data("action") != "") ? $(source).data("action") : "dataBySourceData";

    if (typeof _source !== "undefined" && _source !== "" && _source !== null)
        $.get("/backend/_ajax.php", { app: get["app"], module: get["module"], action: _action, "_source": _source }).done(function (returned) {
            var data = secureparse(returned);
            if (data !== false && (parseInt(data[0]) === -1 || parseInt(data[0]) === 1)) {
                // notify(data[0], data[1]);
                notify3(data[1], (data[0] == 1 ? 'success' : 'error'));
                return;
            } else {
                $(sumo).empty();
                $(sumo).html(data);
                $(sumo)[0].sumo.reload();
            }
        });
    else {
        $(sumo).empty();
        $(sumo).html("");
        $(sumo)[0].sumo.reload();
    }
}

function setval(to, value) {
    $(to).val(value);
}

var risNaN = function (valeur) {
    var n = Number(valeur);
    return n !== n;
};

function dateBynow(interval, about = "later") {
    var now = new Date();
    if (about === "later") {
        now.setMonth(now.getMonth() - interval);
    } else {
        now.setMonth(now.getMonth() + interval);
    }

    return now.getFullYear() + "/" + now.getMonth() + 1 + "/" + now.getDate()
}

function SaveTableNewLine() {
    // var form = document.getElementById('form_tenu_par').submit();
    var tabForm = document.getElementById('form_tenu_par');
    // var tabArray = new FormData(tabForm);
    // var object = {};
    // tabArray.forEach((value, key) => {object[key] = value});
    // var json = JSON.stringify(object);

    // var tabForm = $(this).closest("form");
    var tabArray = $("#form_tenu_par").serializeArray();
    console.log(JSON.stringify(tabArray));

    // var element = document.getElementById("newTrForm");
    // element.parentNode.removeChild(element);

}

function smoothScroll(id) {
    if (document.getElementById(id) != undefined)
        document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

// function initMap() {
//     let map;
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: {
//         lat: -34.397,
//         lng: 150.644
//       },
//       zoom: 11
//     });

//     let geocoder = new google.maps.Geocoder();
//         let element= "Delhi";
//         let that = this;
//         geocoder.geocode({ 'address': element }, function (results, status) {
//           if (status == google.maps.GeocoderStatus.OK) {
//             alert(results);
//           } else {
//             alert('Geocode was not successful for the following reason: ' + status);
//           }
//           // that.setMarker();
//         });
// }

function LoadMarker(latlong) {
    var latlongtab = latlong.split('#');
    alert(latlongtab[0]);
    var uluru = { lat: parseFloat(latlongtab[0]), lng: parseFloat(latlongtab[1]) };
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
}

function log(log) {
    console.clear()
    console.log(log)
}

function attr(selector, classe, action = 'add') {
    (action === 'add') ? $(selector).each(function () {
        $(this).addClass(classe);
    }) : $(selector).each(function () {
        $(this).removeClass(classe);
    });
}

function deleteImageAffaire(image, line) {
    confirmed('Suppression image affaire', 'Vous allez supprimer cette image. Continuez ?', function () {
        $.get("/backend/index.php", { app: get["app"], module: 'affaires', action: 'ajax', imageFrom: image, "todo": 'DeleteImage' }).done(function (returned) {
            var data = secureparse(returned);
            if (data !== false && (parseInt(data[0]) === -1 || parseInt(data[0]) === 1)) {
                if (parseInt(data[0]) === 1) {
                    $(line).parents('[data-image-loaded]').toggle('pulsate');
                    setTimeout(function () {
                        $(line).parents('[data-image-loaded]').hide("slice");
                        $(line).parents('[data-image-loaded]').empty();
                    }, 1000);
                }
                notify3(data[1], (data[0] == 1 ? 'success' : 'error'));
            }
        });
    });
}

function tohash() {
    if (window.location.hash) {
        var hash = window.location.hash;
        if ($(hash).length) {
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, 'swing');
        }
    }
}

$('[data-toggle=popover]').popover({
    content: $('[data-popover-vendeurs-liste]').html(),
    html: true
}).click(function () {
    $(this).popover('show');
});

function _ciucia() {
    var interval_id;
    $(window).focus(function () {
        if (!interval_id)
            interval_id = setInterval(hard_work, 1000);
    });

    $(window).blur(function () {
        clearInterval(interval_id);
        interval_id = 0;
    });
}

function refreshtooltip() {
    $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
}

function printjs(selector, is = 'id') {
    alert(selector)
    if (is === 'id') {
        printJS({
            printable: selector,
            type: 'html'
        })
    } else {
        printJS({
            printable: `$(selector).html()`,
            type: 'raw-html'
        })
    }
}

function crmload(what) {
    if (what === 'wizard') {
        KTWizard2.init();
    }
}

function immuable(whois, action = "make", autoref = 1) {
    if (autoref == 1) {
        $(document).find('[data-affaire-' + whois + '-immuable-field="true"]')
            .prop("disabled", action === 'remove' ? false : true);
        $(document).find('[data-affaire-' + whois + '-immuable-field="true"]')
            .css("background-color", action === 'remove' ? "#fff" : "#f9f9fc");
        $(document).find('[data-affaire-' + whois + '-immuable-field="true"]')
            .css("opacity", action === 'remove' ? 1 : 0.5);
        if (action === 'make') {
            $(document).find('[data-vendeur-add-control="true"]').hide();
        } else {
            $(document).find('[data-vendeur-add-control="true"]').show();
        }
    }
}

function mandateditdisabled(el) {
    el.addClass('hide');
    $('[data-correct-vendeur="button"]').removeClass('hide');
    $('[data-id-vendeur-to-correct="modified"]').attr('name', function () {
        return el.attr('name').replace('#old_id', '#id');
    });
}

function calcauto(selector, id) {

    /*
     *
     * Calcul automatique pour les champs dans affaire. 
     * 
     * */

    var _xhrPosted = { app: "backend", module: "affaires", action: "ajax", id: id, datas: JSON.stringify({ 'code_champ': $(selector).attr('name'), 'valeur': $(selector).val() }), todo: 'calcauto' };
    $.get("/backend/index.php", _xhrPosted).done(function (returned) {
        var back = JSON.parse(returned);
        if (typeof back[0] == undefined || back[0] != -1) {
            $.each(back, function (i, u) {
                $('#' + i).val(u);
            });
        }
    });
}

function sethono(val) {
    val = risnan(val) == false ? parseFloat(val) : 0
    let hono = genereHT(val);

    $(document).find('[name="honoraires"]').val(hono[1]);
    $(document).find('[name="prix"]').val(val + hono[1]);
}

function toastshower(title, message, position = "toast-bottom-right", type = "error", duration = 30000) {

    toastr.options = {
        "closeButton": true,
        "debug": true,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": position,
        "preventDuplicates": false,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": duration,
        "extendedTimeOut": duration,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    if (type === "error") {
        toastr.error(message, title);
    }
    if (type === "info") {
        toastr.info(message, title);
    }
    if (type === "warning") {
        toastr.warning(message, title);
    }
    if (type === "success") {
        toastr.success(message, title);
    }

}

jsonDisplay = {

    jsonstring: '',
    outputDivID: 'shpretty',

    outputPretty: function (jsonstring) {
        jsonstring = jsonstring == '' ? jsonDisplay.jsonstring : jsonstring;
        // prettify spacing
        var pretty = JSON.stringify(JSON.parse(jsonstring), null, 2);
        // syntaxhighlight the pretty print version
        shpretty = jsonDisplay.syntaxHighlight(pretty);
        //output to a div
        // This could be a one liner with jQuery 
        // - but not making assumptions about jQuery or other library being available.
        newDiv = document.createElement("pre");
        newDiv.innerHTML = shpretty;

        return newDiv;
    },

    syntaxHighlight: function (json) {

        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/"-?[0-9\.]+"$/.test(match)) {
                cls = 'number';
            } else if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key font-weight-bold';
                } else {
                    cls = 'string';
                }
            } else if (/"true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }

            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
}

function copy(data) {
    value = $(this).data(data); // Upto this I am getting value
    var temp = $("<input>");
    $("body").append(temp);
    temp.val($(value).text()).select();
    document.execCommand("copy");
    temp.remove();
}

function loading(target = "#kt_blockui_2_portlet") {
    KTApp.block(target, {
        overlayColor: '#181c32b0',
        type: 'v2',
        state: 'primary',
        message: 'Exécution en cours...'
    });
}

/** For ELEMENTS FINANCIERS */
function __ftotaux(attr, output, action = "modification") {

    var iteration = $(document).find('[' + attr + ']');
    var totaux = {};
    $.each(iteration, function (i, v) {
        var currentv = action === "detail" ? $(this).text() : $(this).val();
        var currentk = $(this).attr(attr);
        if (currentv.trim() == "") {
            return;
        }
        currentv = currentv.replace(/\s/g, '');
        if (typeof totaux[currentk] == "undefined") {
            totaux[currentk] = risnan(currentv) == false ? parseFloat(currentv) : 0;
        } else {
            totaux[currentk] = totaux[currentk] + (risnan(currentv) == false ? parseFloat(currentv) : 0);
        }
    });

    if (Object.keys(totaux).length == 0) {
        var __vide = $(document).find('[' + output + ']')
        $.each(__vide, function () {
            $(this).val(0);
        });
    } else {
        $.each(totaux, function (i, v) {
            if (i === "coeff") {
                v = isNaN(totaux["ca_remise"]) || totaux["ca_remise"] == 0 ? 0 : totaux["valorisation"] / totaux["ca_remise"];
                if (action === "detail") {
                    $(document).find('[' + output + '="' + i + '"]').text(__fconvert(v, 1000))
                } else {
                    $(document).find('[' + output + '="' + i + '"]').val(__fconvert(v))
                }

            } else {
                if (action === "detail") {
                    $(document).find('[' + output + '="' + i + '"]').text(new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(__fconvert(v)))
                } else {
                    $(document).find('[' + output + '="' + i + '"]').val(__fconvert(v))
                }
            }
        });
    }

    var math = (() => {
        var ca_remise = $(document).find('[data-elementfinanciers-calcul-from-for-avp-total="ca_remise"]').val();
        var retraitement = $(document).find('[data-elementfinanciers-calcul-from-for-charges-total="retraitement"]').val();
        var montant_charges_ht = $(document).find('[data-elementfinanciers-calcul-from-for-charges-total="montant_charges_ht"]').val();
        var x = 0, y = 0, z = 0;

        if (ca_remise != "" && risnan(ca_remise) == false) {
            x = parseFloat(ca_remise);
        }
        if (retraitement != "" && risnan(retraitement) == false) {
            y = parseFloat(retraitement);
        }
        if (montant_charges_ht != "" && risnan(montant_charges_ht) == false) {
            z = parseFloat(montant_charges_ht);
        }

        $(document).find('#ca').val(x);
        $(document).find('[name="champ167"]').val(y);
        $(document).find('[name="champ95"]').val(__fconvert(x - z));
        $(document).find('[name="champ169"]').val(__fconvert(x - z + y));
        return;
    });

    if (action !== "detail") {
        math();
    }
}

function __fconvert(x, limit = 100) {
    return Math.round((x + Number.EPSILON) * limit) / limit
}
;

/** 
 * For plan de financement
 */

function __pdftotaux(attr, output) {

    var iteration = $(document).find('[' + attr + ']');
    var totaux = {};
    $.each(iteration, function (i, v) {
        var currentv = $(this).val();
        var currentk = $(this).attr(attr);
        if (currentv == "") {
            return;
        }
        if (typeof totaux[currentk] == "undefined") {
            totaux[currentk] = risnan(currentv) == false ? parseFloat(currentv) : 0;
        } else {
            totaux[currentk] = totaux[currentk] + (risnan(currentv) == false ? parseFloat(currentv) : 0);
        }
    });

    if (Object.keys(totaux).length == 0) {
        var __vide = $(document).find('[' + output + ']')
        $.each(__vide, function () {
            $(this).val(0);
        });
    } else {
        $.each(totaux, function (i, v) {
            $(document).find('[' + output + '="' + i + '"]').text(__fconvert(v, 1))
        });

        $(document).find('[' + output + '="tva"]').text($(document).find('[' + output + '="montant_ttc"]').text() - $(document).find('[' + output + '="montant_ht"]').text())
    }


    var __math = (function () {
        var montant_ttc = $(document).find('[data-plandefinancement-calcul-total="montant_ttc"]').text();
        var apport = $(document).find('[data-plandefinancement-apport="true"]').val();
        var paopmh = $(document).find('[data-plandefinancement-calcul-from-for-all-parent="prix_d_acquisition_offert_ou_promis_montant_ht"]').val();

        var x = 0, y = 0, z = 1;

        if (montant_ttc != "" && risnan(montant_ttc) == false) {
            x = parseFloat(montant_ttc);
        }
        if (apport != "" && risnan(apport) == false) {
            y = parseFloat(apport);
        }
        if (paopmh != "" && risnan(paopmh) == false) {
            z = parseFloat(paopmh);
        }

        if (x > 0) {
            $(document).find('[data-plandefinancement-emprunt="true"]').text(__fconvert(x - y, 1));
            $(document).find('[data-plandefinancement-purcent-apport="true"]').text(__fconvert(y / x * 100, 1) + " %");
            $(document).find('[data-plandefinancement-purcent-apport-venale="true"]').text(__fconvert(y / z * 100, 1) + " %");
            $(document).find('[data-plandefinancement-purcent-quotite="true"]').text(100 - __fconvert(y / x * 100, 1) + " %");
            $(document).find('[data-plandefinancement-purcent-quotite-venale="true"]').text(__fconvert((x - y) / z * 100, 1) + " %");
        } else {
            $(document).find('[data-plandefinancement-purcent-apport="true"]').text(null);
            $(document).find('[data-plandefinancement-purcent-quotite="true"]').text(null);
            $(document).find('[data-plandefinancement-emprunt="true"]').val(null);
            $(document).find('[data-plandefinancement-purcent-apport-venale="true"]').text("n/a %");
            $(document).find('[data-plandefinancement-purcent-quotite-venale="true"]').text("n/a %");
        }
        return;
    })();
}

function numberformat(number, format = 'de-DE') {
    return risNaN(number) ? 0 : Intl.NumberFormat(format).format(number).replace(/\.| |\,/gi, ' ');
}

function genereDE(valeurEntree, format = true) { // Droit d'Enregistrement
    var tranche1 = 0,
        tranche2 = 0;
    if ((valeurEntree > 23000) && ((valeurEntree - 23000) <= 177000))
        tranche1 = (valeurEntree - 23000) * 0.03;
    else if ((valeurEntree - 23000) > 177000)
        tranche1 = 177000 * 0.03;
    if (valeurEntree > 200000)
        tranche2 = (valeurEntree - 200000) * 0.05;

    console.log(parseFloat(tranche1))
    console.log(parseFloat(tranche2))

    return (format == true) ? numberformat(Math.round(parseFloat(tranche1) + parseFloat(tranche2))) : Math.round(parseFloat(tranche1) + parseFloat(tranche2));
}

function genereHT(valeurEntree) { // Honoraires de transaction HT
    var ht = 3812, ttc = 4574.40, x = parseFloat(valeurEntree);
    var tranche1_ht = 0, tranche2_ht = 0, tranche3_ht = 0, tranche4_ht = 0, tranche5_ht = 0;
    var tranche1_ttc = 0, tranche2_ttc = 0, tranche3_ttc = 0, tranche4_ttc = 0, tranche5_ttc = 0;

    //if (x > 24000 && x <= 61000) {
    if (x > 24000) {
        if (x >= 61000) {
            tranche1_ht = (61001 - 24000) * 0.15;
            tranche1_ttc = (61001 - 24000) * 0.18;
        } else {
            tranche1_ht = (x - 24001) * 0.15;
            tranche1_ttc = (x - 24001) * 0.18;
        }
    }
    //if (x > 61000 && x <= 115000) {
    if (x > 61000) {
        if (x >= 115000) {
            tranche2_ht = (115001 - 61000) * 0.1;
            tranche2_ttc = (115001 - 61000) * 0.12;
        } else {
            tranche2_ht = (x - 61001) * 0.1;
            tranche2_ttc = (x - 61001) * 0.12;
        }
    }
    //if (x > 115000 && x <= 228000) {
    if (x > 115000) {
        if (x >= 228000) {
            tranche3_ht = (228001 - 115000) * 0.07;
            tranche3_ttc = (228001 - 115000) * 0.084;
        } else {
            tranche3_ht = (x - 115001) * 0.07;
            tranche3_ttc = (x - 115001) * 0.084;
        }
    }

    if (x > 228000) {
        if (x >= 762000) {
            tranche4_ht = (762001 - 228000) * 0.05;
            tranche4_ttc = (762001 - 228000) * 0.06;
        } else {
            tranche4_ht = (x - 228001) * 0.05;
            tranche4_ttc = (x - 228001) * 0.06;
        }
    }

    if (x > 762000) {
        tranche5_ht = (x - 762001) * 0.03;
        tranche5_ttc = (x - 762001) * 0.036;
    }

    ht += parseFloat(tranche1_ht) + parseFloat(tranche2_ht) + parseFloat(tranche3_ht) + parseFloat(tranche4_ht) + parseFloat(tranche5_ht);
    ttc += parseFloat(tranche1_ttc) + parseFloat(tranche2_ttc) + parseFloat(tranche3_ttc) + parseFloat(tranche4_ttc) + parseFloat(tranche5_ttc);

    return [Math.round(ht), Math.round(ttc)];
}

/* Helper function */
function downloadfile(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        var filename = fileURL.substring(fileURL.lastIndexOf('/') + 1);
        save.download = fileName || filename;
        if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
            document.location = save.href;
            // window event not working here
        } else {
            var evt = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': false
            });
            save.dispatchEvent(evt);
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        }
    }

    // for IE < 11
    else if (!!window.ActiveXObject && document.execCommand) {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}


/** Provisionnal fields */
function provisional($fields) {
    $.each($fields, (i, v) => {
        $(document).find('#' + i).attr("title", "Ancienne valeur : " + v);
        $(document).find('#' + i).attr("data-toggle", "kt-tooltip");
        $(document).find('#' + i).attr("data-placement", "bottom");
    });

    refreshtooltip();
}

function escapeHtml(unsafe) {
    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

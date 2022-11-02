// Implementation of the table
const fillInTable = (element, InternArray, pole, section) => {
    const minimumObjective = parseInt(document.getElementById(`pole${pole}MinimumSection${section}`).innerHTML);
    const maximumObjective = parseInt(document.getElementById(`pole${pole}MaximumSection${section}`).innerHTML);
    const objective = parseInt(document.getElementById(`pole${pole}TargetSection${section}`).innerHTML);

    // We are between minimal and goal => yellow
    if (InternArray.length >= minimumObjective && InternArray.length < objective) {
        element.classList.add("quotaMinimumReach");
        element.classList.remove("quotaReach");
        element.classList.remove("quotaMaximumReach");
        element.classList.remove("quotaNotReach");
    }
    // We are over maximum => blue
    else if (InternArray.length >= maximumObjective) {
        element.classList.add("quotaMaximumReach");
        element.classList.remove("quotaMinimumReach");
        element.classList.remove("quotaNotReach");
        element.classList.remove("quotaReach");
    }
    // We are between goal and maximal => green
    else if (InternArray.length < maximumObjective && InternArray.length >= objective) {
        element.classList.add("quotaReach");
        element.classList.remove("quotaNotReach");
        element.classList.remove("quotaMaximumReach");
        element.classList.remove("quotaMinimumReach");
    }
}

// Here you can change the data to be displayed
const contentIntern = (allOfIntern, intern) => {
    const dataIntern = `${allOfIntern[intern].firstname} ${allOfIntern[intern].lastname.toUpperCase()} ${new Date(allOfIntern[intern].begin).toLocaleDateString("fr")} ━ ${new Date(allOfIntern[intern].end).toLocaleDateString("fr")}<br/>`;
    return dataIntern;
}

// Sorting of the presence in the table and display of the colors according to the selection
const sortingDisplay = (InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, part, section) => {
    let element = document.getElementById(`pole${pole}Month${month}Part${part}Section${section}`);
    let stateIntern = ['Confirmé', 'Non confirmé', 'Stage terminé'];


    if (allOfIntern[intern].statut === "13" || allOfIntern[intern].statut === "16") {
        if (!(InternArray1316.includes('<p>' + contentIntern(allOfIntern, intern) + '</p>'))) {
            InternArray1316.push('<p>' + contentIntern(allOfIntern, intern) + '</p>');
        }
    }
    else if (allOfIntern[intern].statut === "14" || allOfIntern[intern].statut === "15") {
        if (!(InternArray1415.includes('<p>' + contentIntern(allOfIntern, intern) + '</p>'))) {
            InternArray1415.push('<p>' + contentIntern(allOfIntern, intern) + '</p>');
        }
    }
    else if (allOfIntern[intern].statut === "17") {
        if (!(InternArray17.includes('<p>' + contentIntern(allOfIntern, intern) + '</p>'))) {
            InternArray17.push('<p>' + contentIntern(allOfIntern, intern) + '</p>');
        }
    }


    element.innerHTML = InternArray1316.length + InternArray17.length;
    fillInTable(element, InternArray1316.concat(InternArray17), pole, section);
    // Statut 13,14,15,16 and 17
    if (InternArray1316[0] != '' && InternArray1415[0] != '' && InternArray17[0] != '' && InternArray1316.length != 0 && InternArray1415.length != 0 && InternArray17.length != 0) {
        element.setAttribute('data-tooltip', `
        [${stateIntern[0].toUpperCase()}]<br/><br/>${InternArray1316.join('')}<br/>
        [${stateIntern[1].toUpperCase()}]<br/><br/>${InternArray1415.join('')}<br/>
        [${stateIntern[2].toUpperCase()}]<br/><br/>${InternArray17.join('')}
        `);
        element.innerHTML += `(${InternArray1415.length})`;
    }

    // Statut 13,16 and 17
    else if (InternArray1316[0] != '' && InternArray17[0] != '' && InternArray1316.length != 0 && InternArray17.length != 0 && InternArray1415.length == 0) {
        element.setAttribute('data-tooltip', `
        [${stateIntern[0].toUpperCase()}]<br/><br/>${InternArray1316.join('')}<br/>
        [${stateIntern[2].toUpperCase()}]<br/><br/>${InternArray17.join('')}`);
    }
    // Statut 14,15 and 17
    else if (InternArray1415[0] != '' && InternArray17[0] != '' && InternArray1415.length != 0 && InternArray17.length != 0 && InternArray1316.length == 0) {
        element.setAttribute('data-tooltip', `
        [${stateIntern[0].toUpperCase()}]<br/><br/>${InternArray1415.join('')}<br/>
        [${stateIntern[2].toUpperCase()}]<br/><br/>${InternArray17.join('')}`);
        element.innerHTML += `(${InternArray1415.length})`;
    }
    // Statut 13,14,15 and 16
    else if (InternArray1316[0] != '' && InternArray1415[0] != '' && InternArray1316.length != 0 && InternArray1415.length != 0) {
        element.setAttribute('data-tooltip', `
        [${stateIntern[0].toUpperCase()}]<br/><br/>${InternArray1316.join('')}<br/>
        [${stateIntern[1].toUpperCase()}]<br/><br/>${InternArray1415.join('')}
        `);
        element.innerHTML += `(${InternArray1415.length})`;
    }
    // Statut 17
    else if (InternArray17[0] != '' && InternArray17.length != 0 && InternArray1415.length == 0 && InternArray1316.length == 0) {
        element.setAttribute('data-tooltip', `
            [${stateIntern[2].toUpperCase()}]<br/><br/>${InternArray17.join('')}`);
    }
    // Statut 13 and 16
    else if (InternArray1316[0] != '' && InternArray1316.length >= 1 && InternArray1415.length == 0) {
        element.setAttribute('data-tooltip', `
        [${stateIntern[0].toUpperCase()}]<br/><br/>${InternArray1316.join('')}`);
    }
    // Statut 14 and 15
    else if (InternArray1415.length >= 1 && InternArray1316.length == 0) {
        element.setAttribute('data-tooltip', `
        [${stateIntern[1].toUpperCase()}]<br/><br/>${InternArray1415.join('')}`);
        element.innerHTML += `(${InternArray1415.length})`;
    }
}

// Data conditioning and case sorting
const dataConditioning = (allOfIntern, pole, month, section, thisYear) => {
    let InternArray1316 = [];
    let InternArray1415 = [];
    let InternArray17 = [];


    for (let intern = 0; intern < allOfIntern.length; intern++) {
        const dateBegin = new Date(allOfIntern[intern].begin);
        const dateEnd = new Date(allOfIntern[intern].end);


        if ((parseInt(allOfIntern[intern].pole) === pole)) {
            if ((parseInt(allOfIntern[intern].section) === section)) {
                // Check the current year
                if (dateBegin.getFullYear() === thisYear && dateEnd.getFullYear() === thisYear) {

                    //Check begin month
                    if (dateBegin.getMonth() + 1 === month) {
                        // Check begin day > middle month
                        if (dateBegin.getDate() > 15) {
                            // Display only second part of month
                            sortingDisplay(InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, 2, section);
                        }
                        else {
                            // Display all part of month
                            for (part = 1; part < 3; part++) {
                                sortingDisplay(InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, part, section);
                            }
                        }
                    }

                    // check end of the month
                    else if (dateEnd.getMonth() + 1 === month) {
                        // Check end day < middle month
                        if (dateEnd.getDate() < 15) {
                            sortingDisplay(InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, 1, section);
                        }
                        else {
                            // Display all part of month
                            for (part = 1; part < 3; part++) {
                                sortingDisplay(InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, part, section);
                            }
                        }
                    }

                    // Filling between the beginning and end of the course
                    else if (((dateBegin.getMonth() + 1) < month) && ((dateEnd.getMonth() + 1) > month)) {
                        for (part = 1; part < 3; part++) {
                            sortingDisplay(InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, part, section);
                        }
                    }
                }

                // Check last year
                else if (dateBegin.getFullYear() < thisYear && dateEnd.getFullYear() === thisYear) {
                    if ((dateEnd.getMonth() + 1) === month) {
                        if (dateEnd.getDate() < 15) {
                            sortingDisplay(InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, 1, section);
                        }
                        else {
                            for (part = 1; part < 3; part++) {
                                sortingDisplay(InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, part, section);
                            }
                        }
                    }
                    else if ((dateEnd.getMonth() + 1) > month) {
                        for (part = 1; part < 3; part++) {
                            sortingDisplay(InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, part, section);
                        }
                    }
                }

                // Check next year
                else if (dateEnd.getFullYear() > thisYear && dateBegin.getFullYear() === thisYear) {
                    if ((dateBegin.getMonth() + 1) === month) {
                        if ((dateBegin.getDate() + 1) > 15) {
                            sortingDisplay(InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, 2, section);
                        }
                        else {
                            for (part = 1; part < 3; part++) {
                                sortingDisplay(InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, part, section);
                            }
                        }
                    }
                    else if ((dateBegin.getMonth() + 1) < month) {
                        for (let m = (dateBegin.getMonth()); m < 12; m++) {
                            for (part = 1; part < 3; part++) {
                                sortingDisplay(InternArray1316, InternArray1415, InternArray17, allOfIntern, intern, pole, month, part, section);
                            }
                        }
                    }
                }
            }
        }
    }
}

// Reset all counting data
const resetAll = () => {
    for (let month = 1; month < 13; month++) {
        for (let pole = 1; pole < 6; pole++) {
            for (let part = 1; part < 3; part++) {
                const element = document.getElementById(`pole${pole}Month${month}Part${part}Section${0}`);
                const element2 = document.getElementById(`totalMonth${month}Part${part}`);
                element.innerHTML = 0;
                element2.innerHTML = 0;
                element.classList.add("quotaNotReach");
                element.classList.remove("quotaMinimumReach");
                element.classList.remove("quotaMaximumReach");
                element.classList.remove("quotaReach");
                element.removeAttribute('data-tooltip');
            }
        }
        for (let section = 1; section < 3; section++) {
            for (let part = 1; part < 3; part++) {
                const element = document.getElementById(`pole${6}Month${month}Part${part}Section${section}`);
                const element2 = document.getElementById(`totalMonth${month}Part${part}`);
                element.innerHTML = 0;
                element2.innerHTML = 0;
                element.classList.add("quotaNotReach");
                element.classList.remove("quotaMinimumReach");
                element.classList.remove("quotaMaximumReach");
                element.classList.remove("quotaReach");
                element.removeAttribute('data-tooltip');
            }
        }
    }
}

// Count all of intern by part
const countAll = () => {
    // Count total of each part of month
    for (let month = 1; month < 13; month++) {
        for (let pole = 1; pole < 6; pole++) {
            for (let part = 1; part < 3; part++) {
                const element = document.getElementById(`pole${pole}Month${month}Part${part}Section${0}`);
                const element2 = document.getElementById(`totalMonth${month}Part${part}`);
                element2.innerHTML = parseInt(element2.innerHTML) + parseInt(element.innerHTML);
            }
        }
        for (let section = 1; section < 3; section++) {
            for (let part = 1; part < 3; part++) {
                const element = document.getElementById(`pole${6}Month${month}Part${part}Section${section}`);
                const element2 = document.getElementById(`totalMonth${month}Part${part}`);
                element2.innerHTML = parseInt(element2.innerHTML) + parseInt(element.innerHTML);
            }
        }
    }
}

// Here we sort the data according to the table
const displayInternDataBegin = (allOfIntern, thisYear) => {
    let tooltip;

    // Sorting table
    for (let month = 1; month < 13; month++) {
        for (let pole = 1; pole < 6; pole++) {
            dataConditioning(allOfIntern, pole, month, 0, thisYear);
        }
        for (let section = 1; section < 3; section++) {
            dataConditioning(allOfIntern, 6, month, section, thisYear);
        }
    }

    // Counting total
    countAll();

    // The following will be only dedicated to the mouse events
    document.onmouseover = function (event) {
        let ourElement = event.target.closest('[data-tooltip]');

        if (!ourElement) return;
        tooltip = showTooltip(ourElement, ourElement.dataset.tooltip);
    }

    document.onmouseout = function () {
        if (tooltip) {
            tooltip.remove();
            tooltip = false;
        }
    }

    document.addEventListener('click', function (e) {
        let ourElement = e.target.closest('[data-tooltip]');
        if (!ourElement) return;
        tooltip = showTooltip(ourElement, ourElement.dataset.tooltip);
    });

    document.onkeydown = function (evt) {
        // Sorting table
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        }

        if (isEscape) {
            $.each($('.tooltip'), function () {
                $(this).remove();
            });
        }
    }

}

// Tooltip configuration
function showTooltip(anchorElem, html) {
    let tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = html;
    document.body.append(tooltipElem);

    let closeTooltip = document.createElement('button');
    closeTooltip.innerHTML = 'fermer';
    tooltipElem.appendChild(closeTooltip);

    closeTooltip.addEventListener('click', event => {
        if (event) {
            tooltipElem.remove();
        }
    });

    let coords = anchorElem.getBoundingClientRect();

    // Position the tooltip in the center of the element
    let left = coords.left + (anchorElem.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0;

    let top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) top = coords.top + anchorElem.offsetHeight + 5;

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';

    return tooltipElem;
}

// Recovery of json data with ajax
const dataRecovery = (thisYear) => {
    // Recovery through AJAX
    $.ajax({
        url: "https://www.hdmnetwork.be/assets/api/timeline.php",
        type: "GET",
        dataType: "json",
        success: function (allOfIntern) {
            function custom_sort(a, b) {
                return new Date(a.end).getTime() - new Date(b.end).getTime();
            }
            console.log(allOfIntern);
            allOfIntern.sort(custom_sort).reverse();
            displayInternDataBegin(allOfIntern, thisYear);
        }
    });
}

// main
const executionOfCode = () => {

    const thisYear = new Date().getFullYear();
    const selector = document.createElement('select');
    const divContainer = document.createElement('div');
    divContainer.className = 'divContainer';

    let yearOption = [thisYear - 1, thisYear, thisYear + 1, "Selectionner l'année"];

    while (yearOption.length) {
        var year = yearOption.pop();
        var opt = new Option(year, year);
        selector.options[selector.options.length] = opt;
    }
    document.body.append(divContainer);
    divContainer.appendChild(selector);

    // location.reload();
    $('select').on('change', function () {

        if (this.value > thisYear) {
            resetAll();

            dataRecovery(thisYear + 1);
        }
        else if (this.value == thisYear) {
            resetAll();
            dataRecovery(thisYear);
        }
        else if (this.value < thisYear) {
            resetAll();
            dataRecovery(thisYear - 1);
        }
        else {
            resetAll();
        }
    });
}

executionOfCode();
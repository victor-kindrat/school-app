let myClasses = [];
let currentClass = sessionStorage.getItem('class') || '';

for (classItem of classesdb) {
    for (teacher of classItem.teachers) {
        if (teacher === loginedId) {
            myClasses.push(classItem)
        }
    }
}

console.log(myClasses)

function generateIconPlaceholder(name, surname) {
    function pickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor) {
        var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
        var r = parseInt(color.substring(0, 2), 16); // hexToR
        var g = parseInt(color.substring(2, 4), 16); // hexToG
        var b = parseInt(color.substring(4, 6), 16); // hexToB
        var uicolors = [r / 255, g / 255, b / 255];
        var c = uicolors.map((col) => {
            if (col <= 0.03928) {
                return col / 12.92;
            }
            return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
        return (L > 0.179) ? darkColor : lightColor;
    }
    if (name.length > 0 && surname.length > 0) {
        let obj = {
            placeholder: name.slice(0, 1) + surname.slice(0, 1),
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
            fullName: name + ' ' + surname,
            textColor: ''
        }
        obj.textColor = pickTextColorBasedOnBgColorAdvanced(obj.color, '#ffffff', '#141414')
        return obj
    }
}

function classItemConstructor(className, id) {
    let avatar = generateIconPlaceholder(className, ' ');
    return `
    <div class="classes__item classes__item_${id}" style="background-color: ${avatar.color}">
        <h2 class="classes__name" style="color: ${avatar.textColor}">${className}</h2>
    </div>
    `
}

if (myClasses.length >= 1) {
    $('.classes__container').html('')
    for (classItem of myClasses) {
        $('.classes__container').append(classItemConstructor(classItem.name, myClasses.indexOf(classItem)))
        $('.classes__item_' + myClasses.indexOf(classItem)).click(function() {
            let text = $(this).text().trim();
            currentClass = text;
            sessionStorage.setItem('currentClass', text);
            window.location = `http://localhost:8000/class/?class=${currentClass}`
        })
    }
}
let students = [];
let dates = [{
    title: "Student's name",
    field: "name",
    width: 200,
    frozen:true
}];
currentClass = sessionStorage.getItem('currentClass');

for (classItem of classesdb) {
    if (classItem.name === currentClass) {
        for (student of classItem.students) {
            let obg = {
                name: `${student.name} ${student.surname}`,
                absent: ''
            }
            students.push(obg)
        }
    }
}

function turnNumberToTextMonth(num) {
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return month[num - 1]
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function generateDates() {
    let currently = new Date();
    let todayMonth = currently.getMonth() + 1;
    let todayDate = currently.getDate();
    let currentYear = currently.getFullYear();

    let firstSeptemer = 'September 1, ' + currentYear;
    let date = new Date(firstSeptemer);
    let month = date.getMonth() + 1;
    let day = date.getDate();


    let arr = []
    console.log(month, day)
    arr.push({
        title: `${day}.${month}`,
        field: 'absent',
        width: 100,
        tristate: true,
        editor: 'input',
        hozAlign: 'center'

    })

    for (let j = month; j <= todayMonth; j++) {
        let dayOnThisMonth = getDaysInMonth(currentYear, month);
        console.log(dayOnThisMonth);
        for (let i = 1; i <= dayOnThisMonth; i++) {
            if (todayMonth === month && todayDate === date) {
                break;
            } else {
                day++;
                let newDate = new Date(`${turnNumberToTextMonth(month)} ${day}, ${currentYear}`)
                date = newDate
                arr.push({
                    title: `${newDate.getDate()}.${newDate.getMonth() + 1}`,
                    field: 'absent',
                    width: 100,
                    tristate: true,
                    editor: 'input',
                    hozAlign: "center"
                })
            }
        }
        month++;
        date = new Date(`${turnNumberToTextMonth(month)} 1, ${currentYear}`)
        day = 0;
    }
    console.log(arr)
    return arr
}

dates = dates.concat(generateDates(2022));
console.log(dates)

//Build Tabulator
let table = new Tabulator(".class__table", {
    data: students,
    columns: dates,
});
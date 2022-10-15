let userPosition = 'none';

let database = {
    teachers: [{
            name: 'Galyna',
            nameByFather: 'Petriyivna',
            surname: 'Shevchenko',
            subject: 'Math',
            email: 'shevchenkogalyna@gmail.com',
            password: 'galyna1234',
            id: '001'
        },
        {
            name: 'Yaroslav',
            nameByFather: 'Ivanovych',
            surname: 'Ivanov',
            subject: 'UA language',
            email: 'yaroslavivanov@gmail.com',
            password: 'yaroslav1234',
            id: '002'
        },
        {
            name: 'Kateryna',
            nameByFather: 'Romanivna',
            surname: 'Franko',
            subject: 'Biology',
            email: 'frankok@gmail.com',
            password: 'kateryna1234',
            id: '003'
        },
    ],
    classes: [{
            name: '1A',
            classTeacher: {
                name: 'Galyna',
                nameByFather: 'Petriyivna',
                surname: 'Shevchenko',
            },
            students: [{
                    name: 'John',
                    surname: 'Bietrix',
                    email: 'johnbietrix@gmail.com',
                    password: 'john1234',
                    marks: [{
                        subject: 'Math',
                        date: '15.10.2022',
                        count: 10
                    }]
                },
                {
                    name: 'Ivan',
                    surname: 'Petrov',
                    email: 'johnbietrix@gmail.com',
                    password: 'john1234',
                    marks: [{
                        subject: 'UA language',
                        date: '15.10.2022',
                        count: 8
                    }]
                }
            ],
        },
        {
            name: '1B',
            classTeacher: {
                name: 'Yaroslav',
                nameByFather: 'Ivanovych',
                surname: 'Ivanov'
            },
            students: [],
        },
        {
            name: '1C',
            classTeacher: {
                name: 'Kateryna',
                nameByFather: 'Romanivna',
                surname: 'Franko',
            },
            students: [],
        },
    ]
}

$('.main__button').click(function () {
    userPosition = $(this).attr('id').slice($(this).attr('id').lastIndexOf('_') + 1, $(this).attr('id').length);
    openLogin(userPosition)
})

$('#loginpage__login').click(function () {

})

function openLogin(position) {
    window.location = `http://localhost:8000/login/#${position}`
}

if (new RegExp('student', 'ig').test(window.location.hash)) {
    $('.loginpage__input_class').css('display', 'block')
} else {
    $('.loginpage__input_class').css('display', 'none')
}

$('#loginpage__login').click(function(){
    if ($('#login__name').val() && $('#login__password').val()) {
        if (new RegExp('student', 'ig').test(window.location.hash)) {
            
        } else {
            let findedTeacher = {};
            for(teacher of database.teachers) {
                if (teacher.email === $('#login__name').val()) {
                    findedTeacher = teacher;
                }
            }
            if (findedTeacher.name) {
                if (findedTeacher.password === $('#login__password').val()) {
                    alert('success');
                    window.location = `http://localhost:8000/teacher/#${findedTeacher.id}`;
                } else {
                    alert('incorrect password');
                }
            } else {
                alert('An account with your email not fonded')
            }
        }
    } else {
        alert('Fill all inputs')
    }
})
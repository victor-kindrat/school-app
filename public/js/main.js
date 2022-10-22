let userPosition = 'none';
let loginedId = localStorage.getItem('loginedId') || '';
let role = localStorage.getItem('role') || '';
console.log(role);

let teachersdb = [{
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
]

let classesdb = [{
        name: '1A',
        classTeacher: '003',
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
        teachers: ['002', '001'],
    },
    {
        name: '1B',
        classTeacher: '002',
        students: [],
        teachers: ['001', '002', '003']
    },
    {
        name: '1C',
        classTeacher: '001',
        students: [],
        teachers: ['001']
    },
]


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

$('#loginpage__login').click(function () {
    if ($('#login__name').val() && $('#login__password').val()) {
        if (new RegExp('student', 'ig').test(window.location.hash)) {
            role = 'student';
            localStorage.setItem('role', role)
        } else {
            let findedTeacher = {};
            for (teacher of teachersdb) {
                if (teacher.email === $('#login__name').val()) {
                    findedTeacher = teacher;
                }
            }
            if (findedTeacher.name) {
                if (findedTeacher.password === $('#login__password').val()) {
                    alert('success');
                    role = 'teacher';
                    localStorage.setItem('role', role);
                    loginedId = findedTeacher.id;
                    localStorage.setItem('loginedId', loginedId)
                    window.location = `http://localhost:8000/teacher/`;
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

if (new RegExp('teacher', 'gi').test(window.location.href)) {
    $('.teacher__quote').hide(0)
    $('.teacher__background').hide(0)
    fetch("https://type.fit/api/quotes")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            block = data[Math.round(Math.random() * 1643)];
            $('.teacher__quote').text(block.text)
            $('.teacher__quote').attr('cite', block.author)
            $('.teacher__quote').show(300)
        });

    fetch('https:/source.unsplash.com/1920x1080/?teacher')
        .then(function (data) {
            $('.teacher__background').css('background', `linear-gradient(0deg, #ffffff70 0%, #ffffff 100%), url("${data.url}") no-repeat center`);
            $('.teacher__background').css('backgroundSize', 'cover');
            $('.teacher__background').fadeIn(300)
        })
}

$('.header__nav-item').click(function () {
    let page = $(this).attr('id').substring($(this).attr('id').lastIndexOf('_') + 1)
    window.location = `http://localhost:8000/${page}`
})
let userPosition = 'none';

$('.main__button').click(function(){
    userPosition = $(this).attr('id').slice($(this).attr('id').lastIndexOf('_') + 1, $(this).attr('id').length);
    openLogin(userPosition)
})

function openLogin(position) {
    window.location = `http://localhost:8000/login/#${position}`
}
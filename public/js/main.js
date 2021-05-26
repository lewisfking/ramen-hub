$(document).ready(function(){
    $('.delete-experience').on('click',function(e){
        $target = $(e.target);
        const id = ($target.attr('data-id'));
        $.ajax({
            type:'DELETE',
            url: '/experiences/'+id,
            success: function(response){
                alert('Deleting Experience');
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});
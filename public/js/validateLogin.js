$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault();
        var form = $(this);

        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    // Login successful
                    $('#message').html("<p>Login successful</p>");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $('#message').html(`<p>${xhr}</p>`);
            }
        });
    });
});
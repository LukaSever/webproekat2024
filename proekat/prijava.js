$(function ()
{
    $('#prijavi_se').on('click', function(e)
    {
        e.preventDefault();

        var form = new FormData();
        form.append("email", $('#email').val());
        form.append("password", $('#lozinka').val());
        form.append("apitoken", $('meta[name="apitoken"]').attr('content'));

        $.ajax
        ({
            "url": "https://vsis.mef.edu.rs/projekat/ulaznice/public_html/api/login",
            "method": "POST",
            "timeout": 0,
            "headers":
                {
                "Accept": "application/json"
                },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form,
            "dataType": "json",
            "success": function (response)
            {
                localStorage.setItem('token', response.token);
                localStorage.setItem('type', response.type);
                console.log(response);
                $('input').val('');
                $('#p_prijavi_se').text('');
            },
            "error": function (response)
            {
                if (response.responseJSON !== undefined)
                {
                    $('#p_prijavi_se').text(response.responseJSON.error).css('color','#f00');
                    $('#lozinka').val('');
                }
            }
        })
    });
});
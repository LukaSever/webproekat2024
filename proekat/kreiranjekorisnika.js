$(function ()
{
    $.ajax
    ({
        "url": "https://vsis.mef.edu.rs/projekat/ulaznice/public_html/api/uloga?apitoken=" + $('meta[name="apitoken"]').attr('content'),
        "method": "GET",
        "timeout": 0,
        "headers":
            {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        "success": function (response)
        {
            response.forEach((element, index) => {
                $('#uloge').append('<option value="'+element.id+'">'+element.naziv+'</option>')
            })
            console.log(response);
        },
        "error": function (response)
        {
            console.log(response);
        }
    });

    $.ajax
    ({
        "url": "https://vsis.mef.edu.rs/projekat/ulaznice/public_html/api/lokacija?apitoken=" + $('meta[name="apitoken"]').attr('content'),
        "method": "GET",
        "timeout": 0,
        "headers":
            {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        "success": function (response)
        {
            response.forEach((element, index) => {
                $('#lokacije').append('<option value="'+element.id+'">'+element.naziv+'</option>')
            })
            console.log(response);
        },
        "error": function (response)
        {
            console.log(response);
        }
    })

    $('#lokacije').hide();
    $('#uloge').on('change',function ()
    {
        if($(this).val()==='2')
            $('#lokacije').show();
        else
            $('#lokacije').hide();
    });

    $('#snimanje').on('click', function(e)
    {
        e.preventDefault();

        if( $('#email').val().length > 0 )
        {
            $('#registruj_se').css('outline','none');
            $('#p_email').text('');
        }
        else
        {
            $('#registruj_se').css('outline','solid 1px orange');
            $('#p_email').text("Niste uneli email").css('color','orange');
            return;
        }

        var form = new FormData();
        form.append("name", $('#ime_prezime').val());
        form.append("email", $('#email').val());
        form.append("phone", $('#telefon').val());
        form.append("password", $('#lozinka').val());
        form.append("userRoleId", $('#uloge').val());
        form.append("locationId", $('#lokacije').val());
        form.append("apitoken", $('meta[name="apitoken"]').attr('content'));

        $.ajax
        ({
            "url": "https://vsis.mef.edu.rs/projekat/ulaznice/public_html/api/korisnik",
            "method": "POST",
            "timeout": 0,
            "headers":
                {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
                },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form,
            "success": function (response)
            {
                window.location.href="svikorisnici.html";
            },
            "error": function (response)
            {
                if (response.responseJSON !== undefined)
                    console.log(response.responseJSON.error);
            }
        });
    });
});
$(function ()
{
    $('#ime_prezime').on('blur',function (e)
    {
        var provera = /^[A-ŠА-Ш][a-šа-шћ]+([\s-][A-ŠА-Ш]+[a-šа-шћ]+)+$/.test($(this).val());
        if( provera && $(this).val().length >= 5 && $(this).val().length <=180 )
        {
            $(this).css('outline','none');
            $('#p_ime_prezime').text('');
        }
        else
        {
            $(this).css('outline','solid 1px orange');
            $('#p_ime_prezime').text("Ime i prezime nije pravilno napisano").css('color','orange');
        }
    });

    $('#telefon').on('blur', function(e)
    {
        var provera = /^[+][1-9][0-9]{8,13}$/.test($(this).val());
        if( provera || $(this).val().length === 0)
        {
            $(this).css('outline','none');
            $('#p_telefon').text('');
        }
        else
        {
            $(this).css('outline','solid 1px orange');
            $('#p_telefon').text("Telefon nije ispravan").css('color','orange');
        }
    });

    $('#lozinka').on('blur', function(e)
    {
        var provera = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,}$/.test($(this).val());
        if( provera )
        {
            $(this).css('outline','none');
            $('#p_lozinka').text('');
        }
        else
        {
            $(this).css('outline','solid 1px orange');
            $('#p_lozinka').text("Lozinka nije dovoljno jaka").css('color','orange');
        }
    });

    $('#ponovljena_lozinka').on('blur', function(e)
    {
        if( $('#lozinka').val() === $('#ponovljena_lozinka').val() )
        {
            $(this).css('outline','none');
            $('#p_ponovljena_lozinka').text('');
        }
        else
        {
            $(this).css('outline','solid 1px orange');
            $('#p_ponovljena_lozinka').text("Lozinke se ne poklapaju").css('color','orange');
        }
    });

    $('#registruj_se').on('click', function(e)
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
        if( $('#ime_prezime').val().length === 0 || $('#lozinka').val().length === 0 || $('#ponovljena_lozinka').val().length === 0 )
            return;

        var form = new FormData();
        form.append("name", $('#ime_prezime').val());
        form.append("email", $('#email').val());
        form.append("phone", $('#telefon').val());
        form.append("password", $('#lozinka').val());
        form.append("apitoken", $('meta[name="apitoken"]').attr('content'));

        $.ajax
        ({
            "url": "https://vsis.mef.edu.rs/projekat/ulaznice/public_html/api/register",
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
            "success": function (response)
            {
              window.location.href="prijava.html";
            },
            "error": function(response)
            {
                $('#p_registruj_se').text("Корисник са том мејл адресом већ постоји!").css('color','#f00');
                $('#email').val('');
            }
        })
    });
});
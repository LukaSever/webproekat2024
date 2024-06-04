$(function()
{
    $.ajax
    ({
        "url": "https://vsis.mef.edu.rs/projekat/ulaznice/public_html/api/korisnik?apitoken=" + $('meta[name="apitoken"]').attr('content'),
        "method": "GET",
        "headers":
            {
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        "success": function (response)
        {
            var br_po_ulogama = {};
            response.forEach((element, index) => {
                br_po_ulogama[element.uloga.id] = (br_po_ulogama[element.uloga.id] || 0) + 1;
            });

            for (var uloga_id in br_po_ulogama) {
                var broj_korisnika = br_po_ulogama[uloga_id];
                $('#korisnik_' + uloga_id).text(broj_korisnika);
            }
        },
        "error": function (response)
        {
            console.log(response);
        }
    });

    $.ajax({
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
                $('#tabela tbody').append('<tr><td>' + element.id + '</td><td>' + element.naziv + '</td><td>' + element.opis + '</td><td><a href="#" class="uloga" data-uloga-id="' + element.id + '" id="korisnik_' + element.id + '">0</a></td></tr>');
            });

            $('.uloga').on('click', function (e)
            {
                e.preventDefault();
                var uloga_id = $(this).data('uloga-id');
                korisnici_po_ulogama(uloga_id);
            });
        },
        "error": function (response)
        {
            console.log(response);
        }
    });
    function korisnici_po_ulogama(uloga_id)
    {
        $.ajax({
            "url": "https://vsis.mef.edu.rs/projekat/ulaznice/public_html/api/korisnik?apitoken=" + $('meta[name="apitoken"]').attr('content'),
            "method": "GET",
            "headers":
                {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
            "success": function (response)
            {
                $('#tabela_korisnici tbody').empty();

                var filter = response.filter(korisnik => korisnik.uloga.id === uloga_id);

                filter.forEach((element, index) => {
                    $('#tabela_korisnici tbody').append('<tr><td>' + element.id + '</td><td>' + element.imePrezime + '</td><td>' + element.email + '</td><td>' + element.telefon + '</td><td>' + element.lokacije + '</td><td>' + element.uloga.naziv + '</td></tr>');
                });

                $('#div_uloga').addClass('hidden');
                $('#div_korisnici').removeClass('hidden');
            },
            "error": function (response)
            {
                console.log(response);
            }
        });
    }
});
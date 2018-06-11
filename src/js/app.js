var Game = (function() {
  var gameEndpoint = 'https://handson.eniwine.com.br/api/descubraoassassino/',
  gameInfo = {}

  return {
    getData: function(callback) {
      $.when(
        $.ajax({
          url: gameEndpoint,
          type: 'GET'
        }).done(function(d) {
          d = JSON.parse(d)
          gameInfo.misterioId = d.misterioId
        }),
        $.ajax({
          url: `${gameEndpoint}locais`,
          type: 'GET'
        }).done(function(d) {
          d = JSON.parse(d)
          gameInfo.locais = d
        }),
        $.ajax({
          url: `${gameEndpoint}armas`,
          type: 'GET'
        }).done(function(d) {
          d = JSON.parse(d)
          gameInfo.armas = d
        }),
        $.ajax({
          url: `${gameEndpoint}criminosos`,
          type: 'GET'
        }).done(function(d) {
          d = JSON.parse(d)
          gameInfo.suspeitos = d
        })

      ).then(function() {
        callback()
      })
    },
    sendTeoria: function(callback) {
      teoria = {
        IdSuspeito: $(gameInfo.s).find(':radio:checked').data('id'),
        IdArma: $(gameInfo.a).find(':radio:checked').data('id'),
        IdLocal: $(gameInfo.l).find(':radio:checked').data('id'),
        IdMisterio: gameInfo.misterioId
      }
      $.ajax({
        url: `${gameEndpoint}`,
        type: 'POST',
        data: teoria
      }).done(function(d) {
        d = JSON.parse(d)
        callback(d)
      })
    },
    setup: function() {
      Game.getData(function() {
        gameInfo.end = false
        gameInfo.s = $('#listSuspeitos')
        gameInfo.a = $('#listArmas')
        gameInfo.l = $('#listLocais')
        if (gameInfo) {
          if (gameInfo.suspeitos) {
            $(gameInfo.suspeitos).each((i,e) => {
              appendHelper(e,gameInfo.s,'info')
            })
          }
          if (gameInfo.locais) {
            $(gameInfo.locais).each((i,e) => {
              appendHelper(e,gameInfo.l,'warning')
            })
          }
          if (gameInfo.armas) {
            $(gameInfo.armas).each((i,e) => {
              appendHelper(e,gameInfo.a,'danger')
            })
          }
        }

        $(gameInfo.s).find(':radio').change(function() {
          $('#teoSusp').html(`<p>${this.id}</p>`)
        })
        $(gameInfo.l).find(':radio').change(function() {
          $('#teoLocal').html(`<p>${this.id}</p>`)
        })
        $(gameInfo.a).find(':radio').change(function() {
          $('#teoArma').html(`<p>${this.id}</p>`)
        })
        $('form').submit((e) => {
          e.preventDefault()
          if (!gameInfo.end) {
            Game.sendTeoria(function(d) {
              if(d == 0) {
                gameInfo.end = true
                $('#erro').hide().html('')
                $('.modal-body').html(
                  `<p>Parabéns! Você ajudou o <b>Inspetor Clouseau</b> a descobrir o crime!<br>
                  Foi descoberto que <b>Sean Bean</b> foi assassinado por <b>${$('#teoSusp').children().html()}</b> em <b>${$('#teoLocal').children().html()}</b> com um(a) <b>${$('#teoArma').children().html()}</b>!</p>
                  <p>Gostaria de investigar um novo crime?</p>`
                )
                $('#modal').modal()
              } else if(d == 1){
                $('#erro').hide().html('Suspeito incorreto').fadeIn('slow')
              } else if(d == 2) {
                $('#erro').hide().html('Local incorreto').fadeIn('slow')
              } else {
                $('#erro').hide().html('Arma incorreta').fadeIn('slow')
              }
            })
          }
        })
        $('#reload').click(() => {window.location.reload()})
      })
    }
  }

  function appendHelper(d,el,cl) {
    $(el).append(
      `<label class="btn btn-${cl} btn-sm">
        <input type="radio" name="op${el[0].id}" id="${d.Nome}" data-id="${d.Id}" autocomplete="off" required> ${d.Nome}
      </label>`
    )
  }

}());

(() => {
Game.setup()

})();

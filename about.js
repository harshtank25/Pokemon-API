var searchParams = new URLSearchParams(window.location.search);
var urlKey = Number(searchParams.get('key'));
var urlOffSet = Number(searchParams.get('offset'));
updateCurrentPage(urlKey, urlOffSet);
let str;

var pageKey = urlKey;
var pageOffSet = urlOffSet;

// next pokemon logic
$('#next').click(function () {
    if(pageKey>=0){
        $('#previous').prop('disabled', false);
    }
    if (pageKey + 1 == pageOffSet+20) {
        pageOffSet += 20;
        updateCurrentPage(pageKey + 1,pageOffSet);
        pageKey++;
    }
    else {
        updateCurrentPage(pageKey + 1, pageOffSet);
        pageKey++;
    }
});
$('#previous').click(function () {
    if(pageKey-1<0){
        $('#previous').prop('disabled', true);
    }
    else if(pageKey == pageOffSet){
        pageOffSet -= 20;
        updateCurrentPage(pageKey - 1,pageOffSet);
        pageKey--;
    }
    else{
        updateCurrentPage(pageKey - 1, pageOffSet);
        pageKey--;
    }
});

function updateCurrentPage(key, offSet) {
    $('.about-poke-container').empty();
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon?limit=20' + '&offset=' + offSet,
        method: 'GET',
        success: function (data) {
            let value = data.results[key-offSet];
            // scan url given on api file
            $.getJSON(value.url, function (urlData) {
                let weight = urlData.weight;
                let height = urlData.height;
                let baseExperience = urlData.base_experience;
                // abilities fetching and add it to array
                let abilityArray = new Array();
                let moveArray = new Array();
                let typeArray = new Array();
                for (let i = 0; i < urlData.abilities.length; i++) {
                    abilityArray[i] = urlData.abilities[i].ability.name;
                }
                for (let i = 0; i < urlData.types.length; i++) {
                    typeArray[i] = urlData.types[i].type.name;
                }
                for (let i = 0; i < 4; i++) {
                    moveArray[i] = urlData.moves[i].move.name;
                }
                let pokeAbility = abilityArray.toString();
                let pokeType = typeArray.toString();
                let pokeMove = moveArray.toString();
                // add to page
                str =
                    `<div class="row about-poke-container">
                <div class="col">
                    <div><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${key + 1}.png" alt="pokemon" class="about-poke-img"></div>
                </div>
                <div class="col">
                
                    <table width="100%">
                        <tr>
                            <td class="bold">Name</td>
                            <td>${value.name}</td>
                        </tr>
                        <tr>
                            <td class="bold">Weight </td>
                            <td>${weight}</td>
                        </tr>
                        <tr>
                            <td class="bold">Height </td>
                            <td>${height}</td>
                        </tr>
                        <tr>
                            <td class="bold">Type</td>
                            <td>${pokeType}</td>
                        </tr>
                        <tr>
                            <td class="bold">Ability</td>
                            <td>${pokeAbility}</td>
                        </tr>
                        <tr>
                            <td class="bold">Moves</td>
                            <td>${pokeMove}</td>
                        </tr>
                    </table>          
                </div>
            </div>`

                // add it to main container
                $('.about-poke-container').append(str);
            });
        }
    });
}
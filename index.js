// make it false to enable buttons
let isScroll =  true;

if(isScroll){
    $('.btn-foot').hide();
    $('.scroll-foot').show();
}
else{
    $('.btn-foot').show();
    $("a[name|='first']").addClass("active");
    $('.scroll-foot').hide();
}

var offSetNo = 0;   
updatePage(offSetNo);

$(".btn-click-foot").click(function() {
    $(".btn-click-foot").removeClass("active");
    $(this).addClass("active");

    var buttonNumber = Number($(this).attr("id"));
    updatePage(Number((buttonNumber-1)*20));

    offSetNo = Number((buttonNumber-1)*20);
}); 

// pagination behavior
$('#next').click(function(){
   
   lastBtn = Number($('.active').attr('id'));
    if($('.active').attr('id') % 5 == 0){
        for(let i=lastBtn+1,j=0 ; i<lastBtn+5,j<5 ; i++,j++){
            $('.btn-click-foot')[j].innerHTML = i;
            $('.btn-click-foot')[j].setAttribute('id',i);
        }
        $(".btn-click-foot").removeClass("active");
        $("a[name|='first']").addClass("active");
    }
    else{
        let currentActiveButton = Number($('.active').attr('id') - $("a[name|='first']").attr('id') + 1);
        $(".btn-click-foot").removeClass("active");
    // btn indexes are starting from zero so no need to do currentActiveButton += 1
        document.getElementsByClassName('btn-click-foot')[currentActiveButton].classList.add("active");
    }

    offSetNo += 20; 
    updatePage(offSetNo);
});

$('#previous').click(function(){
    if((offSetNo-20)<0){
        $('#previous').prop('disabled', true);
        alert('ab or piche kuch nahi hai bhai!');
    }
    else if((offSetNo-20)>=0){

        lastBtn = Number($('.active').attr('id'));  
        if(($('.active').attr('id')-1) % 5 == 0){  
            for(let i=lastBtn-1,j=4 ; i>0,j>=0 ; i--,j--){ 
                $('.btn-click-foot')[j].innerHTML = i;     
                $('.btn-click-foot')[j].setAttribute('id',i);
            }
            $(".btn-click-foot").removeClass("active");
            $("a[name|='last']").addClass("active");
        }
        else{
            let currentActiveButton = Number($('.active').attr('id') - $("a[name|='first']").attr('id'));
            $(".btn-click-foot").removeClass("active");
        // btn indexes are starting from zero so no need to do currentActiveButton += 1
            $(".btn-click-foot" ).eq(currentActiveButton-1).addClass("active");
        }

        offSetNo -= 20; 
        updatePage(offSetNo);
    }
});

// scroll behavior
$(window).scroll(function() {
    if(isScroll){
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            setTimeout(function() {
                offSetNo += 20; 
                updatePage(offSetNo);
            }, 1500);
        }
    }
});

$('#switch-label').click(function(){
    if ($("#switch-label").css('background-color')=="rgb(128, 128, 128)"){
    // hide and show related containers
        $('.btn-foot').show();
        $('.scroll-foot').hide();
        isScroll = false;   
    }
    else if($("#switch-label").css('background-color')=="rgb(145, 218, 85)"){
    // hide and show related containers
        $('.btn-foot').hide();
        $('.scroll-foot').show();
        isScroll = true;
    }        
});

function updatePage(offSet){
    if(!isScroll){
        $(".hero-container").empty();
        if((offSet-20)>=0){
            $('#previous').attr('disabled', false);
        }
    }
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon?limit=20' +  '&offset=' + offSet,
        method: 'GET',
        success: function (data) {
            $.each(data.results, function (key, value) {
                str = '<div class="row center-content">';
                
                str += 
                `<div class="col">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${key + offSet +1}.png" alt="pokemon" class="poke-image">
                </div>
                <div class="col poke-name">${value.name}</div>
                <div class="col">
                    <a href="./about.html?id=${key + offSet}&offset=${offSet}">
                        <button type="button" class="btn btn-success poke-know-more" id="poke${key}">Know More!!</button>
                    </a>
                </div>`;
                
                str += '</div>';
            
            // add it to main container
                $('.hero-container').append(str); 
        }); 
    }
});
} 
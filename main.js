let field = [];
$(function (){
    $("#win").hide();
    let left = 0;
    let top = 0;
    for(let i = 0; i <16; i++)
    {

        field[i] = $("<div id='piece"+(i+1)+"' class='gamePieces'>"+(i+1)+"</div>").css({left: left+"px",top:top+"px"});
        left += 92;

        if(left > 277)
        {
            left = 0;
            top+= 92;
        }
        if(top > 277) top = 0;
        console.log($("#piece"+(i+1)+"").position());
        //$("#game").append("<div id='piece"+(i+1)+"' class='gamePieces'>"+(i+1)+"</div>");
    }
    redraw();
    $("#piece16").empty();
    $("#game").on("click",".gamePieces", function (){
        move($(this));
    })
    $("#mess").on("click",function (){
        mess(false);
    });
    $("#mess2").on("click",function (){
        mess(true);
    });
    $("#submwin").on("click",function (){
        console.log("q");
        $("#win").hide();
        $("#game").show();
        $("#mess").show();
    });

});
function mess(hard)
{
    let count = 0;
    if(hard) count = 500;
    else count = 100;
    for(let i = 0; i<count;i++)
    {
        move($("#piece"+getRndInteger(1,16)));
    }
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function redraw()
{
    $("#game").empty();
    for(let i = 0; i <16; i++)
    {
            $("#game").append(field[i]);
    }
}
function move(obj)
{
    if( Math.round($("#piece16").position().left - obj.position().left) == 0 && Math.round($("#piece16").position().top - obj.position().top) == 92 ||
        Math.round($("#piece16").position().left - obj.position().left) == 92 && Math.round($("#piece16").position().top - obj.position().top) == 0 ||
        Math.round($("#piece16").position().left - obj.position().left) == 0 && Math.round($("#piece16").position().top - obj.position().top) == -92 ||
        Math.round($("#piece16").position().left - obj.position().left) == -92 && Math.round($("#piece16").position().top - obj.position().top) == 0)
    {
        let pos = obj.position();
        //obj.animate({top: $("#piece16").position().top+"px", left: $("#piece16").position().left+"px"},500);
        //$("#piece16").animate({ left: pos.left+"px", top: +pos.top+"px"}, 500);
        obj.css({top: $("#piece16").position().top+"px", left: $("#piece16").position().left+"px"});
        $("#piece16").css({ left: pos.left+"px", top: +pos.top+"px"});
        check();
    }
}
function check()
{
    let left = 0;
    let top = 0;
    let count = 0;
    for(let i=0;i<16;i++)
    {
        console.log(count);
        if(Math.round($("#piece"+(i+1)).position().left) == left &&
           Math.round($("#piece"+(i+1)).position().top) == top)
            count++;
        else count = 0;

        left += 92;

        if(left > 277)
        {
            left = 0;
            top+= 92;
        }
        if(top > 277) top = 0;
    }
    console.log(count);
    if(count == 16)
    {
        $("#win").show();
        $("#game").hide();
        $("#mess").hide();
    }
}
$(document).ready(function(){
    $('#choose').on('change',function(){
        var choosen = $('#choose').val();
        switch(parseInt(choosen)){
            case 0:
                getNomPom();
                break;
            case 1 :
                getAvocado();
                break;
            case 2 :
                getChocolate();
                break;
            default:console.log("nothing");
        }
    });
});
var getNomPom = () =>{
    console.log('getNomPom');
}
var getAvocado = () =>{
    console.log('getAvocado');
}
var getChocolate =()=>{
    console.log('getChocolate');
}
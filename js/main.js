function getUrl() {
    var url ="https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(() =>{
    requestApi();
    $('#recipe').on('change',function(){
        var recipes = $('#recipe').val();
        getRecipe(recipes);
    });
});
function requestApi(){
    $.ajax({
        dataType: 'json',
        url:getUrl(),
        success: (data) => chhosenRechipe(data.recipes),
        error: () => console.log("Cannot get data"),
    })
}
var alldata = [];
function chhosenRechipe(rechipe){
    alldata = rechipe;
    rechipe.forEach(element => {
        Option +=`
            <option value = "${element.id}">${element.name}</option>
        `;
    });
    $('#recipe').append(Option);
    $('#ruler').hide();
    $('#ingredient').hide();
    $('#Instruction').hide();
    $('#member').hide();
}
function getRecipe(rechipeId){
    alldata.forEach(element =>{
        if(element.id == rechipeId){
           getEachRecipe(element.iconUrl,element.name);
            showIngredient(element.ingredients);
            gwetInstruction(element.instructions);
        }
    });   
}
var gwetInstruction =(step) =>{
    var result = "";
    var splitstep = step.split("<step>");
    for(let i = 1; i < splitstep.length; i++){
        result+=`
            <p class="text-primary"> step ${i}</p>
            <p>${splitstep[i]}</p>
        `;
        $('#out').html(result);
        $('#Instruction').show();
    }
}
var getEachRecipe = (img,name) =>{
    var result = "";
    result +=`
   <tr>
    <td><h1>${name}</h1><td>
    <img src="${img}" width="200">
    </tr>
    `;
    $('#result').html(result);
    $('#ruler').show();
}
function showIngredient(ing){
    var output = "";
   ing.forEach(element =>{
        
        output+=`
            <tr>
            <td><img src="${element.iconUrl}" class="img-fluid"width="30"></td>
            <td> ${element.quantity} </td>
            <td> ${element.unit[0]}</td>
            <td>${element.name}</td>
        </tr>
        `;
      
   });
   $('#output').html(output);
   $('#ingredient').show();
   $('#member').show();
}
$(document).ready(function() {
    $('#minus').on('click', function() {
        var members = $('#member').val();
        decreaseMember(members);
    });
    $('#add').on('click', function() {
        var members = $('#member').val();
        increaseMember(members);
    });
});

function decreaseMember (minus) {
    var member = parseInt(minus) - 1;
    if(member >= 0) {
        console.log(member)
    }
}

function increaseMember(add) {
    var members = parseInt(add) + 1;
    if(members <= 15) {
       console.log(add)
    }
}

 
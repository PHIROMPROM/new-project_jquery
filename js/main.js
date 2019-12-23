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
    $('#add').on('click',function(){
        getIncreasement();
        var recipes = $('#recipe').val();
        var Increasement = $('#member').val();
        updateRecipe(recipes,Increasement);
    });
    $('#minus').on('click',function(){
        getDecrement();
        var recipes = $("#recipe").val();
        var Decreasement = $('#member').val();
        updateRecipes(recipes,Decreasement);
    });
});
// load data fron api
function requestApi(){
    $.ajax({
        dataType: 'json',
        url:getUrl(),
        success: (data) => chhosenRechipe(data.recipes),
        error: () => console.log("Cannot get data"),
    })
}
// loop data from api
var alldata = [];
function chhosenRechipe(rechipe){
    var Option = "";
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
    $('#increase-data').hide();
}
// get Rechipe from data
function getRecipe(rechipeId){
    alldata.forEach(element =>{
        if(element.id == rechipeId){
            // console.log(element.name)
           getEachRecipe(element.iconUrl,element.name);
            showIngredient(element.ingredients);
            gwetInstruction(element.instructions);
            $('#member').val(element.nbGuests);
            oldMember = $("#member").val();
        }
    });   
}
// update rechipe
var updateRecipe=(rechipeId,Increasement)=>{
    alldata.forEach(item=>{
       if(item.id == rechipeId){
           udateIngredient(item.ingredients, Increasement);
           $("#member").val(Increasement);
       }
    });
}
// update rechipe
var updateRecipes=(rechipeId,Decreasement)=>{
    alldata.forEach(item=>{
       if(item.id == rechipeId){
           udateIngredientes(item.ingredients, Decreasement);
           $("#member").val(Decreasement);
       }
    });
}
// update incredient
var udateIngredient=(ing,Increasement)=>{
    var result ="";
    ing.forEach(item =>{
       var resultIncreas = item.quantity*parseInt(Increasement) /oldMember;
       result+= `
       <tr>
           <td><img src="${item.iconUrl}" class="img-fluid"width="30"></td>
           <td> ${resultIncreas} </td>
           <td> ${item.unit[0]}</td>
           <td>${item.name}</td>
       </tr>
     `;
    })
    $('#output').html(result);
}
var udateIngredientes=(ing,Decreasement)=>{
    var result ="";
    ing.forEach(item =>{
       var resultIncreas = item.quantity*parseInt(Decreasement) /oldMember;
      result+= `
        <tr>
            <td><img src="${item.iconUrl}" class="img-fluid"width="30"></td>
            <td> ${resultIncreas} </td>
            <td> ${item.unit[0]}</td>
            <td>${item.name}</td>
        </tr>
      `;
    })
    $('#output').html(result);
}
// increasement calulate
var getIncreasement = () =>{
    var Increasement = $('#member').val();
    var allCalulate = (parseInt(Increasement) + 1);
    if(allCalulate <=15){
        $('#member').val(allCalulate);
    }
}
// decreasement calulate
var getDecrement = () =>{
    var Decreasement = $('#member').val();
    var allCalulate = (parseInt(Decreasement) - 1);
    if(allCalulate >=1){
        $('#member').val(allCalulate);
    }
}
// get instruction
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
// display rechipe to html
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
    // udateIngredient(ing);
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
   $('#increase-data').show();
}


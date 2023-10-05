var typeNames = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
var chart = [ 
    [001, 001, 001, 001, 001, 001, 001, 001, 001, 001, 001, 001, 001, 001, 001, 001, 001, 001],
    [001, 001, 001, 001, 001, 001, 002, 001, 001, 001, 001, 001, 001, 000, 001, 001, 001, 001],
    [001, 0.5, 002, 001, 0.5, 0.5, 001, 001, 002, 001, 001, 0.5, 002, 001, 001, 001, 0.5, 0.5],
    [001, 0.5, 0.5, 002, 002, 0.5, 001, 001, 001, 001, 001, 001, 001, 001, 001, 001, 0.5, 001],
    [001, 001, 001, 0.5, 001, 001, 001, 001, 002, 0.5, 001, 001, 001, 001, 001, 001, 0.5, 001],
    [001, 002, 0.5, 0.5, 0.5, 002, 001, 002, 0.5, 002, 001, 002, 001, 001, 001, 001, 001, 001],
    [001, 002, 001, 001, 001, 0.5, 002, 001, 001, 001, 001, 001, 002, 001, 001, 001, 002, 001],
    [001, 001, 001, 001, 001, 001, 001, 001, 001, 002, 002, 0.5, 0.5, 001, 001, 0.5, 001, 002],
    [001, 001, 001, 001, 0.5, 001, 0.5, 0.5, 002, 001, 002, 0.5, 001, 001, 001, 001, 001, 0.5],
    [001, 001, 002, 000, 002, 002, 001, 0.5, 001, 001, 001, 001, 0.5, 001, 001, 001, 001, 001],
    [001, 001, 001, 002, 0.5, 002, 0.5, 001, 000, 001, 001, 0.5, 002, 001, 001, 001, 001, 001],
    [001, 001, 001, 001, 001, 001, 0.5, 001, 001, 001, 0.5, 002, 001, 002, 001, 002, 001, 001],
    [001, 002, 001, 001, 0.5, 001, 0.5, 001, 0.5, 002, 001, 001, 002, 001, 001, 001, 001, 001],
    [0.5, 0.5, 002, 001, 002, 001, 002, 0.5, 002, 0.5, 001, 001, 001, 001, 001, 001, 002, 001],
    [000, 001, 001, 001, 001, 001, 000, 0.5, 001, 001, 001, 0.5, 001, 002, 001, 002, 001, 001],
    [001, 0.5, 0.5, 0.5, 0.5, 002, 001, 001, 001, 001, 001, 001, 001, 001, 002, 001, 001, 002],
    [001, 001, 001, 001, 001, 001, 002, 001, 001, 001, 000, 002, 001, 0.5, 001, 0.5, 001, 002],
    [0.5, 002, 001, 001, 0.5, 0.5, 002, 000, 002, 0.5, 0.5, 0.5, 0.5, 001, 0.5, 001, 0.5, 0.5]
];
var textOnly = false;

function Pokemon(arg){
    var number = arg;
    var type1 = 0;
    var type2 = 0;

    this.changeType = function(slot, type){
        if(slot == 1)
            type1 = type;
        if(slot == 2)
            type2 = type;
    }

    this.updateTypes = function(){
        type1 = document.getElementById("pokemon" + number + "type1").selectedIndex;
        type2 = document.getElementById("pokemon" + number + "type2").selectedIndex;
    }

    this.calcWeakness = function(){
        var result = [];
        for(i = 0; i<18; i++){
            if(chart[type1][i] * chart[type2][i] >= 2){
                result[result.length] = i;
            }
        }
        return result;
    }

    this.calcResist = function(){
        var result = [];
        for(i = 0; i<18; i++){
            if(chart[type1][i] * chart[type2][i] <= 0.5){
                result[result.length] = i;
            }
        }
        return result;
    }
}

function Team(){
    var team = [new Pokemon(1), new Pokemon(2), new Pokemon(3), new Pokemon(4), new Pokemon(5), new Pokemon(6)];
    var allWeaknesses = new List();
    var allResistances = new List();
    var resisted = [];
    this.calcWeakness = function(){
        for(var i=0; i<team.length; i++){
            for(var j=0; j<team[i].calcWeakness().length; j++){
                 allWeaknesses.Add(team[i].calcWeakness()[j]);
            }
        }
        return allWeaknesses;
    }
    this.calcResist = function(){
        for(var i=0; i<team.length; i++){
            for(var j=0; j<team[i].calcResist().length; j++){
                allResistances.Add(team[i].calcResist()[j]);
            }
        }
        return allResistances;
    }

    this.update = function(){
        for(var i=0; i<team.length; i++){
            team[i].updateTypes();
        }
        this.calcWeakness();
        resisted.copyFrom(this.calcResist().Spit());
        for(var i = 0; i<allWeaknesses.Spit().length; i++){
            if(allResistances.Spit().contains(allWeaknesses.Spit()[i])){
                var thisWeak = allWeaknesses.Spit()[i];
                allResistances.Remove(thisWeak);
                allWeaknesses.Remove(thisWeak);
                i--;
            }
        }
        for(var i = 0; i<allResistances.Spit().length; i++){
            if(allWeaknesses.Spit().contains(allResistances.Spit()[i])){
                var thisRes = allResistances.Spit()[i];
                allResistances.Remove(thisRes);
                allWeaknesses.Remove(thisRes);
                i--;
            }
        }
    }

    this.recommend = function(){
        var recs = [];
        for(var i = 1; i<=typeNames.length; i++){ 
            var rating = 0;
            for(var j = 0; j<allWeaknesses.Spit().length; j++){
                if(chart[i][allWeaknesses.Spit()[j]]<1){ 
                    rating++;
                }
            }
            for(var k = 0; k<typeNames.length; k++){ 
                if(chart[i][k]>1){ 
                    if(!allResistances.Spit().contains(k)) 
                        rating--;
                }
            }
            recs[i-1] = rating;
        }

        var result = [];
        for(var z = 0; z<typeNames.length; z++){ 
            var best, highest;
            for(var i = 0; i<recs.length; i++){ 
                if(recs[i]!=null){
                    highest = recs[i]; 
                    best = i;
                    break;
                }
            }
            for(var j = 0; j<recs.length; j++){
                if(recs[j]!=null){ 
                    if(recs[j]>highest){ 
                        highest = recs[j]; 
                        best = j; 
                    }
                }
            }
            result[result.length] = best; 
            if(recs[best]<-2) break;
            recs[best] = null; 
        }

        return result;
    }

    this.rate = function(){
        switch(allWeaknesses.Spit().length){
            case 0:
                return "Outstanding";
                break;
            case 1:
                return "Relatively Superior";
                break;
            case 2:
                return "Above Average";
                break;
            case 3:
                return "Decent";
                break;
            default:
                return "Below Average";
        }
    }

    this.Spit = function(){
        return team;
    }

    this.allWeaknesses = function(){
        return allWeaknesses;
    }
    this.allResistances = function(){
        return allResistances;
    }
    this.resisted = function(){
        return resisted;
    }
}

function calculateTeam(){
    team = new Team();
    var rows = document.getElementById("table").children[0].children;
    team.update();
    for(var i=1; i<=6; i++){
        rows[i].children[1].innerHTML = team.Spit()[i-1].calcWeakness().formatOut();
        rows[i].children[2].innerHTML = team.Spit()[i-1].calcResist().formatOut();
    }
    document.getElementById("weaknesses").innerHTML = team.allWeaknesses().Spit().formatOut();
    document.getElementById("resistances").innerHTML = team.allResistances().Spit().formatOut();

    if(textOnly){
        var outstring = "";
        for(var i=0; i<18; i++){
            if(!team.resisted().contains(i)){
                 outstring += typeNames[i].capitalize() + ", ";
            }
        }
        document.getElementById("unresisted").innerHTML = "Un-Resisted: "+ outstring.slice(0, outstring.length-2);
    }
    else{
        document.getElementById("unresisted").innerHTML =  "Not Resisted: " + makeImages();
        var unResists = document.getElementById("unresisted").children;
        for(var i=0; i<18; i++){
            if(team.resisted().contains(i)){
                unResists[i].style.opacity = 0.2;
            }
        }
    }
    document.getElementById("recommended").innerHTML = "Recommended Additions: " + team.recommend().convertToImages();
    document.getElementById("rating").innerHTML = "Rating: " + team.rate();
}

function reset(){
    var selectBoxes = document.getElementsByTagName("select");
    for (var i = selectBoxes.length - 1; i >= 0; i--) {
        selectBoxes[i].selectedIndex = 0;
    }
    calculateTeam();
}

function toggleText(){
    if(textOnly){
        textOnly = false;
        document.getElementById("text-toggle").className = "";
    }
    else{
        textOnly = true;
        document.getElementById("text-toggle").className = "pushed";
    }
    calculateTeam();
}

function List(){
    var contents = [];
    this.Add = function(item){
        contents[contents.length] = item;
    }
    this.Remove = function(item){
        var result;
        for(var i = 0; i<contents.length; i++){
            if(contents[i]==item){
                result = i;
                for(var j = i; j<contents.length; j++){
                    contents[j] = contents [j+1];
                }
                var temp = [];
                for(var q = 0; q<contents.length; q++){
                    if(typeof contents[q]!== 'undefined'){
                        temp[q] = contents[q];
                    }
                }
                contents = temp;
                break;
            }
        }
        return result;
    }
    this.Spit = function(){
        return contents;
    }
}

function makeImages(){
    var typeImages = "";
    for(var i = 0; i<typeNames.length; i++){
        typeImages += "<img src=\"images/" + typeNames[i] + ".jpg\" alt=\"" + typeNames[i].capitalize() + "\">\n";
    }
    return typeImages;
}

Object.defineProperty(String.prototype, "capitalize", {
    value: function capitalize() {
        return this[0].toUpperCase() + this.slice(1);
    }
})

Object.defineProperty(Array.prototype, "contains", {
    value: function contains(item) {
        var counter = 0;
        while(this[counter]!=null){
            if(this[counter] == item)
                return true;
            counter++;
        }
        return false;
    }
})

Object.defineProperty(Array.prototype, "count", {
    value: function count(item) {
        var counter = 0;
        var result = 0;
        while(this[counter]!=null){
            if(this[counter] == item)
                result++;
            counter++;
        }
        return result;
    }
})

Object.defineProperty(Array.prototype, "copyFrom", {
    value: function copyFrom(item) {
        for(var i = 0; i<item.length; i++){
            this[i] = item[i];
        }
    }
})

Object.defineProperty(Array.prototype, "formatOut", {
    value: function formatOut() {
        var result = "";
        for(var q = 0; q<18; q++){
            if(this.contains(q)){
                if(textOnly){
                    if (result!="")
                        result += ", "
                    if(this.count(q)>1)
                        result += typeNames[q].capitalize() + "*" + this.count(q);
                    else   
                        result += typeNames[q].capitalize();
                }
                else{
                    if(this.count(q)>1)
                        result += "<img src=\"images/" + typeNames[q] + ".jpg\" alt=\"" + typeNames[q].capitalize() + " \">" + "x" + this.count(q) + " ";
                    else   
                        result += "<img src=\"images/" + typeNames[q] + ".jpg\" alt=\"" + typeNames[q].capitalize() + " \">";
                }
            }
        }
        return result;
    }
})

Object.defineProperty(Array.prototype, "convertToImages", {
    value: function convertToImages() {
        var result = "";
        for (var i = 0; i < this.length; i++) {
            if(textOnly){
                if (result!="")
                    result += ", " 
                result += typeNames[this[i]].capitalize();
            }
            else{
                result += "<img src=\"images/" + typeNames[this[i]] + ".jpg\" alt=\"" + typeNames[this[i]].capitalize() + " \">";
            }
        };
        return result;
    }

    /*testing
let a = 10;
let b = 20;
let c = a + b;


for (let i = 0; i < 1000; i++) {

  c += i;
}


const arr = [1, 2, 3, 4, 5];

// 
arr.forEach((element) => {
  // This is an empty arrow function
});

// Here's a function
function doNothing() {
  // Empty function body
}

doNothing();
let a = 10;
let b = 20;
let c = a + b;


for (let i = 0; i < 1000; i++) {

  c += i;
}


const arr = [1, 2, 3, 4, 5];

// 
arr.forEach((element) => {
  // This is an empty arrow function
});

// Here's a function
function doNothing() {
  // Empty function body
}

doNothing();
let a = 10;
let b = 20;
let c = a + b;


for (let i = 0; i < 1000; i++) {

  c += i;
}


const arr = [1, 2, 3, 4, 5];

// 
arr.forEach((element) => {
  // This is an empty arrow function
});

// Here's a function
function doNothing() {
  // Empty function body
}
thing();*/
    
})


















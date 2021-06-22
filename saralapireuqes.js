// using axios for request a api;
const axios = require('axios');
// require a readlinesync for user input;
var readlinesync = require('readline-sync');

// creating a async function;
async function getdata(){
    var content = await axios.request("https://saral.navgurukul.org/api/courses");  // using await keywords cause of this code will run syncronusly
    console.log(content);
    var availablecourse = await content["data"]["availableCourses"];
    // it will return all courses;
    courseObjectList = []
    for(let index = 0; index<availablecourse.length;index++){
        courseObject = {}
        courseObject["id"] = availablecourse[index]["id"]
        courseObject["name"] = availablecourse[index]["name"]
        courseObjectList.push(courseObject)
    };
    console.log(courseObjectList);
    chooseuser = readlinesync.question("choose course id : ");
    // it will return course name;
    for(let liIndex = 0;liIndex<courseObjectList.length;liIndex++){
        if(chooseuser == courseObjectList[liIndex]["id"]){
            console.log(courseObjectList[liIndex]["name"]);
        };
    };
    // this api will return the select course data;
    getallDataByid = await axios.get("https://saral.navgurukul.org/api/courses/"+(chooseuser)+"/exercises");
    dataKaData = getallDataByid["data"]
    getNamefromuserchooseId = dataKaData["data"];
    var childExerciselist;
    console.log("** printing main parent && slug **");
    // here we will get user choose course's name and slug;
    for(parentIndex in getNamefromuserchooseId){
        parentName = getNamefromuserchooseId[parentIndex].name
        parentSlug = getNamefromuserchooseId[parentIndex].slug
        childExerciselist = getNamefromuserchooseId[parentIndex].childExercises
        console.log(parentName)
        console.log(parentSlug);
    }
    if(childExerciselist.length == 0){
       console.log("child exercise is empty..");
    }
    else{
        console.log("******this is parentname of child exercise*****");
        for(let childIndex = 0;childIndex<childExerciselist.length;childIndex++){
        parentnameofChild = childExerciselist[childIndex].name
        console.log("    ", parentnameofChild);
        };
        console.log("*** a list of slugname && github_link of child exercise***");
        for(let childSlug = 0;childSlug<childExerciselist.length;childSlug++){
            slugnameOfChild = childExerciselist[childSlug].slug
            githubLinkofchildExercise = childExerciselist[childSlug].github_link
            console.log(slugnameOfChild);
            console.log(githubLinkofchildExercise);

        };
        userchoosechildSlug = readlinesync.question("choose slug name? ");
        getSlugcontent = await axios.get("http://saral.navgurukul.org/api/courses/"+chooseuser+"/exercise/getBySlug?slug="+userchoosechildSlug);
        console.log(getSlugcontent.data);
    };
    
};
getdata()


function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

String.prototype.cleanup = function() {
    return this.toLowerCase().replace(/[^a-zA-Z]+/g, " ");
 }


//  text.split("\n");


chrome.tabs.executeScript({
    code:"document.querySelector('body').innerText;"
},function(result){
    var _allWords = result[0].cleanup(); //html문서에 있는 모든 단어를 _allwords에 저장
    //영단어만 추출/영어단어는 모두 소문자로/띄어쓰기/

    var allWords ='';
    allWords = _allWords.split(' '); //모든 영단어를 띄어쓰기 단위로 구별하여 배열을 만듦

    var notDupWord = removeDuplicates(allWords); //allwords의 중복 단어 제거하기 

    var wordData = []; //데이터를 담을 곳

    for(var i in notDupWord){
        // console.log(i);
        wordData[notDupWord[i]] = _allWords.match(new RegExp('\\b('+notDupWord[i]+')\\b','gi')).length;
        //워드데이터에 해당단어가 몇번 나오는지 저장 // 객체
    }


    var sortedWord = []; //배열 생성
    for(var _word in wordData){ 
        sortedWord.push([_word,wordData[_word]]); 
    }

    sortedWord.sort(function(a,b){
        return b[1] - a[1];
    });

    //notDupWord에서 필요없는 데이터 삭제하기 
    //내가 이미 아는 단어chrome 스토리지에 저장하기 
    var rememberedWord = ' dear the a to';
    var rememberedWord2Arr = [];
    rememberedWord2Arr = rememberedWord.split(' ');

    console.log(rememberedWord2Arr);

    chrome.storage.sync.set({
        userWords: rememberedWord2Arr
    });


    for(var rm in rememberedWord2Arr){
        for(var base in sortedWord){
            if(rememberedWord2Arr[rm] == sortedWord[base][0]){
                sortedWord.splice(base,1);
            }
        }
    }           
        
    for(var i in sortedWord){
        console.log(sortedWord[i][0]+'의 출력 횟수 : '+ sortedWord[i][1]);
    }
        
    
})
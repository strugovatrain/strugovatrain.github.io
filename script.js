window.onload = function() {
    let links = document.querySelectorAll('.link');　//список всех ссылок
    let fields = document.querySelectorAll('.field'); //все поля
    let kana = document.querySelector('.field.kana'); //поле каны
    let kanji = document.querySelector('.field.kanji'); //поле кандзи
    let words = document.querySelector('.field.words'); // поле слов
    let gozuon = document.querySelector('.field.gozuon'); // поле таблицы годзюон
    let list = document.querySelector('.field.list'); //поле списка уроков

    let kanamodvar = document.querySelectorAll('.field.kana .settings .mode input');//варианты тренировки каны
    let kanaanswers = document.querySelectorAll('.field.kana .answer');//варианта ответов для каны
    let kanaright; //правильный ответ в поле каны сейчас
    let kananext = document.querySelector('.field.kana .next');//кнопка для следующего слова в поле каны

    let gozuonmodvar = document.querySelectorAll('.field.gozuon .settings .mode input');//варианты тренировки годзюона
    let gozuonanswers = document.querySelectorAll('.field.gozuon .answer');//варианта ответов для годзюона
    let gozuonright; //правильный ответ в поле годжюон сейчас
    let gozuonnext = document.querySelector('.field.gozuon .next');//кнопка для следующего слова в поле годзюон

    let wordsmodvar = document.querySelectorAll('.field.words .settings .mode input');
    let wordsanswers = document.querySelectorAll('.field.words .answer');
    let wordsright;
    let wordsnext = document.querySelector('.field.words .next');//words

    let kanjimodvar = document.querySelectorAll('.field.kanji .settings .mode input');
    let kanjisanswers = document.querySelectorAll('.field.kanji .answer');
    let kanjiright;
    let kanjinext = document.querySelector('.field.kanji .next');//words

    let lesson;//номер урока сейчас
    let lessons = []; //просто переделанная ресурсная таблицa
    lessons[1] = lesson1;//kanji
    lessons[2] = lesson2;
    lessons[3] = lesson3;
    lessons[4] = lesson4;
    lessons[5] = lesson5;
    lessons[6] = lesson6;
    lessons[7] = lesson7;
    lessons[8] = lesson8;
    lessons[9] = lesson9;
    lessons[10] = lesson10;

    fields.forEach(function(elem) {
        elem.style.display = 'none';
    });
    list.style.display = '';
    links.forEach(function(elem) {
        elem.addEventListener('click', function() {
            fields.forEach(function(elem) {
                elem.style.display = 'none';
            });
            switch(this.dataset.type) {
                case 'kana':
                    kana.style.display = '';
                    lesson = Number(this.dataset.lesson);
                    makeKana(lesson);
                    break;
                case 'kanji':
                    kanji.style.display = '';
                    lesson = Number(this.dataset.lesson);
                    makeKanji(lesson);
                    break;
                case 'words':
                    words.style.display = '';
                    lesson = Number(this.dataset.lesson);
                    makeWords(lesson);
                    break;
                case 'list':
                    list.style.display = '';
                    break; 
                case 'gozuon':
                    gozuon.style.display = '';
                    lesson = Number(this.dataset.lesson);
                    makeGozuon(lesson);
                    break;
            }
        });
    });

    //kana 
    function makeKana(lesson) {
        document.querySelector('.field.kana .lessonnum').innerHTML = lesson;
        kanaanswers.forEach(function(elem) {
            elem.style.backgroundColor = '';
        });
        let mode; 
        let show = document.querySelector('.field.kana .show');
        let answers = document.querySelectorAll('.field.kana .answer');
        for (let i = 0; i < kanamodvar.length; i++) {
            if (kanamodvar[i].checked === true) {
                mode = kanamodvar[i].dataset.mode;
            }
        }
        let help = [];
        kanaright = random(0, 3);
        switch(mode) {
            case 'hiragana-rus':
                help = randomarr(0, lessons[lesson].kana.length / 2 - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].kana[help[kanaright]].on + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = lessons[lesson].kana[help[i]].rus;
                }
                break;
            case 'rus-hiragana':
                help = randomarr(0, lessons[lesson].kana.length / 2 - 1);
                show.innerHTML =  lessons[lesson].kana[help[kanaright]].rus;
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].kana[help[i]].on + '</span class="japanese">';
                }
                break;
            case 'katakana-rus':
                help = randomarr(lessons[lesson].kana.length / 2, lessons[lesson].kana.length - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].kana[help[kanaright]].on + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = lessons[lesson].kana[help[i]].rus;
                }
                break;                
            case 'rus-katakana':
                help = randomarr(lessons[lesson].kana.length / 2, lessons[lesson].kana.length - 1);
                show.innerHTML =  lessons[lesson].kana[help[kanaright]].rus;
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].kana[help[i]].on + '</span class="japanese">';
                }
                break;
            case 'kana-rus':
                help = randomarr(0, lessons[lesson].kana.length - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].kana[help[kanaright]].on + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = lessons[lesson].kana[help[i]].rus;
                }
                break;
            case 'rus-kana':
                help = randomarr(0, lessons[lesson].kana.length - 1);
                show.innerHTML =  lessons[lesson].kana[help[kanaright]].rus;
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].kana[help[i]].on + '</span class="japanese">';
                }
                break;
        }
    }
    kananext.addEventListener('click', function(){
        makeKana(lesson);
    });
    kanaanswers.forEach(function(elem) {
        elem.addEventListener('click', function() {
            this.style.backgroundColor = '#767676';
            kanaanswers[kanaright].style.backgroundColor = '#00E400';
        });
    });
    
    //gozuon
    function makeGozuon(lesson) {
        document.querySelector('.field.gozuon .lessonnum').innerHTML = lesson;
        gozuonanswers.forEach(function(elem) {
            elem.style.backgroundColor = '';
        });
        let mode; 
        let show = document.querySelector('.field.gozuon .show');
        let answers = document.querySelectorAll('.field.gozuon .answer');
        for (let i = 0; i < gozuonmodvar.length; i++) {
            if (gozuonmodvar[i].checked === true) {
                mode = gozuonmodvar[i].dataset.mode;
            }
        }
        let help = [];
        gozuonright = random(0, 3);
        switch(mode) {
            case 'hiragana-rus':
                help = randomarr(0, lessons[lesson].gozuon.length / 2 - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].gozuon[help[gozuonright]].on + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = lessons[lesson].gozuon[help[i]].rus;
                }
                break;
            case 'rus-hiragana':
                help = randomarr(0, lessons[lesson].gozuon.length / 2 - 1);
                show.innerHTML =  lessons[lesson].gozuon[help[gozuonright]].rus;
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].gozuon[help[i]].on + '</span class="japanese">';
                }
                break;
            case 'katakana-rus':
                help = randomarr(lessons[lesson].gozuon.length / 2, lessons[lesson].gozuon.length - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].gozuon[help[gozuonright]].on + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = lessons[lesson].gozuon[help[i]].rus;
                }
                break;                
            case 'rus-katakana':
                help = randomarr(lessons[lesson].gozuon.length / 2, lessons[lesson].gozuon.length - 1);
                show.innerHTML =  lessons[lesson].gozuon[help[gozuonright]].rus;
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].gozuon[help[i]].on + '</span class="japanese">';
                }
                break;
            case 'kana-rus':
                help = randomarr(0, lessons[lesson].gozuon.length - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].gozuon[help[gozuonright]].on + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = lessons[lesson].gozuon[help[i]].rus;
                }
                break;
            case 'rus-kana':
                help = randomarr(0, lessons[lesson].gozuon.length - 1);
                show.innerHTML =  lessons[lesson].gozuon[help[gozuonright]].rus;
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].gozuon[help[i]].on + '</span class="japanese">';
                }
                break;
        }
    }
    gozuonnext.addEventListener('click', function(){
        makeGozuon(lesson);
    });
    gozuonanswers.forEach(function(elem) {
        elem.addEventListener('click', function() {
            this.style.backgroundColor = '#767676';
            gozuonanswers[gozuonright].style.backgroundColor = '#00E400';
        });
    });

    //words
    function makeWords(lesson) {
        document.querySelector('.field.words .lessonnum').innerHTML = lesson;
        wordsanswers.forEach(function(elem) {
            elem.style.backgroundColor = '';
        });
        let mode; 
        let show = document.querySelector('.field.words .show');
        let answers = document.querySelectorAll('.field.words .answer');
        for (let i = 0; i < wordsmodvar.length; i++) {
            if (wordsmodvar[i].checked === true) {//gozuon
                mode = wordsmodvar[i].dataset.mode;
            }
        }
        let help = [];
        wordsright = random(0, 3);
        switch(mode) {
            case 'word-rus':
                help = randomarr(0, lessons[lesson].words.length - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].words[help[wordsright]].word + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = lessons[lesson].words[help[i]].rus;
                }
                break;
            case 'rus-word':
                help = randomarr(0, lessons[lesson].words.length - 1);
                show.innerHTML =  lessons[lesson].words[help[wordsright]].rus;
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].words[help[i]].word + '</span class="japanese">';
                }
                break;
            case 'kanjiword-rus':
                help = randomarr(0, lessons[lesson].words.length - 1);
                show.innerHTML = (typeof lessons[lesson].words[help[wordsright]].kanji !== 'undefined') ?
                '<span class="japanese">' + lessons[lesson].words[help[wordsright]].kanji + '</span class="japanese">' :
                '<span class="japanese">' + lessons[lesson].words[help[wordsright]].word + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = lessons[lesson].words[help[i]].rus;
                }
                break;                
            case 'rus-kanjiword':
                help = randomarr(0, lessons[lesson].words.length - 1);
                show.innerHTML =  lessons[lesson].words[help[wordsright]].rus;
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = (typeof lessons[lesson].words[help[i]].kanji !== 'undefined') ?
                    '<span class="japanese">' + lessons[lesson].words[help[i]].kanji + '</span class="japanese">' :
                    '<span class="japanese">' + lessons[lesson].words[help[i]].word + '</span class="japanese">';
                }
                break;
        }
    }
    wordsnext.addEventListener('click', function(){
        makeWords(lesson);
    });
    wordsanswers.forEach(function(elem) {
        elem.addEventListener('click', function() {
            this.style.backgroundColor = '#767676';
            wordsanswers[wordsright].style.backgroundColor = '#00E400';
        });
    });

    //kanji word
    function makeKanji(lesson) {
        document.querySelector('.field.kanji .lessonnum').innerHTML = lesson;
        kanjisanswers.forEach(function(elem) {
            elem.style.backgroundColor = '';
        });
        let mode; 
        let show = document.querySelector('.field.kanji .show');
        let answers = document.querySelectorAll('.field.kanji .answer');
        for (let i = 0; i < kanjimodvar.length; i++) {
            if (kanjimodvar[i].checked === true) {
                mode = kanjimodvar[i].dataset.mode;
            }
        }
        let help = [];
        kanjiright = random(0, 3);
        switch(mode) {
            case 'kanji-rus':
                help = randomarr(0, lessons[lesson].kanji.length - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[kanjiright]].kanji + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = lessons[lesson].kanji[help[i]].rus;
                }
                break;
            case 'kanji-onyomi':
                help = randomarr(0, lessons[lesson].kanji.length - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[kanjiright]].kanji + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[i]].onyomi + '</span class="japanese">';
                }
                break;
            case 'kanji-kunyomi':
                help = randomarr(0, lessons[lesson].kanji.length - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[kanjiright]].kanji + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = (typeof lessons[lesson].kanji[help[i]].kunyomi !== 'undefined') ?
                    '<span class="japanese">' + lessons[lesson].kanji[help[i]].kunyomi + '</span class="japanese">' :
                    '<span class="japanese">' + lessons[lesson].kanji[help[i]].words + '</span class="japanese">';
                }
                break;                
            case 'kanji-words':
                help = randomarr(0, lessons[lesson].kanji.length - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[kanjiright]].kanji + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[i]].words + '</span class="japanese">';
                }
                break;
            case 'rus-kanji':
                help = randomarr(0, lessons[lesson].kanji.length - 1);
                show.innerHTML = lessons[lesson].kanji[help[kanjiright]].rus;
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[i]].kanji + '</span class="japanese">';
                }
                break;
            case 'onyomi-kanji':
                help = randomarr(0, lessons[lesson].kanji.length - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[kanjiright]].onyomi + '</span class="japanese">'
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[i]].kanji + '</span class="japanese">';
                }
                break;
            case 'kunyomi-kanji':
                help = randomarr(0, lessons[lesson].kanji.length - 1);
                show.innerHTML = (typeof lessons[lesson].kanji[help[kanjiright]].kunyomi !== 'undefined') ?
                '<span class="japanese">' + lessons[lesson].kanji[help[kanjiright]].kunyomi + '</span class="japanese">' :
                '<span class="japanese">' + lessons[lesson].kanji[help[kanjiright]].words + '</span class="japanese">';
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[i]].kanji + '</span class="japanese">';
                }
                break;
            case 'words-kanji':
                help = randomarr(0, lessons[lesson].kanji.length - 1);
                show.innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[kanjiright]].words + '</span class="japanese">'; 
                for (let i = 0; i < 4; i++) {
                    answers[i].innerHTML = '<span class="japanese">' + lessons[lesson].kanji[help[i]].kanji + '</span class="japanese">';
                }
                break;
        }
    }
    kanjinext.addEventListener('click', function(){
        makeKanji(lesson);
    });
    kanjisanswers.forEach(function(elem) {
        elem.addEventListener('click', function() {
            this.style.backgroundColor = '#767676';
            kanjisanswers[kanjiright].style.backgroundColor = '#00E400';
        });
    });

    //other
    function randomarr(min, max) {
        let res = [];
        while (res.length < 4) {
            let n = random(min, max);
            if (res.indexOf(n) == -1)
                res.push(n);
        }
        return res;
    }
    function random(min, max) {
        return Math.floor(Math.random() * (max-min + 1)) + min;
    }
}

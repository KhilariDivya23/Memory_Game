function flipImage(id){
    let newId = '#' + id + ' .btn-inner';
    document.querySelector(newId).style.transform = 'rotateY(180deg)';
}

let image_names = []

function createBoard(){
    for (let i=1; i <=18; i++){
        image_names.push('img-' + String(i));
        image_names.push('img-' + String(i));
    }
    image_names.sort( () => Math.random()-0.5);
    let allRows = document.getElementsByClassName("row");
    for (let row of allRows){
        for (let i=1; i<=6; i++){
            let button = document.createElement('button');
            let image = document.createElement('img');
            image.src = `./img/${image_names[image_names.length-1]}.png`;
            image_names.pop();
            button.addEventListener("click", isSame);
            button.appendChild(image);
            // image.addEventListener("click", isSame);
            row.appendChild(button);
        }
    }
}

function disableButton(event){
    this.disabled = true;
}

function hideImages(){
    setTimeout(function (){
        let images = document.getElementsByTagName('img');
        for (let image of images){
            image.style.display = 'none';
        }
    }, 1500);
}

let prevImage = null;
let ct = 0;
function isSame(event){
    this.getElementsByTagName('img')[0].style.display = 'block';
    this.disabled = true;
    ct ++;
    if (prevImage === null) {
        prevImage = this.getElementsByTagName('img')[0];
    }
    else{
        if (this.getElementsByTagName('img')[0].src !== prevImage.src){
            let btn = this;
            document.getElementsByClassName('cover')[0].style.display = 'block';
            setTimeout(function(){
                document.getElementsByClassName('cover')[0].style.display = 'none';
                btn.getElementsByTagName('img')[0].style.display = 'none';
                prevImage.style.display = 'none';
                btn.disabled = false;
                prevImage.parentElement.disabled = false;
                ct -= 2;
                prevImage = null;
            }, 1000);
        }
        else{
            prevImage = null;
        }

    }
    if (ct === 36){
        document.getElementById('win').style.display = 'block';
        let rows = document.getElementsByClassName('row');
        for (let row of rows) {
            row.style.display = 'none';
        }
    }

}

function startGame(){
    createBoard();
    hideImages();
    document.getElementById('start').style.display = 'none';
    let rows = document.getElementsByClassName('row');
    for (let row of rows) {
        row.style.display = 'flex';
    }
    // document.getElementById('restart').style.display = 'none';
}

window.onload =  function(){
    let rows = document.getElementsByClassName('row');
    for (let row of rows) {
        row.style.display = 'none';
    }
    // document.getElementById('restart').style.display = 'none';
}




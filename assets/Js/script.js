window.onload = function(){
  const updateBtn = document.getElementById('update-btn');
  const jsonContainer = document.getElementById('json-container');
  errMsg = document.getElementById('error-msg');
  const daysContainer = document.getElementById('days-container');
  const list = daysContainer.getElementsByTagName('li');
  const span = daysContainer.getElementsByTagName('span');
  let input = document.getElementById('year-input');
  let jsonData;
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let d;
  let dayName;
  
  

  fetch('./assets/Js/birthdayList.json')
  .then(res => res.json())
  .then(data => {
    displayBirthayList(data);
    return jsonData = data;
  });


  updateBtn.addEventListener('click', function(e){    
    e.preventDefault();
    removeNames();
    display(input.value);
  });

  function displayBirthayList(data){
    jsonContainer.innerHTML = JSON.stringify(data, undefined, 2);
  }

  function display(input){
    jsonData.forEach(e => {
      let jsonDate = e.birthday.split("/");
      let bdayStr = `${jsonDate[0]}/${jsonDate[1]}/${input}`;
      d = new Date(bdayStr);
      dayName = days[d.getDay()];

      let jsonName = e.name.split(" ");
      let firstName = jsonName[0].split("")[0];
      let lastName = jsonName[1].split("")[0];

      let nameLetter = document.createElement("span");
      nameLetter.setAttribute('data-day', dayName);
      nameLetter.innerHTML = `${firstName}${lastName}`;
      nameLetter.style.backgroundColor = getRandomColor();
      printData(nameLetter);
    });
  }

  function printData(nameLetter){
    switch(nameLetter.getAttribute('data-day')){
      case 'Monday':
        list[0].appendChild(nameLetter);
        break;
      case 'Tuesday':
        list[1].appendChild(nameLetter);
        break;
      case 'Wednesday':
        list[2].appendChild(nameLetter);
        break;
      case 'Thursday':
        list[3].appendChild(nameLetter);
        break;
      case 'Friday':
        list[4].appendChild(nameLetter);
        break;
      case 'Saturday':
        list[5].appendChild(nameLetter);
        break;
      case 'Sunday':
        list[6].appendChild(nameLetter);
        break;
    }
  }

  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  input.addEventListener('keyup', removeNames);

  function removeNames(){
    for(let index = 0; index < span.length; index++) {
      span[index].parentNode.removeChild(span[index]);
    }
  }

}
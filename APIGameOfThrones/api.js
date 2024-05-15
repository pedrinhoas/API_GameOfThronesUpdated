const form = document.querySelector(".formCreate");
const submitButton = form.querySelector(".btn");
const userList = document.getElementById("userList");


async function fetchCharacterInfo(ID) {
  try {
    const response = await fetch(
      `https://thronesapi.com/api/v2/Characters/${ID}`
    );
    const data = await response.json();
    if (data.error) {
      throw new Error("este ID não existe");
    }
    const character = {
      fullName : data.fullName,
      title : data.title,
      family : data.family,
      image : data.image,
    }
    return character;
  } catch (error) {
    throw new Error(error.message);
  }
}


  function create() {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const ID = await document.getElementById("ID").value;

      
      if (isNaN(ID) || ID < 0 || ID > 52) {
        const errorMessage = "ID inválido. Por favor, insira um número entre 0 e 52.";
        console.error(errorMessage); 
        userList.innerHTML = `<p><strong>${errorMessage}</strong></p>`;
        return;
      }
      try {
        const character = await fetchCharacterInfo(ID);
        console.log(character);
        userList.innerHTML = "";
        const listItem = document.createElement("div");
        listItem.classList.add("userItem");
  
        const userText = document.createElement("p");
        userText.innerHTML = `<span><strong>Nome Completo: </strong></span>${character.fullName}<br></br>
                              <strong><span>Título:</span></strong> ${character.title} <br></br>
                              <strong><span>Família:</span></strong> ${character.family}<br></br>
                              <img src="https://thronesapi.com/assets/images/${character.image}" class ='img'>  `
  
        listItem.appendChild(userText);
        userList.appendChild(listItem);
      } catch (error) {
        userList.innerHTML = `<p>${error.message}</p>`;
      }
    });
  }
  
  create();

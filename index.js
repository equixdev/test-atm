// Тестовое задание:
// Javascript. Скрипт должен получать входные данные через html страницу. К реализации самой страницы никаких требований нет - можно делать на свое усмотрение.
// На странице необходимо иметь возможность настроить:
// количество кассет (от 1 до 8)
// номинал для каждой кассеты (100, 200, 500, 1000, 2000, 5000 руб)
// сколько купюр осталось (для каждой кассеты)
// статус кассеты (исправна/неисправна)
// На этой же странице необходимо предусмотреть возможность ввода произвольной суммы в рублях без копеек. Далее, по кнопке, необходимо вычислить можно ли выдать клиенту указанную сумму купюрами, находящимися в кассетах. Если да, вывести сколько купюр из какой кассеты потребуется. Также вывести время, которое потребовалось на вычисление в миллисекундах.

let possibleNominals = [100, 200, 500, 1000, 2000, 5000];

let cartridges = {
  0: {
    isWorking: false,
    nominal: 100,
    banknotesLeft: 100,
  },
  1: {
    isWorking: true,
    nominal: 100,
    banknotesLeft: 10,
  },
  2: {
    isWorking: true,
    nominal: 200,
    banknotesLeft: 5,
  },
  3: {
    isWorking: true,
    nominal: 500,
    banknotesLeft: 10,
  },
  4: {
    isWorking: true,
    nominal: 100,
    banknotesLeft: 10,
  },
  5: {
    isWorking: true,
    nominal: 1000,
    banknotesLeft: 10,
  },
  6: {
    isWorking: true,
    nominal: 2000,
    banknotesLeft: 1,
  },
};

const renderCartridges = () => {
  const list = document.querySelector(".cartridges");
  list.innerHTML = "";
  Object.entries(cartridges).map(([id, cartridge]) => {
    const cartridgeCard = document.createElement("div");
    cartridgeCard.classList.add("cartridge");
    cartridgeCard.append(`Кассета ${parseInt(id) + 1}`);

    const label = document.createElement("label");
    const isWorkingInput = document.createElement("input");
    isWorkingInput.type = "checkbox";
    isWorkingInput.checked = cartridge.isWorking;
    isWorkingInput.onclick = () => {
      cartridges[id].isWorking = !cartridges[id].isWorking;
      isWorkingInput.checked = cartridges[id].isWorking;
    };
    label.append(isWorkingInput, "исправна");
    cartridgeCard.append(label);

    cartridgeCard.append("Банкнот осталось");

    const banknotesInput = document.createElement("input");
    banknotesInput.value = cartridge.banknotesLeft;
    banknotesInput.onchange = (event) => {
      event.preventDefault();
      cartridges[id].banknotesLeft = parseInt(banknotesInput.value);
    };

    cartridgeCard.append(banknotesInput);
    cartridgeCard.append("Номиналом");

    const nominalInput = document.createElement("input");
    nominalInput.value = cartridge.nominal;
    nominalInput.onchange = (event) => {
      event.preventDefault();
      cartridges[id].nominal = parseInt(nominalInput.value);
    };

    cartridgeCard.append(nominalInput);

    list.append(cartridgeCard);
  });
};

renderCartridges();

const addCartridge = () => {
  const cartridgesLength = Object.keys(cartridges).length;

  if (cartridgesLength < 8) {
    cartridges[cartridgesLength] = {
      isWorking: true,
      nominal: 100,
      banknotesLeft: 1,
    };
    renderCartridges();
  }
};

const removeCartridge = () => {
  const cartridgesLength = Object.keys(cartridges).length;

  if (cartridgesLength > 1) {
    delete cartridges[cartridgesLength - 1];
    renderCartridges();
  }
};

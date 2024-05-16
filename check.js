const check = () => {
  let sum = document.getElementById("sumInput").value;

  if (!sum) return;

  console.time("check");

  const nominals = {};

  Object.entries(cartridges).map(([id, cartridge]) => {
    if (cartridge.isWorking) {
      if (nominals[cartridge.nominal]) {
        nominals[cartridge.nominal] += cartridge.banknotesLeft;
      } else {
        nominals[cartridge.nominal] = cartridge.banknotesLeft;
      }
    }
  });

  const entries = Object.entries(nominals).sort(
    (entry1, entry2) => entry2[0] - entry1[0]
  );

  const banknotesGiven = {};

  for (let i = 0; i < entries.length; i++) {
    const [nominal, banknotesLeft] = entries[i];
    banknotesGiven[nominal] = 0;
    for (let k = 0; k < banknotesLeft; k++) {
      if (sum >= nominal) {
        sum -= nominal;
        banknotesGiven[nominal]++;
      }
    }
  }

  console.timeEnd("check");

  if (sum > 0) {
    alert("Невозможно выдать");
  } else {
    alert(
      `Выдано ${Object.entries(banknotesGiven)
        .map(([nominal, banknotes]) =>
          banknotes ? `${banknotes} банкнот номиналом ${nominal}` : undefined
        )
        .filter(Boolean)
        .join(", ")}`
    );
  }
};

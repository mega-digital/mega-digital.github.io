$(document).ready(() => {
  $("#value").maskMoney({
    symbol: "R$ ",
    thousands: ".",
    decimal: ",",
    symbolStay: true,
  });

  let value = getUrlParameter("valor");
  if (!value) {
    value = "0,00";
  }
  $("#value").val("R$ " + value);

  let parcel = parseInt(getUrlParameter("parcelas"));
  if (!parcel || isNaN(parcel) || parcel < 0 || parcel > data.length + 1) {
    parcel = data.length - 1;
  }
  data.map((item, idx) =>
    $("#parcel").append(
      item.title,
      `<option value="${item.key}"${idx === parcel ? " selected" : ""}>${
        item.title
      }</option>`
    )
  );

  calcular();
});

const data = [
  { key: 0, title: "Débito", parcels: 1, percent: 2 },
  { key: 1, title: "1x", parcels: 1, percent: 3.82 },
  { key: 2, title: "2x", parcels: 2, percent: 4.33 },
  { key: 3, title: "3x", parcels: 3, percent: 4.77 },
  { key: 4, title: "4x", parcels: 4, percent: 5.2 },
  { key: 5, title: "5x", parcels: 5, percent: 5.7 },
  { key: 6, title: "6x", parcels: 6, percent: 6.5 },
  { key: 7, title: "7x", parcels: 7, percent: 6.7 },
  { key: 8, title: "8x", parcels: 8, percent: 7.8 },
  { key: 9, title: "9x", parcels: 9, percent: 8.31 },
  { key: 10, title: "10x", parcels: 10, percent: 8.8 },
  { key: 11, title: "11x", parcels: 11, percent: 9.4 },
  { key: 12, title: "12x", parcels: 12, percent: 10 },
];

const calcular = () => {
  let value = ("" + $("#value").val())
    .replaceAll("R$ ", "")
    .replaceAll(".", "")
    .replaceAll(",", ".");
  value = parseFloat(value);
  const parcels = data[$("#parcel").val()].parcels;
  const percent = data[$("#parcel").val()].percent;

  if (value < 0) {
    $("#value").val("R$ 0,00");
    value = 0;
  }

  let increment = (percent / 100) * value;
  let result = (value + increment) / (parcels || 1);

  if (isNaN(result)) {
    $("#value").val("R$ 0,00");
    $("#result").html("R$ 0,00");
  } else {
    list = result.toFixed(2).split(".");
    result = list[0]
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      .concat(",")
      .concat(list[1]);
    $("#result").html("R$ " + result);
  }
};

const getUrlParameter = (sParam) => {
  let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return typeof sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

const data = [
  { key: 0, title: "Débito", parcels: 1, percent: 2 },
  { key: 1, title: "1x", parcels: 1, percent: 4 },
  { key: 2, title: "2x", parcels: 2, percent: 5 },
  { key: 3, title: "3x", parcels: 3, percent: 5 },
  { key: 4, title: "4x", parcels: 4, percent: 6 },
  { key: 5, title: "5x", parcels: 5, percent: 6 },
  { key: 6, title: "6x", parcels: 6, percent: 7 },
  { key: 7, title: "7x", parcels: 7, percent: 7 },
  { key: 8, title: "8x", parcels: 8, percent: 8 },
  { key: 9, title: "9x", parcels: 9, percent: 8 },
  { key: 10, title: "10x", parcels: 10, percent: 9 },
  { key: 11, title: "11x", parcels: 11, percent: 9 },
  { key: 12, title: "12x", parcels: 12, percent: 10 },
];

const calcular = () => {
  let value = parseFloat($("#value").val());
  const parcels = data[$("#parcel").val()].parcels;
  const percent = data[$("#parcel").val()].percent;

  if (value < 0) {
    $("#value").val(0);
    value = 0;
  }

  let increment = (percent / 100) * value;
  let result = (value + increment) / (parcels || 1);

  $("#result").html(
    isNaN(result) ? "-" : "R$ " + result.toFixed(2).replace(".", ",")
  );
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

$(document).ready(() => {
  const value = getUrlParameter("preco") || 0;
  $("#value").val(value);

  const parcel = getUrlParameter("vezes") || data.length;
  data.map((item, idx) =>
    $("#parcel").append(
      item.title,
      `<option value="${item.key}"${idx + 1 === parcel ? " selected" : ""}>${
        item.title
      }</option>`
    )
  );

  calcular();
});

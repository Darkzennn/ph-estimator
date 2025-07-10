
document.getElementById("areaMethod").addEventListener("change", function () {
  const customAreaSection = document.getElementById("customAreas");
  const numFloors = parseInt(document.getElementById("numFloors").value);
  const floorInputs = document.getElementById("floorInputs");

  if (this.value === "custom" && numFloors) {
    customAreaSection.style.display = "block";
    floorInputs.innerHTML = "";

    for (let i = 1; i <= numFloors; i++) {
      const input = document.createElement("input");
      input.type = "number";
      input.name = `floor${i}`;
      input.placeholder = `Floor ${i} Area (sqm)`;
      input.required = true;
      floorInputs.appendChild(input);
    }
  } else {
    customAreaSection.style.display = "none";
    floorInputs.innerHTML = "";
  }
});

document.getElementById("numFloors").addEventListener("change", function () {
  document.getElementById("areaMethod").dispatchEvent(new Event("change"));
});

document.getElementById("finishType").addEventListener("change", function () {
  const finishDetails = document.getElementById("finishDetails");
  const type = this.value;

  let description = "";

  switch (type) {
    case "basic":
      description = "Basic: Painted CHB walls, G.I. sheet roofing, simple tiles and fixtures.";
      break;
    case "standard":
      description = "Standard: Painted CHB walls, long-span roofing, tiled floors, decent fixtures.";
      break;
    case "premium":
      description = "Premium: Drywall interiors, tiled exteriors, stylish roofing, premium finishes.";
      break;
    default:
      description = "";
  }

  finishDetails.innerText = description;
});

function calculateEstimate() {
  const lotArea = parseFloat(document.getElementById("lotArea").value);
  const numFloors = parseInt(document.getElementById("numFloors").value);
  const areaMethod = document.getElementById("areaMethod").value;
  const finishType = document.getElementById("finishType").value;
  const resultEl = document.getElementById("result");

  if (!lotArea || !numFloors || !finishType) {
    resultEl.innerText = "❗ Please fill out all fields.";
    return;
  }

  let totalFloorArea = 0;
  let rate = 0;

  if (areaMethod === "custom") {
    for (let i = 1; i <= numFloors; i++) {
      const val = document.querySelector(`[name="floor${i}"]`).value;
      totalFloorArea += parseFloat(val || 0);
    }
  } else {
    totalFloorArea = lotArea * 0.7 * numFloors;
  }

  switch (finishType) {
    case "basic":
      rate = 26000;
      break;
    case "standard":
      rate = 31000;
      break;
    case "premium":
      rate = 39000;
      break;
  }

  const estimate = totalFloorArea * rate;

  resultEl.innerText = `Estimated Cost: ₱${estimate.toLocaleString(undefined, {
    minimumFractionDigits: 0,
  })}`;
}

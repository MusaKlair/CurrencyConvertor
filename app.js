const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd/eur.json";

let dropdowns = document.querySelectorAll(".dropdown select");
let button = document.querySelector("#b1");
let fromCurr = document.querySelector("#From");
let toCurr = document.querySelector("#To");
let msg = document.querySelector(".msg");

for(let select of dropdowns)
{
    for(code in countryList)
    {
        //console.log(code, countryList[code]);
        let newOption = document.createElement("option");
        newOption.value = code;
        newOption.innerText = code;
        if(select.name === "from" && newOption.innerText === "USD")
        {
            newOption.selected = "selected";
        }

        if(select.name === "to" && newOption.innerText === "PKR")
        {
            newOption.selected = "selected";
        }
        select.append(newOption);
        
    }
    select.addEventListener("click", (e) => {
        updateFlag(e.target);
    })
}

const updateFlag = (Element) => {
    let currCode = Element.value;
    let countryCode = countryList[currCode];
    let newLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = Element.parentElement.querySelector("img");
    img.src = newLink;
};

button.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1)
    {
        amtValue = 1;
        amount.value = "1";
    }

    let fromCurrCode = fromCurr.value.toLowerCase();
    let toCurrCode = toCurr.value.toLowerCase();
    let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrCode}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let allRates = data[fromCurrCode];
    let rate = allRates[toCurrCode];

    let convertedAmt = rate * amtValue;
    let result = convertedAmt.toFixed(2);
    msg.innerText = `${amtValue} ${fromCurrCode.toUpperCase()} = ${result} ${toCurrCode.toUpperCase()}`;
    
});


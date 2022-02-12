const LightAndDarkMode = document.getElementsByClassName("LightAndDarkMode")[0];
const MenuBar = document.getElementsByClassName("MenuBar")[0];
const MenuTitle = document.getElementsByClassName("MenuTitle")[0];
LightAndDarkMode.addEventListener("click",() => {
    if (document.body.classList.contains("DarkMood")) {
        document.body.classList.remove("DarkMood");
        document.body.classList.add("lightMood")
        LightAndDarkMode.classList.remove("far", "fa-lightbulb");
        LightAndDarkMode.classList.add("fas", "fa-moon");
        LightAndDarkMode.textContent = "DarkMood";
        MenuBar.style.backgroundColor = "white";
        MenuTitle.style.color = "black";
        CountryModel.style.backgroundColor = "white";
        CountryModel.style.color = "black";
        countryModalName.style.backgroundColor = "white";
        countryModalName.style.color = "black";
        CountryModelRegion.style.backgroundColor = "white";
        CountryModelRegion.style.color = "black";
    }else{
        document.body.classList.remove("lightMood");
        LightAndDarkMode.classList.remove("fas", "fa-moon");
        document.body.classList.add("DarkMood");
        LightAndDarkMode.classList.remove("far","fa-moon");
        LightAndDarkMode.classList.add("far", "fa-lightbulb");
        LightAndDarkMode.textContent = "LightMood";
        MenuBar.style.backgroundColor = "black";
        MenuTitle.style.color = "white";
        CountryModel.style.backgroundColor = "black";
        CountryModel.style.color = "white";
        countryModalName.style.backgroundColor = "black";
        countryModalName.style.color = "white";
        CountryModelRegion.style.backgroundColor = "black";
        CountryModelRegion.style.color = "black";
    }
})

const url = "https://restcountries.com/v3.1/all";

fetch(url);
let jsoneData = [];
const AllCountryBodyTag = document.getElementsByClassName("AllCountryBody")[0];


const CountryUrl = async () => {
    let respontData = await fetch(url);
    console.log(respontData);
    jsoneData = await respontData.json();
    console.log(jsoneData);
    Building();
    jsoneData.forEach(element => {
        AllCountryShow(element);
    });
}
CountryUrl().catch((error) =>{
    console.log(error)
})
const FilderContainerTag = document.getElementsByClassName("FilderContainer")[0];
const Building = () => {
    autoCompleteInputeTag.style.display = "block";
    FilderContainerTag.style.display = "flex";
}
const AllCountryShow = (country) =>{
    const OneCountry = document.createElement("div");
    OneCountry.classList.add("OneCountry");
    OneCountry.innerHTML = `<div class="countryImgDiv">
    <img src="${country.flags.png}" class="CountryImg">
    </div>
                <div class="CountryInformation">
                    <div class="CountryName">${country.name.common}</div>
                    <div class="Population">Population 
                        <Span>${country.population}</Span>
                    </div>
                    <div>Ragion 
                        <Span class="Region">${country.region}</Span>
                    </div>
                    <div class="Capital">Capital 
                        <Span>${country.capital}</Span>
                    </div>
                </div>
    `
    AllCountryBodyTag.append(OneCountry)
    OneCountry.addEventListener("click",() => {
        autoCompleteInputeTag.disabled = true;
        OneCountryDisplay(country);
        OnceCountryRegion(country);
        OnceCountryRegionName(country);
    })
}
const FilderFunction = (Country) => {
    AllCountryBodyTag.innerHTML="";
    for (let i = 0; i < Country.length; i++) {
        const FilderCountry = document.createElement("div");
        FilderCountry.classList.add("OneCountry");
        FilderCountry.id = i;
        FilderCountry.innerHTML = `<div class="countryImgDiv">
        <img src="${Country[i].flags.png}" class="CountryImg">
        </div>
                    <div class="CountryInformation">
                        <div class="CountryName">${Country[i].name.common}</div>
                        <div class="Population">Population 
                            <Span>${Country[i].population}</Span>
                        </div>
                        <div>Ragion 
                            <Span class="Region">${Country[i].region}</Span>
                        </div>
                        <div class="Capital">Capital 
                            <Span>${Country[i].capital}</Span>
                        </div>
                    </div>
        `
        AllCountryBodyTag.append(FilderCountry);     
    } 
}


const autoCompleteInputeTag = document.getElementsByClassName("autoCompleteInpute")[0];
let countryFilder = [];
autoCompleteInputeTag.addEventListener("keyup",(event) =>{
    // CountryModel.innerHTML="";
    // countryModalName.innerHTML = "";
    // CountryModelRegion.innerHTML ="";
    const searchText = event.target.value.toLowerCase();

    countryFilder = jsoneData.filter((CountryName) =>{
        return CountryName.name.common.toLowerCase().includes(searchText);
    })
    const hasCountryToShow = countryFilder.length > 0;

    if (hasCountryToShow === true) {
        FilderFunction(countryFilder);
        const FilderCountry = document.querySelectorAll(".OneCountry");
            FilderCountry.forEach(element => {
                element.addEventListener("click",() => {
                    autoCompleteInputeTag.disabled = true ;
                    const RegionId = element.id;
                    OneCountryDisplay(countryFilder[RegionId]);
                    OnceCountryRegion(countryFilder[RegionId]);
                    OnceCountryRegionName(countryFilder[RegionId]);
                }) 
        });
    }
})

const FilderDownArrowTag = document.getElementsByClassName("FilderDownArrow")[0];
const FilderRegions = document.getElementsByClassName("FilderRegions")[0];

FilderDownArrowTag.addEventListener("click",() =>{
    if (FilderRegions.classList.contains("FilderRegionsOpen")) {
        FilderRegions.style.display= "none";
        FilderRegions.classList.remove("FilderRegionsOpen");
    }else{
        FilderRegions.style.display = "block";
        FilderRegions.classList.add("FilderRegionsOpen");
    }
})
let Region = [];
const FilderRegionTag = document.querySelectorAll(".Regions");
let i =0 ; 
let FilderRegion = [];

FilderRegionTag.forEach(element => {
    element.addEventListener("click",() => {
        const FilderRegionTagText = element.innerHTML;
        if (FilderRegionTagText === "All"){
        FilderFunction(jsoneData);
        const FilderCountry = document.querySelectorAll(".OneCountry");
            FilderCountry.forEach(element => {
                element.addEventListener("click",() => {
                    const RegionId = element.id;
                    autoCompleteInputeTag.innerHTML = "";
                    autoCompleteInputeTag.disabled = true;
                    OneCountryDisplay(jsoneData[RegionId]);
                    OnceCountryRegion(jsoneData[RegionId]);
                        OnceCountryRegionName(jsoneData[RegionId]);
                }) 
        });
            
        }else{
            FilderRegion = jsoneData.filter((RegionName) =>{
                return RegionName.region.includes(FilderRegionTagText);
            })
    
            const hasCountryToShow = FilderRegion.length > 0;
    
            if(hasCountryToShow === true){
                FilderFunction(FilderRegion);
                const FilderCountry = document.querySelectorAll(".OneCountry");
                FilderCountry.forEach((element) => {
                    element.addEventListener("click",() => {
                        const RegionId = element.id;
                        autoCompleteInputeTag.disabled = true;
                        OneCountryDisplay(FilderRegion[RegionId]);
                        OnceCountryRegion(FilderRegion[RegionId]);
                        OnceCountryRegionName(FilderRegion[RegionId]);
                    })
                })
            }            
        }
    })
})
const CountryModel = document.getElementsByClassName("CountryModal")[0];

const OneCountryDisplay = (country) => {
    CountryModelRegion.style.display = "flex";
    AllCountryBodyTag.style.display = "none";
    const OneCountry = document.createElement("div");
    OneCountry.classList.add("OneCountryData")
    OneCountry.innerHTML = `
    <div class="leftContainer">
    <div class="BackButtom"><-- Back</div>
    <div class="leftImage">
        <img class="CountryImg" src="${country.flags.png}" alt="">
    </div>
</div>
<div class="rightContainer">
    <div class="rightLF">
        <div class="CountryNameData">${country.name.common}</div>
        <div>NatuveName<span class="CountryData">${country.name.common}</span></div>
        <div>Population<span class="CountryData">${country.population}</span></div>
        <div>Region<span class="CountryData">${country.region}</span></div>
        <div>Sub Region<span class="CountryData">${country.subregion}</span></div>
    </div>
    <div class="rightRT">
        <div>Capital<span class="CountryData">${country.capital}</span></div>
        <div>Top Level Domain<span class="CountryData">${country.tld}</span></div>
        <div>Timezone<span class="CountryData">${country.timezones[0]}</span></div>
    </div>
</div>
    `
    // <div>Currencies<span class="CountryData">${country.currencies.name}</span></div>
    // <div>Languages<span class="CountryData">${country[languages]}</span></div>

    

    CountryModel.append(OneCountry);
    BackButtomFunction();
}
const countryModalName = document.getElementsByClassName("countryModalName")[0];
let FilderMobleRegion = [];


const CountryModelRegion = document.getElementsByClassName("CountryModelRegion")[0];
const OnceCountryRegion = (region) => {
    const FilderRegionTagText = region.region;
    CountryModelRegion.style.display = "flex";
        FilderMobleRegion = jsoneData.filter((RegionName) =>{
            return RegionName.region.includes(FilderRegionTagText);
        })

        const hasCountryToShow = FilderMobleRegion.length > 0;
        if(hasCountryToShow === true){
           for (let i = 0; i < FilderMobleRegion.length; i++) {
        const FilderCountry = document.createElement("div");
        FilderCountry.classList.add("OurCountry");
        FilderCountry.id = i;
        FilderCountry.innerHTML = `<div class="countryImgDiv">
        <img src="${FilderMobleRegion[i].flags.png}" class="CountryImg">
        </div>
                    <div class="CountryInformation">
                        <div class="CountryName">${FilderMobleRegion[i].name.common}</div>
                        <div class="Population">Population 
                            <Span>${FilderMobleRegion[i].population}</Span>
                        </div>
                        <div>Ragion 
                            <Span class="Region">${FilderMobleRegion[i].region}</Span>
                        </div>
                        <div class="Capital">Capital 
                            <Span>${FilderMobleRegion[i].capital}</Span>
                        </div>
                    </div>
        `
        
        CountryModelRegion.append(FilderCountry);
        }
        const FilderCountry = document.querySelectorAll(".OurCountry");
        FilderCountry.forEach((element) => {
            element.addEventListener("click",() => {
                CountryModel.innerHTML = "";
               const FilderCountryId = element.id;
               const OneCountry = document.createElement("div");
               OneCountry.classList.add("OneCountryData")
               OneCountry.innerHTML = `
            <div class="leftContainer">
            <div class="BackButtom"><-- Back</div>
            <div class="leftImage">
                <img class="CountryImg" src="${FilderMobleRegion[FilderCountryId].flags.png}" alt="">
            </div>
        </div>
        <div class="rightContainer">
            <div class="rightLF">
                <div class="CountryNameData">${FilderMobleRegion[FilderCountryId].name.common}</div>
                <div>NatuveName<span class="CountryData">${FilderMobleRegion[FilderCountryId].name.common}</span></div>
                <div>Population<span class="CountryData">${FilderMobleRegion[FilderCountryId].population}</span></div>
                <div>Region<span class="CountryData">${FilderMobleRegion[FilderCountryId].region}</span></div>
                <div>Sub Region<span class="CountryData">${FilderMobleRegion[FilderCountryId].subregion}</span></div>
            </div>
            <div class="rightRT">
                <div>Capital<span class="CountryData">${FilderMobleRegion[FilderCountryId].capital}</span></div>
                <div>Top Level Domain<span class="CountryData">${FilderMobleRegion[FilderCountryId].tld}</span></div>
                <div>Timezone<span class="CountryData">${FilderMobleRegion[FilderCountryId].timezones[0]}</span></div>
            </div>
        </div>
            `
            CountryModel.append(OneCountry);
            BackButtomFunction();
        })
    })
}
}
let filterRegionName = [];

const  OnceCountryRegionName = (region) => {
        const CountryModelRegionName = document.createElement("div");
        CountryModelRegionName.append(region.region," Countries In the World ",`(${FilderMobleRegion.length} Countries)`);
        countryModalName.append(CountryModelRegionName);
}


const BackButtomFunction = () => {
    const BackButtom = document.getElementsByClassName("BackButtom")[0];
            BackButtom.addEventListener("click",() => {
            autoCompleteInputeTag.disabled = false ;
            CountryModelRegion.style.display = "none";
            AllCountryBodyTag.style.display = "flex";
            CountryModel.innerHTML = "";
            countryModalName.innerHTML = "";
            CountryModelRegion.innerHTML = "";
            })
}
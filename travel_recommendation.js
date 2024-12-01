const RECOMMEDDATION_API =
  "/travel_recommendation_api.json";

let travleDetails = {};

/** available keyWords for filtering */
const keyWordMapping = {
  beach: "beaches",
  beaches: "beaches",
  temple: "temples",
  temples: "temples",
  country: "countries",
  countries: "countries",
};

const availablePages = {
  HOME: "home",
  ABOUTUS: "aboutus",
  CONTACTUS: "contactus",
};

/** get initial tarvel details */
const getTravelDetails = async () => {
  try {
    const response = await fetch(RECOMMEDDATION_API);
    if (response) {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const details = (await response?.json()) || {};
      travleDetails = { ...details };
    }
  } catch (e) {
    console.error(e);
  }
};

// init
getTravelDetails();

/** filter travel details */
const filterTravelDetails = (filterQuery) => {
  const { name: filterName } = filterQuery || {};
  const keyWordSearch = keyWordMapping[filterName.trim()?.toLowerCase()];

  const name = keyWordSearch || filterName;
  if (name) {
    if(travleDetails[name]){
        return travleDetails[name]
    }
    return Object.values(travleDetails)
      .flat()
      .reduce((acc, details) => {
        const trimmedName = name.trim().toLowerCase();
        if (details?.name?.toLowerCase() === trimmedName) {
            const values = details['cities'] ? details['cities'] : [details]
          acc.push(...values);
        }

        const cities = details['cities'];
        if (cities?.length > 0) {
          const validCity = cities.find(
            (city) => city?.name?.toLowerCase() === trimmedName
          );
          if (validCity) {
            acc.push(validCity);
          }
        }
        return acc;
      }, []);
  }

  return [];
};

const filterContentRenderer = (details) => {
  const filterResponse = filterTravelDetails(details);
  const result = document.getElementById("result");
  const path = window.location.pathname.includes('travelRecommendation') ? 'travelRecommendation/': ''
  if (filterResponse.length && result) {
    const template = `<div class='response'>
        <div class='imageContainer'>
        <img src="${path}assets/{{image}}" alt={{name}}>
        </div>
        <div class='textContainer'>
            <h4>{{name}}</h4>
            <span>{{description}}</span>
        </div>
    </div>`

    let updatedResponse = ''
    filterResponse.forEach((detail) => {
        const { name , description , imageUrl} = detail || {}
        let localTemp = template
        localTemp = localTemp.replace('{{image}}',imageUrl)
        localTemp = localTemp.replaceAll('{{name}}',name)
        localTemp =localTemp.replaceAll('{{description}}',description)
        updatedResponse+=localTemp
    })

    result.innerHTML = updatedResponse
  } else {
    if(!result)
    //re-direct to home page
    document.getElementById("logo").click();

    result.innerHTML = 'Result not found'
  }
};

const injectSearchListener = () => {
  document.getElementById("search_btn").addEventListener("click", async () => {
    const text = document.getElementById("search").value;
   await filterContentRenderer({ name: text });
  });

  document.getElementById("clear_btn").addEventListener("click", () => {
    document.getElementById("search").value = "";
    const result = document.getElementById("result");
    result.innerHTML = ''
  });
};

injectSearchListener();

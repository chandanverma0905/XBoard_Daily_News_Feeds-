// getID will create a new unique ID
// If I do Math.random(), we will get numbers which are less than 1 and greater than 0.
//Then We will convert it to string
// Math.random().toString(), so here inside toString(), we can give the value where, 2>= value <=36
//Math.random().toString(3);  Console o/p:-> '0.210121101220102022102021222021021'  (random number everytime)    
// So, whenever we want to find substring inside toString, we can give substr(), which will have value where  2>= value <=36 
// Math.random().toString().substr(2,3);   Console o/p:--> '037' (random number everytime)

//Math.random().toString(10).substr(2,4)  Console o/p:--> '4645'  (random number everytime)


const getId = () => Math.random().toString(36).substr(2,9); 

const getAccordionItem = (title, id) => {
   
   return `
  <div class="accordion-item" id="card${id}">
    <h2 class="accordion-header" id="heading${id}">
     <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
       ${title}
     </button>
    </h2>
  <div id="collapse${id}" class="accordion-collapse collapse" data-bs-parent="#accordionExample${id}">
     <div class="accordion-body">
            
     </div>
   </div>
 </div>`;
};

const getCarouselOuter = (id, innerId) =>{
 
  return `
        <div id="carouselExample${id}" class="carousel slide"  data-bs-ride="carousel">
          <div class="carousel-inner" id="${innerId}">
          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample${id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true" style="background-color:black"></span>
          <span class="visually-hidden">Previous</span>
          </button>
          
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample${id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true" style="background-color:black"></span>
          <span class="visually-hidden">Next</span>
          </button>

        </div>
         `;

}

const getCarouselItem = (id, active) =>{

  
  return `
           <div class="carousel-item ${active ? "active" : ""}" id="${id}">
                   
           </div>
         `;
}

let getCard = (item) => {
            
    return `
        <div class="card d-block">
          <img class="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}" alt="Card image cap">
           <div class="card-body">
             <h5 class="card-title">${item.title}</h5>
             <h6 class="card-subtitle mb-2 text-muted">${item.author}</h6>
             <p class="card-subtitle text-secondary">${item["pubDate"]}</p>
             <p class="card-text">${item["description"]}</p>
             <a href="${item["link"]}" class="stretched-link" target="_blank"></a>
            </div>
        </div>  
           `;
};

 
// Now we will be creating our main loop which will loop upon all the elements as rss links inside magazines array


 const addContent = async() => {
    
  for(let i=0; i<magazines.length; i++)
  {
     let url = magazines[i];
    //  console.log("seeUrls" ,url);  // by calling the function we can see the urls on console

     // const response = await fetch(url); // but if we fetch it like this we will only get XML format file, as we want JSON format. So we have to get JSON from these links. So, there are possiblities to convert XML to JSON by creating a function that will convert XML to JSON, 2nd possibility is we get the function from somewhere  and 3rd possiblity is that we have an API to which we will give it url that will convert it to JSON.
     // We copy one link from magazines array and pass that link of XML to rss2json.com
     // rss link (XML file) =    https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss
     
     // RSS (Really Simple Syndication) 
     // Read more on RSS :-->   https://en.wikipedia.org/wiki/RSS


     // Now when we pass this rss link (XML file) to api of 
     // https://api.rss2json.com/v1/api.json?rss_url=${url}
     //where ${url} is the  rss link (xml file). We input that rss link inside that and we will get our JSON data format.
     // For Ex: --> Check this link where api converts XML to JSON
     //  https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fflipboard.com%2F%40thenewsdesk%2Fthe-latest-on-coronavirus-covid-19-t82no8kmz.rss

     const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`);

     // we can also use encodeURI with url 
     // const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`);
        
     // For Example if we take a string inside encodeURI "Chandan Verma" ,,,, encodeURI("Chandan Verma"), 
     // Console o/p :--> 'Chandan%20Verma'
        
     // Similarly,, encodeURI("Phillipines")--> console o/p :-->  'Phillipines'
     // So, for spaces it will convert that strings to % format or basically URL like format
     
     const data = await response.json();
    //  console.log("data", data);
     
// First getId will call Math.random() which will be random number which will come between 0 to 1. Then we are doing .toString(36) which means that (0 to 9) + (a to z) are used for conversion.
//Math.random().toString(36)
//console o/p:-->  '0.sjnfkdoq9gj'   (any random output)
//So here we have to take 2nd character or digit from left and take 9 digits. For that we use substr(2,9)
// Math.random().toString(36).substr(2,9)
// console o/p:--> 'jt71rc61p'      (any random output)
// 


     // add accordion item
     const accordionItemId = getId(); 
     console.log(data.feed.title)
     const accordionItem = getAccordionItem(data.feed.title, accordionItemId);
     document.getElementById("accordianId").innerHTML += accordionItem;
      
     
     // Now first accordion should open by default when we open the webpage and for that we have to first get the collapse button id from accordion or getAccordionItem() function which is collapse${id}.

     // open first accordion item by default
     if(i==0)
     {
     document.getElementById(`collapse${accordionItemId}`).classList.add("show");
     }
      
     // create carousel
     const carouselId = getId();
     const carouselInnerId = getId();

     const carousel = getCarouselOuter(carouselId, carouselInnerId);

     // Every carousel will be inside an accordian. So we get the id of accordian when it gets collapse
     document.getElementById(`collapse${accordionItemId}`).innerHTML = carousel;
     
     // add the cards in the carousel
     const imagesItems = data["items"]; 
     console.log(data.items) // save the items we want, the data

//  for/in - loops through the properties of an object
// for/of - loops through the values of an iterable object
     for(itemIdx in imagesItems)
     { 
        // // create the card
        // const card = getCard(imagesItems[itemIdx]);       
        // console.log("card of Accordian", card); 
         
        
        // create carousel item
        const carouselItemId = getId();
        const carouselItem = getCarouselItem(carouselItemId, itemIdx == 0);
        
        // Place carouselItem inside carousel
        document.getElementById(`${carouselInnerId}`).innerHTML += carouselItem; // document.getElementById(carouselInnerId) does not have "" inside brackets 
        
        // Now create the card  
        const card = getCard(imagesItems[itemIdx]);
        // console.log("card of Accordion", card);
        document.getElementById(`${carouselItemId}`).innerHTML += card;
     }
    
 }      
}

  addContent();

//  ---------------------------------------------------------------------------------------


//Model
    //store cat names, pictures, and #clicks in array of objects

    var model = {
        currentCat: null,
        //set adminViewDisplay to 'off'
        adminViewDisplay: false,
        cats: [
            {
                clickCount: 0,
                name: 'Dinky',
                imgSrc: 'img/dinky.png',
                imgAttribution: 'https://www.flickr.com/photos.jpg'
            },
            {
                clickCount: 0,
                name: 'Beebop',
                imgSrc: 'img/beebop.png',
                imgAttribution: 'https://www.flickr.com/photos.jpg'
            },
            {
                clickCount: 0,
                name: 'Scooter',
                imgSrc: 'img/scooter.png',
                imgAttribution: 'https://www.flickr.com/photos.jpg'
            },
            {
                clickCount: 0,
                name: 'Slim',
                imgSrc: 'img/slim.png',
                imgAttribution: 'https://www.flickr.com/photos.jpg'
            },
            {
                clickCount: 0,
                name: 'Francesca',
                imgSrc: 'img/francesca.png',
                imgAttribution: 'https://www.flickr.com/photos.jpg'
            }
        ]

    };



//Controller
    //look at which cat was clicked (from view), reference the model, and then tell view to render the right one
    //send clicks data from the view to the model, and tell it to increment the appropriate count
    //tell view to display the right picture and info for regular and admin modes
    //control admin view show/hide functionality
    //send admin info to model and tell view to re-render


    var controller = {

            init: function() {
                // set the current cat to the first one in the list
                model.currentCat = model.cats[0];

                // tell our views to initialize
                catListView.init();
                catView.init();
                //adminView hidden until admin button clicked
                adminView.init();
                adminView.hide();
            },

            getCurrentCat: function() {
                return model.currentCat;
            },

            getCats: function() {
                return model.cats;
            },

            // set the currently-selected cat to the object passed in
            setCurrentCat: function(cat) {
                model.currentCat = cat;
            },

            // increments the counter for the currently-selected cat
            incrementCounter: function() {
                model.currentCat.clickCount++;
                catView.render();
                adminView.render();
            },

            // On admin button click - admin view show/hide function
            adminViewToggle: function() {
                if(model.adminViewDisplay === false) {
                    model.adminViewDisplay = true;
                    adminView.show();
                }
                else if (model.adminViewDisplay === true) {
                    model.adminViewDisplay = false;
                    adminView.hide();
                }
            },


            //saves info typed into admin form to model, and hides admin view
            adminSave: function() {
                    // update the model with values from the admin view
                model.currentCat.name = adminName.value;
                model.currentCat.imgSrc = adminUrl.value;
                model.currentCat.clickCount = adminClickNumber.value;
                catView.render();
                catListView.render();
                adminView.hide();
            },


            // On Cancel button click - admin view closes
            adminCancel: function() {
                adminView.hide();
            }

        };



//View



    //Part 1 - Cat Display
    //display the cat that was clicked on, its name, and clicks info


var catView = {

    init: function() {
        //store pointers to DOM elements
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('catName');
        this.catImageElem = document.getElementById('catImage');
        this.countElem = document.getElementById('catCount');


        //increment current cat's counter on click
        this.catImageElem.addEventListener('click', function(){
            controller.incrementCounter();
        });

        //update the DOM elements with the right values
        this.render();
    },

    render: function() {
            // update the DOM elements with values from the current cat
            var currentCat = controller.getCurrentCat();
            this.countElem.textContent = currentCat.clickCount;
            this.catNameElem.textContent = currentCat.name;
            this.catImageElem.src = currentCat.imgSrc;
    }

};


    //Part 2 - List of clickable cats
    var catListView = {

        init: function() {

            //store the DOM elements for later access
            this.catListElem = document.getElementById('cat-list');
            //update the DOM elements with the right values
            this.render();
        },

        render: function () {
            var cat, elem, i;
            //get cats to be rendered by controller
            var cats = controller.getCats();

            //empty cat list
            this.catListElem.innerHTML = '';

            //loop over the cats
            for (i = 0; i < cats.length; i++) {
                //current cat looping over
                cat = cats[i];

                //make a new cat list and set its text
                elem = document.createElement('li');
                elem.textContent = cat.name;

                //on click setCurrentCat and render the catView
                //example of closure in a loop - to connect value of cat variable to the click event function
                elem.addEventListener('click', (function (catCopy) {
                    return function() {
                        controller.setCurrentCat(catCopy);
                        catView.render();
                    };
                })(cat));

                //add element to the list
                this.catListElem.appendChild(elem);
            }
        }

    };

    //Part 3 - Admin View
    var adminView = {


        init: function() {
            //store pointers to DOM elements
            this.adminName = document.getElementById("adminName");
            this.adminUrl = document.getElementById("adminUrl");
            this.adminClickNumber = document.getElementById("adminClickNumber");

            //admin mode div
            var adminMode = document.getElementById("adminMode");

            this.adminButton = document.getElementById('admin');
            this.cancelButton = document.getElementById('cancel');
            this.saveButton = document.getElementById('save');

            //show/hide admin view when button clicked
            this.adminButton.addEventListener('click', function() {
                controller.adminViewToggle();
            });

            //hide admin view when cancel button clicked
            this.cancelButton.addEventListener('click', function() {
                controller.adminCancel();
            });

            this.saveButton.addEventListener('click', function() {
                controller.adminSave();
            });

            this.render();
        },

        render: function() {
            var currentCat = controller.getCurrentCat();
            // update the DOM elements with values from the current cat
            this.adminName.value = currentCat.name;
            this.adminUrl.value = currentCat.imgSrc;
            this.adminClickNumber.value = currentCat.clickCount;
        },

        show: function() {
            adminMode.style.display = 'block';
        },

        hide: function() {
            adminMode.style.display = 'none';
        }

    };


    controller.init();





AFRAME.registerComponent("tour", {

      schema : {
        state  :{type : "string", default : "places-list"},
        selectedCard : {type : "string",default : "#card1"}
      },
      init: function () {
        this.placesContainer = this.el;
        this.createCards();
      },
      tick : function(){
        const {state} = this.el.getAttribute("tour")
        if(state=="view"){
          this.hideE1([this.placesContainer])
          this.showView()
        }},

    createCards: function () {

        const thumbNailsRef = [
            {
                id: "garden",
                title: "Garden",
                url: "./assets/thumbnail/garden.jpg",
            },
            {
                id: "room",
                title: "Room",
                url: "./assets/thumbnail/room.jpg",
            },

            {
                id: "room2",
                title: "Room 2",
                url: "./assets/thumbnail/room2.jpg",
            },

        ];

        let prevoiusXPosition = -50;

        for (var item of thumbNailsRef) {
            const posX = prevoiusXPosition + 21;
            const posY = 10;
            const posZ = -30;
            const position = { x: posX, y: posY, z: posZ };
            prevoiusXPosition = posX;

            // Border Element
            const borderEl = this.createBorder(position, item.id)

            // Thumbnail Element
            const thumbnail = this.createThumbnail(item)
            borderEl.appendChild(thumbnail)

            // Title Text Element
            const textElement = this.createTitle(item, position)
            borderEl.appendChild(textElement)


            this.placesContainer.appendChild(borderEl);


        }



    },
    createBorder: function (position, id) {

        const element = document.createElement("a-entity")
        element.setAttribute("id", id)
        element.setAttribute("geometry", {
            primitive: "ring",
            radiusInner: 5,
            radiusOuter: 5.3,
        })
        element.setAttribute("material", { color: "white", opacity: 1 })
        element.setAttribute("visible", true)
        element.setAttribute("position", position)

        element.setAttribute("cursor-listener",{})
        
        return element
    },

    createThumbnail: function (item) {
        const element1 = document.createElement("a-entity")
        element1.setAttribute("visible", true)
        element1.setAttribute("material", {
            src: item.url,
        })
        element1.setAttribute("geometry", {
            primitive: "circle",
            radius: 5
        })

        return element1
    },

    createTitle: function (item, position) {
        const element2 = document.createElement("a-entity")
        element2.setAttribute("text", {
            font: "exo2bold",
            align: "center",
            color: "white",
            width: 70,
            value: item.title
        })

        const elPos = position
        elPos.y = -7
        element2.setAttribute("position", elPos)
        element2.setAttribute("visible", true)

        return element2

    },

    hideE1 : function(st){
        st.map(el=>{
          el.setAttribute("visible",false)     
    
        })
      },
      showView : function(){
        const {selectedCard} = this.data
        const entity = document.querySelector("#main-container")
        entity.setAttribute("material",{
          src : `./assets/${selectedCard}.jpg`,
          color : "white"
        })
    
      }
})
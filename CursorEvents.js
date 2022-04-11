AFRAME.registerComponent("cursor-listener", {
    schema: {
        selectedItemId: { type: "string", default: "" }
    },
    init: function () {
        this.handleEventListener()
        this.handleMouseLeaves()
        this.handleClickEvents()
    },

    handleEventListener: function () {
        this.el.addEventListener("mouseenter", () => {
            this.handleBorderColor()
        })
    },
    handleBorderColor: function () {
        const id = this.el.getAttribute("id")
        const places = ["room", "room2", "garden"]
        if (places.includes(id)) {
            const placesContainer = document.querySelector("#places-container")
            placesContainer.setAttribute("cursor-listener", {
                selectedItemId: id

            })
            this.el.setAttribute("material", { color: "blue", opacity: 1 })

        }
    },

    handleMouseLeaves: function () {
        this.el.addEventListener("mouseleave", () => {
            const { selectedItemId } = this.data
            if (selectedItemId) {
                const placesContainer = document.querySelector(`#${selectedItemId}`)

                const id = placesContainer.getAttribute("id")
                if (id == selectedItemId) {
                    placesContainer.setAttribute("material", { color: "white", opacity: 1 })
                }



            }
        })
    },

    handleClickEvents: function () {
        this.el.addEventListener("click", evt => {
    
          const placesContainer = document.querySelector("#places-container")
          const { state } = placesContainer.getAttribute("tour")
    
          if (state == "places-list") {
            const id = this.el.getAttribute("id")
            const placesId = ["garden", "room", "room2"];
    
            if (placesId.includes(id)) {
              placesContainer.setAttribute("tour", {
               state : "view",
               selectedCard : id
             }); 
            }
          }
           
          
        })
      },
    
})
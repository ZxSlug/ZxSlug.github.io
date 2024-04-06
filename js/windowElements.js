class twmSlider extends HTMLElement {
    static observedAttributes = ["min", "max", "step", "button-step", "default", "getvalue", "onmodify", "value"];

    constructor() {
        super();
        this.min = this.hasAttribute("min")? parseFloat(this.getAttribute("min")) : 0;
        this.max = this.hasAttribute("max")? parseFloat(this.getAttribute("max")) : 100;
        this.step = this.hasAttribute("step")? parseFloat(this.getAttribute("step")) : 1;
        this.buttonStep = this.hasAttribute("button-step")? parseFloat(this.getAttribute("button-step")) : this.step;
        this.default = this.hasAttribute("default")? parseFloat(this.getAttribute("default")) : this.max;
        this.getValue = this.hasAttribute("getvalue")? this.getAttribute("getvalue") : undefined;
        this.onModify = this.hasAttribute("onmodify")? this.getAttribute("onmodify") : undefined;
        this.callbackConnected = false;
    }

    connectedCallback() {
        this.value = this.getValue? eval(this.getValue) : this.default;

        const percentage = (this.value-this.min)/(this.max-this.min)*100; 

        const innerLabel = this.innerHTML;
        this.innerHTML = null;

        if(innerLabel !== undefined) {
            this.textLabel = document.createElement("span");
            this.textLabel.classList.add("slider-label");
            
            const modifiedInnerHTML = innerLabel.toString().replace("$1", `<span class="slider-value">${this.value}</span>`);
            this.textLabel.innerHTML = modifiedInnerHTML;

            if (innerLabel.includes("$1")) this.labelled = true;

            this.prepend(this.textLabel);
        }
        
        const sliderBase = document.createElement("div");
        sliderBase.classList.add("slider-base");
        sliderBase.onmousedown = this.sliderDown;
        sliderBase.ontouchstart = this.sliderDown;

        const leftScrollButton = document.createElement("img");
        leftScrollButton.classList.add("hoverable", "slider-scroll-left");
        leftScrollButton.src = "./svg/ui/scroll_left.svg";
        leftScrollButton.setAttribute("onload", "SVGInject(this);");
        sliderBase.append(leftScrollButton);

        const sliderBarParent = document.createElement(`div`);
        sliderBarParent.classList.add("slider-bar-parent");

        const sliderBar = document.createElement("div");
        sliderBar.classList.add("slider-bar");

        this.progress = document.createElement("span");
        this.progress.classList.add("slider-bar-progress");
        this.progress.style.width = `${percentage}%`;
        sliderBar.append(this.progress);

        const sliderBarThumb = document.createElement("img");
        sliderBarThumb.classList.add("grabbable", "slider-bar-thumb");
        sliderBarThumb.src="./svg/ui/slider_indicator.svg";
        sliderBarThumb.setAttribute("onload", "SVGInject(this);");
        sliderBarThumb.style.left = `${percentage}%`;
        sliderBar.append(sliderBarThumb);
        
        sliderBarParent.append(sliderBar)
        sliderBase.append(sliderBarParent);

        const rightScrollButton = document.createElement("img");
        rightScrollButton.classList.add("hoverable", "slider-scroll-right");
        rightScrollButton.src="./svg/ui/scroll_right.svg";
        rightScrollButton.setAttribute("onload", "SVGInject(this);");
        sliderBase.append(rightScrollButton);

        this.append(sliderBase);

        $(this).on("click", ".slider-scroll-left, .slider-scroll-right", this.sliderScrollPress);
        this.callbackConnected = true;
    }

    disconnectedCallback() {
        this.querySelector(".slider-base").onmousedown = null;
        this.querySelector(".slider-base").ontouchstart = null;

        $(this).off("click", ".slider-scroll-left, .slider-scroll-right", this.sliderScrollPress);
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.callbackConnected) return;
        switch (name) {
            case "value":
                this.updateValue(parseFloat(newValue));
                this.updatePercentage();
                break;
            case "min": {
                this.min = newValue;
                this.updatePercentage();
                break;
            }
            case "max": {
                this.max = newValue;
                this.updatePercentage();
                break;
            }
        }
    }

    async updatePercentage() {
        const percentage = (this.value-this.min)/(this.max-this.min)*100;
        this.updateSliderGraphics(percentage);
        this.updateValue(this.value);
    }

    async updateSliderGraphics(percentage) {
        if (!this.thumb) this.thumb = this.querySelector(".slider-bar-thumb")

        this.progress.style.width = `${percentage}%`;
        this.thumb.style.left = `${percentage}%`;
    }

    async updateValue(value) {
        if (this.labelled) this.textLabel.querySelector(".slider-value").innerHTML = value;
        this.value = value;
        if (this.onModify) eval(this.onModify);
    }

    async sliderDown(eventObject) {
        if (eventObject.target.classList.contains(".slider-scroll-left") || eventObject.target.closest(".slider-scroll-left") != undefined) return;
        if (eventObject.target.classList.contains(".slider-scroll-right") || eventObject.target.closest(".slider-scroll-right") != undefined) return;

        var slider = this.closest("twm-slider");
        slider.x = slider.querySelector(".slider-bar").getClientRects()[0].x;
        slider.width = slider.querySelector(".slider-bar").offsetWidth;
        slider.thumb = slider.querySelector(".slider-bar-thumb");

        slider.sliderMove(eventObject, slider);

        slider.sliderMoveFix = function(e){slider.sliderMove(e, slider)};
        slider.sliderUpFix = function(e){slider.sliderUp(e, slider)};

        document.addEventListener("mousemove", slider.sliderMoveFix);
        document.addEventListener("mouseup", slider.sliderUpFix);
    
        document.addEventListener("touchmove", slider.sliderMoveFix);
        document.addEventListener("touchend", slider.sliderUpFix);

        const mouseDownSFX = new Audio("./sounds/mouse_down.m4a");
        mouseDownSFX.volume = volume;
        mouseDownSFX.muted = (volume == 0);
        mouseDownSFX.play();
    }

    async sliderMove(eventObject, slider) {
        eventObject.preventDefault();
        eventObject.stopPropagation();

        let clientX;
        if (eventObject.type == "touchmove" || eventObject.type == "touchstart") {
            clientX = eventObject.targetTouches[0].clientX;
        } else {
            clientX = eventObject.clientX;
        }

        let percentage = (clientX - slider.x)/slider.width*100-1;
        if (percentage > 100) percentage = 100;
        if (percentage < 0) percentage = 0;

        slider.updateSliderGraphics(percentage);
        
        const value = percentage != 100? Math.floor(percentage/100*(slider.max-slider.min)/slider.step)*slider.step+slider.min : slider.max;
        this.updateValue(value);
    }

    async sliderUp(eventObject, slider) {
        document.removeEventListener("mousemove", slider.sliderMoveFix);
        document.removeEventListener("mouseup", slider.sliderUpFix);
    
        document.removeEventListener("touchmove", slider.sliderMoveFix);
        document.removeEventListener("touchend", slider.sliderUpFix);
    }

    async sliderScrollPress(eventObject) {
        var slider = this.closest("twm-slider");
        slider.thumb = slider.querySelector(".slider-bar-thumb");
        
        if (eventObject.currentTarget.classList.contains("slider-scroll-left")) {
            if (slider.min < slider.max) {
                slider.value = slider.value-slider.buttonStep > slider.min? slider.value-slider.buttonStep : slider.min;
            } else {
                slider.value = slider.value+slider.buttonStep < slider.min? slider.value+slider.buttonStep : slider.min;
            }
        } else {
            if (slider.min < slider.max) {
                slider.value = slider.value+slider.buttonStep < slider.max? slider.value+slider.buttonStep : slider.max;
            } else {
                slider.value = slider.value-slider.buttonStep > slider.max? slider.value-slider.buttonStep : slider.max;
            }
        }

        const percentage = (slider.value-slider.min)/(slider.max-slider.min)*100;
        slider.updateSliderGraphics(percentage);

        slider.updateValue(slider.value);
    }
}
customElements.define("twm-slider", twmSlider);

class twmScroll extends HTMLElement {
    static observedAttributes = ["choices", "testinput", "getvalue", "onmodify", "maxinputlength", "case-sensitivity", "writable"];

    constructor() {
        super();
        this.choices = this.hasAttribute("choices")? window[this.getAttribute("choices")] : [];
        this.testInput = this.hasAttribute("testinput")? this.getAttribute("testinput") : "this.defaultTester(this)";
        this.getValue = this.hasAttribute("getvalue")? this.getAttribute("getvalue") : undefined;
        this.onModify = this.hasAttribute("onmodify")? this.getAttribute("onmodify") : undefined;
        this.maxInputLength = this.hasAttribute("maxinputlength")? parseInt(this.getAttribute("maxinputlength")) : 16;
        this.caseSensitivity = this.hasAttribute("case-sensitivity")? JSON.parse(this.getAttribute("case-sensitivity").toLowerCase()) : false;
        this.writable = this.hasAttribute("writable")? JSON.parse(this.getAttribute("writable").toLowerCase()) : true;
    }

    connectedCallback() {
        this.input = this.value = this.getValue? eval(this.getValue) : this.choices[0];

        const innerLabel = this.innerHTML;
        this.innerHTML = null;

        if(innerLabel !== undefined) {
            this.textLabel = document.createElement("span");
            this.textLabel.classList.add("scroll-label");
            
            const modifiedInnerHTML = innerLabel.toString();
            this.textLabel.innerHTML = modifiedInnerHTML;

            this.prepend(this.textLabel);
        }

        const scrollBase = document.createElement("div");
        scrollBase.classList.add("slider-base");

        const leftScrollButton = document.createElement("img");
        leftScrollButton.classList.add("hoverable", "scroll-scroll-left");
        leftScrollButton.src = "./svg/ui/scroll_left.svg";
        leftScrollButton.setAttribute("onload", "SVGInject(this);");
        scrollBase.append(leftScrollButton);

        this.inputElement = document.createElement("span");
        this.inputElement.classList.add("hoverable", "scroll-input")
        this.inputElement.innerText = this.value;
        if (this.writable) {
            this.inputElement.contentEditable = true;
            this.inputElement.onkeydown = this.inputKeyDown;
            this.inputElement.spellcheck = false;
            this.inputElement.classList.add("scroll-input-editable");
        }
        scrollBase.append(this.inputElement);

        const rightScrollButton = document.createElement("img");
        rightScrollButton.classList.add("hoverable", "scroll-scroll-right");
        rightScrollButton.src="./svg/ui/scroll_right.svg";
        rightScrollButton.setAttribute("onload", "SVGInject(this);");
        scrollBase.append(rightScrollButton);

        this.append(scrollBase);

        $(this).on("click", ".scroll-scroll-left, .scroll-scroll-right", this.scrollScrollPress);
    }

    disconnectedCallback() {
        $(this).off("click", ".scroll-scroll-left, .scroll-scroll-right", this.scrollScrollPress);
        if (this.writable) this.inputElement.onkeydown = null;
    }

    defaultTester(scroll) {
        return scroll.choices.includes(scroll.input);
    }

    testValue() {
        return eval(this.testInput);
    }

    async updateValue() {
        this.value = this.input;
        this.inputElement.innerText = this.value;
        if (this.onModify) eval(this.onModify);
    }

    async inputKeyDown(eventObject) {
        const keyCode = eventObject.keyCode || eventObject.which;
        var scroll = this.closest("twm-scroll");

        if (keyCode == 13) {
            eventObject.preventDefault();
            this.blur();

            scroll.input = this.innerText;
            if (!scroll.caseSensitivity) scroll.input = scroll.input.toLowerCase();

            if (scroll.testValue()) {
                scroll.updateValue();
            } else {
                this.innerText = scroll.value;
            }
        } else if (keyCode != 8 && keyCode != 16 && this.innerText.length == scroll.maxInputLength) {
            eventObject.preventDefault();
        }
    }
 
    async scrollScrollPress() {
        var scroll = this.closest("twm-scroll");
        if (!scroll.caseSensitivity) scroll.value = scroll.value.toLowerCase(); 
        const arrayPosition = scroll.choices.indexOf(scroll.value);

        if (arrayPosition == -1) {
            if (this.classList.contains("scroll-scroll-left")) {
                scroll.input = scroll.choices.slice(-1)[0];
            } else {
                scroll.input = scroll.choices[1];
            }
        } else {
            if (this.classList.contains("scroll-scroll-left")) {
                scroll.input = arrayPosition-1 >= 0? scroll.choices[arrayPosition-1] : scroll.choices.slice(-1)[0];
            } else {
                scroll.input = arrayPosition+1 < scroll.choices.length? scroll.choices[arrayPosition+1] : scroll.choices[0];
            }
        }

        scroll.updateValue();
    }
}
customElements.define("twm-scroll", twmScroll);
// Utility function that creates and returns a new instance of jUtils.
 function $(selector) {
 // Stop here if selector is falsy (null, undefined, empty string, etc.).
 if(!selector) return;
 return new jUtils(selector);    
 }
 
 
 
// jUtils: A utility class that provides helper methods for interacting with HTML elements.
class jUtils {
   constructor(selector) {
 // Holds event listener objects for later reference or removal
this.events = [];

// Default queue is cleared to false
this.queueCleared = false;

// Only proceed if the selector is a string representing an HTML element.
if(typeof selector === 'string' && selector.trim().startsWith('<') && selector.trim().endsWith('>') && selector.trim().length >= 3) {
// Create a temporary container, insert the HTML, and wrap it in jUtils instance.
const createElement = document.createElement('div');
createElement.innerHTML = selector;
return new jUtils(createElement);
} else if(typeof selector === 'string' && selector.trim().startsWith(':')) {
const containerElement = document.createElement(selector.trim().replace(':', ''));
return new jUtils(containerElement);
} else {
if (typeof selector === 'string') {
  try {
    const elements = document.querySelectorAll(selector);
   this.elements = elements.length > 0 ? elements : selector;        
  } catch (err) {
    this.elements = selector;    
  }
} else {
  this.elements = selector; 
}
} 
}


 // Get element at given index and wrap it in a jUtils instance then return it.
at(index = 0) { 
  return new jUtils(this.elements[index]);
}


// Check if element is valid to prevent manipulating null or undefined element.
absent() {
// Return a boolean on the output condition 
  return !this.elements || (!(this.elements[0] instanceof Element) && !(this.elements instanceof Element));
}

// Iterate on elements and execute a callback for each element, return undefined 
set(callback) {
// Exit if no elements are available
if (this.absent()) return;
// Exit if callback is not typeof function
if(typeof callback !== 'function') throw new Error(`set() expects typeof function but receive typeof '${typeof callback}'`);
// If elements length if greater than 1
if(this.elements.length > 1) {
Array.from(this.elements).forEach(callback);
} 
// If elements length is less than 1
else {
// If the first element in the array is undefined 
if(this.elements[0] === undefined) { 
// Execute a callback with the whole array elements 
 callback(this.elements);
 return;
} 
// Execute a callback with the first array element 
 callback(this.elements[0]);   
}
}


// Iterate on elements and execute a callback for each element, return resulting value
get(callback, iterator) {
// Exit if no elements are available
if (this.absent()) return;
// Exit if callback is not typeof function
if(typeof callback !== 'function') throw new Error(`get() expects typeof function as first parameter but receive typeof '${typeof callback}'`);
// If elements length is greater than 1
if(this.elements.length > 1) {
// If iterator is provided
if(iterator) {
return $(this.elements)[iterator]((elem) => callback(elem));  
}  
// If iterator is not provided execute a callback with the first Element in the array
return callback(this.elements);    
} 
// If elements length is less than 1
else {
// If the first element in the array is undefined 
 if(this.elements[0] === undefined) {
// Execute a callback with the whole array elements
return callback(this.elements);            
 } else {
// Execute a callback with the first array element
return callback(this.elements[0]);     
 }    
} 
}


// Iterate on elements and execute a callback for each element on duration, return undefined 
cue(callback) {
// Exit if no elements are available
if (this.absent()) return;

const currentMs = this.ms ?? 0; // capture current dela
      this.currentMs = currentMs;
    this.ms = 0; // reset immediately to prevent reuse

setTimeout(() => {
// Exit if callback is not typeof function
if(typeof callback !== 'function') throw new Error(`set() expects typeof function but receive typeof '${typeof callback}'`);
// If elements length if greater than 1
if(this.elements.length > 1) {
Array.from(this.elements).forEach(callback);
} 
// If elements length is less than 1
else {
// If the first element in the array is undefined 
if(this.elements[0] === undefined) { 
// Execute a callback with the whole array elements 
 callback(this.elements);
 return;
} 
// Execute a callback with the first array element 
 callback(this.elements[0]);   
}  
}, currentMs); 
}


// Simulator of innerHTML, set or get element innerHTML 
html(content) {
// If content is provided set the element innerHTML 
if (content !== undefined) {
    this.cue((element) => {    
   element.innerHTML = content;
    });
    return this; // For chaining purpose 
  } 
// If content is not provided return the element innerHTML 
  else {
return this.get((element) => element.innerHTML);  
  }    
}


// Simulator of textContent, set or get element textContent
text(content) { 
// If content is provided set the element textContent 
if (content !== undefined) {
    this.cue((element) => {  
      element.textContent = content;
    });
    return this; // For chaining purpose 
  } 
// If content is not provided return the element textContent   
  else {
  return this.get((element) => element.textContent);
  }     }


// Simulator of value, set or get element value
val(content) {
// If content is provided set the element value 
if (content !== undefined) {
    this.cue((element) => {
      element.value = content;
    });
    return this; // For chaining purpose 
  } 
// If content is not provided return the element value   
  else {
  return this.get((element) => element.value);
  }    
}


// Make a hook that make jUtils class method chainable with vanilla js 
bridge(all = false) {
// Return a boolean on the output condition 
return !all ? this.elements[0] : this.get(elem => elem, 'map');
}


// Map array method(return the mapped result) 
map(callback) {
// Exit if callback is not typeof function
if(typeof callback !== 'function') return;
return Array.from(this.elements).map(callback);       
 }
 
 
 // ForEach array method(return undefined)
each(callback) {
// Exit if callback is not typeof function
if(typeof callback !== 'function') return;
Array.from(this.elements).forEach(callback);   
 }


// Filter array method(return the filtered result)
filter(callback) {
// Exit if callback is not typeof function
if(typeof callback !== 'function') return;
return Array.from(this.elements).filter(callback);       
 }
 
 
 // Count array method(return the total count)
count(callback, flag = 0) {
// Exit if callback is not typeof function
if(typeof callback !== 'function') return;
let count = flag;
for (let i = 0; i < this.elements.length; i++) {
    if (callback(this.elements[i], i)) {
      count++;
    }
  }
  return count;        
 }


// Reduce array method(return the result)   
reduce(callback) {
// Exit if callback is not typeof function
if(typeof callback !== 'function') return;
return Array.from(this.elements).reduce(callback);       
 }


// Find array method(return the find result)    
find(callback) {
// Exit if callback is not typeof function
if(typeof callback !== 'function') return;
return Array.from(this.elements).find(callback);       
 }
    

// Some array method(return the boolean of the result)
some(callback) {
// Exit if callback is not typeof function
if(typeof callback !== 'function') return;
return Array.from(this.elements).some(callback);       
 } 
 

// Every array method(return the boolean of the result)
every(callback) {
// Exit if callback is not typeof function
if(typeof callback !== 'function') return;
return Array.from(this.elements).every(callback);       
 }  
 

// Apply css styles to element (object style || style + value)
  css(styles, property) {
// Exit if styles is undefined 
if(styles === undefined) return;
// Set styles from an object 'key + value'
if(typeof styles === 'object') {
this.cue((element) => {
  Object.assign(element.style, styles);
});   
return this;  
}   
// Set styles with 'styles + property' key
if(styles !== undefined && property !== undefined) {
this.cue((element) => {
element.style[styles] = property;       
});
return this;  
}
// Return the specify style property 
 if(styles !== undefined && property === undefined) {
return this.get((element) => element.style[styles]);
    }
 }
 
 
 // Append content to element 
append(content = '') {
this.cue((element) => {
// Adds content as the last child of element 
element.append(content);  
});                  
return this; // For chaining purpose    
}


// Prepend content to element 
prepend(content = '') {
this.cue((element) => {
// Adds content as the first child of element 
element.prepend(content);    
});                         
return this; // For chaining purpose
}


// Append elements to the selector 
appendTo(selector) {
// Exit if selector is empty 
if(!selector) return;
this.cue((element) => {
try {
// Insert the specific element at the end of the selected element's content
document.querySelector(selector).append(element);
} catch { 
// Adds element as the last child of selector 
selector.append(element);            
}
});       
return this; // For chaining purpose   
}


// Prepend elements to the selector 
prependTo(selector) {
// Exit if selector is empty 
if(!selector) return;
this.cue((element) => {
try {
// Insert the specific element at the beginning of the selected element's content 
document.querySelector(selector).prepend(element);
} catch {
// Adds element as the first child of selector 
selector.prepend(element);              
}         
});               
return this; // For chaining purpose        
}
 
 
// Set a delay duration 
delay(ms = 0) {
    this.ms = ms;    
    return this; // For chaining purpose  
}


// Trigger a callback on delay duration completed 
queue(callback) {
 this.timeoutIds = [];    
  this.delayChain = this.delayChain || Promise.resolve(this.elements); 
  this.delayChain = this.delayChain.then(element => {
    return new Promise(resolve => {
   setTimeout(() => {   
const queueClearCheck = () => this.queueCleared ? null : resolve(element);    
        callback(element, () => {
        queueClearCheck();   
        });                                   
      }, this.ms);                      
   });
  });         
  return this; // For chaining purpose  
}


// Clear all pending queue leaving the current queue in progress to trigger 
clearQueue() {
this.queueCleared = true;
 return this; // For chaining purpose  
}


// Set or get attribute on an elements
attr(key, value) {
if(key !== undefined && value !== undefined) {
this.cue((element) => {
element.setAttribute(key, value);
});               
return this; // For chaining purpose  
} else if(key !== undefined && value === undefined) {
return this.get((element) => element.getAttribute(key));               
} else {
   return null; // For readability 
}      
}


// Remove existing attribute from elements 
removeAttr(key) {
this.cue((element) => {
element.removeAttribute(key);
});                       
return this; // For chaining purpose
}


// Hide elements that's visible 
hide() {
this.cue((element) => {
element.style.display = 'none';     
});
return this; // For chaining purpose
}
 

// Show elements that's hidden 
show(duration = 0) {
this.cue((element) => {
element.style.display = 'block';       
});
return this; // For chaining purpose   
}


// Toggle elements, hide if show and vice versa 
toggle(duration = 0) {
this.cue((element) => {
element.style.display = element.style.display === 'none' ? 'block' : 'none';         
});
return this; // For chaining purpose   
}


// Bind specific class name to elements 
addClass(name) {
this.cue((element) => {
element.classList.add(name);
});                        
return this; // For chaining purpose       
}


// Toggle specific class name on element
toggleClass(name) {
this.cue((element) => {
element.classList.toggle(name);
});                  
return this; // For chaining purpose     
}


// Remove specific class name from elements 
removeClass(name) {
this.cue((element) => {
element.classList.remove(name);
});                      
return this; // For chaining purpose     
}


// Check if elements has a specific class name
hasClass(name) {
return this.get((element) => element.classList.contains(name), 'some');    
}


// Apply css blur filter to the selected elements based on percentage 
blur(percent = 1) {
this.cue((element) => {
element.style.filter = `blur(${percent}px)`;    
});
return this; // For chaining purpose      
}


// Set dataset on elements key + value 
data(key, value) {
if(key !== undefined && value !== undefined) {
this.cue((element) => {
element.dataset[key] = value;
}); 
return this; // For chaining purpose     
} else if(key !== undefined && value === undefined) {
return this.get((element) => element.dataset[key]);     
} else {
return null;   
}  
   }
   
   
// Scrolls the text within an element horizontally in a specified direction at a given speed for a specified duration.   
scroll(options = {}) {
  let {
    direction = 'right',
    speed = 6,
    duration = 5000,
    easing = 'linear',
    loop = 'infinite',
    callback = () => {}
  } = options;
  
loop = options.loop === true ? 'infinite' : loop;

  const dir = (direction || '').toLowerCase();
  const style = document.createElement("style");

  // Your original logic kept EXACTLY
  let from, mid, reset, to;

  if (dir === "right") {
    from  = "translateX(100%)";
    mid   = "translateX(-100%)";
    reset = "translateX(100%)";
    to    = "translateX(-100%)";
  } else if (dir === "left") {
    from  = "translateX(-100%)";
    mid   = "translateX(100%)";
    reset = "translateX(-100%)";
    to    = "translateX(100%)";
  } else if (dir === "repeatright") {
    from  = "translateX(100%)";
    mid   = "translateX(-100%)";
    reset = "translateX(-100%)";
    to    = "translateX(100%)";
  } else if (dir === "repeatleft") {
    from  = "translateX(-100%)";
    mid   = "translateX(100%)";
    reset = "translateX(100%)";
    to    = "translateX(-100%)";
  } else {
    console.error("Invalid direction");
    return this;
  }

  // New keyframes (same direction — but SMOOTH)
  style.textContent = `
    @keyframes jUtils-scroll {
      0% { transform: ${from}; }
      50% { transform: ${mid}; }
      50.01% { transform: ${reset}; }
      100% { transform: ${to}; } 
    }
  `;
  document.head.append(style);

  this.cue(element => {
    const originalHTML = element.innerHTML;
    
    // FIX: two copies so the motion enters/exits edges smoothly
    const wrapper = document.createElement("div");
    wrapper.style.display = "inline-flex";
    wrapper.style.whiteSpace = "nowrap";
    wrapper.style.width = '100%'; 
    const span = document.createElement("span");    

    span.innerHTML = element.innerHTML;

    wrapper.appendChild(span);

    element.innerHTML = "";
    element.style.overflow = "hidden";
    element.appendChild(wrapper);

    wrapper.style.animation = `jUtils-scroll ${speed}s ${easing} ${loop}`;

    setTimeout(() => {
      if(style) style.remove();
      if(wrapper) wrapper.remove();
      element.innerHTML = originalHTML;
      callback(element);
    }, duration);
  });  
 this.tick(duration);  
  return this; // For chaining purpose 
}


// Update this.ms duration
tick(duration = 0) {
this.ms = (isNaN(this.ms) || isNaN(this.currentMs)) ? 0 + duration : this.ms + duration + this.currentMs;
return this; // For chaining purpose 
}


// Slide the element from edge on duration then position the element back default 
slide(options = {}) {
  // Extract options + defaults
  const {
    direction = "right",   
    duration = 4000,
    easing = 'ease-out',
    callback = () => {}
  } = options;

// Make direction lowercase for comparing 
    const dir = (direction || '').toString().toLowerCase();     
    
const style = document.createElement('style');

let from = '', to = '', back = '';

if(['left', 'top'].includes(dir)) back = '-';
if(['right', 'left'].includes(dir)) {
from = `translateX(${back}100vw)`;
to = 'translateX(0)';
} else if(['top', 'bottom'].includes(dir)) {
from = `translateY(${back}100vh)`;
to = 'translateY(0)';    
} else {
console.error('Invalid direction');    
}

style.textContent = `
  @keyframes jUtils-slide {
      from {
        transform: ${from}; /* FAR BELOW the screen */
      }
      to {
        transform: ${to}; /* NORMAL POSITION */
      }
    }
`;

document.head.append(style);
  this.cue(element => {
 const originalAnimation = element.style.animation;  
element.style.animation = `jUtils-slide ${duration / 1000}s ${easing} forwards`; 

setTimeout(() => {
element.style.animation = originalAnimation;     
if(style) style.remove();
callback(element);
}, duration);    
  }); 
this.tick(duration);    
return this; // For chaining purpose 
}


// Show a tying effect in real time on element 
typeWriter(options = {}) {
 const { 
      content = '',     
      typeSpeed = 5000,
      loop = 1,
      stopAt = null,
      parser = 'html',
      doneText = null,
      cursor = '1px solid black',
      callback = () => {}
    } = options;        
   
  this.cue((element) =>   {   
    let currentIndex = 0;
    let currentContentIndex = 0;
    let isDeleting = false;
    let loopCount = 0;

    let contents = Array.isArray(content) ? content : [content];

    function getTextContent(html) {
      const div = document.createElement('div');
      div.innerHTML = html;      
      return div.textContent || div.innerText || '';
    }

    function getCaret() {                
    return `<span style="border-right: ${cursor}"></span>`;
    }
         
    function type() {
      let textContent = parser === 'text' ? getTextContent(contents[currentContentIndex]) : contents[currentContentIndex];
   textContent = textContent.toString();
      if (isDeleting) {
        element.innerHTML = textContent.substring(0, currentIndex) + getCaret();
        currentIndex--;
        if (currentIndex < 0) {
          isDeleting = false;
          currentContentIndex = (currentContentIndex + 1) % contents.length;
          if (loop !== true && currentContentIndex === 0) {
            loopCount++;
            if (loopCount >= loop) {
   let displayText;        
              cancelInterval();
              callback(element);
              if(Array.isArray(doneText) && contents[doneText[0]]) {
   displayText =  parser === 'html' ? contents[doneText[0]] : getTextContent(contents[doneText[0]]);             
              } else {           
     displayText = doneText ?? (parser === 'html' ? contents[contents.length - 1] : getTextContent(contents[contents.length - 1]));;            
              }                    
  element.innerHTML = displayText;
            }
          }
        }
      } else {
        element.innerHTML = textContent.substring(0, currentIndex + 1) + getCaret();
        currentIndex++;
        if (stopAt && textContent.substring(0, currentIndex).includes(stopAt)) {
          isDeleting = true;
        }
        if (currentIndex >= textContent.length) {
          isDeleting = true;
        }
      }
    }

    const intervalId = setInterval(type.bind(this), typeSpeed / 10);
    function cancelInterval() {
   clearInterval(intervalId);  
    }      
  });  
  return this;
}


// Masks an element's content with asterisks (or a specified symbol) for a specified length (or the full length of the content)
masked(symbol = "*", length) {
  const tag = this.get(element =>
    ['INPUT', 'TEXTAREA'].includes(element.tagName) ? 'value' : 'textContent'
  );

  this.cue(element => {
    // Store original data if not already stored
    if (!element.originalData) element.originalData = element[tag];

    const maskLength = length || element[tag].length;
    element[tag] = symbol.repeat(maskLength);
  });

  return this; // For chaining purpose 
}


// Restores the original content of an element that was previously masked, removing the mask
unmasked() {
  this.cue(element => {
    if (element.originalData) {
      const tag = ['INPUT', 'TEXTAREA'].includes(element.tagName) ? 'value' : 'textContent';
      element[tag] = element.originalData;
      delete element.originalData;
    }
  });

  return this; // chainable
}


// Select next element sibling
next(selector) {
return this.get((element) => {
  const sibling = element.nextElementSibling;
  if (!sibling) return null;
  if (selector && !sibling.matches(selector)) return null;
  return new jUtils(sibling);  
  });
};


// Select previous element sibling 
prev(selector) {
return this.get((element) => {
  const sibling = element.previousElementSibling;
  if (!sibling) return null;
  if (selector && !sibling.matches(selector)) return null;
  return new jUtils(sibling);
  });
};


// Get child elements based on a selector(string) or index(number).
child(selector) {
return this.get((element) => { 
  if (typeof selector === 'number') {
    // If selector is a number, use it as an index        
    return new jUtils(element.children[selector]);
  } else if (typeof selector === 'string') {
    // If selector is a string, use it as a CSS selector    
return new jUtils(Array.from(element.querySelectorAll(selector)));
  } else {
    return null;
  }  
  });
   }


// Return the first child inside the parent element container 
   first(selector) {
return this.get((element) => { 
  const child = element.firstElementChild;
  if (!child) return null;
  if (selector && !child.matches(selector)) return null;
  return new jUtils(child);
  });
   };

   
// Return the last child inside the parent element container 
   last(selector) {
return this.get((element) => {    
  const child = element.lastElementChild;
  if (!child) return null;
  if (selector && !child.matches(selector)) return null;
  return new jUtils(child);
  });
   };

   
   // Insert content before the element
before(content) {
 this.cue((element) => { 
    // Insert HTML string before element
element.insertAdjacentHTML('beforebegin', content);
  });
return this; // For chaining purpose 
   };
   
   
   // Insert content after the element
 after(content) {
this.cue((element) => {  
    // Insert HTML string after element
element.insertAdjacentHTML('afterend', content);
  });
return this; // For chaining purpose 
   };


// make element content on hold not copyable 
 disableCopy(callback = () => {}) {
const style = document.createElement('style');
    style.textContent = `
      .jUtils-uncopyable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
  document.head.appendChild(style); 
  this.style = style;
this.cue((element) => {  
        element.classList.add("jUtils-uncopyable");
let eventCallback = (event) => {
    callback(element);      
   event.preventDefault();     
}
    
element.addEventListener("selectstart", eventCallback);
element.addEventListener("contextmenu", eventCallback);
element.eventCallback = eventCallback; 
  });
return this; // For chaining purpose  
   }       


 // Remove disableCopy() from element. reactive on hold element content copy content 
 enableCopy(callback) {
this.cue((element) => {
element.classList.remove("jUtils-uncopyable");
element.removeEventListener("selectstart", element.eventCallback);
      element.removeEventListener("contextmenu", element.eventCallback);
delete element.eventCallback;

// Remove style from element and set to null
if(this.style) {
   this.style.remove();
   this.style = null;
}   

  // Run optional callback  
    if (typeof callback === "function") callback(element); // runs once
        
});  
return this; // For chaining purpose  
 }    
  

// Apply fade animation to an element. supported direction (out/in/toggle)
fade(options = {}) {
const {
direction = 'out',
duration = 2000,
callback = () => {}
} = options;

// Make direction lowercase for comparing 
    const dir = (direction || '').toString().toLowerCase();   

this.cue(element => {
const orignalTransition = element.style.transition;
const initialOpacity = element.style.opacity || 1; 

let opacity = '';  
switch(dir) {
    case 'in':
    opacity = 1;
    break;
    case 'out':
    opacity = 0;
    break;
    case 'toggle':
    opacity = initialOpacity == 0 ? 1 : 0; 
} 
   
element.style.opacity = initialOpacity; 
   element.style.transition = `opacity ${duration / 1000}s`;  
  element.style.opacity = `${opacity}`;     

setTimeout(() => {
element.style.transition = orignalTransition;
callback(element);  
}, duration);    
});
// Update this.ms duration 
this.tick(duration);
return this; // For chaining purpose 
}


// Assign detach(remove) element back to a specific element position  
assignTo(target) {
// Logic to treat target as valid HTML element attribute or use target direct 
const newParent =
        typeof target === "string" ? document.querySelector(target) : target;

// Check if storedElements instance exist on class       
if(this.storedElements) {
this.storedElements.forEach(element => {
 newParent.appendChild(element);
 }); 
}  
return this; // For chaining purpose 
}


// Remove an element and store it reference to later (assignTo or restore)
detach() {
   // Store direct element references, normalize to array
 const storedElements = [].concat(this.get(item => item, "map")); 
  
  // Store the element in class Instance so it can be accessible from other methods 
  this.storedElements = storedElements;  

 // Get parent and sibling references, normalize to array
  this.parentList = [].concat(this.get(item => item.parentNode, "map"));
  this.nextList = [].concat(this.get(item => item.nextSibling, "map"));
  
  // Remove all from DOM
  this.cue(element => element.remove());  
  return this; // For chaining purpose 
}


// Restore back the remove element to it default position 
restore() {
if(this.storedElements) {
   this.storedElements.forEach((element, i) => {   
   const parent = this.parentList[i];
   const nextSibling = this.nextList[i];   
   if (!parent) return;

          try {
            if (nextSibling && nextSibling.parentNode === parent) {
              parent.insertBefore(element, nextSibling);
            } else {
              parent.appendChild(element);
            }
          } catch {
            parent.appendChild(element);
          }
        });   
     }     
 return this; // For chaining purpose     
}


// Set/append or return element cssText styles based on condition 
cssText(styles, append = true) {
  // Return element current styles if styles params is empty 
    if (styles === undefined) {
        return this.get(elem => elem.style.cssText);
    } 
    
// append current element styles + default element styles  
if(append) {
this.cue(element => {
   let existing = element.style.cssText;
    if (existing && !existing.trim().endsWith(';')) existing += ';';
 element.style.cssText = existing + styles;
        });    
} 

  // Otherwise, replace all styles
else {   
 this.cue(element => {
    element.style.cssText = styles;
       });   
  }     
  return this; // For chaining purpose 
}
   

// Activate hold event on element with duration trigger a callback 
hold(options = {}) {
const {
    duration = 2000,
    noBubble = true,
    callback = () => {}
} = options;

let timer;
this.set(element => {
element.addEventListener("touchstart", function () {
// Disable the default background highlight effect when the element is long-pressed.
 noBubble ? $(element).disableCopy() : null;
 
timer = setTimeout(() => callback(element), duration);
  });

  element.addEventListener("touchend", function () {
    clearTimeout(timer);
 // Enable the default background highlight effect when the element is long-pressed.   
    $(element).enableCopy(); 
  });    
});    
return this; // For chaining purpose 
}
   

// Restricts input or text content to a maximum character length
charLimit(maxLength, callback = () => {}) {
 this.set((element) => {
    // Determine which property to monitor: value or textContent
    const prop =
      element.tagName === 'INPUT' || element.tagName === 'TEXTAREA'
        ? 'value'
        : 'textContent';

    // Only proceed if a valid limit is provided
    if (typeof maxLength === 'number' && maxLength > 0) {
      element.addEventListener('input', () => {
        const currentValue = element[prop];
        const currentLength = currentValue.length;   

        // Enforce limit
        if (currentLength > maxLength) {
          element[prop] = currentValue.slice(0, maxLength);
          callback(element, currentLength);
        }
      });
    }
  });   
return this; // For chaining purpose   
}


// Displays a temporary skeleton loading effect over an element
skeleton(options = {}) {
  const {
  duration = 5000,
  keyframes = {
        0: { opacity: 1 },
        50: { opacity: 0.5 },
        100: { opacity: 1 }
  },
  easing = 'ease-in-out',
  speed = 2,
  loop = 'infinite',
  container = {},
  callback = () => {}  
  } = options;

  this.cue((element) => {
    // Create skeleton block
    const skeleton = document.createElement('div');
    Object.assign(skeleton.style, {
      height: '40px', 
      backgroundColor: '#ccc',
      marginBottom: '10px',
      borderRadius: '10px',       
      'animation-name': 'jUtils-skeletonPulse', 
      'animation-duration': `${speed}s`,
      'animation-iteration-count': loop === true ? 'infinite' : loop,
      'animation-timing-function': easing
    });
    
  Object.entries(container).forEach(([key, value]) => {
      if(!'animation'.includes(key)) {
  skeleton.style[key] = value;     
      }
  })  
    

// Store original devs display value 
  const originalDisplay = element.style.display;
    // Hide actual element during skeleton display
    element.style.display = 'none';
    element.parentNode.appendChild(skeleton);

    // Add animation style if not already defined
  let style; 
    if (!document.getElementById('jUtils-skeleton')) { 
      style = document.createElement('style');
      style.id = 'jUtils-skeleton';
      style.textContent = `
        @keyframes jUtils-skeletonPulse {
  ${Object.entries(keyframes).map(([key, value]) => { 
// Exit if key is not typeof number 
    if(isNaN(key)) return;
// Add percentage prefix to key           

  if(typeof value === 'object') {     
const props =  Object.entries(value).map(([k, v]) => `${k}: ${v};`).join(' '); 
return `${key}% { ${props} }`;
 } 
  }).join('\n')}      
      `;
   document.head.appendChild(style);              
   } 

    // Cleanup skeleton after duration
    setTimeout(() => {       
     if(style) style.remove();
     if(skeleton) skeleton.remove();      
      element.style.display = originalDisplay;                 
      callback(element);
    }, duration);
  });
  // update this.ms duration 
this.tick(duration);
return this; // For chaining purpose 
}


// Create a customizable divider with text and styled lines
divider(options = {}) {
if(typeof options !== 'object' || Array.isArray(options)) return;  

const { text = '', styleText = {}, styleLeft = {}, styleRight = {}, styleCombined = {}, container = {} } = options;

  this.cue((element) => {
 // Create divider elements
    const leftLine = document.createElement('hr');
    const rightLine = document.createElement('hr');
    const centerText = document.createElement('span');   
centerText.textContent = text;

 // Base layout styling
    Object.assign(element.style, {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      gap: '10px',
    });

const protectedKeys = ['justifyContent', 'textAlign', 'alignItems', 'display'];    
Object.entries(container).forEach(([key, value]) => {
if(!protectedKeys.includes(key)) {
  element.style[key] = value;
    }
})  
 
    
const hrStyles = {
  border: 'none',                
  height: '3px',             
  'background-color': 'blue',       
  'border-radius': '2px',           
  'flex-grow': 1,                  /* Works only inside flex container */    
}  

Object.assign(leftLine.style, hrStyles, styleLeft);
Object.assign(rightLine.style, hrStyles, styleRight); 
Object.assign(centerText.style, styleText);

// Default divider style
 [leftLine, rightLine].forEach((line) => {
      Object.assign(line.style, styleCombined);  
    });

element.innerHTML = '';
element.append(leftLine, centerText, rightLine);
  }); 
  // update this.ms duration 
  this.tick(this.ms);  
 return this; // For chaining purpose 
}


// Run handler when the target is ready
ready(handler) {
  const target = this.elements;    
  if (target === document || target instanceof Document) {
     document.addEventListener('DOMContentLoaded', handler);
return handler;  
  } 
  if (target === window || target instanceof Window) {
    window.addEventListener('load', handler);
 return handler;     
  }     
}


// Handle online/offline status or return current state
network(handler) { 
const target = this.elements;   
  if (['offline', 'online'].includes(target) && typeof handler === 'function') {
window.addEventListener(target, handler);
return handler;   
   } else {  
 if(target === 'offline') return !navigator.onLine;
 if(target === 'online') return navigator.onLine;
return null;  
  }
}


// Tracks how much a fixed element is covered on scroll and calls the callback with coverage data.
overlap(fixedEl, callback = () => {}) {
  const self = this;

  function checkCover() {
const a = typeof fixedEl === 'string' ? document.querySelector(fixedEl).getBoundingClientRect() : fixedEl.getBoundingClientRect();         
    const b = self.get(el => el.getBoundingClientRect());

    // compute overlap area vertically
    const overlapTop = Math.max(a.top, b.top);
    const overlapBottom = Math.min(a.bottom, b.bottom);
    const overlapHeight = Math.max(overlapBottom - overlapTop, 0);

    // normalize overlap to A's height (A = 100%)
    const percent = Math.min(Math.max((overlapHeight / a.height) * 100, 0), 100).toFixed(2);

    callback({
      covered: overlapHeight > 0,
      percent,
      overlapHeight
    });
  }

  // smooth scroll performance
  let ticking = false;
  function onScroll() {  
    if (!ticking) {
      requestAnimationFrame(() => {
        checkCover();
        ticking = false;        
      });
      ticking = true;
    }
  }

function enableOverlap() {
  // listen for changes
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', checkCover);
   // initial run
  checkCover(); 
}

function disableOverlap() {
 // remove events 
     window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkCover);    
}

enableOverlap(); // Start tracking immediately 
    
    // optional cleanup return
return { enableOverlap, disableOverlap }; 
};


// Reads selected files based on the given type and invokes the callback with the result.
processFile(callback, readType = 'URL') {
this.set(inputElement => {
inputElement.addEventListener('change', (event) => {

const files = event.target.files;
if(!files) return;
 Array.from(files).forEach((file) => {
const reader = new FileReader();
reader.onload = () => {
callback({
    input: event.target,
    status: 'success',
    data: reader.result,
    file: file
});
}

reader.onerror = () => {
callback({
    input: event.target,
    status: 'error',
    data: reader.result,
    file: file
});
}

reader.onprogress = () => {
callback({
    input: event.target,
    status: 'progress',
    data: reader.result,
    file: file
});
}

const readMethods = {
  TEXT: 'readAsText',
  URL: 'readAsDataURL',
  ARRAY: 'readAsArrayBuffer',
  BINARY: 'readAsBinaryString',
};

const method = Object.keys(readMethods).find(key => readType.toString().toUpperCase().includes(key));
reader[readMethods[method]](file);
});
});
});    
return this; // For chaining purpose 
}


// Get tagName of an element 
tag() {
   return this.get((element) => element.tagName);
}


// Checks if any element in the set matches the given selector or condition
is(callback, type = 'some') {   
return this.get((element) => {  
 let value = (typeof callback !== 'string' ? String(callback) : callback).trim();
    // ID selector
    if (value.startsWith('#')) { 
return element.getAttribute('id') === value.slice(1).trim();       
    }

    // Class selector
    if (value.startsWith('.')) {
      const className = value.slice(1).trim();
      return element.classList.contains(className);
    }
    
    // Special selectors
    switch (value) {          
      case ':visible':
        return element.offsetParent !== null;
      case ':hidden':
        return element.offsetParent === null;     
      case ':removed':      
        return !element;
      case ':checked':
        return element.checked;
      case ':enabled':
        return !element.disabled;
      case ':disabled':
        return element.disabled;
      case ':selected':     
        return element.selected;           
    }
    
if (value.startsWith('[') && value.endsWith(']')) {
    value = value.slice(1, -1); // remove brackets    

    // Attribute with value: [attr=value]
    if (value.includes('=')) {
        const index = value.indexOf('=');
        const attr = value.slice(0, index).trim();
        const x = value.slice(index + 1).trim();
        return element.getAttribute(attr) === x;
    }

    // Attribute existence: [attr]
    return element.hasAttribute(value);
}       
    
    // Tag name selector
if (element.tagName === value.toUpperCase()) {
      return true;
    }

      // Check if callback is a valid input type
    const inputTypes = [
      'text',
      'password',
      'email',
      'number',
      'date',
      'time',
      'datetime-local',
      'month',
      'week',
      'url',
      'search',
      'tel',
      'color',
      'checkbox',
      'radio',
      'file',
      'submit',
      'reset',
      'button',
      'hidden',
    ];
    if (inputTypes.includes(value)) {      
      return element.getAttribute('type') === value;
    }      
     
    return false;         
 }, type);
   }
   

// Checks if every element in the set matches the given selector or condition
all(callback) {
return this.is(callback, 'every');    
}


// Attaches event listeners to elements, supporting multiple event types, optional child selector delegation, and stores metadata for later removal
on(type, selector, handler, options) {
this.cue((element) => {
const eventType = String(type).split(/\s+/) || [];    
if(typeof selector === 'string' || typeof handler === 'function') {
const childElements = element.querySelectorAll(selector) || [];
childElements.forEach(elem => {
eventType.forEach(event => {
elem.addEventListener(event, handler, options);
});
const refId = $.randAlpha(6);
this.events?.push({refId, callback: handler, options, type, selector});    
elem.setAttribute('jUtils_refId', refId);
element.setAttribute('jUtils_refId', refId);
});
} else {
eventType.forEach(event => {
element.addEventListener(event, selector, handler);
});
const refId = $.randAlpha(6);
this.events?.push({refId, callback: selector, options: handler, type});    
element.setAttribute('jUtils_refId', refId);
}     
});    
return handler || selector;
}


// Removes event listeners from elements, handling both direct and delegated events, using stored metadata and optional filtering by event type, selector, or handler
off(type, selector, handler, options) {
this.cue((element) => {
if(typeof selector === 'string' || typeof handler === 'function') {
const childElements = element.querySelectorAll(selector) || [];
childElements.forEach(elem => {
const refId = elem.getAttribute('jUtils_refId');
const obj = this.events?.filter(item => item.refId === refId)[0];
const eventType = (type ? String(type).split(/\s+/) : obj?.type.split(/\s+/)) || [];
eventType.forEach(event => {
elem.removeEventListener(event, handler || obj?.callback, options || obj?.options);
});
}); 
} else {
const refId = element.getAttribute('jUtils_refId');
const obj = this.events?.filter(item => item.refId === refId)[0];
const eventType = (type ? String(type).split(/\s+/) : obj?.type.split(/\s+/)) || [];
if(obj?.selector) {
const childElements = element.querySelectorAll(obj.selector);
childElements.forEach(elem => {
eventType.forEach(event => {
elem.removeEventListener(event, selector || obj?.callback, handler || obj?.options);
});    
});
} else {
eventType.forEach(event => {
element.removeEventListener(event, selector || obj?.callback, handler || obj?.options);
});
}
}     
});    
}


// Add click event listener to elements 
click(callback, options) {
this.cue((element) => {
 element.addEventListener('click', callback, options);  
});
return callback;
}


/* Swipe detection method for an element that triggers a callback when a touch gesture exceeds a threshold in a specified direction, with optional edge threshold for sensitivity */
swipe(options) {
const {
    direction = 'right',
    threshold = 50,    
    callback = () => {}
} = options;

  let startX = 0;
  let startY = 0;
  let tracking = false;
this.set((element) => {
  
 element.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    tracking = true;
  });

 element.addEventListener("touchmove", (e) => {
    if (!tracking) return;

    const t = e.touches[0];
    const x = t.clientX;
    const y = t.clientY;   

    const diffX = x - startX;
    const diffY = y - startY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
 if(diffX > 0 && direction === 'right') callback(element);
 if(diffX < 0 && direction === 'left') callback(element);   
     tracking = false;
    }

    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
 if(diffY > 0 && direction === 'bottom') callback(element);
 if(diffY < 0 && direction === 'top') callback(element);   
     tracking = false;
      tracking = false;
    }
  });

element.addEventListener("touchend", () => {
    tracking = false;
  });    
});   
return this; // For chaining purpose 
}


/* Initializes a customizable toggle switch  with configurable colors, radius, speed,  default state, and a change callback for each attached element */
initToggle(options = {}) {
  this.set(element => {
    // Default HTML for toggle
    element.innerHTML = `
      <label class="jutils-toggle">
        <input type="checkbox" ${options.checked ? 'checked' : ''}>
        <span class="slider round"></span>
      </label>
    `;

    // Only append style once
    if (!document.getElementById('jutils-toggle-style')) {
      const style = document.createElement('style');
      style.id = 'jutils-toggle-style';
      style.innerHTML = `
        .jutils-toggle {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .jutils-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .jutils-toggle .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: ${options.offBg || '#ccc'};
          transition: ${options.speed ? options.speed + 's' : '0.4s'};
          border-radius: ${options.radius ? options.radius + 'px' : '34px'};
        }

        .jutils-toggle .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: ${options.knobOffBg || '#fff'};
          transition: ${options.knobSpeed ? options.knobSpeed + 's' : '0.4s'};
          border-radius: ${options.knobRadius ? options.knobRadius + '%' : '50%'};
        }

        .jutils-toggle input:checked + .slider {
          background-color: ${options.onBg || '#2196F3'};
        }

        .jutils-toggle input:checked + .slider:before {
          transform: translateX(26px);
          background-color: ${options.knobOnBg || '#fff'};
        }
      `;
      document.head.appendChild(style);
    }
  });

  // Get all checkbox inputs
  const checkboxes = [].concat(this.get(element => element.querySelector('input'), 'map'));

checkboxes.forEach(e => {
  e.addEventListener('change', x => {
    if (typeof options.callback === 'function') {
      options.callback(x.target);
    }
  });
  });

  return checkboxes; // return inputs for further chaining if needed
}


// Spin animation with controls
spin(options) {
if(typeof options !== 'object' || Array.isArray(options)) return;  

let { 
speed = 1, 
duration, 
container = {}, 
callback = () => {},
easing = 'linear',
loop = 'infinite',
 } = options;

loop = options.loop === true ? 'infinite' : loop;

const style = document.createElement('style');
    style.textContent = `
      @keyframes jUtils-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
document.head.append(style);
  this.set((element) => {    
 const originalHTML = element.innerHTML;
const wrapper = document.createElement('div');
const styles = {
  width: '40px',
  height: '40px',
  border: '5px solid #f3f3f3',
  borderTop: '5px solid #3498db',
  borderRadius: '70%',
  animation: `jUtils-spin ${speed}s ${easing} ${loop}`
}  
         
    element.innerHTML = "";
    element.style.overflow = "hidden";
Object.assign(wrapper.style, styles);


Object.entries(container).forEach(([key, value]) => {
if(key !== 'animation') {
  wrapper.style[key] = value; 
    }
});  

element.appendChild(wrapper);
       
if(duration) {
 setTimeout(() => {   
  if(style) style.remove();       
  if(wrapper) wrapper.remove();
   element.innerHTML = originalHTML;
    callback(element);     
    }, duration);
   }     
  }); 
 // update this.ms duration  
 this.tick(duration); 
return this; // For chaining purpose    
}


// Animate a progress bar inside an element over a specified duration with optional configuration or callback
progress(options) {
if(typeof options !== 'object' || Array.isArray(options)) return;  

const { 
duration = 10000,
 container = {}, 
 fill = {},
 callback = () => {}, 
 easing = 'linear'
 } = options;

this.set((element) => {
   // Progress bar container style
    element.innerHTML = '';
    element.style.width = '100%';
    element.style.height = '10px';
    element.style.backgroundColor = 'yellow';
    element.style.borderRadius = '10px';
    element.style.overflow = 'hidden';

 // Inner progress bar
    const progressFill = document.createElement('div');
    progressFill.style.width = '0%';
    progressFill.style.height = '100%';
    progressFill.style.backgroundColor = 'green';    
            
element.appendChild(progressFill);

  setTimeout(() => {
      progressFill.style.width = '100%';      
    }, 1); 
             
Object.assign(element.style, container);
Object.assign(progressFill.style, fill);

progressFill.style.transition = `width ${duration / 1000}s ${easing}`;    

if(callback) {
 setTimeout(() => {
    callback(element);
      }, duration);  
  }
});
 // update this.ms duration  
 this.tick(duration);
return this; // For chaining purpose   
}


// floatLabel - applies a floating label to an input with automatic focus and value handling
floatLabel(options = {}) {
const {
    placeholder = '',    
    container = {}
} = options;

  this.set((element) => {
    const originalPlaceholder = element.getAttribute('placeholder') || '';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('yf-floating-wrapper');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.marginTop = '10px';

    // Wrap the input
 element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);

    // Create label
    const label = document.createElement('label');
    label.classList.add('yf-floating-label');

    // Handle options    
      Object.assign(label.style, container);
      label.textContent = placeholder || originalPlaceholder;         

    wrapper.appendChild(label);
    element.removeAttribute('placeholder');

    // Add floating label styles (inserted only once)
    if (!document.getElementById('yfFloatingLabelStyle')) {
      const style = document.createElement('style');
      style.id = 'yfFloatingLabelStyle';
      style.textContent = `
        .yf-floating-wrapper input {
          font-size: inherit;
          padding: 8px 10px;
        }

        .yf-floating-label {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          transition: all 0.2s ease;
          pointer-events: none;
          font-size: 0.95em;
          color: gray;
          background: white;
          padding: 0 4px;
        }

        .yf-floating-label.active {
          top: 0;
          font-size: 0.75em;
          color: #000;
        }
      `;
      document.head.appendChild(style);
    }

    // Add behavior
    const toggleLabel = () => {
      if (element.value.trim() !== '') {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    };

  element.addEventListener('input', toggleLabel);
  element.addEventListener('focus', () => label.classList.add('active'));
  element.addEventListener('blur', toggleLabel);

    // Initialize state
    toggleLabel();    
  });
}


// editable - makes an element contenteditable with optional placeholder and container styling, handling Tab for new lines
editable(options = {}) {
const {
    placeholder = '',
    container = {}
} = options;

    this.set((element) => {
        // 1️⃣ Make element editable
        element.setAttribute('contenteditable', 'true');
element.style.display = 'block';


        // 2️⃣ Get placeholder and store in data attribute
    let text = placeholder || element.getAttribute('placeholder');

    
// Generate CSS from options
let dynamicCss = Object.entries(container).map(([key, value]) => {
  return `${key}: ${value}; `;
}).join('');    
                               
        // 5️⃣ Add CSS for placeholder via ::before
        const styleId = 'contenteditable-placeholder-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');             
element.dataset.placeholder = text;
            
            style.textContent = `
                [contenteditable][data-placeholder]:empty::before {
                    content: attr(data-placeholder);
                    color: #aaa;
                    pointer-events: none;
                    display: block;
                   ${dynamicCss};                                   
                }
            `;
            document.head.appendChild(style);
        }


let flag; 
 
 // put this where you currently add the Tab key handler
let specialKey = false;

element.addEventListener('keydown', (e) => {
  // handle Tab -> create a new block-line
  if (e.key === 'Tab') {
    e.preventDefault();
    specialKey = true; // tell input handler not to overwrite

    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);

    // Helper: create an empty block for the new line
    const newBlock = document.createElement('div');
    newBlock.appendChild(document.createElement('br'));

    // Insert the new block at the caret location:
    // If caret is inside a text node, split that text node at caret offset
    let startNode = range.startContainer;
    const startOffset = range.startOffset;

    if (startNode.nodeType === Node.TEXT_NODE) {
      // split the text node so we can insert between the two parts
      if (startOffset < startNode.length) {
        const after = startNode.splitText(startOffset);
        startNode.parentNode.insertBefore(newBlock, after);
      } else {
        // caret at end of the text node
        const parent = startNode.parentNode;
        parent.insertBefore(newBlock, startNode.nextSibling);
      }
    } else {
      // caret is inside an element node — insert by child index (range.startOffset)
      const container = startNode;
      if (startOffset < container.childNodes.length) {
        container.insertBefore(newBlock, container.childNodes[startOffset]);
      } else {
        container.appendChild(newBlock);
      }
    }

    // Place caret inside the new block so typing continues on that line
    const newRange = document.createRange();
    // If the newBlock contains a <br>, put caret before the br so typing replaces it.
    if (newBlock.firstChild && newBlock.firstChild.nodeName === 'BR') {
      newRange.setStart(newBlock, 0);
    } else {
      newRange.setStart(newBlock, 0);
    }
    newRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(newRange);

    // done
    return;
  }

  // handle Enter similarly if you want Enter to behave same as Tab:
  if (e.key === 'Enter') {
    // optional: treat Enter like Tab (create new block) — if you want that
    // e.preventDefault();
    // ... same logic as above or call a helper to create a new block ...
    // set specialKey = true;
  }
});


element.addEventListener('input', () => {  
    if (flag) {  
        element.textContent = '';  
        flag = false;  
    } else {  
        if (!specialKey && !element.querySelector('div')) {  
            element.textContent = element.textContent; // normal behavior  
        }  
        specialKey = false; // reset for next input  
    }  
});
                
    });
}


}





// Generate a random string with options for upper, lower, symbols, and emojis
$.randAlpha = function(length, options = {}) {
if(typeof options !== 'object') {
  console.warn('$.randAlpha expects an options object as the second parameter.');
  return '';
}


  let alphabets = '';
   
  if (options.upper) alphabets += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.lower) alphabets += 'abcdefghijklmnopqrstuvwxyz';
  if(options.symbol) alphabets += `~!@#$%^&*()_-+={}[]|\:;"'<>,.?/§©®™°±÷×…•·‼¶‡†«»`;
  if(options.custom) alphabets += options.custom;
             
  if (!options.upper && !options.lower && !options.symbol && !options.custom) alphabets = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;

  let randomString = '';
  const chars = Array.from(alphabets);
  for (let i = 0; i < length; i++) {
    randomString += chars[Math.floor(Math.random() * chars.length)];
  }
  return randomString;
};         


// View all supported methods of jUtils JavaScript library 
jUtils.methods = function (log = false) {
  const methodsList = [];

  // 1️⃣ Element (class) methods
  Object.getOwnPropertyNames(jUtils.prototype)
    .filter(name => name !== 'constructor')
    .forEach(name => {      
      methodsList.push(`Element.${name}()`);
    });

  // 2️⃣ $ utility methods
  Object.keys($)
   .filter(name => typeof $[name] === 'function') 
    .forEach(name => {     
      methodsList.push(`$.${name}()`);
    });

  const output = methodsList.join('\n\n');

  if (log) console.log(output);
  else return output;
};


// Advance storage mechanism
$.dataStore = function (key) {
 if (!key) throw new Error('A key must be provided for $.dataStore');
 
  // Retrieve existing history or initialize as array
  let history = JSON.parse(localStorage.getItem(key)) || [];
  if (!Array.isArray(history)) history = [history];

  // Helper: save back to localStorage        
  history.init = function (array = history) {
localStorage.setItem(key, JSON.stringify(array));        
  }
  
// Push new object to the localstorage history   
  history.save = function (...data) {
  const time = setTimeout(() => { 
    history.push(...data);
    history.init();    
  }, 0);  // runs immediately if no method

  return new Proxy({}, {
    get(target, prop) {     
      return () => {
        clearTimeout(time);
        if (prop === 'push') history.push(...data);
        else if (prop === 'unshift') history.unshift(...data);
        history.init();
      };
    }   
  });
};


// Delete specified keys or all keys from filtered history items and remove empty objects
history.delete = function (keyFunction, fields = []) {
const filterFn = typeof keyFunction === "function" ? keyFunction : (x) => x;
const filterData = history.filter(filterFn);

filterData.forEach(item => {
if(fields.length > 0) {
fields.forEach(key => delete item[key.toString().trim()]);   
} else {
for(const key in item) delete item[key.toString().trim()];  
} 
// remove empty objects 
const filterHistory = history.filter(item => !$.empty(item));
history.init(filterHistory); 
});     
}


// Remove the last item from history and re-initialize
history.deleteLast = function () {
 history.pop();
history.init();
}


// Remove the first item from history and re-initialize 
history.deleteFirst = function () {
history.shift();
history.init();
}


// Delete an item from history at the given index and re-initialize the history
history.deleteEdges = function (index = 0, count = 1) {
  history.splice(index, count);
  history.init(history);
}


// Clear the local storage for history, reset the history array, and re-initialize
history.remove = function () {
localStorage.removeItem(key);
    history.length = 0;    
    history.init();
}  


// Return the total count of filtered history items, adding 1 for human-readable numbering
history.count = function(keyFunction, humanReadable = false) {
const filterFn = typeof keyFunction === "function" ? keyFunction : (x) => x;
  const length = history.filter(filterFn).length;
  return humanReadable ? length + 1 : length;
}


// Modify existing data or add new keys in history items that match the filter
history.modify = function (keyFunction, data) {
const filterFn = typeof keyFunction === "function" ? keyFunction : (x) => x;
const filterData = history.filter(filterFn);

filterData.forEach(item => {
Object.entries(data).forEach(([key, value]) => {  
item[key] = value;
});
history.init();    
});

return history.toIndex(filterFn);
}


// Strictly updates existing keys in history items that match the filter
history.update = function (keyFunction, data) {
const filterFn = typeof keyFunction === "function" ? keyFunction : (x) => x;
const filterData = history.filter(filterFn);   

filterData.forEach(item => {
Object.entries(data).forEach(([key, value]) => {  
if(item[key]) item[key] = value;
});
history.init();  
}); 

return history.toIndex(filterFn);
}


// To index logic 
history.toIndex = function (keyFunction) {
  return new Proxy({}, {
    get(target, prop) {
      return (newIndex) => {
        if(prop !== 'toIndex') return target; // ignore unknown keys

        const index = history.findIndex(keyFunction);
        if(index === -1) return;

        const [obj] = history.splice(index, 1); // remove item

        // If -1, move to end; otherwise move to specified index
        const targetIndex = newIndex === -1 ? history.length : newIndex;
        history.splice(targetIndex, 0, obj);

        history.init();
      }
    }
  });
}


// Select and filter items from history with optional field picking, chaining, and sorting
history.select = function (keyFunction, fields = []) {
const filterFn = typeof keyFunction === "function" ? keyFunction : (x) => x;
const matches = history.filter(filterFn);

let result = [];
 
 matches.forEach(item => {
   if(fields.length > 0) {       
      const obj = {};      
    fields.map(field => {  
 const key = field.toString().trim();
  if(key in item) obj[key] = item[key];   
      });
      result.push(obj);      
      } else {
     result.push(item);  
      }      
    });   
    
          
   return new Proxy(result, {
  get(target, prop) {
    return (...args) => {      
      let newTarget;

      if (prop === 'toArray') {
        // optionally unwrap to final array if this is "end of chain"
        return target.map(x => Object.values(x));
      }

      if (prop === 'toObject') {
        return target; // maybe wrap if needed
      }

      if (prop === 'limit') {
        newTarget = target.slice(0, args[0] ?? target.length);
      }
      
      if(prop === 'sortAsc') {
 newTarget = $.ascend(target, args[0]);    
      }
      
      if(prop === 'sortDesc') {
 newTarget = $.descend(target, args[0]);          
      }

      // Wrap in Proxy again for chaining
      return new Proxy(newTarget || target, this);
    };
  }
});
}
return history;
}


// Chain multiple promises at once (like jQuery.when)
$.when = function(...promises) {
  const allPromises = Promise.all([...promises]);

  const deferred = {
    _done: null,
    _fail: null,
    _always: null,

    // Chainable callbacks
    done(cb) { this._done = cb; return this; },
    fail(cb) { this._fail = cb; return this; },
    always(cb) { this._always = cb; return this; }
  };

  // Helper to call callback with either spread or array
  const handleResults = (cb, results) => cb.length === results.length ? cb(...results) : cb(results);

  // Attach promise handlers
  allPromises
    .then(results => {
      if (deferred._done) handleResults(deferred._done, results);
      if (deferred._always) deferred._always();
    })
    .catch(err => {
      if (deferred._fail) deferred._fail(err);
      if (deferred._always) deferred._always();
    });

  // Make deferred thenable
  deferred.then = (onFulfilled, onRejected) => allPromises.then(results => handleResults(onFulfilled, results), onRejected);
  deferred.catch = allPromises.catch.bind(allPromises);
  deferred.finally = allPromises.finally.bind(allPromises);

  return deferred;
};


// Object assign function logic 
$.extend = function(target, ...args) {
  return Object.assign(target, ...args); 
}


// Hash a string with optional pin
$.hash = (value, pin = '') => {
  let hash = '';
  let offset = 0;

  if (pin) {
    offset = [...pin].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  }

  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i);
    const hashedChar = String.fromCharCode(
      charCode + (i % 10) * (pin ? pin.length : 1) + offset
    );
    hash += hashedChar;
  }

  return hash;
};

// Unhash a string with optional pin
$.unhash = (value, pin = '') => {
  let unHash = '';
  let offset = 0;

  if (pin) {
    offset = [...pin].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  }

  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i);
    const unHashedChar = String.fromCharCode(
      charCode - (i % 10) * (pin ? pin.length : 1) - offset
    );
    unHash += unHashedChar;
  }

  return unHash;
};


// Convert time strings (like "2d", "3h") to milliseconds and sum them
$.msSum = (...args) => {
  const conversions = {
    y: 31_536_000_000,    year: 31_536_000_000,   // 1 year
    M: 2_592_000_000,     month: 2_592_000_000,  // 1 month
    w: 604_800_000,       week: 604_800_000,     // 1 week
    d: 86_400_000,        day: 86_400_000,       // 1 day
    h: 3_600_000,         hour: 3_600_000,       // 1 hour
    m: 60_000,            min: 60_000, minute: 60_000,  // 1 minute
    s: 1_000,             sec: 1_000, second: 1_000,   // 1 second
    ms: 1                                          // 1 millisecond
  };

  return args.reduce((total, arg) => {
    const match = arg.match(/(\d+)(y|M|w|d|h|m|s|ms|year|month|week|day|hour|min|minute|sec|second)/i);
    if (!match) throw new Error(`Invalid input: ${arg}`);
    
    const [ , valueStr, unitStr ] = match;
    const value = parseInt(valueStr, 10);
    const unit = unitStr.toLowerCase();

    if (!(unit in conversions)) throw new Error(`Unknown time unit: ${unitStr}`);
    return total + value * conversions[unit];
  }, 0);
};


// Calculate a future or past date by adding/subtracting milliseconds
$.shiftDate = (ms, back = false) => {
  const now = new Date();
  const offset = back ? -ms : ms;
  return new Date(now.getTime() + offset);
};
 
 
// Checks if a URL is reachable, returns true/false
$.request = (url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', dataType = 'json') => {
  return async () => {
    // Modern fetch approach
    if (window.fetch) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        await response[dataType](); // parse data (json, text, blob, etc.)
        return true;
      } catch {
        return false;
      }
    } 
    
    // Fallback to XMLHttpRequest
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = dataType;

      xhr.onload = () => resolve(xhr.status >= 200 && xhr.status < 300);
      xhr.onerror = () => resolve(false);

      xhr.send();
    });
  };
};


// Executes a request function and passes the connection status to a callback
$.conn = (requestFn, callback) => {
try {
  requestFn().then(hasConnection => callback.call(hasConnection, hasConnection));
  } catch (err) {
$.simulateErrorDetails(err, true);   
  }
};


// Reload the current page immediately or after an optional delay
$.reload = (ms) => {
  if (ms === undefined) {
    location.reload();
    return;
  }

  const timeoutId = setTimeout(() => location.reload(), ms);
  return timeoutId;
};


// Redirect to a specified URL immediately or after an optional delay
$.redirect = (url, ms) => {
  if (!url) throw new Error("URL is required for redirect.");

  if (ms === undefined) {
    window.location.href = url;
    return;
  }

  const timeoutId = setTimeout(() => (window.location.href = url), ms);
  return timeoutId;
};


// Custom prompt function returning a Promise
let _promptId = 0;

$.prompt = (message = '', cancelText = 'CANCEL', okText = 'OK') => {
  return new Promise((resolve) => {
    const currentId = _promptId++;

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.id = `prompt-backdrop-${currentId}`;
    backdrop.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: ${999 - _promptId + currentId};
    `;

    // Create prompt container
    const container = document.createElement('div');
    container.id = `prompt-container-${currentId}`;
    container.style.cssText = `
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 0px;
      width: 80%;
      max-width: 500px;
      min-height: 150px;
      max-height: calc(100vh - 90px);
      display: flex;
      flex-direction: column;
      color: black;
      padding: 10px;
      z-index: ${1000 - _promptId + currentId};
    `;

    // Message
    const messageDiv = document.createElement('div');
    messageDiv.id = `prompt-message-${currentId}`;
    messageDiv.style.cssText = `
      flex-grow: 1;
      overflow-y: auto;
      margin-bottom: 10px;
      padding-right: 10px;
    `;
    messageDiv.innerHTML = message;

    // Input
    const input = document.createElement('input');
    input.id = `prompt-input-${currentId}`;
    input.type = 'text';
    input.style.cssText = `
      outline: none;
      border: none;
      border-bottom: 2px solid black;
      width: 100%;
      padding: 5px 0;
      background: white;
      color: black;
    `;

    // Buttons container
    const btnContainer = document.createElement('div');
    btnContainer.style.cssText = `
      display: flex;
      justify-content: space-between;
      padding-top: 15px;
      padding-bottom: 10px;
    `;

    // Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.innerHTML = cancelText;
    cancelBtn.style.cssText = `border: none; background: white; font-weight: bold; color: black;`;
    cancelBtn.onclick = () => {
      resolve({
        value: 'null',
        message: messageDiv.textContent,
        action: false
      });
      backdrop.remove();
    };

    // OK button
    const okBtn = document.createElement('button');
    okBtn.innerHTML = okText;
    okBtn.style.cssText = `border: none; background: white; font-weight: bold; color: black;`;
    okBtn.onclick = () => {
      resolve({
        value: input.value,
        message: messageDiv.textContent,
        action: true
      });
      backdrop.remove();
    };

    // Append elements
    btnContainer.append(cancelBtn, okBtn);
    container.append(messageDiv, input, btnContainer);
    backdrop.append(container);
    document.body.append(backdrop);

    // Close on backdrop click
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) backdrop.remove();
    });

    input.focus();
  });
};


// Custom confirm function returning a Promise
let _confirmId = 0;

$.confirm = (html = '', cancelText = 'CANCEL', okText = 'OK') => {
  return new Promise((resolve) => {
    const currentId = _confirmId++;

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.id = `confirm-backdrop-${currentId}`;
    backdrop.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: ${999 - _confirmId + currentId};
    `;

    // Confirm container
    const container = document.createElement('div');
    container.id = `confirm-container-${currentId}`;
    container.style.cssText = `
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 0px;
      width: 80%;
      max-width: 500px;
      min-height: 150px;
      max-height: calc(100vh - 90px);
      display: flex;
      flex-direction: column;
      color: black;
      padding: 10px;
      z-index: ${1000 - _confirmId + currentId};
    `;

    // Message (HTML content)
    const messageDiv = document.createElement('div');
    messageDiv.id = `confirm-message-${currentId}`;
    messageDiv.style.cssText = `
      flex-grow: 1;
      overflow-y: auto;
      margin-bottom: 10px;
      padding-right: 10px;
    `;
    messageDiv.innerHTML = html;

    // Buttons container
    const btnContainer = document.createElement('div');
    btnContainer.style.cssText = `
      display: flex;
      justify-content: flex-end;
      padding-top: 15px;
      padding-bottom: 10px;
      background: white;
      box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2) inset;
    `;

    // Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.innerHTML = cancelText;
    cancelBtn.style.cssText = `border: none; background: white; font-weight: bold; color: black; margin-right: 10px;`;
    cancelBtn.onclick = () => {
      resolve({
        value: false,
        message: messageDiv.innerHTML,
        action: false
      });
      backdrop.remove();
    };

    // OK button
    const okBtn = document.createElement('button');
    okBtn.innerHTML = okText;
    okBtn.style.cssText = `border: none; background: white; font-weight: bold; color: black;`;
    okBtn.onclick = () => {
      resolve({
        value: true,
        message: messageDiv.innerHTML,
        action: true
      });
      backdrop.remove();
    };

    // Append elements
    btnContainer.append(cancelBtn, okBtn);
    container.append(messageDiv, btnContainer);
    backdrop.append(container);
    document.body.append(backdrop);

    // Close on backdrop click
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) backdrop.remove();
    });
  });
};


// Custom alert function returning a Promise
let _alertId = 0;

$.alert = (html = '', btnText = 'OK') => {
  return new Promise((resolve) => {
    const currentId = _alertId++;

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.id = `alert-backdrop-${currentId}`;
    backdrop.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: ${999 - _alertId + currentId};
    `;

    // Alert container
    const container = document.createElement('div');
    container.id = `alert-container-${currentId}`;
    container.style.cssText = `
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 0px;
      width: 80%;
      max-width: 500px;
      min-height: 180px;
      max-height: calc(100vh - 90px);
      display: flex;
      flex-direction: column;
      color: black;
      padding: 10px;
      z-index: ${1000 - _alertId + currentId};
    `;

    // Message (HTML content)
    const messageDiv = document.createElement('div');
    messageDiv.id = `alert-message-${currentId}`;
    messageDiv.style.cssText = `
      flex-grow: 1;
      overflow-y: auto;
      margin-bottom: 10px;
      padding-right: 10px;
    `;
    messageDiv.innerHTML = html; // Allows HTML content

    // Button container
    const btnContainer = document.createElement('div');
    btnContainer.style.cssText = `
      display: flex;
      justify-content: flex-end;
      padding-top: 15px;
      padding-bottom: 10px;
      background: white;
      box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2) inset;
    `;

    // OK button
    const okBtn = document.createElement('button');
    okBtn.innerHTML = btnText;
    okBtn.style.cssText = `border: none; background: white; font-weight: bold; color: black;`;
    okBtn.onclick = () => {
      resolve(true);
      backdrop.remove();
    };

    // Append elements
    btnContainer.append(okBtn);
    container.append(messageDiv, btnContainer);
    backdrop.append(container);
    document.body.append(backdrop);

    // Close on backdrop click
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) backdrop.remove();
    });
  });
};


// LocalStorage logic 
$.storage = function(key, value) {
  if (key === undefined) return localStorage;

  // Commands are case-insensitive
  const cmd = typeof key === 'string' ? key.toLowerCase() : null;

  // 1️⃣ Handle commands first
  if (cmd === '_clear') {
    localStorage.clear();
    return;
  }

  if (cmd === '_remove') {
    if (Array.isArray(value)) {
      value.forEach(k => localStorage.removeItem(k));
    } else {
      localStorage.removeItem(value);
    }
    return;
  }

  // 2️⃣ Bulk get
  if (value === undefined && Array.isArray(key)) {
    const result = {};
    key.forEach(k => {
      let val = localStorage.getItem(k);
      try { val = JSON.parse(val); } catch {}
      result[k] = val;
    });
    return result;
  }

  // 3️⃣ Bulk set
  if (typeof key === 'object') {
    for (let k in key) {
      let val = key[k];
      if (typeof val === 'object') val = JSON.stringify(val);
      localStorage.setItem(k, val);
    }
    return;
  }

  // 4️⃣ Single set
  if (value !== undefined) {
    let val = value;
    if (typeof val === 'object') val = JSON.stringify(val);
    localStorage.setItem(key, val);
    return;
  }

  // 5️⃣ Single get
  let val = localStorage.getItem(key);
  try { val = JSON.parse(val); } catch {}
  return val;
};


// SessionStorage logic 
$.session = function(key, value) {
  if (key === undefined) return sessionStorage;

  // Commands are case-insensitive
  const cmd = typeof key === 'string' ? key.toLowerCase() : null;

  // 1️⃣ Handle commands first
  if (cmd === '_clear') {
    sessionStorage.clear();
    return;
  }

  if (cmd === '_remove') {
    if (Array.isArray(value)) {
      value.forEach(k => sessionStorage.removeItem(k));
    } else {
      sessionStorage.removeItem(value);
    }
    return;
  }

  // 2️⃣ Bulk get
  if (value === undefined && Array.isArray(key)) {
    const result = {};
    key.forEach(k => {
      let val = sessionStorage.getItem(k);
      try { val = JSON.parse(val); } catch {}
      result[k] = val;
    });
    return result;
  }

  // 3️⃣ Bulk set
  if (typeof key === 'object') {
    for (let k in key) {
      let val = key[k];
      if (typeof val === 'object') val = JSON.stringify(val);
      sessionStorage.setItem(k, val);
    }
    return;
  }

  // 4️⃣ Single set
  if (value !== undefined) {
    let val = value;
    if (typeof val === 'object') val = JSON.stringify(val);
    sessionStorage.setItem(key, val);
    return;
  }

  // 5️⃣ Single get
  let val = sessionStorage.getItem(key);
  try { val = JSON.parse(val); } catch {}
  return val;
};


// Custom interval handler
$.intervals = {}; // private store
$.timeouts = {}; // private store
$.rafs = {}; // private store


// $.raf - requests or cancels animation frames, optionally storing IDs by key for easy management
$.raf = function (callback, rafId) {
if (typeof callback === 'function') {
const raf = requestAnimationFrame(callback);
if (rafId !== undefined) $.rafs[rafId] = raf;        
   return raf;    
  } 
  
 if(typeof callback === 'string') {
  cancelAnimationFrame($.rafs[callback] || callback);
  delete $.rafs[callback]; 
  return;   
  } 
  
console.warn('Invalid parameters passed to $.raf');  
}


// Set Interval utility logic
$.interval = function(callback, delay, intervalId) {
    if (delay === undefined) {    
        clearInterval($.intervals[callback] || callback);
        delete $.intervals[callback];        
        return;
    }

    if (typeof callback === 'function' && !isNaN(delay)) {
        const interval = setInterval(callback, delay);
        if (intervalId !== undefined) $.intervals[intervalId] = interval;        
        return interval;
    }

    console.warn('Invalid parameters passed to $.interval');
};


// Set Timeout utility logic 
$.timeout = function(callback, delay, timeoutId) {
    if (delay === undefined) {    
        clearTimeout($.timeouts[callback] || callback);
        delete $.timeouts[callback];        
        return;
    }

    if (typeof callback === 'function' && !isNaN(delay)) {
        const timeout = setTimeout(callback, delay);
        if (timeoutId !== undefined) $.timeouts[timeoutId] = timeout;        
        return timeout;
    }

    console.warn('Invalid parameters passed to $.timeout');
};  


// Check if a value is defined and not null
$.isset = function(value) {
  return value !== null && typeof value !== 'undefined';
}


// Check if a value is empty, warn if more than one parameter is passed
$.empty = function(value) {
  if (arguments.length !== 1) {
    console.warn('$.empty() expects exactly 1 parameter. Extra parameters will be ignored.');
  }

  return (
    value === null ||
    value === undefined ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim() === '') ||
    (typeof value === 'number' && isNaN(value)) ||
    (Array.isArray(value) && value.length === 0)
  );
}


// Parse date string into a timestamp, handling both standard date formats and numeric strings 
$.parseDate = function(date) {
  let dateValue = Date.parse(date);
  if (isNaN(dateValue)) {
   dateValue = parseInt(date.toString().replace(/\D/g, ''));
     if (isNaN(dateValue)) {
   dateValue = null;  
     }
  }
  return dateValue;
}


// typeof data logic
$.type = function(value, type) {
// Exit if no parameter provided 
  if (value === undefined) return '';

  if (type === undefined) {
    return Array.isArray(value) ? 'array' : typeof value;
  }

  return (type === 'array' && Array.isArray(value)) || typeof value === type;
};


// Return the month name of a date with optional locale format and type, validating arguments
$.getMonthName = function(...args) {
try {
  if (args.length > 3) {
    throw new Error('Too many arguments. Expected at most 3 arguments (date, format, and type).');
  }

  let myDate = new Date();
  let format = 'en-US';
  let type = 'long';

  args.forEach(arg => {
    if (arg instanceof Date && !isNaN(arg.getTime())) {
      myDate = arg;
    } else if (typeof arg === 'string' && arg.includes('-')) {
      format = arg;
    } else if (['long', 'short'].includes(arg)) {
      type = arg;
    } else {
      throw new Error(`Invalid argument: ${arg}. Expected a Date object, a format string ('en-US', ...), or a type ('long' or 'short').`);
    }
  });

  return myDate.toLocaleString(format, { month: type });
  } catch (err) {
$.simulateErrorDetails(err, true);        
  }
};


// Return the weekday name of a date with optional locale format and type, validating arguments
$.getWeekName = function(...args) {
try {
  if (args.length > 3) {
    throw new Error('Too many arguments. Expected at most 3 arguments (date, format, and type).');
  }

  let myDate = new Date();
  let format = 'en-US';
  let type = 'long';

  args.forEach(arg => {
    if (arg instanceof Date && !isNaN(arg.getTime())) {
      myDate = arg;
    } else if (typeof arg === 'string' && arg.includes('-')) {
      format = arg;
    } else if (['long', 'short'].includes(arg)) {
      type = arg;
    } else {
      throw new Error(`Invalid argument: ${arg}. Expected a Date object, a format string ('en-US',...), or a type ('long' or 'short').`);
    }
  });

  return myDate.toLocaleString(format, { weekday: type });
  } catch (err) {
$.simulateErrorDetails(err, true);         
  }
};  


// Generate a random integer between min and max, or 0 if no arguments
$.randInt = function(min, max) {
  if(min !== undefined && max === undefined) {
return Math.floor(Math.random() * min);    
  } else if(min !== undefined && max !== undefined) {
return Math.floor(Math.random() * (max - min + 1)) + min;      
  } else {
 return 0;
  } 
}     
 
  
 // generate random array 
$.randArr = function(array) {
    return array[Math.floor(Math.random() * array.length)];
  }


// to fixed
$.fixed = function(value, length = 2) {
const fixedValue =  Number(value).toFixed(length);  
return fixedValue !== 'NaN' ? fixedValue : `Not a Number "${value}"`;
}


// to string 
$.str = function(value) {
return String(value);
}


// to uppercase 
$.upper = function(value) {
return String(value).toUpperCase(); 
}


// to lowercase 
$.lower = function(value) {
return String(value).toLowerCase();  
}


// parseInt 
$.int = function(value) {
return parseInt(value); 
}


// parseFloat 
$.float = function(value) {
return parseFloat(value);
}

// Toggle the case of the string (uppercase becomes lowercase, and vice versa)
$.swapCase = function(value) {
return String(value) === String(value).toUpperCase() ? String(value).toLowerCase() : String(value).toUpperCase();  
}  
  
  
// JSON.stringify function 
$.json = function(obj) {
  return JSON.stringify(obj);
}


// JSON.parse function 
$.parse = function(obj) {
try {
return JSON.parse(obj);    
} catch (err) {
$.simulateErrorDetails(err, true);       
}
}
  
  
// Sort an array in ascending order based on a key function, handling dates and strings
$.ascend = function(array, keyFunction = x => x) {
try {
  return array.sort((a, b) => {
    const aValue = keyFunction(a);
    const bValue = keyFunction(b);
    if (aValue instanceof Date && bValue instanceof Date) {
      return aValue - bValue;
    }
    return String(aValue).localeCompare(String(bValue));
  });
  } catch (err) {
$.simulateErrorDetails(err, true);        
  }
};


// Sort an array in descending order based on a key function, handling dates and strings
$.descend = function(array, keyFunction = x => x) {
try {
  return array.sort((a, b) => {
    const aValue = keyFunction(a);
    const bValue = keyFunction(b);
    if (aValue instanceof Date && bValue instanceof Date) {
      return bValue - aValue;
    }
    return String(bValue).localeCompare(String(aValue));
  });
  } catch (err) {
$.simulateErrorDetails(err, true);         
  }
};


// Copy text to clipboard with fallback for older browsers and optional callback
$.copyText = function(text, callback) {
try {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (callback) callback(true);
    }, () => {
      if (callback) callback(false);
    });
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      if (callback) callback(successful);
    } catch (err) {
      if (callback) callback(false);
    }

 document.body.removeChild(textarea);
    }
    } catch (err) {
$.simulateErrorDetails(err, true);           
    }
   }
   

// Simulate live catch error details 
 $.simulateErrorDetails = function(err, flag = false) {
 const error =  (err.stack).toString().split('at');
 const lastStackLine = error[error.length - 1];  
 const locationParts = lastStackLine.toString().split(':');
 const errorName = err.name || 'Error';
  const message = err.message || 'Unknown issue'
 const urlPaths = locationParts[locationParts.length - 3];
const url = urlPaths.split('/'); 
 const line = locationParts[locationParts.length - 2];
 const column = locationParts[locationParts.length - 1];
const errDetails = `${errorName}: ${message}\n→ custom error on line ${line}, column ${column} at file ${url[1]}`; 
 if(flag) console.error(errDetails);
 else return errDetails;
}    


// Convert object into cssText query string ✅
$.objToCss = function (obj) {
  return Object.entries(obj)
    .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v};`)
    .join(' ');
}   


// Concat 2 or more array or object 
$.merge = function (target, ...source) {
return Array.from(target).concat(...source);
}


// Returns a predefined regex pattern based on the given type (number, upper, lower, etc.)
$.regexMap = function(type, flag, asString = false) {
  const regexMap = {
    number: '[0-9]',
    upper: '[A-Z]',
    lower: '[a-z]',
    alpha: '[a-zA-Z]',
    symbol: '[^a-zA-Z0-9\\p{Extended_Pictographic}\\u200d\\s]',
    space: '\\s',
    emoji: '\\p{Extended_Pictographic}'
  };

  const pattern = regexMap[String(type).toLowerCase()];
  if (!pattern) return null;

  // Default flags
  const defaultFlags = (type === 'symbol' || type === 'space' || type === 'emoji') ? 'gu' : 'g';

  // Return pattern string if asString = true
  if (asString) return pattern;

  // Otherwise, return RegExp object
  return new RegExp(pattern, flag ?? defaultFlags);
};


// Strictly retains only specified regex character classes (must be inside [ ])
$.retainChar = function(value, charsToKeep, replacement = '', global = true) {
  try {
    const str = String(value) || '';
    if (!charsToKeep) return str;

    const flag = (global ? 'g' : '') + 'u'; // add 'u' for Unicode safety

    let pattern;

    // ✅ Only valid if inside [brackets]
    if (/^\[.*\]$/.test(charsToKeep)) {
      pattern = `[^${charsToKeep.slice(1, -1)}]`;
    } else {
      // treat as literal characters
      const escaped = charsToKeep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      pattern = `[^${escaped}]`;
    }

    // Create Unicode-safe regex
   const regex = new RegExp(pattern, flag);

    // Replace non-matching characters, and clean zero-width joiners or orphan emoji code units
    return [...str
      .replace(regex, replacement)
      .replace(/[\u200D\uFE0F]/gu, '')].join(''); // remove invisible emoji joiners
  } catch (err) {
    $.simulateErrorDetails(err, true);   
  }
};


// Extracts specified character types from a string based on provided filters
$.extractChar = function (value, ...filters) {
 if (typeof value !== 'string') return [];
return filters.map(str => {
const f = $.regexMap(str);
  return f ? (value.match(f) || []) : [];
}).flat().join('');          
}


// Removes specified character types from a string based on provided filters
$.removeChar = function (value, ...filters) {
 if (typeof value !== 'string') return [];
  return filters.reduce((str, filter) => { 
    const regex = $.regexMap(filter);    
    return regex ? str.replace(regex, '') : str;
  }, value);    
}


// Counts the number of characters in the string based on specified type.
$.countChar = function (value, ...char) {
  if (typeof value !== 'string') return [];   
    let totalCount = 0;      
  const keywords = ['space', 'upper', 'lower', 'number', 'alpha', 'emoji', 'symbol'];

// Keywords type mode 
if (char.every(x => keywords.includes(x))) { 
for (const c of char) { 
 totalCount += value.match($.regexMap(c))?.length ?? 0; 
 }
return totalCount;
} 

// Warning logic
if(char.some(x => keywords.includes(x))) {
console.warn('$.strCount requires a mode: either Type mode or Character mode.');
}

// Character mode 
char.forEach(x => {
    const escapedChar = String(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape safely
    const regex = new RegExp(escapedChar, 'g');
   totalCount += (value.match(regex) || []).length;
    });  
 return totalCount + 5;      
}


// Returns true ONLY if all characters strictly belong to the allowed filters 
$.isStrict = function (element, ...filters) {
  try {
    if (typeof element !== 'string' || !element.length) return false;

    const filterMap = {
      emoji: c => /[\p{Extended_Pictographic}\u200d]/u.test(c),
      number: c => /[0-9]/.test(c),     
      lower: c => /[a-z]/.test(c),      
      upper: c => /[A-Z]/.test(c),      
      alpha: c => /[a-zA-Z]/.test(c),
      symbol: s => /[^a-zA-Z0-9\p{Extended_Pictographic}\u200d\s]/u.test(s),      
      space: s => /\s/.test(s),
    };

    if (!filters.length) return false;

    // Normalize filters — allow regex patterns like "[a-z]" or "[0-9]"
    const filterFns = filters.map(f => {
      if (filterMap[f]) return filterMap[f];
      if (/^\[.*\]$/.test(f)) {
        const pattern = new RegExp(f, 'u');
        return c => pattern.test(c);
      }
      throw new TypeError(`Invalid filter: ${f}`);
    });

    // Every character must satisfy at least one condition
    for (const char of element) {
      if (!filterFns.some(fn => fn(char))) {
        return false;
      }
    }

    return true;
  } catch (err) {
 $.simulateErrorDetails(err, true);   
  }
};


// Inserts a character (or string) at a specific index or after a matching substring.
$.insertChar = function(text, char, position) {  
try {
  let index;

  if (typeof position === 'number') {
    // Convert 1-based index to 0-based for slicing
    index = position - 1;
  } else if (typeof position === 'string') {
    index = text.indexOf(position);
    if (index === -1) {
      throw new Error(`Substring "${position}" not found in text.`);
    }
  } else {
    throw new TypeError('Position must be a number or string.');
  }

  // Determine slice point
  const slicePoint = index + (typeof position === 'number' ? 1 : position.length);

  // Construct and return the new string
  return text.slice(0, slicePoint) + char + text.slice(slicePoint);
  } catch (err) {
$.simulateErrorDetails(err, true);         
  }
}


// Provides methods to validate email addresses and URLs. 
$.validator = function(value, type) { 
if(typeof type !== 'string') return false;
  const ab = {    
    EMAIL: (email) => {
      if (!email || typeof email !== "string") return false;
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email.trim()) && email.length <= 254;      
    },
    URL: (url) => {
      if (!url || typeof url !== "string") return false;
      const regex = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}(:[0-9]+)?(\/.*)?$/;
      return regex.test(url.trim());      
    },   
  };

  // Check if type exists and call it with the value
  return ab[String(type).toUpperCase()] ? ab[String(type).toUpperCase()](value) : false;
};


/**
 * $.dateTime()
 * -------------------
 * Utility for creating and manipulating Date objects with chainable methods.
 * Added: format() method for custom date output.
 */
$.dateTime = function(date = new Date()) {
try {
  const pad = (n) => n.toString().padStart(2, '0');

  return {   
    custom(value) {
      if (value !== undefined) {
        date = new Date(value.toString());
        return $.dateTime(date);
      } else {
        throw new Error('custom() requires a valid date parameter');
      }
    },
    year(value) {
      if (value !== undefined) {
        date.setFullYear(value);
        return $.dateTime(date);
      } else {
        return date.getFullYear();
      }
    },
    month(value) {
      if (value !== undefined) {
        date.setMonth(value);
        return $.dateTime(date);
      } else {
        return date.getMonth();
      }
    },
    date(value) {
      if (value !== undefined) {
        date.setDate(value);
        return $.dateTime(date);
      } else {
        return date.getDate();
      }
    },
    day(value) {
      if (value !== undefined) {
        date.setDate(date.getDate() + value);
        return $.dateTime(date);
      } else {
        return date.getDay() + 1;
      }
    },
    hours(value) {
      if (value !== undefined) {
        date.setHours(value);
        return $.dateTime(date);
      } else {
        return date.getHours();
      }
    },
    minutes(value) {
      if (value !== undefined) {
        date.setMinutes(value);
        return $.dateTime(date);
      } else {
        return date.getMinutes();
      }
    },
    seconds(value) {
      if (value !== undefined) {
        date.setSeconds(value);
        return $.dateTime(date);
      } else {
        return date.getSeconds();
      }
    },
    ms(value) {
      if (value !== undefined) {
        date.setMilliseconds(value);
        return $.dateTime(date);
      } else {
        return date.getMilliseconds();
      }
    },
    time(value) {
      if (value !== undefined) {
        date.setTime(value);
        return $.dateTime(date);
      } else {
        return date.getTime();
      }
    },
    locale() {
      return date.toLocaleString();
    },
    localeTime() {
      return date.toLocaleTimeString();
    },
    localeDate() {
      return date.toLocaleDateString();
    }, 
    format(fmt = 'YYYY-MM-DD HH:mm:ss') {
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12; // convert 0 -> 12
  const map = {
    YYYY: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(hours24),
    hh: pad(hours12),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    Z: hours24 >= 12 ? 'PM' : 'AM'
  };
  return fmt.replace(/YYYY|MM|DD|HH|hh|mm|ss|Z/g, (match) => map[match]);
},
    value() {
      return date;
    }
  };
  } catch (err) {
$.simulateErrorDetails(err, true);         
  }
};


// Get or set any valid property + value of window.location object 
$.url = function(part, value) {
  try {
    if (typeof part !== 'string') {
      throw new TypeError('Property name must be a string.');
    }   
    
    if (value !== undefined) {
      if (typeof value !== 'string') {
        throw new TypeError('Value must be a string.');
      }

      // Auto-prefix for common URL components
      if (part === 'search' && !value.startsWith('?')) value = '?' + value;
      if (part === 'hash' && !value.startsWith('#')) value = '#' + value;
      // Attempt to assign
      window.location[part] = value;
      return true; // successfully updated       
    } else {
      // Getter
      return window.location[part];
    }
  } catch (err) {
    // Catch any error (invalid key, readonly property, etc.)
 $.simulateErrorDetails(err, true);   
    return null;
  }
};


// Updates the browser history state (pushState) and optionally the document title. 
$.pushState = function(options) {
const {
    search,
    pathname,
    hash,
    title = document.title,
    state = {}
} = options;

  // Determine URL based on target
  const loc = new URL(window.location);  

if (search !== undefined) {
  loc.search = String(search).startsWith("?") ? search : "?" + search;
}

if (hash !== undefined) {
  loc.hash = String(hash).startsWith("#") ? hash : "#" + hash;
}

if (pathname !== undefined) {
  loc.pathname = String(pathname).startsWith("/") ? pathname : "/" + pathname;
}


  // Push state
  window.history.pushState(state, title, loc.href);
  document.title = title;    
 return loc.href;  
};


// Retrieves the specified part of the current URL: search parameter, pathname, or hash
$.getState = function(part, key = null) {
  switch(part) {
    case 'search': {
      if(!key) throw new Error("You must provide a key for search");
      const params = new URLSearchParams(location.search);
      return params.get(key);
    }
    case 'pathname':
      return location.pathname;
    case 'hash':
      return location.hash.slice(1); // remove #
    default:
      throw new Error("Invalid part. Must be 'search', 'pathname', or 'hash'.");
  }
};


// Custom formData utility 
$.formData = (input, ...rest) => {
try {
    const fd = new FormData();

    // Case 1: Object
    if (typeof input === 'object' && input !== null) {
        Object.entries(input).forEach(([key, value]) => {
            if (value instanceof File) {
                fd.append(key, value);
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => fd.append(`${key}[${index}]`, item));
            } else {
                fd.append(key, value);
            }
        });
    }
    // Case 2: Form ID
    else if (typeof input === 'string' && rest.length === 0 && input) {
        return new FormData(input);
    }
    // Case 3: Query string / key-value pairs
    else if (typeof input === 'string' && rest.length >= 1) {
        const keys = [input, ...rest.filter((_, i) => i % 2 === 0)];
        const values = rest.filter((_, i) => i % 2 === 1);
        if (keys.length !== values.length) throw new Error('Mismatched keys and values');
        keys.forEach((key, i) => fd.append(key, values[i]));
    }
    else {
        throw new Error('Unsupported input type for $.formData');
    }

    return fd;
    } catch (err) {
$.simulateErrorDetails(err, true);          
    }
};


// Convert key-value pairs into a URL query string for GET requests
$.queryParams = (...args) => {
  if (args.length % 2 !== 0) {
    throw new Error("Number of arguments must be even (key-value pairs).");
  } 

  if (args.length > 100) {
    throw new Error("Number of arguments exceeds 100.");
  }

  const pairs = [];

  for (let i = 0; i < args.length; i += 2) {
    const key = encodeURIComponent(args[i]);
    const value = encodeURIComponent(args[i + 1]);
    pairs.push(`${key}=${value}`);
  }

  return pairs.join("&");
};


// encodeURIComponent() - encodes a string so it can be safely used in a URL
$.encodeUrl = function (url) {
if(typeof url !== 'string') return '';
return encodeURIComponent(url);
}


// decodeURIComponent() - decodes a URL-encoded string back to its original form
$.decodeUrl = function (url) {
if(typeof url !== 'string') return '';
return decodeURIComponent(url);    
}


// URLSearchParams - creates and manages URL query parameters, automatically encoding and decoding them
$.urlParams = function (value) {
try {
    return new URLSearchParams(value);
} catch(err) {
 $.simulateErrorDetails(err, true);   
}   
}


// $.forEach - iterates over each element of an array and executes the callback
$.each = (collection = [], callback = () => {}) => collection.forEach(callback);

// $.map - creates a new array by applying the callback to each element
$.map = (collection = [], callback = () => {}) => collection.map(callback);

// $.filter - creates a new array with elements that pass the callback test
$.filter = (collection = [], callback = () => {}) => collection.filter(callback);

// $.reduce - reduces the array to a single value using the callback
$.reduce = (collection = [], callback = () => {}, initial) => collection.reduce(callback, initial);

// $.some - returns true if at least one element passes the callback test
$.some = (collection = [], callback = () => {}) => collection.some(callback);

// $.every - returns true if all elements pass the callback test
$.every = (collection = [], callback = () => {}) => collection.every(callback);

// $.find - returns the first element that passes the callback test
$.find = (collection = [], callback = () => {}) => collection.find(callback);

// $.findIndex - returns the index of the first element that passes the callback test
$.findIndex = (collection = [], callback = () => {}) => collection.findIndex(callback);

// fills an array of given length with a specified value from start to end index
$.fill = (length, value = '', start = 0, end) => Array(length).fill(value, start, end);


// Convert kebab-case to camelCase
$.kebabToCamel = function(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
};


// Convert camelCase to kebab-case
$.camelToKebab = function(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
};


// $.to12Hrs - formats a Date object into a customizable 12/24-hour string using specified format keys
$.to12Hrs = function(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!(date instanceof Date)) throw new Error('Invalid date');  

 const pad = (n) => n.toString().padStart(2, '0');

  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12; // convert 0 -> 12
  const map = {
    YYYY: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(hours24),
    hh: pad(hours12),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    Z: hours24 >= 12 ? 'PM' : 'AM'
  };
  return format.replace(/YYYY|MM|DD|HH|hh|mm|ss|Z/g, (match) => map[match]);  
};


// jQuery-like AJAX utility supporting fetch with XHR fallback, promises, callbacks, abort, and dataType handling
$.ajax = function(options) {
  if (!options.url || !options.url.trim()) throw new Error("Url is required");

  const urlRegex = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}(:[0-9]+)?(\/.*)?$/;
  if (!urlRegex.test(options.url)) throw new Error("Invalid Url");

  const controller = window.AbortController ? new AbortController() : null;
  const signal = controller?.signal;

  let method = (options.type ?? options.method ?? 'GET').toUpperCase();
  let dataType = (options.dataType ?? 'text').toLowerCase();
  let url = options.url;
  let body;

  if (['data', 'body'].some(k => k in options)) {
    body = options.data ?? options.body;
    if (method !== 'GET') {
      body = options.processData !== false ? new URLSearchParams(body).toString() : body;
    } else {
      url += options.processData !== false ? '?' + new URLSearchParams(body).toString() : '?' + body;
    }
  }

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    ...(options.headers || {})
  };
  if (body instanceof FormData) delete headers['Content-Type'];

  const fetchOptions = {
    method,
    headers,
    body: method !== 'GET' ? body : undefined,
    signal
  };

  if (typeof options.beforeSend === 'function') options.beforeSend(options);

  let xhr;

  const promise = new Promise((resolve, reject) => {
    // Use fetch if available
    if (window.fetch) {
      fetch(url, fetchOptions)
        .then(response => {
 if(response.status === 204) {
  textStatus = 'nocontent';
} else if(response.status === 304) {
  textStatus = 'notmodified';
} else if(response.ok) {
  textStatus = 'success';
} else {
  textStatus = 'error';
} 
 xhr = response; 
try {
return response[dataType]();
} catch {
  textStatus = 'parsererror';    
}
      })  
        .then(data => {
          resolve(data);
          options.success?.call(xhr, data, textStatus, xhr);
        })
        .catch(error => {
          reject(error);
          options.error?.call(xhr, error, textStatus, xhr);
        })
        .finally(() => options.complete?.call(xhr, textStatus, xhr));
    } else {
      // Fallback to XHR
      xhr = new XMLHttpRequest();
      xhr.open(method, url, options.async !== false);      
      Object.entries(headers).forEach(([k, v]) => xhr.setRequestHeader(k, v));
      
   try {
  xhr.responseType = dataType;   
} catch (error) {
  textStatus = 'parsererror';  
}
      
      xhr.onload = () => {               
      const status = xhr.status;         
          if (status === 204) textStatus = 'nocontent';
          else if (status === 304) textStatus = 'notmodified';
          else if(status >= 200 && status < 300) textStatus = 'success';
          else textStatus = 'error';                   
            resolve(xhr.response);
            options.success?.call(xhr, xhr.response, textStatus, xhr);         
          options.complete?.call(xhr, xhr,  textStatus);        
      };
      xhr.onerror = () => {
      const errorMsg = `XHR failed (status: ${xhr.status}, statusText: ${xhr.statusText || 'Network Error'})`;
        reject(xhr);
        options.error?.call(xhr, errorMsg, textStatus, xhr);
        options.complete?.call(xhr, xhr,  textStatus);        
      };
      if (controller) controller.signal.addEventListener('abort', () => xhr.abort());
      xhr.send(body);
    }
  });

  promise.abort = () => {
    controller?.abort();
    if (xhr && xhr.abort) xhr.abort();
    return promise;
  };

  promise.done = cb => { promise.then(data => cb?.call(xhr, data, textStatus, xhr)); return promise; };
  promise.fail = cb => { promise.catch(err => cb?.call(xhr, err, textStatus, xhr)); return promise; };
  promise.always = cb => { promise.finally(() => cb?.call(xhr, xhr,  textStatus)); return promise; };

  return promise;
};
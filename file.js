  // Define the selector function 
 function $(element) {
return new jUtils(element);    
 }

// Define the library class that handle various methods 
 class jUtils {
constructor(element) {
if(typeof element === 'string' && element.trim().startsWith('<') && element.trim().endsWith('>') && element.trim().length >= 3) {
const createElement = document.createElement('div');
createElement.innerHTML = element;
return new jUtils(createElement);
} else if(typeof element === 'string' && element.trim().startsWith(':')) {
const containerElement = document.createElement(element.trim().replace(':', ''));
return new jUtils(containerElement);
} else {
if (typeof element === 'string') {
  try {
    const elements = document.querySelectorAll(element);
   this.element = elements.length > 0 ? elements : element;        
  } catch (err) {
    this.element = element;    
  }
} else {
  this.element = element; 
}
}   
}


// Select element based on index
at(index = 0) {
return new jUtils(this.element[index]); 
}


// Used for setting or updating elements, doesn't return a value 
set(callback) {
// Prevent running callbacks if no valid element exists
if (this.absent()) return;
try {
// Check if element length is greater than 1
if(this.element.length > 1) {
// Execute an array method for the element if the element length is above 1
Array.from(this.element).forEach(callback);    
} else {
// If element length equal to 1 and not greater than 1
if(this.element[0] === undefined) {
// Execute a callback function with the selected element if at() method was called 
callback(this.element);
return;
}
// Execute a callback function with the first element if at() method was not called 
callback(this.element[0]);    
}  
} catch(err) {
 $.simulateErrorDetails(err, true); 
}
}


// Used for setting or updating elements, it return a value
get(callback, loopType) {
 // Prevent running callbacks if no valid element exists
if (this.absent()) return;
try {
// Check if element length is greater than 1
if(this.element.length > 1) {
// If loopType is defined return an array of elements 
if(loopType !== undefined) {
return $(this.element)[loopType]((item) => callback(item));  
}  
// If loopType is undefined 
return callback(this.element[0]);    
} else {
// If element length equal to 1 and not greater than 1
 if(this.element[0] !== undefined) {
 // Return a value and execute a callback function with the first element if at() method was not called 
return callback(this.element[0]);         
 } else {
 // Return a value and execute a callback function with the selected element if at() method was called 
return callback(this.element);           
 }    
} 
} catch(err) {
$.simulateErrorDetails(err, true);
}
}


// Set or get elements innerHTML
html(content) {
if (content !== undefined) {
    this.set((element) => {
      element.innerHTML = content;
    });
    return new jUtils(this.element);
  } else {
return this.get((element) => element.innerHTML);  
  }    
}


// Set or get elements textContent
text(content) { 
if (content !== undefined) {
    this.set((element) => {
      element.textContent = content;
    });
    return new jUtils(this.element);
  } else {
  return this.get((element) => element.textContent);
  }     }


// Set or get elements value
val(content) {
if (content !== undefined) {
    this.set((element) => {
      element.value = content;
    });
    return new jUtils(this.element);
  } else {
  return this.get((element) => element.value);
  }    
}


// Returns native element
toNative(index) {
if(index !== undefined) {
return this.element[index];   
} else {
return this.get(element => element, 'map'); 
}      
}


// ForEach array method(return undefined)
each(callback) {
Array.from(this.element).forEach(callback);   
}


// Filter array method(return the filtered result)
filter(callback) {
return Array.from(this.element).filter(callback);       
    }

    
// Map array method(return the mapped result) 
map(callback) {
return Array.from(this.element).map(callback);       
    }
    

// Count array method(return the total count)
count(callback, flag = 0) {
let count = flag;
for (let i = 0; i < this.element.length; i++) {
    if (callback(this.element[i])) {
      count++;
    }
  }
  return count;        
    }


// Reduce array method(return the result)   
reduce(callback) {
return Array.from(this.element).reduce(callback);       
    }


// Find array method(return the find result)    
find(callback) {
return Array.from(this.element).find(callback);       
    }
    

// Some array method(return the boolean of the result)
some(callback) {
return Array.from(this.element).some(callback);       
    } 
        
 
 // Apply css styles to element 
 css(styles, property) {
if(typeof styles === 'object') {
this.set((element) => {
  Object.assign(element.style, styles);
});   
return new jUtils(this.element);    
}   

if(styles !== undefined && property !== undefined) {
this.set((element) => {
element.style[styles] = property;       
});
return new jUtils(this.element);    
} else if(styles !== undefined && property === undefined) {
return this.get((element) => element.style[styles]);
    } else {
    return null;
}       
 }
 

// Append elements 
append(content) {
this.set((item) => {
item.append(content);     
});                  
return new jUtils(this.element);        
}


// Prepend elements 
prepend(content) {
this.set((item) => {
item.prepend(content);     
});                         
return new jUtils(this.element);       
}


// Append elements to container
appendTo(selector) {
this.set((element) => {
try {
document.querySelector(selector).append(element);
} catch {
selector.append(element);              
} 
});       
return new jUtils(this.element);        
}


// Prepend elements to container 
prependTo(selector) {
this.set((element) => {
try {
document.querySelector(selector).prepend(element);
} catch {
selector.prepend(element);              
}         
});               
return new jUtils(this.element);         
}


// Set or get attribute on an elements
attr(attrName, attrValue) {
if(attrName !== undefined && attrValue !== undefined) {
this.set((item) => {
item.setAttribute(attrName, attrValue);
});               
return new jUtils(this.element);  
} else if(attrName !== undefined && attrValue === undefined) {
return this.get((item) => item.getAttribute(attrName));               
} else {
 return null;
}           
}


// Remove existing attribute from elements 
removeAttr(attrName) {
this.set((item) => {
item.removeAttribute(attrName);
});                       
return new jUtils(this.element);     
}


// Hide elements with optional delay 
hide(duration = 0) {
this.set((element) => {
if(duration > 0) {
setTimeout(() => {
element.style.display = 'none';       
}, duration);  
} else {
element.style.display = 'none';   
}
});
return new jUtils(this.element);   
}
 

// Show elements with optional delay 
show(duration = 0) {
this.set((element) => {
if(duration > 0) {
setTimeout(() => {
element.style.display = 'block';       
}, duration);  
} else {
element.style.display = 'block';   
}
});
return new jUtils(this.element);   
}


// Toggle elements with optional delay 
toggle(duration = 0) {
this.set((element) => {
if(duration > 0) {
setTimeout(() => {
element.style.display = element.style.display === 'none' ? 'block' : 'none';       
}, duration);  
} else {
element.style.display = element.style.display === 'none' ? 'block' : 'none'; 
}
});
return new jUtils(this.element);   
}


// Add class list to elements 
addClass(styles) {
this.set((item) => {
item.classList.add(styles);
});                        
return new jUtils(this.element);      
}


// Toggle class list in elements 
toggleClass(styles) {
this.set((item) => {
item.classList.toggle(styles);
});                  
return new jUtils(this.element);      
}


// Remove class list in element 
removeClass(styles) {
this.set((item) => {
item.classList.remove(styles);
});                      
return new jUtils(this.element);       
}


// Check if elements has class list
hasClass(styles) {
return this.get((item) => item.classList.contains(styles), 'some');    
}


// Add custom event listener to elements 
on(types, selector, handler, options) {
this.set(element => {
const eventType = types.split(/\s+/);
if(typeof selector === 'string' || typeof handler === 'function') {
const childElements = element.querySelectorAll(selector);
childElements.forEach(childElement => {
eventType.forEach(event => {
childElement.addEventListener(event, handler, options);
});
const id = $.randAlpha(6);
this.events?.push({id, callback: handler, options, type: types, selector});    
childElement.setAttribute('_myId_', id);
element.setAttribute('_myId_', id);
});
} else {
eventType.forEach(event => {
element.addEventListener(event, selector, handler);
});
const id = $.randAlpha(6);
this.events?.push({id, callback: selector, options: handler, type: types});    
element.setAttribute('_myId_', id);
} 
}); 
return handler || selector;
 } 



// Add click event listener to elements 
click(callback, options) {
this.set((element) => {
 element.addEventListener('click', callback, options);  
});
return callback;
}


// Remove event listener from elements 
off(types, selector, handler, options) {
this.set(element => {
if(typeof selector === 'string' || typeof handler === 'function') {
const childElements = element.querySelectorAll(selector);
childElements.forEach(childElement => {
const id = childElement.getAttribute('_myId_');
const obj = this.events.filter(item => item.id === id)[0];
const eventType = types?.split(/\s+/) || obj?.type.split(/\s+/);
eventType?.forEach(event => {
childElement.removeEventListener(event, handler || obj?.callback, options || obj?.options);
});
}); 
} else {
const id = element.getAttribute('_myId_');
const obj = this.events.filter(item => item.id === id)[0];
const eventType = types?.split(/\s+/) || obj?.type.split(/\s+/);

if(obj?.selector) {
const childElements = element.querySelectorAll(obj.selector);
childElements.forEach(childElement => {
eventType.forEach(event => {
childElement.removeEventListener(event, selector || obj?.callback, handler || obj?.options);
});    
});
} else {
eventType?.forEach(event => {
element.removeEventListener(event, selector || obj?.callback, handler || obj?.options);
});
}
}
});   
}


// Check if the current selection contains no valid DOM element 
absent() {
  return !this.element || (!(this.element[0] instanceof Element) && !(this.element instanceof Element));
}


// Apply a css blur filter to the selected elements 
setBlur(amount = '1px') {
this.set((element) => {
element.style.filter = `blur(${amount})`;    
});
return new jUtils(this.element);       
}


// Apply a fadeIn effect to elements 
fadeIn(delay, callback = () => {}) {
this.set((item) => {
    item.style.opacity = '0';
    item.style.transition = `opacity ${delay / 1000}s`;
    item.style.opacity = '1';

    const handleTransitionEnd = () => {
      item.removeEventListener('transitionend', handleTransitionEnd);
      callback(item);       
      }  
      
item.addEventListener('transitionend', handleTransitionEnd);
  });      
return new Promise((resolve, reject) => {
setTimeout(() => {
 resolve(this.element); 
 }, delay);       
});      
   } 
 

// Apply a fadeOut effect to elements 
fadeOut(delay = 0, callback = () => {}) {
  this.set((item) => {
    item.style.opacity = '1';
    item.style.transition = `opacity ${delay / 1000}s`;
  item.style.opacity = '0';

   const handleTransitionEnd = () => {  
         item.removeEventListener('transitionend', handleTransitionEnd);
callback(item);
    };

    item.addEventListener('transitionend', handleTransitionEnd);
  });

return new Promise((resolve, reject) => {
setTimeout(() => {
 resolve(this.element); 
 }, delay);  
 });     
   }


// Delay a queue on an accurate interval 
delay(ms = 0, callback) {
  this.delayChain = this.delayChain || Promise.resolve(this.element);
  this.delayChain = this.delayChain.then(element => {
    return new Promise(resolve => {
      setTimeout(() => {
        callback(element);
        resolve(element);
      }, ms);
    });
  });
  return this;
}


// Apply a fade Toggle effect on elements
fadeToggle(delay = 0, callback = () => {}) {
  this.set((item) => {
    const isVisible = item.style.opacity === '' || item.style.opacity === '1';
    item.style.transition = `opacity ${delay / 1000}s`;
    item.style.opacity = isVisible ? '0' : '1';
    const handleTransitionEnd = () => {
      item.removeEventListener('transitionend', handleTransitionEnd);
      callback(item);
    };
    item.addEventListener('transitionend', handleTransitionEnd);
  });  
  return new Promise((resolve, reject) => {
setTimeout(() => {
 resolve(this.element); 
 }, delay);       
});
   }


// Set data attribute on elements 
data(key, value) {
if(key !== undefined && value !== undefined) {
this.set((item) => {
item.dataset[key] = value;
}); 
return new jUtils(this.element);      
} else if(key !== undefined && value === undefined) {
return this.get((item) => item.dataset[key]);     
} else {
return null;   
}  
   }


// Scroll elements from left to right 
scrollRight(delay = 10, stop = 10000, callback = () => {}) {
  this.set((item) => {
    const originalHtml = item.innerHTML;
    const timer = delay / 1000;
    const text = item.textContent;
    item.style.overflow = 'hidden';
    item.style.width = '100%';
    item.innerHTML = `<span style="display: inline-block; white-space: nowrap;">${text}</span>`;
    let x = -item.querySelector('span').offsetWidth;
    const intervalId = setInterval(() => {
      x += 1;
      item.querySelector('span').style.transform = `translateX(${x}px)`;
      if (x >= item.offsetWidth) {
        x = -item.querySelector('span').offsetWidth;
      }
    }, timer);
    setTimeout(() => {
      clearInterval(intervalId);
      item.style.transform = '';
      item.style.overflow = '';
      item.innerHTML = originalHtml; // Restore original HTML content
      callback(item);
    }, stop);
  });  
return new Promise((resolve, reject) => {
setTimeout(() => {
 resolve(this.element); 
 }, stop);       
});  
   }


// Scroll elements from right to left
scrollLeft(delay = 10, stop = 10000, callback = () => {}) {
  this.set((item) => {
    const originalHtml = item.innerHTML;
    const timer = delay / 1000;
    const text = item.textContent;
    const width = item.offsetWidth;
    item.style.overflow = 'hidden';
    item.style.width = width + 'px';
    item.innerHTML = `<span style="display: inline-block; white-space: nowrap;">${text}</span>`;
    let x = width;
    const intervalId = setInterval(() => {
      x -= 1;
      item.querySelector('span').style.transform = `translateX(${x}px)`;
      if (x <= -item.querySelector('span').offsetWidth) {
        x = width;
      }
    }, timer);
    setTimeout(() => {
      clearInterval(intervalId);
      item.style.transform = '';
      item.style.overflow = '';
      item.innerHTML = originalHtml; // Restore original HTML content
      callback(item);
    }, stop);
  });  
return new Promise((resolve, reject) => {
setTimeout(() => {
 resolve(this.element); 
 }, stop);       
});    
   }



slideRight(delay = 10000, callback = () => {}) {
  this.set((item) => {
    document.body.style.position = 'fixed';
    item.style.display = 'none';
    setTimeout(() => {
      item.style.display = 'block';
      item.style.position = 'relative';
      item.style.left = `-${item.offsetWidth + 10}px`;
      item.style.transition = `left ${delay / 1000}s ease-in-out`;
      setTimeout(() => {
        item.style.left = '0px';
      }, 0);
      if (callback) {      
        setTimeout(() => {        
          callback(item);          
        }, delay);        
      } else {
          return null;
      }
    }, 0);
  });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.element);
    }, delay);
  });  
   }


   slideUp(delay = 10000, callback = () => {}) {
  this.set((item) => {
    const scrollHeight = item.scrollHeight;
    const fit = delay / 1000; /* Calculate the transition time in seconds */
    item.style.transition = `max-height ${fit}s ease-in-out`;
    item.style.overflow = 'hidden';
    item.style.maxHeight = `${scrollHeight}px`;
    // Trigger the animation
    requestAnimationFrame(() => {
      item.style.maxHeight = '0px';
    });
    if (callback) { 
      setTimeout(() => {
        callback(item);
      }, delay);
    }
  });
return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.element);
    }, delay);
  });    
   }


   slideDown(delay = 10000, callback = () => {}) {
  this.set((item) => {
    const scrollHeight = item.scrollHeight;
    const fit = delay / 1000; /* Calculate the transition time in seconds */
    item.style.transition = `max-height ${fit}s ease-in-out`;
    item.style.overflow = 'hidden';
    item.style.maxHeight = '0px';
    // Trigger the animation
    requestAnimationFrame(() => {
      item.style.maxHeight = `${scrollHeight}px`;
    });
   if (callback) { 
      setTimeout(() => {
        callback(item);
      }, delay);
    }
  });
return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.element);
    }, delay);
  });    
   }


slideLeft(delay = 10000, callback = () => {}) {
  this.set((item) => {
    document.body.style.position = 'fixed';
    item.style.display = 'none';
    setTimeout(() => {
      item.style.display = 'block';
      item.style.position = 'relative';
      item.style.left = `${window.innerWidth}px`;
      item.style.transition = `left ${delay / 1000}s ease-in-out`;
      setTimeout(() => {
        item.style.left = '0px';
      }, 0);
      if (callback) {
        setTimeout(() => {
          callback(item);
        }, delay);
      }
    }, 0);
  });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.element);
    }, delay);
  });
   }





swipeLeft(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30,     
    callback: (e) => {
  console.log(e);      
    },
  };

  let opts;

   // Check if options is a function
  if (typeof options === 'function') {
    opts = { ...defaults, callback: options };
  } else {
    opts = { ...defaults, ...options };
  }

  let startX = 0;
  
  
  this.set((item) => {      
 item.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  });

  item.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].clientX;
if(item.offsetWidth !== undefined) {        
    if (startX > item.offsetWidth - opts.edgeThreshold) return; // check if start point is close enough to the edge
    if (endX - startX > opts.threshold) {
      opts.callback("Swiped from left!");
    }
    } else {
 if (startX > opts.edgeThreshold) return; // check if start point is close enough to the edge
    if (endX - startX > opts.threshold) {
      opts.callback("Swiped from left!");
    }        
    }
  });  
  });
   }


swipeDown(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30,    
    callback: (e) => {
  console.log(e);      
    },
  };

  let opts;

   // Check if options is a function
  if (typeof options === 'function') {
    opts = { ...defaults, callback: options };
  } else {
    opts = { ...defaults, ...options };
  }

  let startY = 0;
  
  this.set((item) => {      
  item.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
  });

  item.addEventListener('touchend', (event) => {
    const endY = event.changedTouches[0].clientY;
if(item.offsetWidth !== undefined) {                                    
    if (!opts.targetElement && startY < item.offsetHeight - opts.edgeThreshold) return; // check if start point is close enough to the bottom edge
    if (startY - endY > opts.threshold) {
      opts.callback("Swiped from bottom!");
    }    
    } else {
if (!opts.targetElement && startY < window.innerHeight - opts.edgeThreshold) return; // check if start point is close enough to the bottom edge
    if (startY - endY > opts.threshold) {
      opts.callback("Swiped from bottom!");
    }        
    }    
    });
  });
   }


swipeRight(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30,    
    callback: (e) => {
   console.log(e);     
    },
  };

let opts;

   // Check if options is a function
  if (typeof options === 'function') {
    opts = { ...defaults, callback: options };
  } else {
    opts = { ...defaults, ...options };
  }


  let startX = 0;
 
 this.set((item) => {      
  item.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  });

  item.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].clientX; 
if(item.offsetWidth !== undefined) {      
    if (startX < item.offsetWidth - opts.edgeThreshold) return; // only trigger if swipe starts from right edge
    if (startX - endX > opts.threshold) {
      opts.callback('swipe from right!');
    } 
    } else {
if (startX < window.innerWidth - opts.edgeThreshold) return; // only trigger if swipe starts from right edge
    if (startX - endX > opts.threshold) {
      opts.callback('swipe from right!');
    }         
    }      
  });
  });
   }


swipeUp(options = {}) {
  const defaults = {
    threshold: 50,
    edgeThreshold: 30,    
    callback: (e) => {
  console.log(e);      
    },
  };

  let opts;

   // Check if options is a function
  if (typeof options === 'function') {
    opts = { ...defaults, callback: options };
  } else {
    opts = { ...defaults, ...options };
  }

  let startY = 0;
  
  this.set((item) => {      
  item.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
  });

  item.addEventListener('touchend', (event) => {
    const endY = event.changedTouches[0].clientY;
if(item.offsetHeight !== undefined) {        
    if (!opts.targetElement && startY > item.offsetHeight - opts.edgeThreshold) return; // check if start point is close enough to the top edge
    if (endY - startY > opts.threshold) {
      opts.callback("Swiped from top!");
    }
    } else {
if (!opts.targetElement && startY > opts.edgeThreshold) return; // check if start point is close enough to the top edge
    if (endY - startY > opts.threshold) {
      opts.callback("Swiped from top!");
    }        
    }
  });
  });
   }



is(callback) {        
return this.get((item) => {  
    // ID selector
    if (callback.startsWith('#')) { 
if(item instanceof NodeList) {
return false;       
} else {
return item.getAttribute('id') === callback.slice(1).trim();    
}     
    }

    // Class selector
    if (callback.startsWith('.')) {
      const className = callback.slice(1).trim();
      return item.classList.contains(className);
    }
    
    // Special selectors
    switch (callback) {
      case ':int':
        return !isNaN(item) && item % 1 === 0;
      case ':float':
        return !isNaN(item) && item % 1 !== 0;
      case ':even':
        return item % 2 === 0;
      case ':odd':
        return item % 2 !== 0;
      case ':negative':
        return item < 0;
      case ':positive':
        return item > 0;
      case ':visible':
        return item.offsetParent !== null;
      case ':hidden':
        return item.offsetParent === null;
      case ':nan':
        return isNaN(item);
      case ':removed':
        return !item;
      case ':checked':
        return item.checked;
      case ':enabled':
        return !item.disabled;
      case ':disabled':
        return item.disabled;
      case ':selected':
        return item.selected;       
    }
    
 // Attribute selector
 if (callback.startsWith('[') && callback.endsWith(']')) {    
      return item.hasAttribute(callback.slice(1, -1));
    }
    
    // Attribute value selector
if (callback.includes('=')) {
      const [attr, value] = callback.split('=');
      return item.getAttribute(attr) === value;
    }
    
    // Tag name selector
if (item.tagName === callback.toUpperCase()) {
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
    if (inputTypes.includes(callback)) {
      return item.type === callback;
    }    
    return false;         
 }, 'some');
   }


// Get child elements based on a selector or index.
child(selector) {
return this.get((item) => { 
  if (typeof selector === 'number') {
    // If selector is a number, use it as an index        
    return item.children[selector];
  } else if (typeof selector === 'string') {
    // If selector is a string, use it as a CSS selector
return Array.from(item.querySelectorAll(selector));
  } else {
    throw new Error('Invalid selector type. Expected a string or number.');
  }  
  });
   }


// get element firstchild
   first(selector) {
return this.get((item) => { 
  const child = item.firstElementChild;
  if (!child) return null;
  if (selector && !child.matches(selector)) return null;
  return child;
  });
   };

   
// get element lastchild   
   last(selector) {
return this.get((item) => {    
  const child = item.lastElementChild;
  if (!child) return null;
  if (selector && !child.matches(selector)) return null;
  return child;
  });
   };
   
   
   // Insert content before the element
before(content) {
 this.set((item) => { 
  if (typeof content === 'string') {
    // Insert HTML string before element
item.insertAdjacentHTML('beforebegin', content);
  } else {
    // Insert element/node before this.element
item.parentNode.insertBefore(content, item);
  } 
  });
return new jUtils(this.element); 
   };
   
   
   // Insert content after the element
 after(content) {
this.set((item) => {  
  if (typeof content === 'string') {
    // Insert HTML string after element
item.insertAdjacentHTML('afterend', content);
  } else {
    // Insert element/node after this.element
item.parentNode.insertBefore(content, item.nextSibling);
  }
  });
return new jUtils(this.element); 
   };
   


// make text not ccopyable 
 preventCopy() {
this.set((item) => { 
 const element = item;
    if (element) {
    const style = document.createElement('style');
    style.textContent = `
      .uncopyable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);
    element.classList.add("uncopyable");
    element.addEventListener("selectstart", function(event) {
      event.preventDefault();
    });
  element.addEventListener("contextmenu", function(event) {
      event.preventDefault();
    });
  }
  });
   }
   
   
// Autotyping logic 
typeWriter(content, options = {}) {
  this.set((item) => {
    const defaults = {
      typeSpeed: 5000,
      loop: 1,
      stopAt: null,
      parser: 'html',
      doneText: null
    };
    const settings = { ...defaults, ...options };

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
      return '<span style="border-right: 1px solid black; margin-left: 1px;"></span>';
    }

    function type() {
      let textContent = settings.parser === 'text' ? getTextContent(contents[currentContentIndex]) : contents[currentContentIndex];

      if (isDeleting) {
        item.innerHTML = textContent.substring(0, currentIndex) + getCaret();
        currentIndex--;
        if (currentIndex < 0) {
          isDeleting = false;
          currentContentIndex = (currentContentIndex + 1) % contents.length;
          if (settings.loop !== true && currentContentIndex === 0) {
            loopCount++;
            if (loopCount >= settings.loop) {
              clearInterval(intervalId);
              const displayText = settings.doneText || (settings.parser === 'html' ? contents[contents.length - 1] : getTextContent(contents[contents.length - 1]));
              item.innerHTML = displayText;
            }
          }
        }
      } else {
        item.innerHTML = textContent.substring(0, currentIndex + 1) + getCaret();
        currentIndex++;
        if (settings.stopAt && textContent.substring(0, currentIndex).includes(settings.stopAt)) {
          isDeleting = true;
        }
        if (currentIndex >= textContent.length) {
          isDeleting = true;
        }
      }
    }

    const intervalId = setInterval(type.bind(this), settings.typeSpeed / 10);
  });
}


// Masked
masked(symbol = "*", length) {
  const tag = this.get(item =>
    ['INPUT', 'TEXTAREA'].includes(item.tagName) ? 'value' : 'textContent'
  );

  this.set(item => {
    // Store original data if not already stored
    if (!item.originalData) item.originalData = item[tag];

    const maskLength = length || item[tag].length;
    item[tag] = symbol.repeat(maskLength);
  });

  return this; // chainable
}


// Unmasked
unmasked() {
  this.set(item => {
    if (item.originalData) {
      const tag = ['INPUT', 'TEXTAREA'].includes(item.tagName) ? 'value' : 'textContent';
      item[tag] = item.originalData;
      delete item.originalData;
    }
  });

  return this; // chainable
}


// Select next element 
next(selector) {
return this.get((item) => {
  const sibling = item.nextElementSibling;
  if (!sibling) return null;
  if (selector && !sibling.matches(selector)) return null;
  return new jUtils(sibling);  
  });
};


// Select previous element 
prev(selector) {
return this.get((item) => {
  const sibling = item.previousElementSibling;
  if (!sibling) return null;
  if (selector && !sibling.matches(selector)) return null;
  return new jUtils(sibling);
  });
};


createToggle(options = {}) {
  this.set(item => {
    // Default HTML for toggle
    item.innerHTML = `
      <label class="jutils-toggle">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
    `;

    // Default styles
    const style = document.createElement('style');
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
        background-color: ${options.background ?? '#ccc'};
        transition: 0.4s;
        border-radius: ${options.slider?.borderRadius ?? '34px'};
      }

      .jutils-toggle .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: ${options.knobColor ?? '#fff'};
        transition: 0.4s;
        border-radius: ${options.slider?.knobBorderRadius ?? '50%'};
      }

      .jutils-toggle input:checked + .slider {
        background-color: ${options.checkedBg ?? '#2196F3'};
      }

     .jutils-toggle input:checked + .slider:before {
  transform: translateX(26px);
  background-color: ${options.checkedKnobColor ?? (options.knobColor ?? '#fff')};
}
    `;

    document.head.appendChild(style);
  });

  // Get all checkbox inputs
  const isChecked = this.get((item) => item.querySelector('input'), 'map');

    $(isChecked).on('change', (e) => {
        if(options.callback) {
   options.callback(e.target);         
        } else if(typeof options === 'function'){
 options(e.target);         
        } else {        
           return null;
        }
    });
    return isChecked; // return inputs for further chaining if needed
}


// Detach one or more elements and allow restore() or assignTo()
detach() {
  // Get parent and sibling references, normalize to array
  const parentList = [].concat(this.get(item => item.parentNode, "map"));
  const nextList = [].concat(this.get(item => item.nextSibling, "map"));

  // Store direct element references, normalize to array
  const storedElements = [].concat(this.get(item => item, "map"));

  // Remove all from DOM
  this.set(item => item.remove());

  // Return control object
  return {
    // Restore each element to its original position
    restore: () => {
      try {
        storedElements.forEach((item, i) => {
          const parent = parentList[i];
          const nextSibling = nextList[i];
          if (!parent) return;

          try {
            if (nextSibling && nextSibling.parentNode === parent) {
              parent.insertBefore(item, nextSibling);
            } else {
              parent.appendChild(item);
            }
          } catch {
            parent.appendChild(item);
          }
        });
      } catch (err) {
        console.error(err);
      }
    },

    // Assign all detached elements to a new container
    assignTo: (target) => {
      const newParent =
        typeof target === "string" ? document.querySelector(target) : target;

      if (!newParent || !newParent.appendChild) return;

      storedElements.forEach(item => newParent.appendChild(item));
    },

    // Return stored element(s)
    element: () => (storedElements.length === 1 ? storedElements[0] : storedElements),
  };
}



// Restricts input or text content to a maximum character length
limitInputLength(maxLength, onLimit = () => {}) {
  this.catchSet((element) => {
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

        // Store current character count in a custom attribute
        element.setAttribute('data-chars', currentLength);

        // Enforce limit
        if (currentLength > maxLength) {
          element[prop] = currentValue.slice(0, maxLength);
          onLimit(maxLength, element);
        }
      });
    }
  });
}




// Displays a temporary skeleton loading effect over an element
applySkeletonLoader(options = 5000, onComplete = () => {}) {
  const duration = (typeof options === 'object' ? options.duration : options) ?? 5000;

  this.set((element) => {
    // Create skeleton block
    const skeleton = document.createElement('div');
    Object.assign(skeleton.style, {
      height: '20px',
      background: '#ccc',
      marginBottom: '10px',
      borderRadius: '10px',
      width: `${element.offsetWidth || 200}px`,
      animation: 'skeletonPulse 1.5s infinite',
      ...((typeof options === 'object' && !Array.isArray(options)) ? options : {})
    });

    // Hide actual element during skeleton display
    element.style.display = 'none';
    element.parentNode.appendChild(skeleton);

    // Add animation style if not already defined
    if (!document.getElementById('skeletonPulseStyle')) {
      const style = document.createElement('style');
      style.id = 'skeletonPulseStyle';
      style.textContent = `
        @keyframes skeletonPulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup skeleton after duration
    setTimeout(() => {
      skeleton.remove();
      element.style.display = ''; // restore visibility
      const callback = (typeof options === 'object' && options.callback) || onComplete;
      callback(element);
    }, duration);
  });

  // Return a promise for async chaining
  return new Promise((resolve) => {
    setTimeout(() => resolve(this.element), duration);
  });
}



// Apply a floating label effect to input fields.
// Converts the placeholder into a floating label that moves above the field on focus or input.
applyFloatingLabel(options) {
  this.set((input) => {
    const originalPlaceholder = input.getAttribute('placeholder') || '';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('yf-floating-wrapper');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.marginTop = '10px';

    // Wrap the input
    input.parentNode.replaceChild(wrapper, input);
    wrapper.appendChild(input);

    // Create label
    const label = document.createElement('label');
    label.classList.add('yf-floating-label');

    // Handle options
    if (typeof options === 'object' && !Array.isArray(options)) {    
      Object.assign(label.style, options);
      label.textContent = options.placeholder ?? originalPlaceholder;
      label.id = options.id ?? null;
      label.classList.add(options.class ?? null);      
    } else if (typeof options === 'string') {
      if (options.startsWith('#')) {
        label.id = options.slice(1).trim();
        label.textContent = originalPlaceholder;
      } else if (options.startsWith('.')) {
         label.classList.add(options.slice(1).trim());                 
        label.textContent = originalPlaceholder;        
      } else {
        label.textContent = options;
        label.style.background = 'white';
      }
    } else {
      label.textContent = originalPlaceholder;
      label.style.background = 'white';
    }

    wrapper.appendChild(label);
    input.removeAttribute('placeholder');

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
      if (input.value.trim() !== '') {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    };

    input.addEventListener('input', toggleLabel);
    input.addEventListener('focus', () => label.classList.add('active'));
    input.addEventListener('blur', toggleLabel);

    // Initialize state
    toggleLabel();
  });
}



// Create a customizable horizontal divider with optional centered text
createDivider(options) {
  this.set((container) => {
    let text = '';

    // Handle text input type
    if (typeof options === 'object' && !Array.isArray(options)) {
      text = options.text ?? container.textContent ?? '';
    } else if (typeof options === 'string' || typeof options === 'number') {
      text = options;
    } else {
      text = container.textContent ?? '';
    }

    // Create divider elements
    const leftLine = document.createElement('hr');
    const rightLine = document.createElement('hr');
    const centerText = document.createElement('span');

    leftLine.classList.add('yf-divider-line');
    rightLine.classList.add('yf-divider-line');
    centerText.classList.add('yf-divider-text');
    centerText.textContent = text;

    // Base layout styling
    Object.assign(container.style, {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      gap: '10px',
    });

    // Default divider style
    [leftLine, rightLine].forEach((line) => {
      Object.assign(line.style, {
        flexGrow: 1,
        border: 'none',
        borderTop: '2px solid black',
        borderRadius: '2px',
      });
    });

    // Apply custom styles if provided
    if (typeof options === 'object' && !Array.isArray(options)) {
      if (options.lineStyle) {
        [leftLine, rightLine].forEach((line) => {
          Object.assign(line.style, options.lineStyle);
        });
      }
      if (options.textStyle) {
        Object.assign(centerText.style, options.textStyle);
      }
    }

    // Clear old content and append new elements
    container.innerHTML = '';
    container.append(leftLine, centerText, rightLine);
  });
}




ready(handler) {
try {
  const target = this.element;

  if (target === document) {
    document.addEventListener('DOMContentLoaded', handler);
  } 
  else if (target === window) {
    window.addEventListener('load', handler);
  } 
  else {
    throw new TypeError(`Unsupported target: ${target}`);
  }
  } catch (err) {
$.simulateErrorDetails(err, true);      
  }
}


manageWindowEvent(eventType, handler, checkState = false) {
  if (checkState) {  
    // Return current online/offline status depending on the eventType
    return eventType === 'offline' ? !navigator.onLine : navigator.onLine;    
  } else {
    // Attach event listener to window
    window.addEventListener(eventType, handler);
  }
}


status(handler) { 
  if (typeof handler === 'function') {
    this.manageWindowEvent(this.element, handler);
   } else {
   return this.manageWindowEvent(this.element, handler, true);      
  }
}



animateLoader(loadSpeed, stopLoader, callback = () => {}) {
  const speedDuration = typeof loadSpeed === 'object' ? loadSpeed.speed ?? 1000 : loadSpeed ?? 1000;
  const stopDuration = typeof loadSpeed === 'object' ? loadSpeed.duration ?? 5000 : stopLoader ?? 5000;

  this.set((element) => {
    window.addEventListener('load', () => {
      if (typeof loadSpeed === 'object') {
        Object.assign(element.style, loadSpeed);
        setTimeout(() => {
          element.style.animation = 'none';
          loadSpeed.callback?.(element);        
        }, stopDuration);
      } else {
        setTimeout(() => {
          element.style.animation = 'none';
          callback(element);        
        }, stopDuration);
      }
    });

    // Spinner setup
    element.innerHTML = '';
    element.style.cssText = `
      width: 40px;
      height: 40px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #3498db;
      border-radius: 70%;
      animation: spin ${speedDuration / 1000}s linear infinite;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    // Automatically remove the keyframe style when done
    setTimeout(() => style.remove(), stopDuration + 1000);
  });

  // Promise resolves when loader stops
  return new Promise((resolve) => {
    setTimeout(() => resolve(this.element), stopDuration);
  });
}



animateProgress(duration, config = () => {}) {
  const totalTime = typeof duration === 'object' ? duration.duration ?? 5000 : duration ?? 5000;

  this.set((element) => {
    window.addEventListener('load', () => {
      if (typeof duration === 'object' && !Array.isArray(duration)) {
        Object.assign(element.style, duration);
        progressFill.style.background = duration.progressColor ?? 'green';
        setTimeout(() => {
          duration.callback?.(element);
        }, totalTime);
      } else {
        setTimeout(() => {
          config(element);
        }, totalTime);
      }
    });

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
    progressFill.style.transition = `width ${totalTime / 1000}s linear`;

    element.appendChild(progressFill);

    // Start the animation
    setTimeout(() => {
      progressFill.style.width = '100%';
    }, 1);
  });

  // Resolve after the animation completes
  return new Promise((resolve) => {
    setTimeout(() => resolve(this.element), totalTime);
  });
}


// 🔧 makeEditable(options):
// Enables inline editing on an element with a custom placeholder and optional dynamic CSS styling.
// Supports Tab key for new block creation and placeholder behavior using ::before.
makeEditable(options) {
    this.set((element) => {
        // 1️⃣ Make element editable
        element.setAttribute('contenteditable', 'true');
element.style.display = 'block';


        // 2️⃣ Get placeholder and store in data attribute
        let placeholder = element.getAttribute('placeholder') || '';

let dynamicCss;   
   if(typeof options === 'object') {
placeholder = options.placeholder; 
    
// Generate CSS from options
 dynamicCss = Object.entries(options).map(([key, value]) => {
  return `${key}: ${value}; `;
}).join('');
}    
                                
        // 5️⃣ Add CSS for placeholder via ::before
        const styleId = 'contenteditable-placeholder-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');          
    if(typeof options === 'string' || typeof options === 'number') {
placeholder = options;       
    }
        

element.dataset.placeholder = placeholder;
            
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


cssText(styles, append = false) {
    // If no styles argument, return current cssText
    if (styles === undefined) {
        return this.get(elem => elem.style.cssText);
    } 
    
    // If append flag is true
    else if (append) {
        this.set(elem => {
            let existing = elem.style.cssText;
            if (existing && !existing.trim().endsWith(';')) existing += ';';
            elem.style.cssText = existing + styles;
        });
    } 
    
    // Otherwise, replace all styles
    else {
        this.set(elem => {
            elem.style.cssText = styles;
        });
    }

    return new jUtils(this.element);; // Allow chaining
};


/**
 * Observes how much a fixed element is covered by this scrollable element.
 * Calls the callback on scroll and resize with an info object:
 *   info.covered {Boolean}       - true if any part of fixed element is covered.
 *   info.percent {Number}        - percentage (0-100) of fixed element height covered.
 *   info.overlapHeight {Number}  - actual pixel height of the overlap.
 */
observeCover(fixedEl, callback) {
try {
  const self = this;

  function checkCover() {
    const a = fixedEl.getBoundingClientRect();
    const b = self.get(el => el.getBoundingClientRect());

    // compute overlap area vertically
    const overlapTop = Math.max(a.top, b.top);
    const overlapBottom = Math.min(a.bottom, b.bottom);
    const overlapHeight = Math.max(overlapBottom - overlapTop, 0);

    // normalize overlap to A's height (A = 100%)
    const percent = Math.min(Math.max((overlapHeight / a.height) * 100, 0), 100);

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

  // listen for changes
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', checkCover);

  // run once initially
  checkCover();

  // optional cleanup return
  return self.set(el => {
    el._observeCoverStop = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkCover);
    };
  });
  } catch (err) {
$.simulateErrorDetails(err, true);      
  }
};


/**
 * Process files selected by the input element, reading them according to the specified read type.
 * Calls the callback function with the file processing status and result.
 * 
 * @param {function} callback - The callback function to call with the file processing status and result.
 * @param {string} readType - The type of reading to perform on the file (e.g., 'text', 'url', 'array', 'binary').
 */
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
}




 
 }
 
 
 
 // Counts how many times a specific character appears.
$.charCount = function (element, char) {
  try {
    const str = element?.toString?.() ?? '';
    const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape safely
    const regex = new RegExp(escapedChar, 'g');
    return (str.match(regex) || []).length;
  } catch (err) {
    $.simulateErrorDetails(err, true);   
    return 0;
  }
};


// Concat 2 or more array or object 
$.merge = function (target, ...source) {
return Array.from(target).concat(...source);
}


// Counts the number of characters in the string based on specified type.
$.strCount = function (element, ...types) {
  try {
    const str = element?.toString?.() ?? "";

    const typeMap = {
      upper: s => (s.match(/[A-Z]/g) || []).length,
      uppercase: s => (s.match(/[A-Z]/g) || []).length,
      lower: s => (s.match(/[a-z]/g) || []).length,
      lowercase: s => (s.match(/[a-z]/g) || []).length,
      emoji: s => (s.match(/\p{Extended_Pictographic}/gu) || []).length,
      special: s => (s.match(/[^a-zA-Z0-9\p{Extended_Pictographic}\u200d\s]/gu) || []).length,
      specialcharacter: s => (s.match(/[^a-zA-Z0-9\p{Extended_Pictographic}\u200d\s]/gu) || []).length,
      number: s => (s.match(/[0-9]/g) || []).length,
      num: s => (s.match(/[0-9]/g) || []).length,
      alpha: s => (s.match(/[a-zA-Z]/g) || []).length,
      alphabet: s => (s.match(/[a-zA-Z]/g) || []).length,
    };

    if (!types.length) return 0;

    let totalCount = 0;

    for (const type of types) {
      let countFn = null;

      if (typeMap[type]) {
        countFn = typeMap[type];
      } else {
        try {
          const regex = new RegExp(type, "gu");
          countFn = s => (s.match(regex) || []).length;
        } catch {
          console.warn(`Invalid type ignored: ${type}`);
          continue;
        }
      }

      totalCount += countFn(str);
    }

    return totalCount;

  } catch (err) {
  $.simulateErrorDetails(err, true);
    return 0;
  }
};


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
return errDetails;
}


// Removes specified character types from the string.
$.removeStr = function (element, ...filters) {
  try {
    const filterMap = {
      emoji: s => s.replace(/[\p{Extended_Pictographic}\u200d]+/gu, ''),    
      number: s => s.replace(/[0-9]/g, ''),
      num: s => s.replace(/[0-9]/g, ''),    
      lowercase: s => s.replace(/[a-z]/g, ''),
      lower: s => s.replace(/[a-z]/g, ''),   
      uppercase: s => s.replace(/[A-Z]/g, ''),
      upper: s => s.replace(/[A-Z]/g, ''),   
      alphabet: s => s.replace(/[a-zA-Z]/g, ''),
      alpha: s => s.replace(/[a-zA-Z]/g, ''),   
      special: s => s.replace(/[^a-zA-Z0-9\p{Extended_Pictographic}\u200d\s]/gu, ''),    
      specialcharacter: s => s.replace(/[^a-zA-Z0-9\p{Extended_Pictographic}\u200d\s]/gu, ''),
    };

    let result = element?.toString?.() ?? '';

    // ✅ Build function list (support custom regex too)
    const removeFuncs = filters.map(f => {
      if (filterMap[f]) return filterMap[f]; // predefined filter

      // Try to interpret custom regex (string or literal)
      try {
        const regex = new RegExp(f, 'gu');
        return s => s.replace(regex, '');
      } catch {
        console.warn(`Invalid filter ignored: ${f}`);
        return null;
      }
    }).filter(Boolean);

    // ✅ Apply all filters
    for (const fn of removeFuncs) {
      result = fn(result);
    }

    return [...result];

  } catch (err) {
    $.simulateErrorDetails(err, true);   
    return element?.toString?.() ?? '';
  }
};



// Extracts and returns characters from the string based on specified filters.
$.extractStr = function (element, ...filters) {
  try {
    const filterMap = {
      emoji: c => /[\p{Extended_Pictographic}\u200d]/u.test(c),
      number: c => /[0-9]/.test(c),
      num: c => /[0-9]/.test(c),
      lowercase: c => /[a-z]/.test(c),
      lower: c => /[a-z]/.test(c),
      uppercase: c => /[A-Z]/.test(c),
      upper: c => /[A-Z]/.test(c),
      alphabet: c => /[a-zA-Z]/.test(c),
      alpha: c => /[a-zA-Z]/.test(c),
      special: s => /[^a-zA-Z0-9\p{Extended_Pictographic}\u200d\s]/u.test(s),
      specialcharacter: s => /[^a-zA-Z0-9\p{Extended_Pictographic}\u200d\s]/u.test(s),
    };

    // ✅ Convert filters into usable test functions
    const filterFuncs = filters.map(f => {
      if (filterMap[f]) return filterMap[f]; // predefined name
      try {
        // Try to interpret as regex
        const regex = new RegExp(f, 'u');
        return c => regex.test(c);
      } catch {
        console.warn(`Invalid filter ignored: ${f}`);
        return null;
      }
    }).filter(Boolean);

    if (filterFuncs.length === 0) return [];

    // ✅ Apply filters
    const result = [...element].filter(char =>
      filterFuncs.some(fn => fn(char))
    );

    return result; // always safe array
  } catch (err) {
    $.simulateErrorDetails(err, true);   
    return [];
  }
};





// 💎 $.retainChar(element, charsToKeep, replacement = '', global = false)
// Strictly retains only specified regex character classes (must be inside [ ])
// Cleans up emoji fragments / zero-width joiners gracefully to avoid "missing emoji" boxes.
$.retainChar = function(element, charsToKeep, replacement = '', global = false) {
  try {
    const str = element?.toString() ?? '';
    if (!charsToKeep) return str;

    const flags = (global ? 'g' : '') + 'u'; // add 'u' for Unicode safety

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
    const regex = new RegExp(pattern, flags);

    // Replace non-matching characters, and clean zero-width joiners or orphan emoji code units
    return [...str
      .replace(regex, replacement)
      .replace(/[\u200D\uFE0F]/gu, '')]; // remove invisible emoji joiners
  } catch (err) {
    $.simulateErrorDetails(err, true);   
  }
};


// 💎 $.customCallback(result, callback, joinText)
// A universal handler for $.string utilities (extractStr, retainChar, removeStr, etc.)
// - result: string or array output from a $.method
// - callback: function that receives the joined text or raw string
// - joinText: optional join config (e.g. { join: ' ' } or a custom string)
// ✅ Automatically joins arrays, handles objects, and supports chaining safely.
$.processResult = function(result, callback, joinText) {
  try {
    if (typeof callback === 'function') {
      let matchText;

      // 🧩 Handle arrays with flexible joining logic
      if (Array.isArray(result)) {
        if (typeof joinText === 'object' && 'join' in joinText) {
          matchText = result.join(joinText.join ?? '');
        } else if (typeof joinText === 'string') {
          matchText = result.join(joinText);
        } else {
          matchText = result.join('');
        }
      } 
      // 🧱 Non-array (string, number, etc.)
      else {
        matchText = [...result?.toString?.() ?? ''].join(joinText.join ?? '');
      }

      // ✅ Return callback result safely
      return callback(matchText);
    }

    // 💤 No callback provided — return untouched
    return result;
  } catch (err) {
    $.simulateErrorDetails(err, true);   
  }
};


  // Clipboard copy text  
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
$.str = function(element) {
return element.toString(); 
}


// to uppercase 
$.upper = function(element) {
try {
return element.toUpperCase(); 
} catch (err) {
   $.simulateErrorDetails(err, true);   
}
}


// to lowercase 
$.lower = function(element) {
try {
return element.toLowerCase();  
} catch (err) {
$.simulateErrorDetails(err, true);   
}
}


// parseInt 
$.int = function(element) {
return parseInt(element); 
}


// parseFloat 
$.float = function(element) {
return parseFloat(element);
}

// Toggle the case of the string (uppercase becomes lowercase, and vice versa)
$.swapCase = function(value) {
try {
return value === value.toUpperCase() ? value.toLowerCase() : value.toUpperCase();  
} catch (err) {
$.simulateErrorDetails(err, true);   
}
}  
  
  
// JSON.stringify function 
$.json = function(content) {
  return JSON.stringify(content);
}


// JSON.parse function 
$.parse = function(content) {
try {
return JSON.parse(content);    
} catch (err) {
$.simulateErrorDetails(err, true);       
}
}



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



// generate random number  
$.randInt = function(min, max) {
  if(min !== undefined && max === undefined) {
return Math.floor(Math.random() * min);    
  } else if(min !== undefined && max !== undefined) {
return Math.floor(Math.random() * (max - min + 1)) + min;      
  } else {
 return 0;
  } 
}     



// generate random alphabet 
$.randAlpha = function(length, options = {}) {
  const optionMap = {
    upper: 'uppercase',
    lower: 'lowercase',
  };

  if (typeof options === 'string') {
    options = { [optionMap[options]]: true };
  }

  let alphabets = '';
  if (options.uppercase || options.upper) alphabets += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.lowercase || options.lower) alphabets += 'abcdefghijklmnopqrstuvwxyz';
  if (!options.uppercase && !options.lowercase && !options.lower && !options.upper) alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
  }
  return randomString;
};



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
      throw new Error(`Invalid argument: ${arg}. Expected a Date object, a format string, or a type ('long' or 'short').`);
    }
  });

  return myDate.toLocaleString(format, { month: type });
  } catch (err) {
$.simulateErrorDetails(err, true);        
  }
};



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
      throw new Error(`Invalid argument: ${arg}. Expected a Date object, a format string, or a type ('long' or 'short').`);
    }
  });

  return myDate.toLocaleString(format, { weekday: type });
  } catch (err) {
$.simulateErrorDetails(err, true);         
  }
};



/* checking if a value is set not empty */
$.isset = function(value) {
  return value !== null && typeof value !== 'undefined';
}



/* checking if a value is empty not set */
$.empty = function(value) {
try {
  if (arguments.length !== 1) {
    throw new RangeError('empty() requires exactly 1 argument!');
  }

  return (
    value === null ||
    value === undefined ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim() === '') ||
    (typeof value === 'number' && isNaN(value)) ||
    (Array.isArray(value) && value.length === 0)
  );
  } catch (err) {
$.simulateErrorDetails(err, true);         
  }
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



// Get typeof data strictly for array checking 
$.type = function(value, type) {
  if (value !== undefined && type === undefined) {
    return Array.isArray(value) ? 'array' : typeof value;
  } else if (value !== undefined && type !== undefined) {
    return (type === 'array' && Array.isArray(value)) || typeof value === type;
  } else {
    return null;
  }
}



// Custom timeout handler
$.timeout = function(callback, delay = 0) {
try {
    // Case: only one argument provided, assume it's a timer ID to clear
    if (callback !== undefined && delay === undefined) {
        clearTimeout(callback);
        return;
    }

    // Case: both arguments provided
    if (callback !== undefined && delay !== undefined) {
        // Standard usage: function + numeric delay
        if (typeof callback === 'function' && !isNaN(delay)) {
            return setTimeout(callback, delay);
        }

        // Swapped arguments: numeric delay + function
        if (typeof delay === 'function' && !isNaN(callback)) {
            return setTimeout(delay, callback);
        }

        // Fallback: treat as clearing a timeout after delay
        setTimeout(() => {
            clearTimeout(callback);
        }, delay);
        return;
    }
} catch (err) {
$.simulateErrorDetails(err, true);       
    }
}



// Custom interval handler
$.interval = function(callback, delay = 0) {
    try {
        // Case: only one argument provided, assume it's an interval ID to clear
        if (callback !== undefined && delay === undefined) {
            clearInterval(callback);
            return;
        }

        // Case: both arguments provided
        if (callback !== undefined && delay !== undefined) {
            // Standard usage: function + numeric delay
            if (typeof callback === 'function' && !isNaN(delay)) {
                return setInterval(callback, delay);
            }

            // Swapped arguments: numeric delay + function
            if (typeof delay === 'function' && !isNaN(callback)) {
                return setInterval(delay, callback);
            }

            // Fallback: treat as clearing an interval after delay
            setTimeout(() => {
                clearInterval(callback);
            }, delay);
            return;
        }
    } catch (err) {
   $.simulateErrorDetails(err, true);   
    }
}



// Custom localStorage handler
$.storage = function(key, value) {
    try {
        // No key provided: return the full localStorage object
        if (key === undefined) return localStorage;

        // Only key provided: get value or clear storage
        if (value === undefined) {
            if (key.toLowerCase() === ':clear:') {
                localStorage.clear();
                return;
            }
            return localStorage.getItem(key);
        }

        // Key and value provided: set or remove item
        const keyLower = key.toLowerCase();
        const valueLower = typeof value === 'string' ? value.toLowerCase() : '';

        if (valueLower === ':remove:' || keyLower === ':remove:') {
            // Determine which one is the actual key to remove
            const removeKey = keyLower !== ':remove:' ? key : value;
            localStorage.removeItem(removeKey);
        } else {
            localStorage.setItem(key, value);
        }
    } catch (err) {
  $.simulateErrorDetails(err, true);   
    }
}



// Custom sessionStorage handler
$.session = function(key, value) {
    try {
        // No key provided: return the full sessionStorage object
        if (key === undefined) return sessionStorage;

        // Only key provided: get value or clear storage
        if (value === undefined) {
            if (key.toLowerCase() === ':clear:') {
                sessionStorage.clear();
                return;
            }
            return sessionStorage.getItem(key);
        }

        // Key and value provided: set or remove item
        const keyLower = key.toLowerCase();
        const valueLower = typeof value === 'string' ? value.toLowerCase() : '';

        if (valueLower === ':remove:' || keyLower === ':remove:') {
            // Determine which one is the actual key to remove
            const removeKey = keyLower !== ':remove:' ? key : value;
            sessionStorage.removeItem(removeKey);
        } else {
            sessionStorage.setItem(key, value);
        }
    } catch (err) {
  $.simulateErrorDetails(err, true);   
    }
}


$.dataStore = function (key) {
 if (!key) throw new Error('A key must be provided for $.dataStore');
 
  // Retrieve existing history or initialize as array
  let history = JSON.parse(localStorage.getItem(key)) || [];
  if (!Array.isArray(history)) history = [history];

  // Helper: save back to localStorage        
  history.init = function (array = history) {
localStorage.setItem(key, JSON.stringify(array));        
  }
    
  history.add = function (...data) {
history.push(...data); 
history.init();   
  }
          
  
  history.del = function (keyFunction = () => {}, fields) {
const filterData = history.filter(keyFunction);

filterData.forEach(filterResult => {
if(typeof fields === "string" || Array.isArray(fields)) {
const splitFields = fields.toString().trim().split(',');
splitFields.forEach(item => {
    delete filterResult[item.trim()];
    history.init();
});   
} else if(fields === undefined) {
filterData.forEach((key) => {
for(const item in key){
 delete key[item]; 
 history.init(); 
}
}); 
} else {
    throw new Error("$.dataStore requires a string or array or undefined");
}
// Update the history data storage and filter out any {} empty object 
const filterHistory = history.filter(item => !$.empty(item));
history.init(filterHistory); 
}); 
  }
    
   
  // ✅ FIXED MODIFY METHOD  
      history.modify = function (keyFunction = () => {}, data, newIndex) {
 const filterData = history.filter(keyFunction);

filterData.forEach(filterResult => {
Object.entries(data).forEach(([key, value]) => {  
filterResult[key] = value;
    history.init();
});
});

if(typeof newIndex === 'number') {
const index = history.findIndex(keyFunction);
if(index === -1) return;
const [obj] = history.splice(index, 1);
history.splice(newIndex, 0, obj);
history.init();   
}
    }      
                                        
  
  history.get = function (keyFunction = () => {}, fields, format) {
  const matches = history.filter(keyFunction);

  // If no format provided, return full matching items
  if (!format) {
    return matches;
  }

  const upperFormat = format.toUpperCase();

  return matches.map(item => {
  
    if (upperFormat.includes('OBJECT')) {
      // Return only the specified fields as an object
      const splitFields = fields.toString().trim().split(',');
      if (fields.length === 0) return item;
      const obj = {};
      splitFields.forEach(field => {         
        obj[field.trim()] = item[field.trim()];
      });
      return obj;
    } 
    
    if (upperFormat.includes('ARRAY')) {
      // Return only the specified fields as an array
      const splitFields = fields.toString().trim().split(',');
      if (fields.length === 0) return Object.values(item);      
      return splitFields.map(field => item[field.trim()]);
    }

    // Default: if format not recognized, return the full item
    return item;
  });
};


history.count = function (keyFunction = () => {}) {
return history.filter(keyFunction).length; 
}


history.empty = function () {
localStorage.removeItem(key);
    history.length = 0;
}   
  return history;   
}


// Custom AJAX request
$.ajax = function(options = {}) {
  if (!options.url || !options.url.trim()) {
    throw new Error("Url is required");
  }

  // Validate URL format
  const urlRegex = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}(:[0-9]+)?(\/.*)?$/;
  if (!urlRegex.test(options.url)) {
    throw new Error("Invalid Url");
  }

  const method = (options.type || 'GET').toUpperCase();
  let requestUrl = options.url;
  let requestData = null;

  // Handle GET query params
  if (method === 'GET' && options.data) {
    if (typeof options.data === 'object') {
      requestUrl += '?' + new URLSearchParams(options.data).toString();
    } else if (typeof options.data === 'string') {
      requestUrl += '?' + options.data;
    }
  } else if (options.data) {
    requestData = options.data;
  }

  // Setup fetch / XHR options
  const fetchOptions = {
    method,
    body: requestData,
    headers: {},
    ...options
  };

  // Set headers
  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      fetchOptions.headers[key] = value;
    });
  } else {
    if (!(requestData instanceof FormData)) {
      fetchOptions.headers[options.contentType || 'Content-Type'] = options.headerValue || 'application/octet-stream';
    } else {
      delete fetchOptions.headers['Content-Type']; // Let browser handle FormData
    }
  }

  const promise = new Promise((resolve, reject) => {
    if (window.fetch) {
      fetch(requestUrl, fetchOptions)
        .then(response => {
          if (!response.ok) {
            options.status && options.status(`NOT OK ${response.statusText}`);
            throw new Error('Response not OK');
          }
          return response[options.dataType || 'text']();
        })
        .then(data => {
          resolve(data);
          options.success && options.success(data);
        })
        .catch(err => {
          reject(err);
          options.error && options.error(err);
        })
        .finally(() => options.complete && options.complete());
    } else {
      // Fallback for older browsers
      const xhr = new XMLHttpRequest();
      xhr.open(method, requestUrl, options.async !== false);

      if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      } else if (!(requestData instanceof FormData)) {
        xhr.setRequestHeader(options.contentType || 'Content-Type', options.headerValue || 'application/json');
      }

      xhr.responseType = options.dataType || 'text';

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
          options.success && options.success(xhr.response);
        } else {
          options.status && options.status(`NOT OK ${xhr.statusText}`);
          reject(xhr.statusText);
        }
        options.complete && options.complete();
      };

      xhr.onerror = () => {
        const errMsg = `Error: ${xhr.statusText}`;
        reject(errMsg);
        options.error && options.error(errMsg);
        options.complete && options.complete();
      };

      xhr.send(requestData);
    }
  });

  // jQuery-like chainable methods
  promise.done = callback => { promise.then(callback); return promise; };
  promise.fail = callback => { promise.catch(callback); return promise; };
  promise.always = callback => { promise.finally(callback); return promise; };

  return promise;
};



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
  requestFn().then(hasConnection => callback(hasConnection));
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



// Convert key-value pairs into a URL query string for GET requests
$.toQueryString = (...args) => {
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



// Single frontend sanitizer utility
$.sanitize = function(input) {
  if (typeof input !== 'string') return input;

  // 1️⃣ Escape HTML special characters
  const escapeHtml = str => str.replace(/[&<>"'`]/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '`': '&#096;'
  }[m]));

  // 2️⃣ Sanitize URLs
  const sanitizeURL = str => {
    try {
      const parsed = new URL(str);
      // Block javascript: or data: URIs
      if (parsed.protocol === 'javascript:' || parsed.protocol === 'data:') return '#';
      return parsed.href;
    } catch {
      return '#'; // fallback if invalid
    }
  };

  // 3️⃣ Remove event handlers and unsafe attributes
  const sanitizeAttributes = str => str.replace(/\bon\w+="[^"]*"/gi, '');

  // 4️⃣ Combine all sanitization
  let sanitized = input;
  sanitized = escapeHtml(sanitized);        // Escape HTML
  sanitized = sanitizeAttributes(sanitized); // Strip inline JS attributes
  sanitized = sanitized.replace(/javascript:/gi, ''); // Extra safety
  sanitized = sanitized.replace(/data:/gi, '');       // Extra safety
  sanitized = sanitized.trim();

  // 5️⃣ If looks like a URL, sanitize it
  if (/^https?:\/\//i.test(input)) {
    sanitized = sanitizeURL(input);
  }

  return sanitized;
};


// Returns true ONLY if all characters strictly belong to the allowed filters

$.isStrict = function (element, ...filters) {
  try {
    if (typeof element !== 'string' || !element.length) return false;

    const filterMap = {
      emoji: c => /[\p{Extended_Pictographic}\u200d]/u.test(c),
      number: c => /[0-9]/.test(c),
      num: c => /[0-9]/.test(c),
      lowercase: c => /[a-z]/.test(c),
      lower: c => /[a-z]/.test(c),
      uppercase: c => /[A-Z]/.test(c),
      upper: c => /[A-Z]/.test(c),
      alphabet: c => /[a-zA-Z]/.test(c),
      alpha: c => /[a-zA-Z]/.test(c),
      special: s => /[^a-zA-Z0-9\p{Extended_Pictographic}\u200d\s]/u.test(s),
      specialcharacter: s => /[^a-zA-Z0-9\p{Extended_Pictographic}\u200d\s]/u.test(s),
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
$.strInsert = function(text, char, position) {  
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



/**
 * Validator utility
 * -----------------
 * Provides methods to validate email addresses and URLs.
 */
$.validator = function(value, type) { 
  const ab = {
    email: (email) => {
      if (!email || typeof email !== "string") return false;
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email.trim()) && email.length <= 254;      
    },
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
    url: (url) => {
      if (!url || typeof url !== "string") return false;
      const regex = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}(:[0-9]+)?(\/.*)?$/;
      return regex.test(url.trim());      
    }
  };

  // Check if type exists and call it with the value
  return ab[type] ? ab[type](value) : false;
};




/**
 * $.updateState()
 * ----------------
 * Updates the browser history state (pushState) and optionally the document title.
 * Can handle pathname, search, hash, or full URL.
 * 
 * Usage:
 *  $.updateState('search', 'key=value', { _title: 'New Title', customKey: 123 });
 *  $.updateState('/path', { _title: 'Page Title', user: 'Sammy' });
 */
$.updateState = function(target, valueOrOptions, options) {
try {
  let state = {};
  let title = document.title;
  let url = window.location.href;

  // If second argument is an object, it's options
  if (typeof valueOrOptions === "object" && valueOrOptions !== null) {
    options = valueOrOptions;
    valueOrOptions = undefined;
  }

  options = options || {};

  // Set title if provided
  if (options._title) {
    title = options._title;
  }

  // Determine URL based on target
  const loc = new URL(window.location);

  if (target === 'search' && valueOrOptions !== undefined) {
    loc.search = valueOrOptions;
  } else if (target === 'hash' && valueOrOptions !== undefined) {
    loc.hash = valueOrOptions;
  } else if(['path', 'pathname'].includes(target) && valueOrOptions !== undefined) {
loc.pathname = valueOrOptions;      
  } else {
if(target.startsWith('/')){
    // treat target as pathname or full URL
    loc.pathname = target || loc.pathname;
 } else if(target.startsWith('?')) {
loc.search = target || loc.search;     
 } else if(target.startsWith('#')) {
loc.hash = target || loc.hash;     
 } else {
throw new TypeError("The text must start with either '#' (hash), '/' (pathname), or '?' (search).");
 }                   
  }

  // Merge custom keys into state
  for (const key in options) {
    if (key !== '_title') state[key] = options[key];
  }

  // Push state
  window.history.pushState(state, title, loc.href);
  document.title = title;
  } catch (err) {
$.simulateErrorDetails(err, true);         
  }
};





/**
 * $.updateLocation()
 * -------------------
 * Get or set any property of window.location.
 * Automatically catches errors if the property is invalid or assignment fails.
 *
 * Usage:
 *  $.updateUrl('pathname');           // returns current pathname
 *  $.updateLocation('search', 'q=search'); // sets search query
 *  $.updateLocation('protocol', 'http:');  // may reload page
 */
$.updateUrl = function(part, value) {
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
    /**
     * format(fmt)
     * -------------
     * Formats the date according to a custom pattern:
     * YYYY = year, MM = month, DD = day,
     * HH = hours, mm = minutes, ss = seconds
     */
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
    result() {
      return date;
    }
  };
  } catch (err) {
$.simulateErrorDetails(err, true);         
  }
};




/**
 * Sends an email using EmailJS.
 *
 * @param {Object} options - Options for the email.
 * @param {string} options.publicKey - Public key for EmailJS.
 * @param {string} options.serviceId - Service ID for EmailJS.
 * @param {string} options.templateId - Template ID for EmailJS.
 * @param {number} [options.version=4] - Version of EmailJS to use.
 * @param {string} [options.url='https://cdn.jsdelivr.net/npm/@emailjs/browser@'] - URL of the EmailJS CDN.
 * @param {Function} [options.success] - Callback function for success.
 * @param {Function} [options.error] - Callback function for error.
 * @param {HTMLElement} options.template - Template element to send.
 */
$.emailJs = function(options) {
  const defaults = {
    publicKey: 'YOUR_PUBLIC_KEY',
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    version: 4,
    url: null,
    success: () => {},
    error: () => {},
    template: null,
  };

  const settings = Object.assign({}, defaults, options);

  const script = document.createElement('script');
if(settings.url) {
script.src = settings.url;    
} else {
script.src = `https://cdn.jsdelivr.net/npm/@emailjs/browser@${settings.version}/dist/email.min.js`;    
}      

  script.onload = () => {
    emailjs.init(settings.publicKey);
    emailjs.sendForm(settings.serviceId, settings.templateId, settings.content)
      .then((data) => {
     settings.success(data);
      }, (err) => {
     settings.error(err);
      });
  };

  document.head.appendChild(script);
};




// send email programmically to user
$.brevo = function(options = {}) {
const requiredProperties = ['apiKey', 'senderEmail', 'recipientEmail', 'subject', 'content'];
  requiredProperties.forEach((property) => {
    if (!options[property]) {
      throw new Error(`Missing required property: ${property}`);
    }
  });

const url = options.url || `https://api.brevo.com/v${options.version || 3}/smtp/email`; 
const data = {
sender: {
name: options.senderName,
email: options.senderEmail
 },
 to: [
 {
     email: options.recipientEmail,
     name: options.recipientName
   }
 ],
 
 subject: options.subject,
 htmlContent: options.content 
}

fetch(url, {
method: 'POST',
headers: {
accept: 'application/json',
'api-key': options.apiKey,
'content-type': 'application/json'
},
body: JSON.stringify(data)  
})  
.then(response => response.json())   
.then(data => {
    options.success(data);
})   
.catch(err => {
    options.error(err);
})    
}



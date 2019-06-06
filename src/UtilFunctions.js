export default {
  getImpactIDsFromResume: function(resumeData) {
    let sections = resumeData.sections,
      allImpactIDs = [];

    for (let i = 0; i < sections.length; i++) {
      const thisSectionImpacts = sections[i].impacts;

      for (let j = 0; j < thisSectionImpacts.length; j++) {
        const thisImpact = thisSectionImpacts[j];

        allImpactIDs.push(thisImpact.impactID);
      }
    }

    return allImpactIDs;
  },
  sortElementsByBoundingClientRects: function(elA, elB) {
    const rectA = elA.getBoundingClientRect(),
      rectB = elB.getBoundingClientRect();

    return rectA.top - rectB.top;
  },

  //@Reviewer
  //The "smooth" portion of this method name is used pretty loosely.  I copied this function from a StackOverflow
  //answer (https://stackoverflow.com/questions/10063380/smooth-scroll-without-the-use-of-jquery).  It needs quite a
  //bit of work.  The obvious reason is that the scroll isn't super smooth, but beyond that it puts the target right at
  //the very edge of the top of the browser window.  Additionally, I'm trying to keep track of which impacts (bullets)
  //are in the viewport during scroll events, but I want to pause tracking that when the scroll is being performed
  //automatically since I think keeping track of the in-viewport bullets is slowing down the scroll action.
  smoothScroll: smoothScroll,

  //@Reviewer
  //This is a recursive function that checks whether any parent of a given element has a particular class.  The reason
  //this is needed is because clicking or tapping certain portions of the resume will remove the "current" status from
  //impact statements or keywords.  There are some areas though for which I do not want the "current" status
  // changed.  For example, if a user has selected a current keyword, but, during the course of browsing the related
  // impacts wants to click an impact, I don't necessarily want the "current" keyword being made not current.
  // However, if the resume viewer has a current keyword and just wants to remove the highlighting, my expectation
  // is that they will just click anywhere on the page.  For that event, the "current" status is removed from the
  // keyword.
  aParentHasClass: function(element, targetClass) {
    if (element.classList.contains(targetClass)) return true;
    else if (element.parentElement === null) return false;
    else return this.aParentHasClass(element.parentElement, targetClass);
  },
  sortSections: function(sectionA, sectionB) {
    if (sectionA.isCurrent && sectionB.isCurrent) {
      const sectionAStart = new Date(sectionA.dateStart),
        sectionBStart = new Date(sectionB.dateStart);

      return sectionBStart - sectionAStart;
    }

    if (sectionA.isCurrent) return -1;
    if (sectionB.isCurrent) return 1;

    const sectionAEnd = new Date(sectionA.dateEnd),
      sectionBEnd = new Date(sectionB.dateEnd);

    return sectionBEnd - sectionAEnd;
  }
};

function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(eID) {
  const elm = document.getElementById(eID);
  let y = elm.offsetTop,
    node = elm;

  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

function smoothScroll(eID) {
  return new Promise((resolve, reject) => {
    const startY = currentYPosition(),
      stopY = elmYPosition(eID),
      distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      resolve("scolled 1");
    }
    const step =
      Math.round(distance / 100) === 0 ? 1 : Math.round(distance / 100);
    let speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    let leapY = stopY > startY ? startY + step : startY - step,
      timer = 0;

    //Scroll down
    if (stopY > startY) {
      for (let i = startY; i < stopY; i += step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY += step;
        if (leapY > stopY) leapY = stopY;
        timer++;
      }
    }

    //Scroll Up
    for (let i = startY; i > stopY; i -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step;
      if (leapY < stopY) leapY = stopY;
      timer++;
    }
  });
}

// function smoothScroll(eID) {
//
//   return new Promise((resolve, reject)=> {
//     const startY = currentYPosition()
//       , stopY = elmYPosition(eID)
//       , distance = stopY > startY ? stopY - startY : startY - stopY;
//     if (distance < 100) {
//       scrollTo(0, stopY);
//       resolve('scolled 0');
//     }
//     const step = Math.round(distance / 100);
//     let speed = Math.round(distance / 100);
//     if (speed >= 20) speed = 20;
//     let leapY = stopY > startY ? startY + step : startY - step
//       , timer = 0;
//
//     console.log("scroll speed: " + speed);//Debugging
//
//     //Scroll down
//     if (stopY > startY) {
//       for (let i = startY; i < stopY; i += step) {
//
//         const scrollHandler = i + step >= stopY ? function() {
//           window.scrollTo(0, leapY);
//           resolve('End Scroll: 1')
//         }: function(){
//           window.scrollTo(0, leapY)
//         };
//
//         setTimeout(scrollHandler, timer * speed);
//
//         leapY += step;
//         if (leapY > stopY) leapY = stopY;
//         timer++;
//         console.log("Timer: " + timer);//Debugging
//       }
//     }
//
//     //Scroll Up
//     for (let i = startY; i > stopY; i -= step) {
//
//       const scrollHandler = i - step <= stopY ? function() {
//         resolve('End Scroll: 2')
//       }: function(){window.scrollTo(0, leapY)};
//
//       setTimeout(scrollHandler, timer * speed);
//       leapY -= step;
//       if (leapY < stopY) leapY = stopY;
//       timer++;
//     }
//   })
// }

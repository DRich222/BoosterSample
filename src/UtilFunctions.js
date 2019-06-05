export default {
  getImpactIDsFromResume:function(resumeData){
    let sections = resumeData.sections
      , allImpactIDs = [];

    for(let i = 0; i < sections.length; i++){
      const thisSectionImpacts = sections[i].impacts;

      for(let j = 0; j < thisSectionImpacts.length; j++){

        const thisImpact = thisSectionImpacts[j];

        allImpactIDs.push(thisImpact.impactID);
      }

    }

    return allImpactIDs;

  },
  sortElementsByBoundingClientRects:function(elA, elB){

    const rectA = elA.getBoundingClientRect()
      , rectB = elB.getBoundingClientRect();

    return rectA.top - rectB.top;
  },
  smoothScroll:smoothScroll,
  aParentHasClass:function(element, targetClass){
    if(element.classList.contains(targetClass)) return true;
    else if(element.parentElement === null ) return  false;
    else return this.aParentHasClass(element.parentElement, targetClass)
  },
  sortSections:function(sectionA, sectionB){

    if(sectionA.isCurrent && sectionB.isCurrent){
      const sectionAStart = new Date(sectionA.dateStart)
        , sectionBStart = new Date(sectionB.dateStart);

      return sectionBStart - sectionAStart;
    }

    if(sectionA.isCurrent) return -1;
    if(sectionB.isCurrent) return 1;

    const sectionAEnd = new Date(sectionA.dateEnd)
      , sectionBEnd = new Date(sectionB.dateEnd);

    return sectionBEnd - sectionAEnd;
  }
}

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
  let y = elm.offsetTop
    , node = elm;


  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  } return y;
}

function smoothScroll(eID) {

  return new Promise((resolve, reject)=> {
    const startY = currentYPosition()
      , stopY = elmYPosition(eID)
      , distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      resolve('scolled 1');
    }
    const step = Math.round(distance / 100) === 0 ? 1 : Math.round(distance / 100);
    let speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    let leapY = stopY > startY ? startY + step : startY - step
      , timer = 0;

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
  })
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
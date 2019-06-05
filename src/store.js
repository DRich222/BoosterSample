import Vue from "vue";
import Vuex from "vuex";
import ResumeService from "./services/ResumeService"
import boosterRouter from "./router"
import constants from "./constants"
import UtilFunctions from "./UtilFunctions"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activity: 'view',
    resumeViewData:{},
    currentKeywordKey:'',
    currentImpactID:'',
    keywordSearchTerm: '',
    trackViewportImpacts: true,
    inViewportImpactIDs:[],
    appWidthDescription: 3,
    resLoaded:false,
    constants:constants,
    mobileMenuExpanded:false,

    //Debugging
    safariDebuggingData:'No Safari debugging data loaded',
    safariDebugging: false
  },
  mutations: {
    SET_RESUMEDATA(state, resumeData) {
      Vue.set(state,'resumeData', resumeData);
      state.resLoaded = true;
    },
    SET_KEYWORD_ACTIVE_STATE(state, payload){

      for(let i = 0; i < state.resumeData.keywords.length; i++){
        const thisKeyword = state.resumeData.keywords[i];

        if(payload.keywordKey === thisKeyword.strKeywordKey){

          let newKeyword = state.resumeData.keywords[i];
          newKeyword.isActive = payload.isActive;

          Vue.set(state.resumeData.keywords, i, newKeyword);

          break;
        }
      }
    },
    SET_ALL_KEYWORDS_ACTIVE_STATE(state, isActive){
      for(let i = 0; i < state.resumeData.keywords.length;i++){
        let newKeyword = state.resumeData.keywords[i];
        newKeyword.isActive = isActive;

        Vue.set(state.resumeData.keywords, i, newKeyword);
      }
    },
    SET_CURRENT_KEYWORD_KEY(state, keywordKey){
      state.currentKeywordKey = keywordKey;
    },
    UNSET_CURRENT_KEYWORD_KEY(state){
      state.currentKeywordKey = '';
    },
    SET_IN_VIEWPORT_IMPACT_IDS(state, inViewportImpactIDs){
      state.inViewportImpactIDs = inViewportImpactIDs
    },
    SET_KEYWORD_SEARCH_TERM(state, searchTerm){
      state.keywordSearchTerm = searchTerm;
    },
    SET_CURRENT_IMPACT_ID(state, impactId){
      state.currentImpactID = impactId;
    },
    SET_TRACK_VIEWPORT_IMPACTS(state, shouldTrack){
      state.trackViewportImpacts = shouldTrack;
    },
    SET_APP_WIDTH_DESCRIPTION(state, appWidthDescription){
      state.appWidthDescription = appWidthDescription;
    },
    SET_MOBILE_MENU_EXPANDED(state, expanded){
      state.mobileMenuExpanded = expanded;
    },

    //Debugging
    SET_SAFARI_DEBUGGING_DATA(state, data){
      state.safariDebuggingData = data;
    },
    APPEND_SAFARI_DEBUGGING_DATA(state, appendData){
      state.safariDebuggingData += ("\n" + appendData);
    }
  },
  actions: {
    initializeStore({commit, dispatch}){

      dispatch('checkMobile');

      window.addEventListener('scroll', ()=>{dispatch('updateImpactIDsInViewPort')});

      window.addEventListener('resize', ()=>{
          dispatch('checkMobile');
          dispatch('updateImpactIDsInViewPort');
        }
      );

      window.addEventListener('keydown', (e)=>{
        if(e.key === 'Escape') dispatch('unsetAllCurrent');
      });

      document.addEventListener('click', (evt)=>{

        const keepCurrentKeyword = UtilFunctions.aParentHasClass(evt.target, 'keepCurrentKeyword')
          , keepCurrentImpact = UtilFunctions.aParentHasClass(evt.target, 'keepCurrentImpact');

        if(!keepCurrentKeyword) dispatch('unSetCurrentKeywordKey');
        if(!keepCurrentImpact) dispatch('setCurrentImpactId', '');
      })
    },
    fetchResumeByEmail({commit, dispatch}){

      const email = boosterRouter.currentRoute.params.email;
      ResumeService.getResume(email)
        .then((response) => {
          // commit('SET_RESUMEDATA', response.data.resume);
          commit('SET_RESUMEDATA', response.data);

          if(Object.keys(this.state.resumeViewData).length === 0 && this.state.resumeViewData.constructor === Object){
            commit('SET_ALL_KEYWORDS_ACTIVE_STATE', true);
          }
          dispatch('updateImpactIDsInViewPort')
        }).catch((error) => {
        console.log(error)
      })
    },
    applyView({commit}){
      console.log("applyView action not yet built");//Debugging
    },
    updateImpactIDsInViewPort({state, commit}){

      // if(!state.trackViewportImpacts) return;

      const allImpactIDs = UtilFunctions.getImpactIDsFromResume(state.resumeData);

      const height = window.innerHeight;

      let inViewportImpactIDs = [];

      for(let i = 0; i < allImpactIDs.length; i++){

        const thisImpactID = allImpactIDs[i]
          , rect = document.getElementById(thisImpactID).getBoundingClientRect();

        if(rect.bottom > 5 && rect.top < height) inViewportImpactIDs.push(thisImpactID);

      }

      commit('SET_IN_VIEWPORT_IMPACT_IDS', inViewportImpactIDs);

    },
    showHideAll({state, commit}, showHide){
      commit('SET_ALL_KEYWORDS_ACTIVE_STATE', showHide === "show");
    },
    unsetAllCurrent({commit}){
      commit('SET_CURRENT_KEYWORD_KEY', '');
      commit('SET_CURRENT_IMPACT_ID', '');
    },
    checkMobile({commit}){

      const width = window.innerWidth,
        description = width <= 600 ? 0 : //extra small
          width <= 960 ? 1 : //small
          width <= 1264 ? 2 : 3 ; // medium / large

      commit('SET_APP_WIDTH_DESCRIPTION', description)
    },

    //Setters
    setCurrentKeywordKey({commit}, keywordKey){
      commit('SET_CURRENT_KEYWORD_KEY',keywordKey);
    },
    unSetCurrentKeywordKey({commit}){
      commit('UNSET_CURRENT_KEYWORD_KEY')
    },
    setKeywordActive({state, commit}, payload){
      commit('SET_KEYWORD_ACTIVE_STATE', payload)
    },
    setKeywordSearchTerm({state, commit}, searchTerm){
      commit('SET_KEYWORD_SEARCH_TERM', searchTerm);
    },
    setCurrentImpactId({state, commit}, impactID){
      commit('SET_CURRENT_IMPACT_ID', impactID)
    },
    setTrackViewportImpacts({state, commit}, shouldTrack){

      console.log('Setting track view impacts: ' + shouldTrack);//Debugging

      commit('SET_TRACK_VIEWPORT_IMPACTS', shouldTrack);
    },
    setMobileMenuExpanded({state, commit}, expanded){
      commit('SET_MOBILE_MENU_EXPANDED', expanded);
    },

    //Debugging
    setSafariDebuggingData({state, commit}, data){
      commit('SET_SAFARI_DEBUGGING_DATA', data);
    },
    appendSafariDebuggingData({state, commit}, data){
      commit('APPEND_SAFARI_DEBUGGING_DATA', data)
    }
  },
  getters:{
    sectionsByType: state => type => {

      return state.resumeData.sections.filter( section => section.strSectionType === type);
    },
    resumeKeywords: state => {
      return state.resumeData.keywords
    },
    currentKeywordKey: state => {
      return state.currentKeywordKey
    },
    impactIdsForKeywordKey: state => keywordKey =>{
      let impacts = [];
      for(let i = 0; i < state.resumeData.sections.length; i++){
        const thisSection = state.resumeData.sections[i];

        impactsLoop:for(let j = 0; j < thisSection.impacts.length; j++){
          const thisImpact = thisSection.impacts[j];

          for(let k = 0; k < thisImpact.keywords.length; k++){
            if(thisImpact.keywords[k].strKeywordKey === keywordKey){
              impacts.push(thisImpact.impactID);
              continue impactsLoop;
            }
          }
        }
      }

      return impacts;

    },
    isKeywordActive: state => keywordKey =>{

      const retrievedKeywords = state.resumeData.keywords.filter(keyword => keywordKey === keyword.strKeywordKey);
      return retrievedKeywords[0].isActive
    },
    keyword: state => keywordKey => {
      return state.resumeData.keywords.filter(keyword => keywordKey === keyword.strKeywordKey)[0]
    },
    activeKeywords: state =>{
      return state.resumeData.keywords.filter(keyword => keyword.isActive);
    }
  }

})

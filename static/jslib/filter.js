'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value' in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var _tags=Symbol();var _filter_control=Symbol();var _filter_control2=Symbol();var _clear_filter_control=Symbol();var _box=Symbol();var _completions_dst=Symbol();var _wire_mode=Symbol();var _distilled=Symbol();var _class=function(){function _class(component){_classCallCheck(this,_class);this.component=component;this[_tags]=new Map;this[_filter_control]=new Map;this[_filter_control2]=new Map;this[_box]=new Map;this[_completions_dst]=new Map;this._stats_dst=new Map;this[_clear_filter_control]=new Map;this[_wire_mode]=new Map;this[_distilled]=new Map;this.distilled=new Map}_createClass(_class,[{key:'_html',value:function _html(vr){var h='\n<div>\n    <p class="dctrl"><span fct="'+this.component.name+'-'+vr+'"></span> By full text search\n        <a href="#" title="modify full text filter" id="flt2_'+vr+'" class="flt_not_expanded facet_single ison flt_pat"></a>\n        <a href="#" class="control_med fa fa-close filtc" id="clearf_'+vr+'"></a>\n    </p>\n    <div id="fltw_'+vr+'">\n        <p id="fbox_'+vr+'" class="flt control_med fbox ui-widget">\n            <input id="flt_'+vr+'" class="flt flt_pat"/>\n            <span fbox class="stats" id="stats_'+vr+'"></span>\n        </p>\n        <div id="autoc_'+vr+'" style="display: none;">here '+vr+'</div>\n    </div>\n</div>';this.component.container.get(vr).html(h)}},{key:'_setFilter',value:function _setFilter(vr){var textf=this.component.state.getState('flt_'+vr);var filterc=this[_filter_control].get(vr);this[_filter_control2].get(vr).html(textf);filterc.val(textf);filterc.autocomplete('search',textf)}},{key:'_response',value:function _response(vr){return function(event,ui){this[_distilled].set(vr,{});var dstl=this[_distilled].get(vr);var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=ui.content[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var u=_step.value;dstl[u.value]=1}}catch(err){_didIteratorError=true;_iteratorError=err}finally {try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally {if(_didIteratorError){throw _iteratorError}}}if(!this[_wire_mode].get(vr)){var textf=this[_filter_control].get(vr).val();this.component.state.setState('flt_'+vr,textf)}}.bind(this)}},{key:'_setClear',value:function _setClear(vr){var _this=this;this[_clear_filter_control].get(vr).click(function(e){e.preventDefault();var filterc=_this[_filter_control].get(vr);filterc.val('');filterc.autocomplete('search','')})}},{key:'stats',value:function stats(vr){var stat_prefix=void 0;var statd=this._stats_dst.get(vr);if(this[_filter_control].get(vr).val()==''){stat_prefix='';statd.removeClass('ison')}else {stat_prefix=this.facet.distilled.get(vr).length+' of ';statd.addClass('ison')}statd.html(''+stat_prefix+this.distilled.get(vr).length)}},{key:'v',value:function v(vr,i){return i in this[_distilled].get(vr)}},{key:'show',value:function show(vr){return this.component.state.getState('list')==vr}},{key:'weld',value:function weld(vr){this._html(vr)}},{key:'wire',value:function wire(vr){if(!this.facet){this.facet=this.component.page.getComponent('facet').implementation}var data=this.component.page.getComponent('list').data.get(vr);this[_tags].set(vr,[]);var tgs=this[_tags].get(vr);var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=data[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var d=_step2.value;tgs.push({label:d[1],value:''+d[0]})}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally {try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally {if(_didIteratorError2){throw _iteratorError2}}}this[_distilled].set(vr,{});this.distilled.set(vr,[]);var cc=this.component.container.get(vr);var cf=cc.find('#fltw_'+vr);var flt=$('#flt_'+vr);this[_filter_control].set(vr,flt);var flt2=$('#flt2_'+vr);this[_filter_control2].set(vr,flt2);this[_box].set(vr,cf.find('#fbox_'+vr));this[_completions_dst].set(vr,cf.find('#autoc_'+vr));this._stats_dst.set(vr,cf.find('#stats_'+vr));this[_clear_filter_control].set(vr,cc.find('#clearf_'+vr));this[_filter_control].get(vr).autocomplete({appendTo:this[_completions_dst].get(vr),source:this[_tags].get(vr),response:this._response(vr),minLength:0});flt2.click(function(e){e.preventDefault();$(this).closest('div').find('.morec').click();flt[0].focus()});this[_wire_mode].set(vr,true);this._setClear(vr);this._setFilter(vr);this[_wire_mode].set(vr,false)}},{key:'work',value:function work(vr){var textf=this.component.state.getState('flt_'+vr);var clearfc=this[_clear_filter_control].get(vr);if(textf==''){this[_box].get(vr).removeClass('ison');clearfc.hide()}else {this[_box].get(vr).addClass('ison');clearfc.show()}this[_filter_control2].get(vr).html(textf)}}]);return _class}();exports.default=_class;
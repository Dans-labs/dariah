'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value' in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _generic=require('./generic.js');var g=_interopRequireWildcard(_generic);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else {var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var _class=function(){function _class(component){_classCallCheck(this,_class);this.component=component}_createClass(_class,[{key:'_html',value:function _html(vr){var h='';h+='<table id="table_'+vr+'">';var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this.component.data.get(vr)[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var r=_step.value;var rowstart='<tr rid="'+r[0]+'"><td><a class="showc fa fa-fw fa-list-ul" href="#" title="hide fields"></a><a class="hidec fa fa-fw fa-minus" href="#" title="show fields"></a></td>';var rowend='</tr>';if(vr=='contrib'){h+=rowstart+'<td><a href="#" class="fa fa-fw fa-minus"></a>'+r[1]+'</td>'+rowend}else if(vr=='country'){var in_dariah=r[3]==1?'dariah':'';h+=rowstart+'<td class="country_code">'+r[1]+'<td><td class="country_name">'+r[2]+'<td><td class="in_dariah">'+in_dariah+'</td><td class="latlng">'+r[4]+'</td><td class="latlng">'+r[5]+'</td>'+rowend}else if(vr=='type'||vr=='tadiraha'||vr=='tadiraho'||vr=='tadiraht'){h+=rowstart+'<td class="value">'+r[1]+'<td>'+rowend}}}catch(err){_didIteratorError=true;_iteratorError=err}finally {try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally {if(_didIteratorError){throw _iteratorError}}}h+='</table>';this.component.container.get(vr).html(h)}},{key:'_display',value:function _display(row,vr,open_ids){var that=this;var hidec=row.find('.hidec');var showc=row.find('.showc');var rid=row.attr('rid');var detail=this.component.container.get(vr).find('tr[iid="'+rid+'"]');if(open_ids.has(rid)){hidec.show();showc.hide();if(detail.length){detail.show()}}else {hidec.hide();showc.hide();if(detail.length){detail.hide()}}}},{key:'_set_it',value:function _set_it(control,vr,state){var open_ids=g.from_str(this.state.getState(key));var rid=control.closest('tr').attr('rid');if(state){open_ids.add(rid)}else {open_ids.delete(rid)}this.state.setState(key,g.to_str(open_ids))}},{key:'show',value:function show(vr){return this.component.state.getState('list')==vr}},{key:'weld',value:function weld(vr){this._html(vr)}},{key:'wire',value:function wire(vr){var that=this;var cc=this.component.container.get(vr);var key=this.component.name+'_'+vr;cc.find('.hidec').click(function(e){e.preventDefault();that._set_it($(this),vr,true)});cc.find('.showc').click(function(e){e.preventDefault();that._set_it($(this),vr,false)})}},{key:'work',value:function work(vr){var that=this;var key=this.component.name+'_'+vr;var cc=this.component.container.get(vr);var open_ids=g.from_str(this.component.state.getState(this.component.name+'_'+vr));cc.find('tr[rid]').each(function(){that._display($(this),vr,open_ids)})}}]);return _class}();exports.default=_class;
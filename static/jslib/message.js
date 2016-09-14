'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value' in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var _destination=Symbol();var _trash_control=Symbol();var _trash_control_para=Symbol();var _on_clear=Symbol();var _class=function(){function _class(destination,on_clear){var _this=this;_classCallCheck(this,_class);this[_destination]=$('#'+destination);this[_trash_control]=$('#trash_'+destination);this[_trash_control_para]=this[_trash_control].closest('p');this[_trash_control].click(function(e){e.preventDefault();_this.clear()});this._hide();this[_on_clear]=on_clear}_createClass(_class,[{key:'_hide',value:function _hide(){this[_destination].hide();this[_trash_control_para].hide()}},{key:'_show',value:function _show(){this[_destination].show();if(this[_destination].html()!=''){this[_trash_control_para].show()}}},{key:'clear',value:function clear(){this[_destination].html('');if(this[_on_clear]!=undefined){this[_on_clear]()}this._hide()}},{key:'msg',value:function msg(text,kind){if(kind==undefined){kind='info'}var message_text=this[_destination].html();this[_destination].html(message_text+'<p class="'+kind+'">'+text+'</p>');this._show()}}]);return _class}();exports.default=_class;
function oSelect(id, box, _config){
    this.id = (id || 'oselect') ;//+ parseInt(new Date().getTime()/1000, 10);
    this.box = box || null;
    if(typeof this.box != 'object'){
        this.box = this.$(this.box);
    }
    if(_config == undefined){
        _config = {};
    }
    this.config = {
        maxLevel: _config.maxLevel || -1,
        showEmptySelect: _config.showEmptySelect != undefined ? _config.showEmptySelect : true,
        callback: _config.callback || null
    };
    this.maxLevel = 0;
}

oSelect.prototype.$ = function(i){
    return document.getElementById(i);
};

oSelect.prototype.create = function(param){
    var _ = this;
    if(typeof param == 'undefined'){
        param = {};
    }
    var level = param.level || this.maxLevel;
    var obj = this.$(this.id + level);
    if((level > this.config.maxLevel && this.config.maxLevel > 0) || obj != null){
        return obj;
    }
    var obj = document.createElement('select');
    obj.id = this.id + level;
    obj.className = 'select';
    obj.name='list';
    obj.multiple=true;
    obj.level = level;
    obj.onchange = function(){
        var callback = param.callback || _.config.callback;
        if(typeof callback == 'function'){
            callback(param.param != null ? param.param : {val:_.getSelectedOptionValue(this),txt:_.getSelectedOptionText(this),level:this.level}, _);
        }
    };
    
    this.box.appendChild(obj);

    this.maxLevel = obj.level;

    return obj;
};

oSelect.prototype.getSelectedOptionText = function(obj){
    return obj.options[obj.options.selectedIndex].text;
};

oSelect.prototype.getSelectedOptionValue = function(obj){
    return obj.options[obj.options.selectedIndex].value;
};

oSelect.prototype.fillOption = function(obj, val, txt) {
    if(obj != null){
        obj.options.add(new Option(txt, val));
    }
};

oSelect.prototype.initial = function(param){
    for(var i=0,c=param.length; i<c; i++){
        if(i > this.config.maxLevel){
            break;
        }
        var obj = this.$(this.id + i);
        if(obj == null){
            obj = this.create({level:i});
        }

        if(param[i].list != undefined){
            for(var j=0,cc=param[i].list.length; j<cc; j++){
                this.fillOption(obj, param[i].list[j].val || param[i].list[j].id, param[i].list[j].txt || param[i].list[j].name);
            }
            if(param[i].selectedValue != undefined){
                obj.value = param[i].selectedValue;
            }
        }
    }
    if(this.config.showEmptySelect){
        for(var i=param.length; i<=this.config.maxLevel; i++){
            this.create({level:i});
        }
    }
};

oSelect.prototype.fill = function(level, val, txt){
    var obj = this.create({level:level});
    if(obj != null){
        obj.style.display = '';

        this.fillOption(obj, val, txt);
    }
};

oSelect.prototype.clear = function(level){
    for(var i = this.maxLevel; i > level; i--){
        var obj = this.$(this.id + i);
        if(obj != null){
            obj.options.length = 0;
            if(i > level){
                obj.style.display = this.config.showEmptySelect ? '' : 'none';
            }
        }
    }
};

oSelect.prototype.getSelectedDataList = function(){
    if(this.box != null){
        var result = [];
        var childs = this.box.childNodes;
        for(var i=0,c=childs.length; i<c; i++){
            if(childs[i].level != undefined && childs[i].options.length > 0){
                var val = this.getSelectedOptionValue(childs[i]);
                if(val != '' && val != '-1'){
                    //result.push({val:this.getSelectedOptionValue(childs[i]),txt:this.getSelectedOptionText(childs[i]),level:childs[i].level});
                    result.push([val,this.getSelectedOptionText(childs[i]),childs[i].level]);
                }
            }
        }
        return result;
    }
    return null;
};

oSelect.prototype.getSelectedValueList = function(){
    if(this.box != null){
        var childs = this.box.childNodes;
        var vals = [];
        var txts = [];
        for(var i=0,c=childs.length; i<c; i++){
            if(childs[i].level != undefined && childs[i].options.length > 0){
                var val = this.getSelectedOptionValue(childs[i]);
                if(val != '' && val != '-1'){
                    vals.push(val);
                    txts.push(this.getSelectedOptionText(childs[i]));
                }
            }
        }
        return [vals, txts];
    }
    return null;
};

oSelect.prototype.getSelectedValue = function(){
    if(this.box != null){
        var childs = this.box.childNodes;
        for(var i=childs.length-1; i>=0; i--){
            if(childs[i].level != undefined && childs[i].options.length > 0){
                var val = this.getSelectedOptionValue(childs[i]);
                if(val != '' && val != '-1'){
                    return [val, this.getSelectedOptionText(childs[i]), childs[i].level];
                }
            }
        }
    }
    return null;
};
function isDefine(para) {
    if ( typeof para == 'undefined' || para == "" || para == null || para == undefined || para == 'undefined')
        return false;
    else
        return true;
}
//日期格式转换
function NYR(date,flag){
   // date = date.replace(/-/g,'/');
    var da=new Date(date);
    if(isDefine(flag)){
        if(flag==1){
            return da.getFullYear()+"-"+((da.getMonth()+1)<10?"0"+(da.getMonth()+1):(da.getMonth()+1))+"-"+(da.getDate()<10?"0"+da.getDate():da.getDate());
        }else{
            return ((da.getMonth()+1)<10?"0"+(da.getMonth()+1):(da.getMonth()+1))+"-"+(da.getDate()<10?"0"+da.getDate():da.getDate());
        }
        
    }else{
        return da.getFullYear()+"年"+((da.getMonth()+1)<10?"0"+(da.getMonth()+1):(da.getMonth()+1))+"月"+(da.getDate()<10?"0"+da.getDate():da.getDate())+"日";
    }    
}
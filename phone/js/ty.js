    var  UnicodeConverter = {  
            ToUnicode: function (str) {  
                return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');  
            }  
            , ToGB2312: function (str) {  
                return unescape(str.replace(/\\u/gi, '%u'));  
            }  
        };  
        
        //接口地址
           var  GetPostUrl = {  
            gUrl: function () {  
                return   "http://xtxl.znuotech.com/"; 
            }  
            
        };
          //微信商户key
           var  Weixin = {  
            wxkey: function () {  
                return   "dfewfwefefefff3rf23r32f23e2323d2"; 
            }  
            
        };
        //微信服务号接口
           var  WeixinFw = {  
            appID: function () {  
                return   "wxaa38ddce7a0d989c"; 
            }  
            
        };
 //微信APP接口
           var  WeixinFw = {  
            appID_APP: function () {  
                return   "wx12642ce85db53abd"; 
            }  
            
        };
 
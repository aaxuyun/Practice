
var line;
var array=[];
//读取输入
while(line=readline()){
  array.push(line.split(" ").map(item=>+item));
}

//重叠合并
function merge(item1,item2){
	if(item1[0]<=item2[0] && item1[1]<item2[1]){             
		return [[item1[1]+1,item2[1],item2[2]]];
	}else if(item1[0]>item2[0] && item1[1]>=item2[1]){
		return [[item2[0],item1[0]-1,item2[2]]];
	}else if(item2[0]<item1[0] && item2[1]>item1[1]){
		return [[item2[0],item1[0]-1,item2[2]],[item1[1]+1,item2[1],item2[2]]];
	}
}
//处理重叠项
function cover(arr){
    var first=arr.pop();
    var result= arr.reduceRight((prev,cur)=>{
      //过滤pre中与cur有重叠的项
    		var newArr=prev.filter((item)=>{
    				return item[1]>=cur[0] && cur[1]>=item[0];
    			}
    		)
        
    		if(newArr.length==0){//无重叠
    			prev.push(cur);
    		}else if(newArr.length==1){//仅一项重叠
    			var a1=newArr[0];
	    		var item1=merge(a1,cur);
	    		if(item1){
	    			prev=prev.concat(item1);
	    		};
    		}else if(newArr.length>1){
    			newArr.sort((a,b)=>a[0]-b[0]);
    			var slices=newArr.reduce((prev0,cur0)=>{//多项重叠
		        	var a2=prev0.pop();
			        var item2=merge(cur0,a2);
			        if(item2){
			        	prev0=prev0.concat(item2);
			        }
		        	return prev0;
	        	},[cur]);
	        	if(slices){
	        		prev=prev.concat(slices);
	        	}
    		} 
      return prev;
    },[first]);
     return result;
}

var prices=cover(array);
prices.sort((a,b)=>a[0]-b[0]);
var first2=prices.shift();
var results=prices.reduce((prev1,cur1)=>{//合并连续时间价格相同的项
        var p=prev1.pop();
        if(p[1]+1==cur1[0] && p[2]==cur1[2]){
            prev1.push([p[0],cur1[1],cur1[2]]);
        }else{
        	prev1.push(p);
        	prev1.push(cur1);
        };
        return prev1;
    },[first2]);
print(results.map((item)=>"["+item.join(', ')+"]").join(','));

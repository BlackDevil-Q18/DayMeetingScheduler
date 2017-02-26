var MeetingScheduler = (function(){
						
		function setPos(x,y){
			this.posx = x;
			this.posy = y;
		}	

		function setDimension(widthDiv,left){
			var _width = DAY_WIDTH/widthDiv;
			this.width = _width;
			this.height = MINUTE_PIX * (this.end - this.start);
			this.left = this.posx*_width;
		}

		function getMax(a,b){
			if(a>b){
				return a;
			}else{
				return b;
			}
		}	
				
				
		function schedule(ml){

			ml.sort(function(a,b){
				if(a.start>b.start){
					return 1;
				}else{
					return -1;
				}
			});

			var pl =[];
			var count = 0,overlapval=1,mlLength=ml.length;
			for(var i=0;i<mlLength;i++){
			
				if(count>0){
					setDimension.call(ml[i],overlapval);
					count--;
					continue;
				}
				
				if(i+1<mlLength && ml[i+1].start<=ml[i].end){
					pl.push([]);
					var activeRow = pl.length-1;
					pl[activeRow].push([ml[i]]);
					pl[activeRow].push([ml[i+1]]);
					
					setPos.call(ml[i],0,0);			
					setPos.call(ml[i+1],1,0);
					
					var max = getMax(ml[i].end,ml[i+1].end);
					count = 1;
					overlapval = 2;
					for(var k=i+1;k<mlLength;k++){
						if(k+1<mlLength && ml[k+1].start<max){
							var loc = -1;
							for(var level=0;level<pl[activeRow].length;level++){
								if(ml[k+1].start>=pl[activeRow][level][pl[activeRow][level].length-1].end){
									loc = level;
									pl[activeRow][level].push(ml[k+1]);
									setPos.call(ml[k+1],level,pl[activeRow][level].length-1);
									break;
								}
							}
							if(loc==-1){
								pl[pl.length-1].push([ml[k+1]]);
								setPos.call(ml[k+1],pl[activeRow].length-1,0);
								overlapval++;
							}
							max = getMax(ml[k+1].end,max);
							count++;
						}else{				
							break;
						}
					}
					setDimension.call(ml[i],overlapval);			
				}else{
					pl.push(ml[i]);
					setPos.call(ml[i],0,0);
					setDimension.call(ml[i],1);
				}		
			}
			console.log(ml);
			return ml;
		};
		
		return schedule;

})();